const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");


const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/contacts", contactRoutes);

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});