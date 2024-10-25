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
    image: {
        type: String,
    }
},
{ timestamps: true }
)

const ReportTransactionModel = mongoose.model('', ReportTransactionSchema)
export default ReportTransactionModel