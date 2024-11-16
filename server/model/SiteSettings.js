import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
    },
    url: {
        type: String
    },
    electricCharges: {
        type: Number
    },
    referralBonusFee: {
        type: Number
    }
},
{ timestamps: true}
)

const SiteSettingsModel = mongoose.model('siteSettings', SiteSettingsSchema)
export default SiteSettingsModel