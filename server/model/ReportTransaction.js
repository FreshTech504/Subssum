import mongoose from "mongoose";

const ReportTransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is Required' ]
    },
    description: {
        type: String,
        required: [ true, 'Please provide a description']
    },
    email: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    image: {
        type: String,
    },
    resolved: {
        type: Boolean,
        default: false,
    }
},
{ timestamps: true }
)

const ReportTransactionModel = mongoose.model('reportTransaction', ReportTransactionSchema)
export default ReportTransactionModel