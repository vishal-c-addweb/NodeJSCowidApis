import { Response } from "express";
import Request from "../types/Request";
import { IMembers, IUser, dataArray } from "../model/User";
import responsecode from "../response_builder/responsecode";
import * as userApiService from "../service/userApiService";
import * as scheduleApiService from "../service/scheduleApiService";
import * as vaccineCenterApiService from "../service/vaccineCenterApiService";
import { IResponse, IVaccineCenter } from "../model/vaccineCenter";

const scheduleApiController = {
    /**
     * Request a data from user and schedule member vaccine and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    schedule: async function schedule(req: Request, res: Response) {
        let result: IResponse;
        try {
            let user: IUser = await userApiService.getUserById(req.userId);
            for (let k = 0; k < user.members.length; k++) {
                let element: IMembers = user.members[k];
                if (element.refId === req.body.refId) {
                    let center: IVaccineCenter = await vaccineCenterApiService.getCenterByName(req.body.address);
                    if (center === null || center.isAvailable === false) {
                        result = {
                            meta: {
                                "response_code": responsecode.Not_Found,
                                "message": "center not available",
                                "status": "Failed",
                                "errors": dataArray
                            },
                            data: dataArray
                        }
                    } else {
                        if (element.firstDose === undefined) {
                            element.firstDose = scheduleApiService.createDoseObject(req);
                            await user.save();
                            await scheduleApiService.updateFirstDoseSlots(element.firstDose, center);
                            result = {
                                meta: {
                                    "response_code": responsecode.Created,
                                    "message": "firstdose scheduled successfully",
                                    "status": "Success",
                                    "errors": dataArray
                                },
                                data: user
                            }
                        } else {
                            let first: any = element.firstDose;
                            let second: any = element.secondDose;
                            if (first.vaccinatedType === "success") {
                                if (second.vaccinatedType === "success") {
                                    result = {
                                        meta: {
                                            "response_code": responsecode.Forbidden,
                                            "message": "vaccinated successfully",
                                            "status": "Success",
                                            "errors": dataArray
                                        },
                                        data: dataArray
                                    }
                                } else {
                                    if (second.vaccinatedType === "scheduled") {
                                        result = {
                                            meta: {
                                                "response_code": responsecode.Forbidden,
                                                "message": "second dose already scheduled",
                                                "status": "Failed",
                                                "errors": dataArray
                                            },
                                            data: dataArray
                                        }
                                    } else {
                                        element.secondDose = scheduleApiService.createDoseObject(req);
                                        await user.save();
                                        await scheduleApiService.updateSecondDoseSlots(element.firstDose, center);
                                        result = {
                                            meta: {
                                                "response_code": responsecode.Created,
                                                "message": "second dose scheduled successfully",
                                                "status": "Success",
                                                "errors": dataArray
                                            },
                                            data: user
                                        }
                                    }
                                }
                            } else {
                                result = {
                                    meta: {
                                        "response_code": responsecode.Forbidden,
                                        "message": "you are not able to schedule second dose take first dose",
                                        "status": "Failed",
                                        "errors": dataArray
                                    },
                                    data: dataArray
                                }
                            }
                        }
                    }
                } else {
                    result = {
                        meta: {
                            "response_code": responsecode.Not_Found,
                            "message": "reference id is not valid",
                            "status": "Failed",
                            "errors": dataArray
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
    }
};

export default scheduleApiController;