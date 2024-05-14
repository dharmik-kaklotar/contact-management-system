const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authUserToken = asyncHandler(async(req, res, next) => {

    let authToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization;
            authToken = token.split(" ")[1];

            const decodedInfo = jwt.verify(authToken, process.env.JWT_SECRET);

            req.user = await User.findById({ _id: decodedInfo.id }).select("-password");
            next();

        } catch (error) {
            res.status(400).json({ message: "Unauthorize User , user Token Expired!!", success: false });
        }
    }

    if (!authToken) {
        res.status(401).json({ message: "No Token Provided !!", success: false });
    }

});

module.exports = { authUserToken };