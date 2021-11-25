import { Response } from "express";
import Request from "../types/Request";
import { IResult } from "../model/User";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as vaccinatedApiService from "../service/vaccinatedApiService";
import { IResponse } from "model/vaccineCenter";

const vaccinatedApiController = {
    /**
     * Request a secret code and dose from user and done vaccinated and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    vaccinated: async function vaccinated(req: Request, res: Response) {
        let result: IResponse;
        try {
            let result: IResult = await vaccinatedApiService.vaccinatedApiService(req);
            let meta: object = { message: result.message, status: result.status };
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

export default vaccinatedApiController;