import { Response } from "express";
import Request from "../types/Request";
import { IResult } from "../model/User";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as scheduleApiService from "../service/scheduleApiService";
import { IResponse } from "model/vaccineCenter";

const scheduleApiController = {
    /**
     * Request a data from user and schedule member vaccine and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    schedule: async function schedule(req: Request, res: Response) {
        let result:IResponse;
        try {
            let result: IResult = await scheduleApiService.scheduleDoseService(req);
            let meta: object = { message: result.message, status: result.status};
            responseFunction(meta, result.data, result.responsecode, res);
        } catch (err) {
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

export default scheduleApiController;