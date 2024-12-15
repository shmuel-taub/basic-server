import { Express, Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from "jsonwebtoken"

export interface CustomRequest extends Request {
    tokenVal: string | JwtPayload;
   }



function auth(req: Request, res: Response, next: NextFunction) {
    let {token} = req.body
    try {
        let decoded = jwt.verify(token, process.env.SECRET!) as {name: string};
        // if (decoded.name !== req.body.name)
        //     throw new Error('This is not your token');
        req.body.tokenVal = decoded
        next()
        return
    }catch(e) {
        res.status(400).json({error: "Invalid token"})
    }
    
}

interface Field {
    name: string;
    type: string;
}

function hasFields(fields: Field[]) {
    function middleWare(req: Request, res: Response, next: NextFunction) {
        for (let field of fields){
            if (!req.body[field.name]) {
                res.status(400).send(`Missing required field "${field}"`)
                return
            }
            if (typeof req.body[field.name] !== field.type){
                res.status(400).send(`expected type ${field.type} for ${field.name}
                got ${typeof req.body[field.name]} instead`)
                return
            }
        }
        next()
    }
    return middleWare
}

export default {hasFields, auth}