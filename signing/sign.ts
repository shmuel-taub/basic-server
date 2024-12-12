import express from "express"
import { Express, Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import auth from "../middlewares/autentication"
import bcrypt from "bcrypt"



const router = express.Router()

interface Iuser {
    // id: number;
    name: string;
    password?: string;
}

// let id = 0
const users: Iuser[] = []
const saltRounds = 10

router.get("/log", (req, res) => {
    console.log(users)
    res.send("")
})

router.post("/register", auth.hasFields(["name", "password"]), (req, res) => {
    // console.log(req.body)
    let {name, password} = req.body
    
    if (users.filter( user => user.name === name).length > 0) {
        res.status(400).json({error: "The username already exist"})
        return
    }
    password = bcrypt.hashSync(password, saltRounds)
    users.push({/*id: id++ ,*/name, password})
    console.log(users)
    res.json({response: `Registered ${name} successfully`})
})

router.post("/login", auth.hasFields(["name", "password"]), (req, res) => {
    // console.log(req.body)
    let {name, password} = req.body
    // password = bcrypt.hashSync(password, saltRounds)
    // console.log(users[0].password)
    // console.log(password)
    if (users.filter( user => user.name === name &&
         bcrypt.compare(user.password!, password)).length > 0)
        {
            
            let token = jwt.sign({name,}, process.env.SECRET!)
            res.json({token,reponse: "Signing was comlete successfully"})
            console.log("token", token)
            return
        }
    res.status(400).json({error :"Username or password are incorrect"})
})

export default router