"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    size: { type: String, required: true },
    tags: [{ type: String, required: false }]
});
exports.Product = model("Product", ProductSchema);
