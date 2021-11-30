import Request from "../types/Request";
import { IResponse } from "../model/vaccineCenter";
import { Response, NextFunction } from "express";
import { dataArray } from "../model/User";
import responsecode from "../response_builder/responsecode";
const { validationResult } = require('express-validator');

export default function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    let result: IResponse;
    if (!errors.isEmpty()) {
        result = {
            meta: {
                "response_code": responsecode.Bad_Request,
                "message": "Bad Request",
                "status": "Failed",
                "errors": errors.array()
            },
            data: dataArray
        } 
        return res.status(result.meta['response_code']).json(result);
    } else {
        next();
    }
}