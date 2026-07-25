const express = require("express");
const cors= require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const leadRoutes = require("./routes/leadRoutes");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");


//LOAD ENV VARIABLES FROM .env
dotenv.config();


//CONNECT MONGODB
connectDB();

//CEATING THE APPLICATION
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



//TEST ROUTE
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message : "LeadDesk Mini Api is running",
    });
});

//PORT
const PORT = process.env.PORT || 5000;

//START SERVER
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
