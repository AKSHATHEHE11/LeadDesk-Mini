const Lead = require("../models/Lead");

const createLead = async(req, res)=>{
    try{
        const{name,email,company,phone,status}=req.body;
        const lead = await Lead.create({
            name,
            email,
            company,
            phone,
            status,

            createdBy: req.user._id,
            assignedTo: req.user._id,

            activity: [
                {
                    action: "Lead Created",
                    performedBy: req.user._id
                }
            ]
        });

        res.status(201).json({
            success:true,
            message:"Lead created successfully",
            data:lead
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message: error.message
        })

    }
};

const getAllLeads = async (req, res) => {
    try {

        console.log(req.user);
        const search = req.query.search;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { company: { $regex: search, $options: "i" } }
                ]
            };
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        let leads;

        if (req.user.role === "admin") {
            leads = await Lead.find(query)
                              .skip(skip)
                              .limit(limit);
        } else {
            leads = await Lead.find({
                                assignedTo: req.user._id,
                                ...query
                            })
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

        console.log(leads);

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

const updateLead =async(req,res)=>{
    try{
        let lead;

        if (req.user.role === "admin") {
            lead = await Lead.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        } else {
            lead = await Lead.findOneAndUpdate(
                {
                    _id: req.params.id,
                    assignedTo: req.user._id
                },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        if(!lead){
            
            return res.status(404).json({
                success:false,
                message: "Lead not found"
            });
        }

        lead.activity.push({
            action: "Lead Updated",
            performedBy: req.user._id
        });

        await lead.save();

        res.status(200).json({
            success:true,
            message:"Lead Updated successfylly",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};

const deleteLead = async(req,res)=>{
    try{
        let lead;

        if (req.user.role === "admin") {
            lead = await Lead.findByIdAndDelete(req.params.id);
        } else {
            lead = await Lead.findOneAndDelete({
                _id: req.params.id,
                assignedTo: req.user._id
            });
        }

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

        const { assignedTo } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        lead.assignedTo = assignedTo;

        lead.activity.push({
            action: "Lead Assigned",
            performedBy: req.user._id
        });

        await lead.save();

        res.status(200).json({
            success: true,
            message: "Lead assigned successfully",
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
    assignLead
};