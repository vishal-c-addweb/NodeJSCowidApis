import moment from "moment";
import Request from "../types/Request";
import { IResult } from "../model/User";
import { dataArray } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import User, {IMembers,IUser} from "../model/User";

let message: string;
let status: string;
let data: object;
let responseCode: number;

function createDoseObject(doses: any) {
    const doseFields: object = {
        address: doses.address,
        vaccineType: doses.vaccineType,
        age: doses.age,
        cost: doses.cost,
        date: doses.date,
        timeSlot: doses.timeSlot,
        vaccinatedType: "success"
    };
    return doseFields;
}

function calculateDueAndLastDate(first: any, users: any) {
    let month: number;
    if (first.vaccineType === "cowaxin") {
        month = 3;
    } else if (first.vaccineType === "covishield") {
        month = 1
    }
    let due = new Date(first.date);
    let dueDate = new Date(due.setMonth(due.getMonth() + month));
    let dueDateFormat = moment(dueDate).format("D MMMM y");
    let last = new Date(dueDateFormat);
    let lastDate = new Date(last.setMonth(last.getMonth() + 1));
    let lastDateFormat = moment(lastDate).format("D MMMM y");
    const doseFields: object = {
        dueDate: dueDateFormat,
        lastDate: lastDateFormat
    };
    return users.secondDose = doseFields;
}

async function setFirstDoseStatus(users: IMembers, user: IUser) {
    users.vaccinatedType = "Partially vaccinated";
    let first: object = users.firstDose;
    users.firstDose = createDoseObject(first);
    users.secondDose = {};
    calculateDueAndLastDate(first, users);
    return await user.save();
}

async function setSecondDoseStatus(users: IMembers, user: IUser) {
    users.vaccinatedType = "Successfully Vaccinated"
    let second: object = users.secondDose;
    users.secondDose = createDoseObject(second);;
    return await user.save();
}

async function calculateFirstDose(users: IMembers, user: IUser) {
    let first: any = users.firstDose;
    if (first === undefined) {
        message = "first dose not scheduled";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        if (first.vaccinatedType === "success") {
            message = "already vaccinated with first dose";
            status = "Success";
            data = dataArray;
            responseCode = responsecode.Forbidden;
        } else {
            await setFirstDoseStatus(users, user);
            message = "successfully vaccinated with first dose";
            status = "Success";
            data = user;
            responseCode = responsecode.Created;
        }
    }
}

async function calculateSecondDose(users: IMembers, user: IUser) {
    let first: any = users.firstDose;
    let second: any = users.secondDose;
    if (first === undefined) {
        message = "dose not scheduled";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        if (first.vaccinatedType === "scheduled") {
            message = "second dose not scheduled";
            status = "Failed";
            data = dataArray;
            responseCode = responsecode.Not_Found;
        } else {
            if (second.vaccinatedType === undefined) {
                message = "second dose not scheduled";
                status = "Failed";
                data = dataArray;
                responseCode = responsecode.Not_Found;
            } else {
                if (second.vaccinatedType === "success") {
                    message = "already vaccinated with second dose";
                    status = "Success";
                    data = dataArray;
                    responseCode = responsecode.Forbidden;
                } else {
                    await setSecondDoseStatus(users, user);
                    message = "successfully vaccinated with second dose";
                    status = "Success";
                    data = user;
                    responseCode = responsecode.Created;
                }
            }
        }
    }
}

async function calculateDose(users: IMembers, user: IUser, req: Request) {
    if (req.body.dose === "first") {
        await calculateFirstDose(users, user)
    } else if (req.body.dose === "second") {
        await calculateSecondDose(users, user)
    } else {
        message = "dose not available";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    }
}

async function checkSecretCode(users: IMembers, user: IUser, req: Request) {
    if (users.secretCode === req.body.secretCode) {
        await calculateDose(users, user, req)
    } else {
        message = "secretcode is not valid";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    }
}

export async function vaccinatedApiService(req: Request) {
    let user: IUser = await User.findById(req.userId);
    if (!user) {
        message = "User not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        for (let j = 0; j < user.members.length; j++) {
            await checkSecretCode(user.members[j], user, req);
        }
    }
    let result: IResult = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}