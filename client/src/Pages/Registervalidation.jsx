function Validation(values) {
    let errors = {}; // Renamed error to errors for clarity

    const firstname_pattern= /^[A-Za-z]+$/;
    const lastname_pattern= /^[A-Za-z]+$/;
    const username_pattern = /^[A-Za-z0-9_-]{3,30}$/;
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Corrected regex pattern
    const password_pattern= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nic_pattern= /^[0-9]{12}$|^[0-9]{9}V$/;
    const contact_pattern= /^\d{10}$/;

    if (!values.firstname) {
        errors.firstname = "Name required";
      // Correctly use values.email for pattern test and assign to errors.email
      } else if (!firstname_pattern.test(values.firstname)) {
        errors.firstname = "Name is invalid";
      }

      if (!values.lastname) {
        errors.lastname = "Name required";
      // Correctly use values.email for pattern test and assign to errors.email
      } else if (!lastname_pattern.test(values.lastname)) {
        errors.lastname = "lastname is invalid";
      }

      if (!values.username) {
        errors.username = "username required";
      // Correctly use values.email for pattern test and assign to errors.email
      } else if (!username_pattern.test(values.username)) {
        errors.username = "paces, special symbols (other than underscore and dash), or those shorter than 3 characters or longer than 16 characters";
      }



      if (!values.nic) {
        errors.nic = "nic required";
      // Correctly use values.email for pattern test and assign to errors.email
      } else if (!nic_pattern.test(values.nic)) {
        errors.nic = "NIC is invalid";
      }

    // Correctly check if email is empty
    if (!values.email) {
        errors.email = "Email required";
      // Correctly use values.email for pattern test and assign to errors.email
      } else if (!email_pattern.test(values.email)) {
        errors.email = "Email is invalid";
      }
  
       
    if (!values.contact) {
        errors.contact = "Phone Number required";
      // Correctly use values.email for pattern test and assign to errors.email
      } else if (!contact_pattern.test(values.contact)) {
        errors.contact = "contact is invalid";
      }

    // Correctly check if password is empty
    if (!values.password) {
      errors.password = "Password required";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must contain at least 8 characters, including a letter and a number";
    }

    if (!values.cpassword) {
        errors.cpassword = "Confirmation Password required";
      } else if (values.cpassword !== values.password) {
        errors.cpassword = "* Passwords do not match*";
      }

  
    return errors;
  }
  
  export default Validation;
  