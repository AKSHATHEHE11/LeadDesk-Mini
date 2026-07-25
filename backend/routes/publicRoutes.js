const express = require("express");
const router = express.Router();

const { createLead } = require("../controllers/publicController");

router.post("/leads", createLead);

module.exports = router;