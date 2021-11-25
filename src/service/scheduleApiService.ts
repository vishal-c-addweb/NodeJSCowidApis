import User, { IDose, IMembers, IUser } from "../model/User";
import Request from "../types/Request";
import { IResult } from "../model/User";
import { dataArray } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import VaccineCenter,{ IVaccineCenter} from "../model/vaccineCenter";

let message: string;
let status: string;
let data: object;
let responseCode: number;

function createDoseObject(req: Request) {
    const { address, vaccineType, age, cost, date, timeSlot } = req.body;
    let scheduled: string = "scheduled";
    const doseFields: object = {
        address,
        vaccineType,
        age,
        cost,
        date,
        timeSlot,
        vaccinatedType: scheduled
    };
    return doseFields;
}

async function scheduleFirstDose(users: IMembers, user: IUser, req: Request) {
    let center: IVaccineCenter = await VaccineCenter.findOne({ "centerName": req.body.address });
    if (center.isAvailable === false) {
        message = "dose not available";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        users.firstDose = createDoseObject(req);
        await user.save();
        // await updateSlots(req, 1);
        message = "firstdose scheduled successfully";
        status = "Success";
        data = user;
        responseCode = responsecode.Created;
    }
}

async function scheduleSecondDose(users: IMembers, user: IUser, req: Request) {
    let first: any = users.firstDose;
    let second: any = users.secondDose;
    if (first.vaccinatedType === "success") {
        if (second.vaccinatedType === "success") {
            message = "vaccinated successfully";
            status = "Success";
            data = dataArray;
            responseCode = responsecode.Forbidden;
        } else {
            if (second.vaccinatedType === "scheduled") {
                message = "second dose already scheduled";
                status = "Success";
                data = dataArray;
                responseCode = responsecode.Forbidden;
            } else {
                users.secondDose = createDoseObject(req);
                await user.save();
                // await updateSlots(req, 2);
                message = "second dose scheduled successfully";
                status = "Success";
                data = user;
                responseCode = responsecode.Created;
            }
        }
    } else {
        message = "you are not able to schedule second dose take first dose";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Forbidden;
    }
}

export async function scheduleDoseService(req: Request) {
    let user: IUser = await User.findById(req.userId);
    if (!user) {
        message = "User not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        for (let k = 0; k < user.members.length; k++) {
            if (user.members[k].refId === req.body.refId) {
                if (user.members[k].firstDose === undefined) {
                    await scheduleFirstDose(user.members[k], user, req)
                } else {
                    await scheduleSecondDose(user.members[k], user, req)
                }
            } else {
                message = "reference id is not valid";
                status = "Failed";
                data = dataArray;
                responseCode = responsecode.Not_Found;
            }
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