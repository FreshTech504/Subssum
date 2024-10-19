import mongoose from "mongoose";

const ActivitiesSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    }
},
{ timestamps: true },
)

const ActivitiesModel = mongoose.model('activities', ActivitiesSchema)
export default ActivitiesModel