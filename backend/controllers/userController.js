const { connect } = require("../db/dbConnect");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { createToken } = require("../config/jwtToken");



//@desc            register The User
//@route           POST /api/user/register
//@access          Public
connect();
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, number } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    if (!name || !email || !password || !number) {
        res.status(200).json({ message: "Please provide all fields", success: false });
    }
    const userIsExist = await User.findOne({ email });
    if (userIsExist) {
        res.status(200).json({ message: "Email Already exist!!", success: false });
    }
    const userdata = await User({ name, email, password: hashedPassword, number });
    const user = await userdata.save();

    res.status(201).json({ message: "User Registered Successfully", data: { _id: user._id, name: user.name, email: user.email, number: user.number, token: createToken(user._id, user.email) }, success: true });
})

//@desc            register The User
//@route           POST /api/user/login
//@access          Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(200).json({ message: "Please provide all fields", success: false });
    }
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
        return res.status(200).json({ message: "User Not Found!! ,Invalid Email", success: false })
    };
    const comparePass = await bcrypt.compare(password, userDetail.password);

    if (userDetail && comparePass) {
        res.status(201).json({
            message: "User Login Successfully",
            data: {
                _id: userDetail._id,
                name: userDetail.name,
                email: userDetail.email,
                number: userDetail.number,
                token: createToken(userDetail._id)
            },
            success: true
        });
    } else {
        res.status(200).json({ message: "Password Not Match!!", success: false });
    }
});


module.exports = { registerUser, loginUser }