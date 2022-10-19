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
const User_1 = require("../schemas/User");
const jwt = require('jsonwebtoken');
const loginResponse = (message, user) => {
    return { message, user };
};
const loginUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    let message = "success";
    // Validacion de la existencia del usuario
    const user = yield User_1.User.findOne({ email: request.email });
    if (!user)
        return loginResponse("Usuario no encontrado.");
    // Validacion de la contrasena
    const passwordIsCorrect = yield user.validatePassword(request.password);
    if (!passwordIsCorrect)
        return loginResponse("Contraseña inválida.");
    const userData = {
        email: user.email,
        role: user.role,
    };
    return loginResponse(message, userData);
});
const generateToken = (user) => {
    const token = jwt.sign({
        email: user.email,
        role: user.role,
    }, process.env.TOKEN);
    return token;
};
module.exports = {
    loginUser,
    generateToken,
};
