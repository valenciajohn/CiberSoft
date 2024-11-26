const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.accountType)) {
            return res.status(403).json({ message: "Permiso denegado." });
        }
        next();
    };
};

module.exports = verifyRole;