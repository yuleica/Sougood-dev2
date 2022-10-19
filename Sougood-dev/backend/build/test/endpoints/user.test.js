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
const User_1 = require("../../schemas/User");
const mongoose_1 = __importDefault(require("mongoose"));
// Usuario generico de prueba
const userData = {
    username: "Juan",
    email: "juan@gmail.com",
    role: "admin",
    password: "12345678"
};
const incorrectRoleUserData = {
    username: "Juan",
    email: "juan@gmail.com",
    role: "a",
    password: "12345678"
};
const incorrectEmailUserData = {
    username: "Juan",
    email: "juan@gmail.com",
    role: "a",
    password: "12345678"
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.db.dropDatabase();
    yield mongoose_1.default.disconnect();
    yield (0, index_1.stopDb)();
}));
describe("User endpoints", () => {
    it("Testing correct user post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/user").send(userData);
        expect(res.statusCode).toEqual(201);
    }));
    it("Testing create user already created", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/user").send(userData);
        expect(res.statusCode).toEqual(400);
    }));
    it("Testing incorrect role in user post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/user").send(incorrectRoleUserData);
        expect(res.statusCode).toEqual(400);
    }));
    it("Testing incorrect email in user post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/user").send(incorrectEmailUserData);
        expect(res.statusCode).toEqual(400);
    }));
});
