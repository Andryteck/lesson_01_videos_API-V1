import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";

type ErrorMessageType = {
    message: string;
    field: string;
}

export const inputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    } else {
        const errorsOccurred: ErrorMessageType[] = errors.array().map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })

        res.status(400).json(
            {
                "errorsMessages": errorsOccurred.slice(0, -1),
                "resultCode": 1
            }
        )
    }
}