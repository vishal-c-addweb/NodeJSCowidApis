import User, { IMembers, IUser } from "../model/User";

function createMemberObject(photoIdProof:string,photoIdNumber:string,name:string,gender:string,yearOfBirth:number) {
    let refId: string = new Date().valueOf().toString();
    let secretCode: string = refId.substr(-4);
    let vaccinatedType: string = "Not Vaccinated";
    const memberFields: IMembers = {
        photoIdProof,
        photoIdNumber,
        name,
        gender,
        yearOfBirth,
        refId: refId,
        secretCode: secretCode,
        vaccinatedType: vaccinatedType,
        firstDose: {},
        secondDose: {}
    };
    return memberFields;
}

export async function addMemberService(userId: string,photoIdProof:string,photoIdNumber:string,name:string,gender:string,yearOfBirth:number) {
    await User.updateOne(
        { _id: userId },
        { $push: { members: createMemberObject(photoIdProof,photoIdNumber,name,gender,yearOfBirth) } }
    );
    let user: IUser = await User.findById(userId);
    return user;
}


export async function deleteMemberService(userId: string, refId: string) {
        await User.updateOne(
            { "_id": userId },
            { $pull: { members: { refId: refId } } }
        );
        let user: IUser = await User.findById(userId);
        return user;
}

export async function getMember(photoIdNumber: number) {
    let member: object[] = await User.find({ members: { $elemMatch: { photoIdNumber: photoIdNumber } } });
    return member;
}