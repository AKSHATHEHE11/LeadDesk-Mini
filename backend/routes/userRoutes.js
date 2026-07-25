const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;