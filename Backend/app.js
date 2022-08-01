const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app= express();
app.use(cors({credentials: true, origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(express.json());
app.use("/api",router);

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.pa3mozo.mongodb.net/login?retryWrites=true&w=majority`).then(()=>{
    app.listen(5000);
    console.log("Database connected to the port 5000");
}).catch((err)=>console.log(err));
