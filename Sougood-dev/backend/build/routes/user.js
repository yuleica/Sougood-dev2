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
const auth_1 = require("../middlewares/auth");
const UserController = require('../controllers/userController');
const userRouter = (0, express_1.Router)();
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.role)
            req.body.role = 'user';
        const user = yield UserController.createUser(req.body);
        return res.status(201).send(user);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ message: "hola" });
}));
userRouter.delete("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Removing all users");
        yield UserController.removeUsers();
        return res.status(201).send({ message: "All users have been removed.." });
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
module.exports = userRouter;
