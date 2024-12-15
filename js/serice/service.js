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
const express_1 = __importDefault(require("express"));
const autentication_1 = __importDefault(require("../middlewares/autentication"));
const db_1 = require("../db/db");
const router = express_1.default.Router();
const secrets = {};
router.post("/data", autentication_1.default.hasFields([{ name: "token", type: "string" },
    { name: "data", type: "string" }]), autentication_1.default.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, tokenVal: { name } } = req.body;
    (0, db_1.setData)({ name, data });
    // secrets[name] = data
    res.send("Succesfully save your data");
}));
router.get("/data", autentication_1.default.hasFields([{ name: "token", type: "string" }]), autentication_1.default.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body.tokenVal;
    // res.json(secrets[name])
    const data = yield (0, db_1.getData)(name);
    if (data.name !== "") {
        res.json(data.data);
        return;
    }
    res.status(400).send(data);
}));
exports.default = router;
