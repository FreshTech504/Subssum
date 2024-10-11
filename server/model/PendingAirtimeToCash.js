import mongoose from "mongoose";

const PendingAirtimeToCashSchema = new mongoose.Schema({
    networkCode: {
        type: String
    },
    networkValue: {
        type: String
    },
    networkName: {
        type: String
    },
    phoneNumber: {
        type: String
    },    
    sitePhoneNumber: {
        type: String
    },    
    amount: {
        type: Number
    },    
    status: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    transactionId: {
        type: String
    },
}, 
{ timestamps: true},
)

const PendingAirtimeToCashModel = mongoose.model('PendingAirtimeToCash', PendingAirtimeToCashSchema)
export default PendingAirtimeToCashModel