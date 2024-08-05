export function VehicleValidation(values) {
    let errors = {};

    // Part number should only contain uppercase letters, digits, and optional hyphens.
    const part_no_pattern = /^[A-Z0-9]+(-[A-Z0-9]+)*$/;

    // Part name should only contain letters and spaces.
    const part_name_pattern = /^[A-Za-z\s]+$/;

    // If provided, the image URL must be valid.
    const image_url_pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    // Part Number (part_no) validation
    if (!values.part_no) {
        errors.part_no = "Part number is required.";
    } else if (!part_no_pattern.test(values.part_no)) {
        errors.part_no = "Part number is invalid.";
    }

    // Part Name (part_name) validation
    if (!values.part_name) {
        errors.part_name = "Part name is required.";
    } else if (!part_name_pattern.test(values.part_name)) {
        errors.part_name = "Part name is invalid.";
    }

    // Price (price) validation
    if (!values.price) {
        errors.price = "Price is required.";
    } else if (isNaN(values.price) || values.price <= 0) {
        errors.price = "Price must be a positive number.";
    }

    // Threshold Number (threshold_no) validation
    if (!values.threshold_no) {
        errors.threshold_no = "Threshold number is required.";
    } else if (isNaN(values.threshold_no) || values.threshold_no <= 0) {
        errors.threshold_no = "Threshold number must be a positive number.";
    }

    // Image URL (image_url) validation
    if (values.image_url && !image_url_pattern.test(values.image_url)) {
        errors.image_url = "Image URL is invalid.";
    }

    // Category ID (category_id) validation
    if (!values.category_id) {
        errors.category_id = "Category is required.";
    }

    // Shelf ID (shelf_id) validation
    if (!values.shelf_id) {
        errors.shelf_id = "Shelf is required.";
    }

    // Vehicle Type IDs (vehicle_type_ids) validation
    if (values.vehicle_type_ids.length === 0) {
        errors.vehicle_type_ids = "At least one vehicle type must be selected.";
    }

    return errors;
}

export function TypeValidation(values) {
    let errors = {};

    // Brand should contain only alphabetical characters and spaces
    const brand_pattern = /^[A-Za-z\s]+$/;

    // Model can contain alphabetical characters, numbers, spaces, and hyphens
    const model_pattern = /^[A-Za-z0-9\s-]+$/;

    // Year should be in the format of a four-digit number
    const year_pattern = /^\d{4}$/;

    // Validate brand
    if (!values.brand) {
        errors.brand = "Brand is required";
    } else if (!brand_pattern.test(values.brand)) {
        errors.brand = "Brand is invalid";
    }

    // Validate model
    if (!values.model) {
        errors.model = "Model is required";
    } else if (!model_pattern.test(values.model)) {
        errors.model = "Model is invalid";
    }

    // Validate year
    if (!values.year) {
        errors.year = "Year is required";
    } else if (!year_pattern.test(values.year)) {
        errors.year = "Year is invalid";
    }

    return errors;
}

export function CategoryValidation(values) {
    let errors = {};

    // categoryId should be in the format 5-WB,15-AB, etc.
    const categoryIdPattern =  /^\d+-[A-Z]{2}$/;

    // categoryName should contain only letters and spaces
    const categoryNamePattern = /^[A-Za-z\s]+$/;    

    // Validate categoryId
    if (!values.categoryId) {
        errors.categoryId = "Category ID is required";
    } else if (!categoryIdPattern.test(values.categoryId.trim())) {
        errors.categoryId = "Category ID format is invalid (e.g., 5-WB)";
    }

    // Validate categoryName
    if (!values.categoryName) {
        errors.categoryName = "Category Name is required";
    } else if (!categoryNamePattern.test(values.categoryName)) {
        errors.categoryName = "Category Name is invalid";
    }

    return errors;
}

export function ShelfValidation(values) {
    let errors = {};

    // shelfName should contain only letters and spaces
    const shelfNamePattern = /^[A-Za-z\s]+$/;    

    // Validate shelfName
    if (!values.shelfName) {
        errors.shelfName = "shelfName is required";
    } else if (!shelfNamePattern.test(values.shelfName)) {
        errors.shelfName = "shelfName is invalid";
    }

    return errors;
}

export default { VehicleValidation, TypeValidation, CategoryValidation,ShelfValidation };
