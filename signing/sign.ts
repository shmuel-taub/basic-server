import express from "express"
import { Express, Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import auth from "../middlewares/autentication"


const router = express.Router()

interface Iuser {
    // id: number;
    name: string;
    password?: string;
}

// let id = 0
const users: Iuser[] = []

router.post("/register", auth.hasFields(["name", "password"]), (req, res) => {
    console.log(req.body)
    let {name, password} = req.body
    if (users.filter( user => user.name === name).length > 0) {
        res.status(400).json({error: "The username already exist"})
        return
    }
    users.push({/*id: id++ ,*/name, password})
    res.json({response: `Registered ${name} successfully`})
})

router.post("/login", auth.hasFields(["name", "password"]), (req, res) => {
    console.log(req.body)
    let {name, password} = req.body
    if (users.filter( user => user.name === name &&
         user.password == password).length > 0)
        {
            
            let token = jwt.sign({name,}, process.env.SECRET!)
            res.json({token,reponse: "Signing was comlete successfully"})
            console.log("token", token)
            return
        }
    res.status(400).json({error :"Username or password are incorrect"})
})

export default router