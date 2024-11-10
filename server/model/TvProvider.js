import mongoose from "mongoose";

const TvProviderSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    slugName: {
        type: String,
    },
    name: {
        type: String
    },
    img: {
        type: String
    },
    disabled: {
        type: Boolean,
    }
},
{ timestamps: true }
)

const TvProviderModel = mongoose.model('tvProvider', TvProviderSchema)
export default TvProviderModel