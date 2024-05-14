const jwt = require("jsonwebtoken");

const createToken = (id, mail) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
module.exports = { createToken };