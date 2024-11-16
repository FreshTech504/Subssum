import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    accountFor: {
        type: String,
        enum: ['Users', 'Admin']
    },
    suspended: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true },
)

const NotificationsModel = mongoose.model('notification', notificationsSchema)
export default NotificationsModel