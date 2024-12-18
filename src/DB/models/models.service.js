import connection from "../connection.js";

export function createTables(req, res) {
  const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      password VARCHAR(255) NOT NULL
    );`;

  const productsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock INT DEFAULT 0,
      isDeleted ENUM('false', 'true') DEFAULT 'false',
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`;

  // Execute the first query (users table)
  connection.execute(usersTableQuery, (error, result) => {
    if (error) {
      console.error("Error creating users table:", error.message);
      return res
        .status(500)
        .json({ error: "Error creating users table", details: error.message });
    }

    console.log("Users table created successfully.");

    // Execute the second query (products table)
    connection.execute(productsTableQuery, (error, result) => {
      if (error) {
        console.error("Error creating products table:", error.message);
        return res.status(500).json({
          error: "Error creating products table",
          details: error.message,
        });
      }
      console.log("Products table created successfully.");
      res.status(200).json({ message: "Tables created successfully" });
    });
  });
}
