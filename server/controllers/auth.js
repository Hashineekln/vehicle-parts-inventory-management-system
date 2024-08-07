import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Registration function
export const register = (req, res) => {
    // Debugging: Log the incoming request body to inspect it
    console.log(req.body);

    // Query to check if user already exists based on various criteria
    const checkUserQuery = "SELECT * FROM user WHERE  username = ? OR NIC = ? OR email = ? OR contact = ?";

    // Values from the request body to check if the user already exists with same email,conatct and username
    const checkValues = [
       
        req.body.username,
        req.body.NIC,
        req.body.email,
        req.body.contact,
    ];

    // First, check if the user already exists
    db.query(checkUserQuery, checkValues, (err, data) => {
        if (err) {
            console.error(err);
            return res.json(err);
        }
        if (data.length) return res.status(409).json("User already exists with the same username, NIC, email or contact number");

        // User does not exist, proceed with registration

        // Generate salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt); 

        // Query to insert a new user, including the role_id
        const insertUserQuery = "INSERT INTO user (usertype, first_name, last_name, username, NIC, email, contact, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        // Values from the request body to insert the new user, including the hashed password and role_id
        const insertValues = [
            req.body.usertype,
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            req.body.nic,
            req.body.email,
            req.body.contact,
            hash,
             // Assuming this comes from the request body
        ];

        // Execute the query to insert the new user
        db.query(insertUserQuery, insertValues, (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            return res.status(201).json("User created");
        });
    });
};
export const login = (req, res) => {
  const checkUserQuery = "SELECT * FROM user WHERE username = ?";
  db.query(checkUserQuery, req.body.username, (err, data) => {
    if (err) {
      console.error(err);
      return res.json(err);
    } 
    if (data.length == 0) {
      return res.status(404).json("User not found");
    }

    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password); 
    if (!isPasswordCorrect) {
      return res.status(401).json("Password incorrect");
    }

    // Create token
    const token = jwt.sign({username: data[0].username, id: data[0].id}, "jwtkey");  
    const {password, ...otherDetails} = data[0];
    
    res.cookie("access_token", token, {
        httpOnly: true,
    })
    .status(200)
    .json(otherDetails);
  });
};


export const logout= (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
  .status(200)
  .json("User logged out successfully");
};  