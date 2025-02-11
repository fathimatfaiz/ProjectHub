import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "Public/Images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

// Add new admin
router.post("/add_admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.json({ Status: false, Error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ Status: false, Error: "Invalid email format" });
    }

    // Check if admin already exists
    const checkSql = "SELECT * FROM admin WHERE email = ?";
    con.query(checkSql, [email], async (err, result) => {
      if (err) {
        console.error("Admin check error:", err);
        return res.json({ Status: false, Error: "Server error" });
      }
      if (result.length > 0) {
        return res.json({ Status: false, Error: "Admin already exists" });
      }

      // Hash password
      const hash = await bcrypt.hash(password, 10);

      // Insert new admin
      const insertSql =
        "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
      con.query(
        insertSql,
        [name.trim(), email.toLowerCase(), hash],
        (err, result) => {
          if (err) {
            console.error("Admin add error:", err);
            return res.json({ Status: false, Error: "Failed to add admin" });
          }
          return res.json({
            Status: true,
            Message: "Admin added successfully",
          });
        }
      );
    });
  } catch (error) {
    console.error("Admin add error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

// Admin login with password hashing
router.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        loginStatus: false,
        Error: "Email and password are required",
      });
    }

    const sql = "SELECT * FROM admin WHERE email = ?";
    con.query(sql, [email], async (err, result) => {
      if (err) {
        console.error("Login error:", err);
        return res.json({ loginStatus: false, Error: "Server error" });
      }

      if (result.length === 0) {
        return res.json({ loginStatus: false, Error: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        return res.json({ loginStatus: false, Error: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          role: "admin",
          email: result[0].email,
          id: result[0].id,
        },
        process.env.JWT_SECRET_KEY || "jwt_secret_key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.json({ loginStatus: true });
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({ loginStatus: false, Error: "Server error" });
  }
});

// Get all categories
router.get("/category", async (req, res) => {
  try {
    const sql = "SELECT * FROM category ORDER BY name ASC";
    con.query(sql, (err, result) => {
      if (err) {
        console.error("Category fetch error:", err);
        return res.json({ Status: false, Error: "Failed to fetch categories" });
      }
      return res.json({ Status: true, Result: result });
    });
  } catch (error) {
    console.error("Category fetch error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

// Add new category
router.post("/add_category", async (req, res) => {
  try {
    const { category } = req.body;

    if (!category || category.trim().length === 0) {
      return res.json({ Status: false, Error: "Category name is required" });
    }

    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql, [category.trim()], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.json({ Status: false, Error: "Category already exists" });
        }
        console.error("Category add error:", err);
        return res.json({ Status: false, Error: "Failed to add category" });
      }
      return res.json({ Status: true, Message: "Category added successfully" });
    });
  } catch (error) {
    console.error("Category add error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

// Add new student
router.post("/add_student", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password, address, registerno, category_id } =
      req.body;

    // Validation
    if (!name || !email || !password || !registerno || !category_id) {
      return res.json({
        Status: false,
        Error: "All required fields must be filled",
      });
    }

    if (!req.file) {
      return res.json({ Status: false, Error: "Image is required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ Status: false, Error: "Invalid email format" });
    }

    const hash = await bcrypt.hash(password, 10);
    const values = [
      name.trim(),
      email.toLowerCase(),
      hash,
      address?.trim() || null,
      registerno.trim(),
      req.file.filename,
      category_id,
    ];

    const sql = `
          INSERT INTO student 
          (name, email, password, address, registerno, image, category_id)
          VALUES (?)
      `;

    con.query(sql, [values], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          if (err.message.includes("email")) {
            return res.json({ Status: false, Error: "Email already exists" });
          }
          if (err.message.includes("registerno")) {
            return res.json({
              Status: false,
              Error: "Registration number already exists",
            });
          }
        }
        console.error("Student add error:", err);
        return res.json({ Status: false, Error: "Failed to add student" });
      }
      return res.json({ Status: true, Message: "Student added successfully" });
    });
  } catch (error) {
    console.error("Student add error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

export { router as adminRouter };
