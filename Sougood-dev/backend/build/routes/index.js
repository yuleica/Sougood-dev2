"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = (0, express_1.default)();
const userRoutes = require("./user");
const loginRoutes = require("./login");
const categoryRoutes = require("./category");
const subcategoryRoutes = require("./subcategory");
const productRoutes = require("./product");
routes.use("/user", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/category", categoryRoutes);
routes.use("/subcategory", subcategoryRoutes);
routes.use("/product", productRoutes);
exports.default = routes;
