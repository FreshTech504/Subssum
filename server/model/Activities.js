import mongoose from "mongoose";

const ActivitiesSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    userId: {
        type: String
    },
    img: {
        type: String
    }
},
{ timestamps: true },
)

const ActivitiesModel = mongoose.model('activities', ActivitiesSchema)
export default ActivitiesModel