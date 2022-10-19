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
exports.app = exports.stopDb = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const cors = require('cors');
const { MongoMemoryServer } = require("mongodb-memory-server"); // To create a mock DB with mongo for testing
let mongo = undefined; // Needs to be stopped when creating MongoMemoryServer for testing
const stopDb = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo)
        yield mongo.stop();
});
exports.stopDb = stopDb;
dotenv_1.default.config(); // .env Configuration
exports.app = (0, express_1.default)();
exports.app.use(cors());
const port = process.env.PORT;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    let DB_URL = process.env.MONGO_URL;
    if (process.env.NODE_ENV === "test") {
        mongo = yield MongoMemoryServer.create();
        DB_URL = yield mongo.getUri();
    }
    yield mongoose_1.default.connect(`${DB_URL}`);
});
exports.app.get('/', (req, res) => {
    res.send("Express app con db! :D");
});
exports.app.use(express_1.default.json());
exports.app.use("/api", index_1.default);
run()
    .then(result => {
    if (process.env.NODE_ENV !== "test")
        exports.app.listen(port, () => { console.log(`⚡️[server]: Server is running at https://localhost:${port}`); });
})
    .catch(err => console.log(err));
