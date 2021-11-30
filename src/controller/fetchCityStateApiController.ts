import { Response } from "express";
import Request from "../types/Request";
import { dataArray } from "../model/User";
import responsecode from "../response_builder/responsecode";
import { IResponse } from "../model/vaccineCenter";
const { getStates, getCities } = require('cities-states-countries');

const fetchCityStateApiController = {
    /**
     * Request a jwt token from User and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    fetchStateByCountry: async function fetchStateByCountry(req: Request, res: Response) {
        let result: IResponse;
        try {
            let countryName: string = req.query.countryName.toString();
            let states: object[] = getStates(countryName);
            if (states.length !== 0) {
                result = {
                    meta: {
                        "response_code": responsecode.Success,
                        "message": "Fetched States Successfully",
                        "status": "Success",
                        "errors": dataArray
                    },
                    data: states
                }
            } else {
                result = {
                    meta: {
                        "response_code": responsecode.Not_Found,
                        "message": "Country Code not Valid",
                        "status": "Failed",
                        "errors": dataArray
                    },
                    data: dataArray
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

    fetchCityByStateAndCountry: async function fetchCityByStateAndCountry(req: Request, res: Response) {
        let result: IResponse;
        try {
            let stateName: string = req.query.stateName.toString();
                let countryName: string = req.query.countryName.toString();
                let cities: object[] = getCities(countryName, stateName);
                if (cities === undefined || cities.length === 0) {
                    result = {
                        meta: {
                            "response_code": responsecode.Not_Found,
                            "message": "Country & State name not Valid",
                            "status": "Failed",
                            "errors": dataArray
                        },
                        data: dataArray
                    }
                } else {
                    result = {
                        meta: {
                            "response_code": responsecode.Success,
                            "message": "Fetched Cities Successfully",
                            "status": "Success",
                            "errors": dataArray
                        },
                        data: cities
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
    }
};

export default fetchCityStateApiController;
