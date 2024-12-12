"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autentication_1 = __importDefault(require("../middlewares/autentication"));
const router = express_1.default.Router();
const secrets = {};
router.post("/data", autentication_1.default.hasFields(["name", "token", "data"]), autentication_1.default.auth, (req, res) => {
    const { name, data } = req.body;
    secrets[name] = data;
    res.send("Succesfully save your data");
});
router.get("/data", autentication_1.default.hasFields(["name", "token"]), autentication_1.default.auth, (req, res) => {
    const { name } = req.body;
    res.json(secrets[name]);
});
exports.default = router;
