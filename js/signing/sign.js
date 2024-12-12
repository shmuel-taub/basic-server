"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autentication_1 = __importDefault(require("../middlewares/autentication"));
const router = express_1.default.Router();
// let id = 0
const users = [];
router.post("/register", autentication_1.default.hasFields(["name", "password"]), (req, res) => {
    console.log(req.body);
    let { name, password } = req.body;
    if (users.filter(user => user.name === name).length > 0) {
        res.status(400).json({ error: "The username already exist" });
        return;
    }
    users.push({ /*id: id++ ,*/ name, password });
    res.json({ response: `Registered ${name} successfully` });
});
router.post("/login", autentication_1.default.hasFields(["name", "password"]), (req, res) => {
    console.log(req.body);
    let { name, password } = req.body;
    if (users.filter(user => user.name === name &&
        user.password == password).length > 0) {
        let token = jsonwebtoken_1.default.sign({ name, }, process.env.SECRET);
        res.json({ token, reponse: "Signing was comlete successfully" });
        console.log("token", token);
        return;
    }
    res.status(400).json({ error: "Username or password are incorrect" });
});
exports.default = router;
