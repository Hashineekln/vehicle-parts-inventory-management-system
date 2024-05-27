import mysql from 'mysql';


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hashinee@123", 
  database: "lhi_company"
});


db.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

export default db;
