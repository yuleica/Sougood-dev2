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
const Category_1 = require("../schemas/Category");
const createCategory = (request) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Crea una categoría a partir de los datos obtenidos del body en formato json.
    El request sigue la estructura de ICategory.
    */
    try {
        const category = new Category_1.Category({ name: request.name });
        yield category.save();
        return category;
    }
    catch (err) {
        if (err.code === 11000)
            throw new Error("La categoría ya existe.");
        if (err == mongoose_1.default.Error.ValidationError)
            throw new Error("Datos de categoría inválidos.");
        throw err;
    }
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.find().populate("subcategories");
        return categories;
    }
    catch (err) {
        throw err;
    }
});
const removeCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category_1.Category.deleteMany({});
        return "sucess";
    }
    catch (err) {
        throw err;
    }
});
const getCategoryByName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findOne({ name: categoryName });
        if (category)
            return category;
    }
    catch (err) {
        throw err;
    }
});
module.exports = {
    createCategory,
    getCategories,
    removeCategories,
    getCategoryByName
};
