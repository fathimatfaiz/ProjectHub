import express, { response } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/student_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.json({
        loginStatus: false,
        Error: "Email and password are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        loginStatus: false,
        Error: "Invalid email format",
      });
    }

    const sql = "SELECT id, email, password, name FROM student WHERE email = ?";

    con.query(sql, [email.toLowerCase()], async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({
          loginStatus: false,
          Error: "An error occurred during login",
        });
      }

      if (result.length === 0) {
        return res.json({
          loginStatus: false,
          Error: "Invalid email or password",
        });
      }

      try {
        const match = await bcrypt.compare(password, result[0].password);

        if (!match) {
          return res.json({
            loginStatus: false,
            Error: "Invalid email or password",
          });
        }

        // Create JWT token
        const token = jwt.sign(
          {
            role: "student",
            email: result[0].email,
            id: result[0].id,
            name: result[0].name,
          },
          process.env.STUDENT_SECRET_KEY || "student_secret_key",
          { expiresIn: "1d" }
        );

        // Set secure cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.json({
          loginStatus: true,
          message: "Login successful",
          user: {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
          },
        });
      } catch (bcryptError) {
        console.error("Password comparison error:", bcryptError);
        return res.json({
          loginStatus: false,
          Error: "An error occurred during login",
        });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      loginStatus: false,
      Error: "An error occurred during login",
    });
  }
});

/*Add title
router.post("/auth/add_title", (req, res) => {
  const { title, description, category } = req.body;
  const status = "Pending"; // Default status

  const sql =
    "INSERT INTO title (title, description, category_id, status) VALUES (?, ?, ?, ?)";
  con.query(sql, [title, description, category_id, status], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Failed to add title" });
    }
    return res.json({ Status: true, Message: "Title added successfully" });
  });
});*/

router.post("/auth/add_title", (req, res) => {
  const { title, description, category_id, status } = req.body;

  // Validation
  if (!title || !description || !category_id || !status) {
    return res.json({
      Status: false,
      Error: "All required fields must be filled",
    });
  }

  const values = [title.trim(), description.trim(), category_id, status.trim()];

  const sql = `
    INSERT INTO title
    (title, description, category_id, status)
    VALUES (?, ?, ?)
  `;

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Title add error:", err);
      return res.json({ Status: false, Error: "Failed to add title" });
    }
    return res.json({ Status: true, Message: "Title added successfully" });
  });
});











export { router as StudentRouter };
