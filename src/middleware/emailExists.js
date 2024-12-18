import connection from "../DB/connection.js";

export function emailExists(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const query = `SELECT * FROM users WHERE email = ?`;  // Using parameterized query for security
  connection.execute(query, [email], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    
    req.email = email; 
    next();
  });
}
