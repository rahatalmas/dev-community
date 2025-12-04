import { NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";
//app middleware for testing and practice
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log("Request host: ",req.hostname)
        console.log("Ip: ",req.ip)
        console.log("route: ",req.baseUrl)
        next()
    }
}