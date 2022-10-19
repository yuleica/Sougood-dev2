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
const Subcategory_1 = require("../schemas/Subcategory");
const CategoryController = require('./categoryController');
const createSubcategory = (request) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Crea una subcategoría a partir de los datos obtenidos del body en formato json.
    El request sigue la estructura de ISubcategory.
    */
    try {
        const category = yield CategoryController.getCategoryByName(request.category);
        const subcategory = new Subcategory_1.Subcategory({ name: request.name, category: category._id });
        yield subcategory.save();
        // Se anade la subcategoría a la categoría
        category.subcategories.push(subcategory._id);
        yield category.save();
        return subcategory;
    }
    catch (err) {
        if (err.code === 11000)
            throw new Error("La subcategoría ya existe.");
        if (err == mongoose_1.default.Error.ValidationError)
            throw new Error("Datos de subcategoría inválidos.");
        throw err;
    }
});
const removeSubcategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Subcategory_1.Subcategory.deleteMany({});
        return "sucess";
    }
    catch (err) {
        throw err;
    }
});
const getSubcategoriesFromCategory = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findOne({ name: categoryName });
        const subcategories = category ? yield Subcategory_1.Subcategory.find({ category: category._id }) : [];
        return subcategories;
    }
    catch (err) {
        throw err;
    }
});
module.exports = {
    createSubcategory,
    removeSubcategories,
    getSubcategoriesFromCategory
};
