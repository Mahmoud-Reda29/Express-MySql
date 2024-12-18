import connection from "../../DB/connection.js";

export const addUser = (req, res) => {
  const { firstName, lastName, phone, email, role, password } = req.body;

  if (!firstName || !lastName || !phone || !email || !role || !password) {
    return res.status(400).json({ error: "All fields are required" });
  } else {
    const query = `INSERT INTO users (firstName,lastName,phone,email,role,password) VALUES ('${firstName}','${lastName}','${phone}','${email}','${role}','${password}');`;
    connection.execute(query, (error, results) => {
      if (error) {
        console.error("Database error:", error.message);
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({ message: "User added successfully" });
    });
  }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  connection.execute(query, [email, password], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  });
};

export const alterTable = (req, res) => {
  const query = `ALTER TABLE users ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`;
  connection.execute(query, (error, results) => {
    if (error) {
      console.error("Failed to alter table:", error.message);
      return res
        .status(500)
        .json({ error: "Failed to alter table: " + error.message });
    }
    return res.status(201).json({ message: "Done" });
  });
};

export const truncateTable = (req, res) => {
  const query = `TRUNCATE TABLE products;`;
  connection.execute(query, (error, results) => {
    if (error) {
      console.error("Failed to truncate table:", error.message);
      return res
        .status(500)
        .json({ error: "Failed to truncate table: " + error.message });
    }
    return res.status(201).json({ message: "Done" });
  });
};
