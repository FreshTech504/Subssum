import mongoose from "mongoose";

export const MobileNetworkSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String,
        required: true
    },
    icon: {
        type: String
    }
})

const MobileNetworkModel =  mongoose.model('mobileNetwork', MobileNetworkSchema);
export default MobileNetworkModel