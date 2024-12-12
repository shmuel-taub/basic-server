import express from "express"
import { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config'

import signRoute from "./signing/sign"
import serviceRoute from "./serice/service"
// import jwt from "jsonwebtoken"

const app = express()


app.listen(process.env.PORT || 3000)

app.use(express.json())
app.use("/signing", signRoute)
app.use("/service", serviceRoute)





