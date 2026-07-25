const Lead = require("../models/Lead");
const User = require("../models/User");

const createLead = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can create leads"
            });
        }

        const { name, email, company, phone, status } = req.body;

        const lead = await Lead.create({
            name,
            email,
            company,
            phone,
            status,

            createdBy: req.user._id,
            assignedTo: null,

            activity: [
                {
                    action: "Lead created",
                    performedBy: req.user._id
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getAllLeads = async (req, res) => {
    try {

        const search = req.query.search;
        const status = req.query.status;
        const assignedTo = req.query.assignedTo;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }

        if (status) {
            query.status = status;
        }

        if (assignedTo) {
            query.assignedTo = assignedTo;
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        let leads;

        if (req.user.role === "admin") {
            leads = await Lead.find(query)
                .populate("assignedTo", "name email")
                .skip(skip)
                .limit(limit);
        } else {
            leads = await Lead.find({
                    assignedTo: req.user._id,
                    ...query
                })
                .populate("assignedTo", "name email")
                .skip(skip)
                .limit(limit);
        }

        const totalLeads =
            req.user.role === "admin"
                ? await Lead.countDocuments(query)
                : await Lead.countDocuments({
                      assignedTo: req.user._id,
                      ...query
                  });

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalLeads / limit),
            totalLeads,
            data: leads
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const getLeadById = async(req,res)=>{
    try{
        let lead;

        if (req.user.role === "admin") {
            lead = await Lead.findById(req.params.id);
        } else {
            lead = await Lead.findOne({
                _id: req.params.id,
                assignedTo: req.user._id
            });
        }

        if(!lead){
            return res.status(404).json({
                success:false,
                message:"Lead not found"
            });
        }

        res.status(200).json({
            success:true,
            data: lead
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};

const updateLead = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can update leads"
            });
        }

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        const { name, email, company, phone } = req.body;

        if (name !== undefined) lead.name = name;
        if (email !== undefined) lead.email = email;
        if (company !== undefined) lead.company = company;
        if (phone !== undefined) lead.phone = phone;

        await lead.save();

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteLead = async(req,res)=>{
    try{

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can delete leads"
            });
        }

        const lead = await Lead.findByIdAndDelete(req.params.id);

        if(!lead){
            return res.status(404).json({
                success:false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Lead deleted Successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};

const assignLead = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can assign leads"
            });
        }

        const { assignedTo } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        let member = null;

        if (assignedTo) {
            member = await User.findById(assignedTo);

            if (!member) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found"
                });
            }
        }

        // Assign or unassign
        lead.assignedTo = assignedTo || null;

        // Record activity
        lead.activity.push({
            action: assignedTo
                ? `Lead assigned to ${member.name}`
                : "Lead unassigned",
            performedBy: req.user._id
        });

        await lead.save();

        res.status(200).json({
            success: true,
            message: assignedTo
                ? "Lead assigned successfully"
                : "Lead unassigned successfully",
            data: lead
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const addNote = async (req, res) => {
    try {

        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Note text is required"
            });
        }

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        lead.notes.push({
            text,
            createdBy: req.user._id
        });

        lead.activity.push({
            action: "Note added",
            performedBy: req.user._id
        });

        await lead.save();

        res.status(200).json({
            success: true,
            message: "Note added successfully",
            data: lead
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        let lead;

        // Admin can update any lead
        if (req.user.role === "admin") {
            lead = await Lead.findById(req.params.id);
        } 
        // Member can update only their assigned leads
        else {
            lead = await Lead.findOne({
                _id: req.params.id,
                assignedTo: req.user._id
            });
        }

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        // Only update if status has actually changed
        if (lead.status !== status) {
            const previousStatus = lead.status;

            lead.status = status;

            lead.activity.push({
                action: `Status changed from ${previousStatus} to ${status}`,
                performedBy: req.user._id
            });

            await lead.save();
        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports={
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    addNote,
    updateStatus
};