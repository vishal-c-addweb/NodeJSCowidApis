import Request from "../types/Request";
import { IVaccineCenter} from "../model/vaccineCenter";

export function updateFirstDoseSlots(dose:any,center:IVaccineCenter) {
    for (let i = 0; i < center.vaccine.length; i++) {
        let element = center.vaccine[i];
        if (dose.vaccineType === element.name && dose.age === element.age) {
            element.dose1 = element.dose1 - 1;
            if (element.dose1 === 0) {
                center.isAvailable = false;
            }
            center.save();
        }       
    }
}
export function updateSecondDoseSlots(dose:any,center:IVaccineCenter) {
    for (let i = 0; i < center.vaccine.length; i++) {
        let element = center.vaccine[i];
        if (dose.vaccineType === element.name && dose.age === element.age) {
            element.dose2 = element.dose1 - 1;
            if (element.dose2 === 0) {
                center.isAvailable = false;
            }
            center.save();
        }       
    }
}

export function createDoseObject(req: Request) {
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