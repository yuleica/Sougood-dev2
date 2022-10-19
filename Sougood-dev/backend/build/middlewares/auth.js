"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const header = req.header('Authorization');
    let token;
    if (header)
        token = header.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Acceso denegado." });
    try {
        const tokenData = jwt.verify(token, process.env.TOKEN);
        req.user = tokenData;
        next();
    }
    catch (err) {
        res.status(400).json({ error: "Acceso denegado, el token no es válido." });
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    var _a;
    let role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (role != "admin")
        res.status(401).json({ error: "Acceso denegado, no tienes las facultades necesarias." });
    next();
};
exports.isAdmin = isAdmin;
