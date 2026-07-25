const Lead = require("../models/Lead");

const createLead = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      status: "New",
      activity: [
        {
          action: "Lead submitted from public form",
        },
      ],
    });

    res.status(201).json({
      message: "Lead submitted successfully",
      lead,
    });
  } catch (err) {


    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createLead };