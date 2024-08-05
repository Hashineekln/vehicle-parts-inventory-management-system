// Validationall.jsx

export function SupplierValidation(values) {
    let errors = {};

    const firstname_pattern = /^[A-Za-z]{4,}$/;
    const lastname_pattern = /^[A-Za-z]{4,}$/;
    const phone_pattern = /^\d{10}$/;

    if (!values.firstName) {
        errors.firstName = "First name is required";
    } else if (!firstname_pattern.test(values.firstName)) {
        errors.firstName = "First name only be letters";
    }

    if (!values.lastName) {
        errors.lastName = "Last name is required";
    } else if (!lastname_pattern.test(values.lastName)) {
        errors.lastName = "Last name only be letters";
    }

    if (!values.phone) {
        errors.phone = "Contact number is required";
    } else if (!phone_pattern.test(values.phone)) {
        errors.phone = "Contact number is invalid";
    }

    return errors;
}

export function ClientValidation(values) {
    let errors = {};

    const firstname_pattern = /^[A-Za-z]{4,}$/;
    const lastname_pattern = /^[A-Za-z]{4,}$/;
    const phone_pattern = /^\d{10}$/;

    if (!values.firstName) {
        errors.firstName = "First name is required";
    } else if (!firstname_pattern.test(values.firstName)) {
        errors.firstName = "First name only be letters";
    }

    if (!values.lastName) {
        errors.lastName = "Last name is required";
    } else if (!lastname_pattern.test(values.lastName)) {
        errors.lastName = "Last name only be letters";
    }

    if (values.phone && !phone_pattern.test(values.phone)) {
        errors.phone = "Contact number is invalid";
    }

    return errors;
}

export default { SupplierValidation,ClientValidation };
