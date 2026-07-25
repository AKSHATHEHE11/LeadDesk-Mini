const { body, validationResult } = require("express-validator");

const validateLead = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("company")
        .trim()
        .notEmpty()
        .withMessage("Company is required"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

    body("status")
        .optional()
        .isIn(["New", "Contacted", "Qualified", "Lost"])
        .withMessage("Invalid status")
];

const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();

};

module.exports ={
    validateLead,
    handleValidationErrors
}