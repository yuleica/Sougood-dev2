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
const ProductController = require('../controllers/productController');
const productRouter = (0, express_1.Router)();
productRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductController.createProduct(req.body);
        return res.status(200).json({ message: "success", product });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}));
productRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductController.getProducts();
        return res.status(200).json({ message: "success", products });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}));
productRouter.get("/:id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield ProductController.getProduct(id);
        return res.status(200).json({ message: "success", product });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}));
productRouter.delete("/:id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield ProductController.deleteProduct(id);
        return res.status(200).json({ message: "success" });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}));
module.exports = productRouter;
