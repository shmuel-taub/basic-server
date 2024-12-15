"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.appendUser = appendUser;
exports.checkNameExist = checkNameExist;
exports.checkLogin = checkLogin;
exports.getUser = getUser;
exports.getData = getData;
exports.setData = setData;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("hi")
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/test');
    });
}
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    data: mongoose_1.Schema.Types.Mixed
});
const UserModel = mongoose_1.default.model('user', UserSchema);
function appendUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield UserModel.create(user);
        return res;
    });
}
function checkNameExist(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name }) {
        return (yield UserModel.find({ name, })).length > 0;
    });
}
function checkLogin(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, password }) {
        const user = yield getUser(name);
        if (!user)
            return false;
        // console.log("get user", user)
        return bcrypt_1.default.compare(password, user.password);
        // return (await UserModel.find({name, password})).length === 1;
    });
}
function getUser(name) {
    return UserModel.findOne({ name });
}
function getData(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ name });
        if (user)
            return { name: user.name, data: user.data };
        return { name: "", data: "Error in geting data" };
    });
}
function setData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ data, name }) {
        yield UserModel.findOneAndUpdate({ name }, { data });
    });
}