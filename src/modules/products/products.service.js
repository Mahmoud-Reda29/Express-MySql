import connection from "../../DB/connection.js";

export const addProduct = (req, res) => {
  const { name, price, stock, user_id } = req.body;

  if (!name || !price || !stock || !user_id) {
    return res.status(400).json({ error: "All fields are required" });
  } else {
    // Updated query, omitting 'isDeleted' as it defaults to FALSE
    const query = `INSERT INTO products (name, price, stock, user_id) VALUES ('${name}', '${price}', '${stock}', '${user_id}');`;

    connection.execute(query, (error, results) => {
      if (error) {
        console.error("Database error:", error.message);
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({ message: "Product added successfully" });
    });
  }
};
export const softDeleteProduct = (req, res) => {
  const { id: ProductId } = req.params;

  if (!ProductId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const checkQuery = `SELECT * FROM products WHERE id = ? AND isDeleted = 'false'`;
  connection.execute(checkQuery, [ProductId], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or already deleted" });
    }

    const updateQuery = `UPDATE products SET isDeleted = 'true' WHERE id = ?`;
    connection.execute(updateQuery, [ProductId], (error, updateResults) => {
      if (error) {
        console.error("Database error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res
        .status(200)
        .json({ message: "Product soft-deleted successfully" });
    });
  });
};
export const deleteProduct = (req, res) => {
  const { id: ProductId } = req.params;

  if (!ProductId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const checkQuery = `SELECT * FROM products WHERE id = ? AND isDeleted = 'false'`;
  connection.execute(checkQuery, [ProductId], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or already deleted" });
    }

    const deleteQuery = `DELETE FROM products WHERE id = ?`;
    connection.execute(deleteQuery, [ProductId], (error, updateResults) => {
      if (error) {
        console.error("Database error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json({ message: "Product Deleted successfully" });
    });
  });
};
export const searchProduct = (req, res) => {
  const { name: ProductName } = req.query;
  const query = `SELECT * FROM products WHERE name LIKE ? AND isDeleted = 'false'`;
  connection.execute(query, [`%${ProductName}%`], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "Products Found", Products: results });
  });
};
export const searchProductsByIds = (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    return res.status(400).json({ error: "Product IDs are required" });
  }

  const idsArray = ids
    .split(",")
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id));

  if (idsArray.length === 0) {
    return res.status(400).json({ error: "Invalid Product IDs format" });
  }

  const placeholders = idsArray.map(() => "?").join(",");

  const query = `SELECT id, name, price FROM products WHERE id IN (${placeholders}) AND isDeleted = 'false'`;

  connection.execute(query, idsArray, (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products: results });
  });
};
export const getProducts = (req, res) => {
  const query = `SELECT id, name AS productName, price AS cost, 
                    stock, isDeleted, user_id
                    FROM products
                    WHERE isDeleted = 'false'`;

  connection.execute(query, (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products: results });
  });
};
export const getProductsWithUsers = (req, res) => {
  const query = `SELECT products.name AS productName, users.email AS userEmail
                   FROM products
                   JOIN users ON products.user_id = users.id
                   WHERE products.isDeleted = 'false'`;

  connection.execute(query, (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products: results });
  });
};
export const getMaxProductPrice = (req, res) => {
  const query = `SELECT id, name AS productName, price AS cost, stock
                    FROM products
                    WHERE price = (SELECT MAX(price) FROM products WHERE isDeleted = 'false')
                    AND isDeleted = 'false'`;

  connection.execute(query, (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const product = results[0];
    const maxPrice = product.cost;

    return res.status(200).json({
      maxPrice: maxPrice,
      product: product,
    });
  });
};
export const getTopExpensiveProducts = (req, res) => {
  const query = `SELECT name AS productName, price AS cost
                   FROM products
                   WHERE isDeleted = 'false'
                   ORDER BY price DESC
                   LIMIT 5`;

  connection.execute(query, (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products: results });
  });
};
