import express from "express"
import { Express, Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import auth from "../middlewares/autentication"
import bcrypt from "bcrypt"
import {UserDTOSign, appendUser, checkNameExist, checkLogin} from "../db/db"



const router = express.Router()

// interface Iuser {
//     // id: number;
//     name: string;
//     password?: string;
// }

// let id = 0
// const users: Iuser[] = []
const saltRounds = 10

router.get("/log", (req, res) => {
    // console.log(users)
    res.send("")
})

router.post("/register", auth.hasFields([
    {name: "name", type: "string"}, 
    {name:"password", type: "string"}
]), async (req, res) => {
    // console.log(req.body)
    let {name, password} = req.body as UserDTOSign
    
    if (await checkNameExist({name, password})) {
        res.status(400).json({error: "The username already exist"})
        return
    }
    password = bcrypt.hashSync(password, saltRounds)
    appendUser({name, password})
    // users.push({/*id: id++ ,*/name, password})
    // console.log(users)
    res.json({response: `Registered ${name} successfully`})
})

router.post("/login", auth.hasFields([
    {name: "name", type: "string"}, 
    {name:"password", type: "string"}
    ]), async (req, res) => {
    // console.log(req.body)
    let {name, password} = req.body
    // const user = 
    // password = bcrypt.hashSync(password, saltRounds)
    // console.log(users[0].password)
    // console.log(password)
    if (await checkLogin({name, password}))
        {
            let token = jwt.sign({name,}, process.env.SECRET!)
            res.json({token,reponse: "Signing was completed successfully"})
            console.log("token", token)
            return
        }
    res.status(400).json({error :"Username or password are incorrect"})
})

export default router