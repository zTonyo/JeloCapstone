const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    if (!req.cookies) { 
        return res.status(401).json({ message: "No cookies found" });
    }
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Attach user info to request
        // console.log(`token verified: ${req.user}`);
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
