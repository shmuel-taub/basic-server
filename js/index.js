"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const sign_1 = __importDefault(require("./signing/sign"));
const service_1 = __importDefault(require("./serice/service"));
// import jwt from "jsonwebtoken"
const app = (0, express_1.default)();
app.listen(process.env.PORT || 3000);
app.use(express_1.default.json());
app.use("/signing", sign_1.default);
app.use("/service", service_1.default);
