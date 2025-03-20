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

// Route to add a title
router.post("/add_title", async (req, res) => {
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
router.get("/title", (req, res) => {
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
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

//Title adding in edit
router.get('/title/:id', (req, res) => {
  try {
  const id = req.params.id; 
    const sql = "SELECT * FROM title WHERE id = ?";
    con.query(sql,[id], (err, result) => {
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
})

//edit 2
router.put('/edit_title/:id', (req, res) => {
  try {
  const id = req.params.id; 
  

  const sql = `UPDATE title
        set title= ?, description= ?, category_id= ? 
        Where id = ?`
        const values = [
          req.body.title,        // Title
          req.body.description,  // Description
          req.body.category_id,  // Category ID
          req.params.id          // ID of the title to update
        ];

        con.query(sql,[...values, id], (err, result) => {
          if (err) {
            console.error("Category fetch error:", err);
            return res.json({ Status: false, Error: "Failed to fetch categories"+err });
          }
          return res.json({ Status: true, Result: result });
        
        });
      } catch (error) {
        console.error("Category fetch error:", error);
        return res.json({ Status: false, Error: "Server error" });
      }
      
        
})

//delete title
router.delete('/delete_title/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from title where id = ?"
  con.query(sql,[id], (err, result) => {
    if (err) {
      console.error("Category fetch error:", err);
      return res.json({ Status: false, Error: "Failed to fetch categories"+err });
    }
    return res.json({ Status: true, Result: result });
  
  });
})



// Fetch project progress by id
router.get('/project_progress/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM project_progress WHERE id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching project progress:', err);
      return res.status(500).json({ Status: false, Error: 'Failed to fetch project progress' });
    }
    return res.json({ Status: true, Result: result });
  });
});


// Update project progress for a milestone by id
router.put('/project_progress/:id', (req, res) => {
  const { id } = req.params;
  const { milestone, status } = req.body;

  const sql = `
    UPDATE project_progress
    SET status = ?
    WHERE id = ? AND milestone = ?
  `;
  con.query(sql, [status, id, milestone], (err, result) => {
    if (err) {
      console.error('Error updating project progress:', err);
      return res.status(500).json({ Status: false, Error: 'Failed to update project progress' });
    }
    return res.json({ Status: true, Message: 'Project progress updated successfully' });
  });
});


/* Fetch all milestones and their progress
router.get('/project_progress', (req, res) => {
  const sql = 'SELECT * FROM project_progress'; // Fetch all milestones

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching milestones:', err);
      return res.status(500).json({ Status: false, Error: 'Failed to fetch milestones' });
    }
    return res.json({ Status: true, Result: result });
  });
});*/

/*Update milestone status
router.put('/project_progress/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `
    UPDATE project_progress
    SET status = ?
    WHERE id = ?
  `;
  con.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ Status: false, Error: 'Failed to update status' });
    }
    return res.json({ Status: true, Message: 'Status updated successfully' });
  });
});*/


// Fetch all milestones for the student
router.get('/milestones', (req, res) => {
  const sql = 'SELECT * FROM milestones';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching milestones:', err);
      return res.status(500).json({ Status: false, Error: 'Failed to fetch milestones' });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Update student progress
router.put('/project_progress/:id', (req, res) => {
  const { id } = req.params;
  const { milestone, status } = req.body;

  const sql = `
    INSERT INTO project_progress (id, milestone, status)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE status = ?
  `;
  con.query(sql, [id, milestone, status], (err, result) => {
    if (err) {
      console.error('Error updating progress:', err);
      return res.status(500).json({ Status: false, Error: 'Failed to update progress' });
    }
    return res.json({ Status: true, Message: 'Progress updated successfully' });
  });
});

//user logout
router.get('/logout', (req, res) =>{
  res.clearCookie('token')
  return res.json({Status: true})
})

export { router as StudentRouter };
