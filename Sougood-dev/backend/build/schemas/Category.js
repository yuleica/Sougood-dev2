"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CategorySchema = new Schema({
    name: { type: String, unique: true },
    subcategories: [{
            type: Schema.Types.ObjectId,
            ref: "Subcategory",
            unique: true,
            default: []
        }],
});
exports.Category = model("Category", CategorySchema);
