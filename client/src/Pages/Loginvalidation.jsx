function Validation(values) {
    let errors = {}; 

    const username_pattern = /^[A-Za-z0-9_-]{3,30}$/;
    //const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Corrected regex pattern
    const password_pattern= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    // Correctly check if email is empty
    if (!values.username) {
      errors.username = "username required";
    // Correctly use values.email for pattern test and assign to errors.email
    } else if (!username_pattern.test(values.username)) {
      errors.username = "username is invalid";
    }
  
    // Correctly check if password is empty
    if (!values.password) {
      errors.password = "Password required";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must contain at least 8 characters, including a letter and a number";
    }
  
    return errors;
  }
  
  export default Validation;
  