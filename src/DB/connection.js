import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment7",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting");
  }
  console.log("DataBase Connected");
});

export default connection;
