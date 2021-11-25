import { Document, Model, model, Schema } from "mongoose";
import mongoose from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param mobile:number
 * @param password: string
 * @param members:array
 */

export interface IOtp extends Document {
  otp: number;
  expiration_time: Date;
  verified: boolean
}

const otpSchema: Schema = new Schema({
    otp: { type: Number },
    expiration_time: { type: Date},
    verified: { type: Boolean}
});

const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
