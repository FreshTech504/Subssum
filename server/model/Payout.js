import mongoose from "mongoose";

export const PayoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [ true, 'User Id is required ']
    },
    amount: {
        type: Number,
        required: [ true, 'Amount is Reequired' ]
    },
    bankName: {
        type: String,
    },
    accountName: {
        type: String
    },
    accountNumber: {
        type: String
    },
    email: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    }
})

const PayoutModel = mongoose.model('payout', PayoutSchema)
export default PayoutModel