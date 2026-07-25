const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Lost"],
        default: "New"
    },
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    notes: [
        {
            text: {
                type: String,
                required: true
            },

            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    activity: [
        {
            action: {
                type: String,
                required: true
            },

            performedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, 
    {
    timestamps: true
    }
);

module.exports=mongoose.model("Lead",leadSchema);
