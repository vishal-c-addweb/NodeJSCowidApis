import { Response } from "express";
import Request from "../types/Request";
import { dataArray } from "../model/User";
import responsecode from "../response_builder/responsecode";
import * as vaccineCenterApiService from "../service/vaccineCenterApiService";
import { IResponse, IVaccineCenter } from "../model/vaccineCenter";

const vaccineCenterApiController = {

    /**
     * Request a data from user and add new vaccine center.
     * @param req
     * @param res
     * @returns {*}
     */
    addvaccinecenter: async function addvaccinecenter(req: Request, res: Response) {
        let result: IResponse;
        try {
            let center: IVaccineCenter = await vaccineCenterApiService.getCenterByName(req.body.centerName);
            if (center) {
                result = {
                    meta: {
                        "response_code": responsecode.Forbidden,
                        "message": "Center already exist",
                        "status": "Success",
                        "errors": center
                    },
                    data: dataArray
                }
            } else {
                const { centerName, address, cost, state, city, pinCode,name,dose1,dose2,age } = req.body;
                let price: number = req.body.price ? req.body.price : null;
                let center: IVaccineCenter = await vaccineCenterApiService.createVaccineCenter(centerName, address, cost, state, city, pinCode,name,dose1,dose2,age,price);
                result = {
                    meta: {
                        "response_code": responsecode.Created,
                        "message": "Center Created successfully",
                        "status": "Success",
                        "errors": dataArray
                    },
                    data: center
                }
            }
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
    },

    /**
     * Request a data from user and update vaccine center by id.
     * @param req
     * @param res
     * @returns {*}
     */
    updatevaccinecenter: async function updatevaccinecenter(req: Request, res: Response) {
        let result: IResponse;
        try {
            let center: IVaccineCenter = await vaccineCenterApiService.getCenterById(req.body.centerId);
            if (!center) {  
                result = {
                    meta: {
                        "response_code": responsecode.Not_Found,
                        "message": "Center not found",
                        "status": "Failed",
                        "errors": dataArray
                    },
                    data: dataArray
                }  
            } else {
                let centers: object[] = await vaccineCenterApiService.filteringVaccineCenterForUpdate(req);
                if (centers.length === 0) {
                    result = {
                        meta: {
                            "response_code": responsecode.Forbidden,
                            "message": "vaccine already added",
                            "status": "Failed",
                            "errors": dataArray
                        },
                        data: dataArray
                    }  
                } else {
                    result = {
                        meta: {
                            "response_code": responsecode.Created,
                            "message": "vaccine center added successfully",
                            "status": "Success",
                            "errors": centers
                        },
                        data: dataArray
                    }  
                }
            }
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
    },

    /**
     * Request a data from user and get vaccine center by pincode.
     * @param req
     * @param res
     * @returns {*}
     */
    getcenterbypincode: async function getcenterbypincode(req: Request, res: Response) {
        let result: IResponse;
        try {
            let center: IVaccineCenter[] = await vaccineCenterApiService.getVaccineCenterByPincode(req.body.pinCode);
            if (center.length !== 0) {
                let cost: string = req.body.cost ? req.body.cost : null;
                let age: string = req.body.age ? req.body.age : null;
                let vaccineName: string = req.body.vaccineName ? req.body.vaccineName : null;
                result = await vaccineCenterApiService.filterCenters(center,cost,age,vaccineName);
            } else {    
                result = {
                    meta: {
                        "response_code": responsecode.Not_Found,
                        "message": "Center not found",
                        "status": "Failed",
                        "errors": dataArray
                    },
                    data: dataArray
                }   
            }
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
    },

    /**
     * Request a data from user and get vaccine center by city and state
     * @param res
     * @returns {*}
     */
    getcenterbycitystate: async function getcenterbycitystate(req: Request, res: Response) {
        let result: IResponse;
        try {
            let center: IVaccineCenter[] = await vaccineCenterApiService.getVaccineCenterByCityState(req.body.state,req.body.city);
            if (center.length !== 0) {
                let cost: string = req.body.cost ? req.body.cost : null;
                let age: string = req.body.age ? req.body.age : null;
                let vaccineName: string = req.body.vaccineName ? req.body.vaccineName : null;
                let result = await vaccineCenterApiService.filterCenters(center,cost,age,vaccineName);
                return res.status(result.meta['response_code']).json(result);
            } else {
                result = {
                    meta: {
                        "response_code": responsecode.Not_Found,
                        "message": "Center not found",
                        "status": "Failed",
                        "errors": dataArray
                    },
                    data: dataArray
                }
            }
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

export default vaccineCenterApiController;