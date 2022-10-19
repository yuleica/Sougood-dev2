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
const CategoryController = require('../controllers/categoryController');
const categoryRouter = (0, express_1.Router)();
categoryRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield CategoryController.createCategory(req.body);
        return res.status(201).send(category);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
categoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield CategoryController.getCategories();
        return res.status(200).send({ categories });
    }
    catch (err) {
        return res.status(400).send({ error: err.message });
    }
}));
categoryRouter.delete("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield CategoryController.removeCategories();
        return res.status(200).send({ message });
    }
    catch (err) {
        return res.status(400).send({ error: err.message });
    }
}));
module.exports = categoryRouter;
