import config from "config";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Payload from "../types/Payload";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";

export default function (req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token: string = req.headers.authorization.split(' ')[1];
  // Check if no token
  if (!token) {
    let meta: object = { message: "No token, authorization denied", status: "Failed" };
    responseFunction(meta, dataArray, responsecode.Unauthorized, res);
  }
  // Verify token
  try {
    const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
    req.userId = payload.user_id;
    next();
  } catch (err) {
    let meta: object = { message: "Token is not valid", status: "Failed" };
    responseFunction(meta, dataArray, responsecode.Unauthorized, res);
  }
}