import { Express, Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from "jsonwebtoken"

export interface CustomRequest extends Request {
    tokenVal: string | JwtPayload;
   }



function auth(req: Request, res: Response, next: NextFunction) {
    let {name, token} = req.body
    try {
        let decoded = jwt.verify(token, process.env.SECRET!) as {name: string};
        if (decoded.name !== req.body.name)
            throw new Error('This is not your token');
        (req as CustomRequest).tokenVal = decoded
        next()
        return
    }catch(e) {
        res.status(400).json({error: "Invalid token"})
    }
    
}



function hasFields(fields: string[]) {
    function middleWare(req: Request, res: Response, next: NextFunction) {
        for (let field of fields){
            if (!req.body[field]) {
                res.send(`Missing required field "${field}"`)
            }
        }
        next()
    }
    return middleWare
}

export default {hasFields, auth}