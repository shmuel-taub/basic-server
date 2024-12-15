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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autentication_1 = __importDefault(require("../middlewares/autentication"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
const router = express_1.default.Router();
// interface Iuser {
//     // id: number;
//     name: string;
//     password?: string;
// }
// let id = 0
// const users: Iuser[] = []
const saltRounds = 10;
router.get("/log", (req, res) => {
    // console.log(users)
    res.send("");
});
router.post("/register", autentication_1.default.hasFields([
    { name: "name", type: "string" },
    { name: "password", type: "string" }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    let { name, password } = req.body;
    if (yield (0, db_1.checkNameExist)({ name, password })) {
        res.status(400).json({ error: "The username already exist" });
        return;
    }
    password = bcrypt_1.default.hashSync(password, saltRounds);
    (0, db_1.appendUser)({ name, password });
    // users.push({/*id: id++ ,*/name, password})
    // console.log(users)
    res.json({ response: `Registered ${name} successfully` });
}));
router.post("/login", autentication_1.default.hasFields([
    { name: "name", type: "string" },
    { name: "password", type: "string" }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    let { name, password } = req.body;
    // const user = 
    // password = bcrypt.hashSync(password, saltRounds)
    // console.log(users[0].password)
    // console.log(password)
    if (yield (0, db_1.checkLogin)({ name, password })) {
        let token = jsonwebtoken_1.default.sign({ name, }, process.env.SECRET);
        res.json({ token, reponse: "Signing was completed successfully" });
        console.log("token", token);
        return;
    }
    res.status(400).json({ error: "Username or password are incorrect" });
}));
exports.default = router;
