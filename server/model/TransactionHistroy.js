import mongoose from "mongoose";

const TransctionHistroySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User id is required']
    },
    email: {
        type: String,
        required: [true, 'User Email Address is required']
    },
    service: {
        type: String,
        required: [true, 'Type of Service is required']
    },
    platform: {
        type: String,
        required: [true, 'Platform is required']
    },
    number: {
        type: String,
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    totalAmount: {
        type: Number,
    },
    status: {
        type: String,
        //enum: ['Initiated', 'Successful', 'Failed']
    },
    paymentMethod: {
        type: String
    },
    transactionId: {
        type: String,
        unique: [true, 'Transaction with this Id already Exist']
    },
    serviceId: {
        type: String
    },
    credit: {
        type: Boolean
    },
    slug:{
        type:String
    },
    isUserLogin: {
        type: Boolean
    },
    income: {
        type: Number,
    }
},
{
    timestamps: true
}
)

const TransctionHistroyModel = mongoose.model('transactionHistroy', TransctionHistroySchema)
export default TransctionHistroyModel