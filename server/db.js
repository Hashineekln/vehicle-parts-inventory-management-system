// Import the mysql module using require
import mysql from 'mysql';


// Create a database connection
export const db = mysql.createConnection({
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

export default db;

// Remember to replace "your_password" with your actual database password
