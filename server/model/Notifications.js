import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    }
},
{ timestamps: true },
)

const NotificationsModel = mongoose.model('notification', notificationsSchema)
export default NotificationsModel