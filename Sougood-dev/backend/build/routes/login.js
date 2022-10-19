"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController = require('../controllers/loginController');
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, user } = yield LoginController.loginUser(req.body);
    if (user == null || user == undefined)
        return res.status(400).json({ error: message });
    const token = LoginController.generateToken(user);
    return res.status(200).json({ token, role: user.role, message });
}));
module.exports = loginRouter;
