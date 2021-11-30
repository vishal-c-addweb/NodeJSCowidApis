import { Response, NextFunction } from "express";
import Request from "../types/Request";
import { dataArray } from "../model/User";
import responsecode from "../response_builder/responsecode";
import { IResponse } from "../model/vaccineCenter";
import authenticate from "./authenticate";

export default function (req: Request, res: Response, next: NextFunction) {
  let result: IResponse;
  try {
    console.log(req.isAdmin);
    authenticate(req, res, () => {
      if (req.isAdmin) {
        next();
      } else {
        result = {
          meta: {
              "response_code": responsecode.Forbidden,
              "message": "you are not admin",
              "status": "Failed",
              "errors": dataArray
          },
          data: dataArray
        } 
        return res.status(result.meta['response_code']).json(result);
      }
    })
  } catch (err) {
    result = {
      meta: {
          "response_code": responsecode.Unauthorized,
          "message": "Token is not valid",
          "status": "Failed",
          "errors": dataArray
      },
      data: dataArray
    }
    return res.status(result.meta['response_code']).json(result); 
  }
}