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
const Product_1 = require("../schemas/Product");
const User_1 = require("../schemas/User");
const createProduct = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerUser = yield User_1.User.findOne({ email: request.seller });
        if (!sellerUser)
            throw new Error("Proveedor no encontrado");
        request.seller = sellerUser._id;
        const product = new Product_1.Product(request);
        yield product.save();
        return product;
    }
    catch (error) {
        throw error;
    }
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find().populate("category", "name").populate("subcategory", "name");
        return products;
    }
    catch (error) {
        throw error;
    }
});
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.Product.findById(id);
        if (!product)
            throw new Error("Producto no encontrado.");
        return product;
    }
    catch (error) {
        throw error;
    }
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.Product.deleteOne({ _id: id });
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
};
