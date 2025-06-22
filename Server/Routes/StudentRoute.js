import express, { response } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/token.js";
import {sendMail} from "../utils/mailer.js";

const isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({
      Status: false,
      Error: "Access denied: Students only",
      message: req.user,
    });
  }
  next();
};

const now = new Date();
const Time = now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }); // Adjust as needed


const router = express.Router();
router.post("/student_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password)

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
      console.log(result)
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
          Error: "No users found",
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
          process.env.JWT_SECRET_KEY || "jwt_secret_key",
          { expiresIn: "1d" }
        );

        // Set secure cookie
        res.cookie("token", token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        await sendMail(
            email,
            "Login Notification to ProjectHub",
            `<p>Hello ${result[0].name},</p><p>This is to inform you that you have successfully logged into ProjectHub at ${Time}.</p>`
        );

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

// Route to add a title
router.post("/add_title", verifyToken, async (req, res) => {
  try {
    const { title, description, category_id } = req.body;

    // Validation
    if (!title || !description || !category_id) {
      return res.json({
        Status: false,
        Error: "All fields (title, description, category_id) are required",
      });
    }

    // Insert into the database
    const sql = `
      INSERT INTO title 
      (title, description, category_id)
      VALUES (?, ?, ?)
    `;

    const values = [title.trim(), description.trim(), category_id];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Title add error:", err);
        return res.json({ Status: false, Error: "Failed to add title" });
      }
      return res.json({ Status: true, Message: "Title added successfully" });
    });
  } catch (error) {
    console.error("Title add error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

// Route to get all titles
router.get("/title", verifyToken, (req, res) => {
  try {
    const sql = `SELECT * FROM title`;

    con.query(sql, (err, result) => {
      if (err) {
        console.error("Title fetch error:", err);
        return res.json({ Status: false, Error: "Failed to fetch titles" });
      }
      return res.json({ Status: true, Result: result });
    });
  } catch (error) {
    console.error("Title fetch error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

//Account
router.get("/detail/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

//Title adding in edit
router.get("/title/:id", verifyToken, (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM title WHERE id = ?";
    con.query(sql, [id], (err, result) => {
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

//edit 2
router.put("/edit_title/:id", verifyToken, (req, res) => {
  try {
    const id = req.params.id;

    const sql = `UPDATE title
        set title= ?, description= ?, category_id= ? 
        Where id = ?`;
    const values = [
      req.body.title, // Title
      req.body.description, // Description
      req.body.category_id, // Category ID
      req.params.id, // ID of the title to update
    ];

    con.query(sql, [...values, id], (err, result) => {
      if (err) {
        console.error("Category fetch error:", err);
        return res.json({
          Status: false,
          Error: "Failed to fetch categories" + err,
        });
      }
      return res.json({ Status: true, Result: result });
    });
  } catch (error) {
    console.error("Category fetch error:", error);
    return res.json({ Status: false, Error: "Server error" });
  }
});

//delete title
router.delete("/delete_title/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const sql = "delete from title where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Category fetch error:", err);
      return res.json({
        Status: false,
        Error: "Failed to fetch categories" + err,
      });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Fetch project progress by ID
router.get("/project_progress/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM project_progress WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching project progress:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Failed to fetch project progress" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Update project progress for a milestone by ID
router.put("/project_progress/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { milestone_id, status } = req.body;

  const sql = `
    UPDATE project_progress
    SET status = ?, milestone_id = ?, updated_at = NOW()
    WHERE id = ?
  `;
  con.query(sql, [status, milestone_id, id], (err, result) => {
    if (err) {
      console.error("Error updating project progress:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Failed to update project progress" });
    }
    return res.json({
      Status: true,
      Message: "Project progress updated successfully",
    });
  });
});

// Add a new project progress entry
router.post("/project_progress", verifyToken, (req, res) => {
  const { milestone_id, status } = req.body;
  const student_id = req.user.id;

  const sql = `
    INSERT INTO project_progress (milestone_id, status, student_id)
    VALUES (?, ?, ?)
  `;
  con.query(sql, [milestone_id, status, student_id], (err, result) => {
    if (err) {
      console.error("Error creating progress:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Failed to create progress" });
    }
    return res.json({ Status: true, Message: "Progress created successfully" });
  });
});

// Update progress by milestone for current user
router.put("/update_progress", verifyToken, (req, res) => {
  const { milestone_id, status } = req.body;
  const student_id = req.user.id;

  const query = `
    UPDATE project_progress 
    SET status = ?, updated_at = NOW()
    WHERE milestone_id = ? AND student_id = ?
  `;
  con.query(query, [status, milestone_id, student_id], (err, result) => {
    if (err) {
      console.error("Error updating progress:", err);
      return res.status(500).json({ Status: false, Error: "Database error" });
    }
    return res.json({ Status: true, Message: "Progress updated successfully" });
  });
});

// Fetch all project progress entries
router.get("/project_progress", verifyToken, (req, res) => {
  const student_id = req.user.id;

  const query = `
    SELECT pp.*, m.milestone, s.name AS student_name
    FROM project_progress pp
    LEFT JOIN milestones m ON pp.milestone_id = m.id
    LEFT JOIN student s ON pp.student_id = s.id
    WHERE pp.student_id = ?
  `;

  con.query(query, [student_id], (err, result) => {
    if (err) {
      console.error("Error fetching milestones:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Failed to fetch milestones" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Fetch all milestones for the student
router.get("/milestones", verifyToken, (req, res) => {
  const sql = "SELECT * FROM milestones";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching milestones:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Failed to fetch milestones" });
    }
    return res.json({ Status: true, Result: result });
  });
});

//user logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as StudentRouter };
