import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === "123"){
        next();
    }else{
        next();
        //res.send(400)
    }
}