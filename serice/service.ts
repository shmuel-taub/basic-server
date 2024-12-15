import express from "express"
import { Express, Request, Response, NextFunction } from 'express';
import auth from "../middlewares/autentication";
import { getData, setData} from "../db/db"


const router = express.Router()
const secrets: any = {}


router.post("/data", auth.hasFields([{name: "token", type: "string"},
    {name: "data", type: "string"}]), auth.auth, async (req, res) => {
    const {data, tokenVal: {name}} = req.body
    setData({name, data})
    // secrets[name] = data
    res.send("Succesfully save your data")
})

router.get("/data", auth.hasFields([{name: "token", type: "string"}]), auth.auth, async (req, res) => {
    const {name} = req.body.tokenVal
    // res.json(secrets[name])
    const data = await getData(name)
    if (data.name !== "") {
        res.json(data.data)
        return
    }
    res.status(400).send(data)
})

export default router