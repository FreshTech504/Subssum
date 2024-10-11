import mongoose from "mongoose";

const DataPlanSchema = new mongoose.Schema({
    networkCode: {
        type: String,
        required: [true, 'Network Code is required']
    },
    networkName: {
        type: String,
        required: [true, 'Network Name is required']
    },
    dataCode: {
        type: String,
        required: [true, 'Data Code is required']
    },
    slug: {
        type: String
    },
    planName: {
        type: String,
        required: [true, 'Plan Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    costPrice: {
        type: Number,
        required: [true, 'Cost price is required']
    },
    validity: {
        type: String,
        required: [true, 'Validity Period is required']
    }
},
{
    timestamps: true
}
)

const DataPlanModel = mongoose.model('dataPlan', DataPlanSchema)
export default DataPlanModel