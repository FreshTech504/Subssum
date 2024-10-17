import mongoose from "mongoose";

export const OtpSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 900 //15 mintes
    }
})

const OtpModel =  mongoose.model('adminOtp', OtpSchema);
export default OtpModel