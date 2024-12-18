import connection from "../DB/connection.js";


export function isAdmin(req, res, next) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  const query = `SELECT role FROM users WHERE id = ?`;
  connection.execute(query, [id], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userRole = results[0].role;

    if (userRole !== "admin" ) {
      return res
        .status(403)
        .json({ error: "You Don't have access. Admin role required." });
    }
    next();
  });
}
