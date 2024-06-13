function Validation(values) {
  let errors = {}; // Renamed error to errors for clarity

  const firstname_pattern = /^[A-Za-z]{4,}$/;
  const lastname_pattern = /^[A-Za-z]{4,}$/;
  const username_pattern = /^[A-Za-z0-9_-]{3,30}$/;
  const email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nic_pattern = /^[0-9]{12}$|^[0-9]{9}V$/;
  const contact_pattern = /^\d{10}$/;

  if (!values.firstname) {
      errors.firstname = "First name required";
  } else if (!firstname_pattern.test(values.firstname)) {
      errors.firstname = "First name should contain at least 4 characters";
  }

  if (!values.lastname) {
      errors.lastname = "Last name required";
  } else if (!lastname_pattern.test(values.lastname)) {
      errors.lastname = "Last name should contain at least 4 characters";
  }

  if (!values.username) {
      errors.username = "Username required";
  } else if (!username_pattern.test(values.username)) {
      errors.username = "Username should be 3-30 characters and can include letters, numbers, underscores, and dashes";
  }

  if (!values.nic) {
      errors.nic = "NIC required";
  } else if (!nic_pattern.test(values.nic)) {
      errors.nic = "NIC is invalid";
  }

  if (!values.email) {
      errors.email = "Email required";
  } else if (!email_pattern.test(values.email)) {
      errors.email = "Email is invalid";
  }

  if (!values.contact) {
      errors.contact = "Contact number required";
  } else if (!contact_pattern.test(values.contact)) {
      errors.contact = "Contact number is invalid";
  }

  if (!values.password) {
      errors.password = "Password required";
  } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must contain at least 8 characters, including a letter and a number";
  }

  if (!values.cpassword) {
      errors.cpassword = "Confirmation password required";
  } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords do not match";
  }

  return errors;
}


export default Validation;


