import express from "express"
import { Express, Request, Response, NextFunction } from 'express';
import auth from "../middlewares/autentication"


const router = express.Router()
const secrets: any = {}


router.post("/data", auth.hasFields(["name", "token", "data"]), auth.auth, (req, res) => {
    const {name, data} = req.body
    secrets[name] = data
    res.send("Succesfully save your data")
})

router.get("/data", auth.hasFields(["name", "token"]), auth.auth, (req, res) => {
    const {name} = req.body
    res.json(secrets[name])
})

export default router