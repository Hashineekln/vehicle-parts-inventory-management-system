// Import the mysql module using require
const mysql = require('mysql');

// Create a database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hashinee@123", // Replace with your actual password
    database: "lhi_company"
});

// Connect to the database
db.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

// Remember to replace "your_password" with your actual database password
