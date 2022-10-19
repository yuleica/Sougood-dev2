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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const Category_1 = require("../../schemas/Category");
const mongoose_1 = __importDefault(require("mongoose"));
// Categoría genérica de prueba
const categoryData = {
    name: "Bazar",
};
const incorrectCategoryData = {};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Category_1.Category.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.db.dropDatabase();
    yield mongoose_1.default.disconnect();
    yield (0, index_1.stopDb)();
}));
describe("Category endpoints", () => {
    it("Testing correct category post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/category").send(categoryData);
        expect(res.statusCode).toEqual(201);
    }));
    it("Testing create category already created", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/category").send(categoryData);
        expect(res.statusCode).toEqual(400);
    }));
    it("Testing incorrect name in category post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/category").send(incorrectCategoryData);
        expect(res.statusCode).toEqual(400);
    }));
});
