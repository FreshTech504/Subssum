import mongoose from "mongoose";

const CableTvPlanSchema = new mongoose.Schema({
    platformCode: {
        type: String,
        required: [true, 'platform for which plan belong to is required']
    },
    platformName: {
        type: String,
    },
    planName: {
        type: String,
        required: [ true, 'Cable TV plan name is required' ]
    },
    planId: {
        type: String,
        required: [ true, 'Plan Id is required' ],
        unique: [ true, 'Plan Id already exist' ]
    },
    slug: {
        type: String
    },
    costPrice: {
        type: Number,
        required: [ true, 'cost price is Required' ]
    },
    price: {
        type: Number,
        required: [ true, 'Price is Required' ]
    }
},
{ 
    timestamps: true
},
)

const CableTvPlanModel = mongoose.model('cabletvplan', CableTvPlanSchema)
export default CableTvPlanModel