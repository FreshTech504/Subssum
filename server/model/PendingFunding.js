import mongoose from "mongoose";

const PendingFundingSchema = new mongoose.Schema({
    source: {
        type: String,
        required: [true, 'Funding source is required']
    },
    transactionRef: {
        type: String,
        required: [true, 'Transaction refrence is required'],
        unique: [true, 'Transaction refrence already exist']
    },
    monnifyRef: {
        type: String,
        unique: [true, 'monnifyRef refrence already exist']
    },
    userId: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 3600
    }
},
{
    timestamps: true
})

const PendingFundingModel =  mongoose.model('pendingFunding', PendingFundingSchema);
export default PendingFundingModel