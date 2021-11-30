import { Response } from "express";
import Request from "../types/Request";
import { IMembers, IUser, dataArray } from "../model/User";
import responsecode from "../response_builder/responsecode";
import * as userApiService from "../service/userApiService";
import * as vaccinatedApiService from "../service/vaccinatedApiService";
import { IResponse } from "../model/vaccineCenter";

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
            let user: IUser = await userApiService.getUserById(req.userId);
            for (let j = 0; j < user.members.length; j++) {
                let element: IMembers = user.members[j];
                if (element.secretCode === req.body.secretCode) {
                    if (req.body.dose === "first") {
                        let first: any = element.firstDose;
                        if (first === undefined) {
                            result = {
                                meta: {
                                    "response_code": responsecode.Not_Found,
                                    "message": "first dose not scheduled",
                                    "status": "Failed",
                                    "errors": dataArray
                                },
                                data: dataArray
                            }
                        } else {
                            if (first.vaccinatedType === "success") {
                                result = {
                                    meta: {
                                        "response_code": responsecode.Forbidden,
                                        "message": "already vaccinated with first dose",
                                        "status": "Success",
                                        "errors": dataArray
                                    },
                                    data: dataArray
                                }
                            } else {
                                await vaccinatedApiService.setFirstDoseStatus(element, user);
                                result = {
                                    meta: {
                                        "response_code": responsecode.Created,
                                        "message": "successfully vaccinated with first dose",
                                        "status": "Success",
                                        "errors": dataArray
                                    },
                                    data: user
                                }
                            }
                        }
                    } else if (req.body.dose === "second") {
                        let first: any = element.firstDose;
                        let second: any = element.secondDose;
                        if (first === undefined) {
                            result = {
                                meta: {
                                    "response_code": responsecode.Not_Found,
                                    "message": "dose not scheduled",
                                    "status": "Failed",
                                    "errors": dataArray
                                },
                                data: dataArray
                            }
                        } else {
                            if (first.vaccinatedType === "scheduled") {
                                result = {
                                    meta: {
                                        "response_code": responsecode.Not_Found,
                                        "message": "second dose not scheduled",
                                        "status": "Failed",
                                        "errors": dataArray
                                    },
                                    data: dataArray
                                }
                            } else {
                                if (second.vaccinatedType === undefined) {
                                    result = {
                                        meta: {
                                            "response_code": responsecode.Not_Found,
                                            "message": "second dose not scheduled",
                                            "status": "Failed",
                                            "errors": dataArray
                                        },
                                        data: dataArray
                                    }
                                } else {
                                    if (second.vaccinatedType === "success") {
                                        result = {
                                            meta: {
                                                "response_code": responsecode.Forbidden,
                                                "message": "already vaccinated with second dose",
                                                "status": "Success",
                                                "errors": dataArray
                                            },
                                            data: dataArray
                                        }
                                    } else {
                                        await vaccinatedApiService.setSecondDoseStatus(element, user);
                                        result = {
                                            meta: {
                                                "response_code": responsecode.Created,
                                                "message": "successfully vaccinated with second dose",
                                                "status": "Success",
                                                "errors": dataArray
                                            },
                                            data: user
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        result = {
                            meta: {
                                "response_code": responsecode.Not_Found,
                                "message": "dose not available",
                                "status": "Failed",
                                "errors": dataArray
                            },
                            data: dataArray
                        }
                    }
                } else {
                    result = {
                        meta: {
                            "response_code": responsecode.Not_Found,
                            "message": "secretcode is not valid",
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

export default vaccinatedApiController;