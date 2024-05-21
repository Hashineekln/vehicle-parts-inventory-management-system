// Import the mysql module using ES Modules syntax
import mysql from 'mysql';
import mysql2 from 'mysql2/promise';

//import mysql from 'mysql2';

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

// Example function to handle a route - This should ideally be in a different file if using an Express server



export default db;

// Remember to replace "your_password" with your actual database password
