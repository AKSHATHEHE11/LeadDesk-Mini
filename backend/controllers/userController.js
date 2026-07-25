const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name email role");

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};