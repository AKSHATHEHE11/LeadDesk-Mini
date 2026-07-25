const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    validateLead,
    handleValidationErrors
} = require("../middleware/leadValidation");

const {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    addNote,
    updateStatus
} = require("../controllers/leadController");

router.post(
    "/", 
    authMiddleware,
    validateLead,
    handleValidationErrors,
    createLead
);

router.get(
    "/", 
    authMiddleware,
    getAllLeads
);

router.get(
    "/:id", 
    authMiddleware,
    getLeadById
);

router.put(
    "/:id", 
    authMiddleware,
    validateLead,
    handleValidationErrors,
    updateLead
);

router.delete(
    "/:id", 
    authMiddleware,
    deleteLead
);

router.put(
    "/:id/assign", 
    authMiddleware, 
    adminMiddleware, 
    assignLead
);

router.post(
    "/:id/notes", 
    authMiddleware, 
    addNote
);

module.exports=router;