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
const SubcategoryController = require('../controllers/subcategoryController');
const subcategoryRouter = (0, express_1.Router)();
subcategoryRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield SubcategoryController.createSubcategory(req.body);
        return res.status(201).send(subcategory);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
subcategoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategories = yield SubcategoryController.getSubcategories();
        return res.status(200).send({ subcategories });
    }
    catch (err) {
        return res.status(400).send({ error: err.message });
    }
}));
subcategoryRouter.get("/:categoryName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategories = yield SubcategoryController.getSubcategoriesFromCategory(req.params.categoryName);
        return res.status(200).send({ subcategories });
    }
    catch (err) {
        return res.status(400).send({ error: err.message });
    }
}));
subcategoryRouter.delete("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield SubcategoryController.removeSubcategories();
        return res.status(200).send({ message });
    }
    catch (err) {
        return res.status(400).send({ error: err.message });
    }
}));
module.exports = subcategoryRouter;
