import mongoose from "mongoose";

const ElectricitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Electric provider name is required' ]
    },
    code: {
        type: String,
    },
    slug: {
        type: String
    },
    icon: {
        type: String
    }
}, 
{ timestamps: true }
)

const ElectricityModel = mongoose.model('electricityProviders', ElectricitySchema)
export default ElectricityModel