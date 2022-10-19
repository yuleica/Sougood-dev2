"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const SubcategorySchema = new Schema({
    name: { type: String, unique: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
});
exports.Subcategory = model("Subcategory", SubcategorySchema);
