const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const decodedToken = await jwt.verify(token, "Sweet home alabama");
            const user = await User.findById(decodedToken.id);
            
            if (user) {
                res.json({ status: true, user: user.email });
            } else {
                res.json({ status: false });
            }
        } else {
            res.json({ status: false });
        }
    } catch (err) {
        res.json({ status: false });
    }
};
