import mongoose from "mongoose";

const MonnifySchema = new mongoose.Schema({
    apikey: {
        type: String,
        required: [true, 'Access Token is Required']
    }
}, 
{timestamps: true}
)

const MonnifyModel = mongoose.model('monnifyToken', MonnifySchema)
export default MonnifyModel