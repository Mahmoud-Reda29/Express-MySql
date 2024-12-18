
# Project Name

## Description
This project is designed to [Create backend application using node js Express and MySql to simulate connection and integrating database with Actions User can Do and Middleware concept].

## Prerequisites

Before running the project, ensure the following requirements are met:

1. **XAMPP**: You need to have XAMPP installed on your machine. It will provide the Apache server and MySQL to run the project locally.

2. **MySQL Database**: You will need to create a MySQL database to store the data with name **assignment7**.

## Steps to Run the Project

### 1. Install XAMPP and Start Apache & MySQL
- Download and install XAMPP from [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html).
- After installing, open the XAMPP Control Panel and make sure the **Apache** and **MySQL** servers are running.

### 2. Create Database in phpMyAdmin
- Open your browser and access **phpMyAdmin** by going to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
- Create a new database named `assignment7`.

### 3. Clone the Repository
- Clone the repository to your local machine using SSH:
  ```bash
  git clone <git@github.com:Mahmoud-Reda29/Express-MySql.git>
  ```

### 4. Install Project Dependencies
- Navigate to the project directory:
  ```bash
  cd <Assignment 7>
  ```
- Install the required dependencies by running:
  ```bash
  npm install
  ```

### 5. Run the Project
- To start the project, run the following command:
  ```bash
  npm run dev
  ```
- The application should now be running locally, and you can access it at `http://localhost:<port_number>` (default port is typically 3000).

## Additional Information

- **Database Configuration**: Ensure the database is configured properly in the project’s configuration files (e.g., `connection.js` or `.env`).
- **API Endpoints**: [PostMan Collection] open your postman and import collection file located in Project **NodeJS- Assignment 7.postman_collection.json** 


