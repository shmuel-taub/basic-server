"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    let { token } = req.body;
    try {
        let decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        // if (decoded.name !== req.body.name)
        //     throw new Error('This is not your token');
        req.body.tokenVal = decoded;
        next();
        return;
    }
    catch (e) {
        res.status(400).json({ error: "Invalid token" });
    }
}
function hasFields(fields) {
    function middleWare(req, res, next) {
        for (let field of fields) {
            if (!req.body[field.name]) {
                res.status(400).send(`Missing required field "${field}"`);
                return;
            }
            if (typeof req.body[field.name] !== field.type) {
                res.status(400).send(`expected type ${field.type} for ${field.name}
                got ${typeof req.body[field.name]} instead`);
                return;
            }
        }
        next();
    }
    return middleWare;
}
exports.default = { hasFields, auth };
