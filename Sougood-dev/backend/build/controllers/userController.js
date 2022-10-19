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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../schemas/User");
const createUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Crea un usuario a partir de los datos obtenidos del body en formato json.
    El request sigue la estructura de UserRequest.post.
    */
    try {
        console.log(request);
        const user = new User_1.User(request);
        console.log(user);
        yield user.save();
        return user;
    }
    catch (err) {
        if (err.code === 11000)
            throw new Error("El usuario ya existe.");
        if (err == mongoose_1.default.Error.ValidationError)
            throw new Error("Datos de usuario inválidos.");
        throw err;
    }
});
const removeUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.deleteMany({});
        return "sucess";
    }
    catch (err) {
        throw err;
    }
});
module.exports = {
    createUser,
    removeUsers,
};
