import bcrypt from "bcrypt";
import { Response } from "express";
import Request from "../types/Request";
import { IUser } from "../model/User";
import { dataArray } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as userApiService from "../service/userApiService";
import { IResponse } from "../model/vaccineCenter";

const userApiController = {
    /**
     * Request a mobile & password from User and login or register the user and return jwt token.
     * @param req
     * @param res
     * @returns {*}
     */
    loginRegister: async function loginRegister(req: Request, res: Response) {
        let result:IResponse;
        try {
            let user: IUser = await userApiService.getUser(req.body.mobile);
            if (user) {
                const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
                if (isMatch) {
                    const token: string = userApiService.createToken(user._id);
                    result = {
                        meta: {
                            "response_code": responsecode.Created,
                            "message": "Logged in Successfully",
                            "status": "success",
                            "errors": dataArray
                        },
                        data: {token}
                    }
                } else {
                    result = {
                        meta: {
                            "response_code": responsecode.Unauthorized,
                            "message": "Invalid Credential",
                            "status": "success",
                            "errors": dataArray
                        },
                        data: dataArray
                    }
                }
            } else {
                const token: string = await userApiService.createUser(req.body.mobile,req.body.password);
                result = {
                    meta: {
                        "response_code": responsecode.Created,
                        "message": "Registered Successfully",
                        "status": "success",
                        "errors": dataArray
                    },
                    data: {token}
                }
            }
        } catch (err) {
            console.error(err.message);
            result = {
                meta: {
                    "response_code": responsecode.Internal_Server_Error,
                    "message": "Server error",
                    "status": "Failed",
                    "errors": dataArray
                },
                data: dataArray
            }
        }
        return res.status(result.meta['response_code']).json(result);
    },

    /**
     * Request a jwt token from User and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    userData: async function userData(req: Request, res: Response) {
        let result:IResponse;
        try {
            let user: IUser = await userApiService.getUserById(req.userId);
            result = {
                meta: {
                    "response_code": responsecode.Success,
                    "message": "User Data",
                    "status": "success",
                    "errors": dataArray
                },
                data: user
            }
        } catch (err) {
            console.error(err.message);
            result = {
                meta: {
                    "response_code": responsecode.Internal_Server_Error,
                    "message": "Server error",
                    "status": "Failed",
                    "errors": dataArray
                },
                data: dataArray
            }
        }
        return res.status(result.meta['response_code']).json(result);
    }
};

export default userApiController;
