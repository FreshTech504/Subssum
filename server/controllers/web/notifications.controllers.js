import ActivitiesModel from "../../model/Activities.js"
import NotificationsModel from "../../model/Notifications.js"

export async function createNotification(req, res){
    const { note, accountFor } = req.body
    console.log('ON', req.body)
    const { firstName, lastName, _id } = req.admin
    try {
        if(!note){
            return res.status(404).json({ success: false, data: 'Provide a new notification message' })
        }
        if(!accountFor){
            return res.status(404).json({ success: false, data: "Provide notification category ['users', 'admin']" })
        }

        const newNotification = await NotificationsModel.create({
            note, accountFor
        })

        const newActivity = await ActivitiesModel.create({
            note: `Notification message added for ${accountFor}`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: `Notification Created.` })
    } catch (error) {
        console.log('UNABLE TO CREATE NEW NOTIFICATION', error)
        res.status(500).json({ success: false, data: 'Unable to create new notification' })
    }
}

export async function updateNotification(req, res){
    const { _id, note, accountFor, suspended } = req.body
     console.log('object', req.body)
    try {
        const findNotification = await NotificationsModel.findById({ _id: _id });
        if(!findNotification){
            return res.status(404).json({ success: false, data: 'No notification with this id found'})
        }

        const updateNotification = await NotificationsModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    note,
                    accountFor,
                    suspended
                }
            },
            { new: true }
        )

        return res.status(201).json({ success: true, data: 'Notification updated Successful' })
    } catch (error) {
        console.log('UNABLE TO UPDATE NOTIFICATION', error)
        res.status(500).json({ success: false, data: 'Unable to update notification' })
    }
}

export async function deleteNotification(req, res){
    const { id } = req.body
    const { firstName, lastName, _id } = req.admin
    try {
        const deleteNewtwork = await NotificationsModel.findByIdAndDelete({ _id: id })
        
        const newActivity = await ActivitiesModel.create({
            note: `Notification deleted by: ${firstName} ${lastName}`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: 'Notification Deleted' })
    } catch (error) {
        console.log('UNABLE TO DELETE NOTIFICATION', error)
        res.status(500).json({ success: false, data: 'Unable to delete notification' })
    }
}

//GET ALL NOTIFICATIONS
export async function getAllNotification(req, res){
    try {
        const allNotification = await NotificationsModel.find()

        return res.status(200).json({ success: true, data: allNotification })
    } catch (error) {
        console.log('UNABLE TO GET ALL Notification', error)
        res.status(500).json({ success: false, data: 'Unable to get all notification' })
    }
}

//GET A NOTIFICATIONS
export async function getANotification(req, res){
    const { id } = req.params
    if(!id){
        return res.status(404).json({ success: false, data: 'Provide an ID' })
    }
    try {
        const notification = await NotificationsModel.findById(id)
        
        if(!notification){
            return res.status(404).json({ success: false, data: 'Notification not found' })
        }

        res.status(200).json({ success: true, data: notification })
    } catch (error) {
        res.status(500).json({ success: false, data: 'Unable to get notification' })
    }
}

// GET ALL NOTIFICATIONS FOR USERS
export async function getAllUserNotification(req, res) {
    console.log('object')
    try {
        const allNotification = await NotificationsModel.find({
            suspended: false,
            accountFor: "Users"
        });

        return res.status(200).json({ success: true, data: allNotification });
    } catch (error) {
        console.log('UNABLE TO GET ALL NOTIFICATIONS', error);
        res.status(500).json({ success: false, data: 'Unable to get all notifications' });
    }
}

// GET ALL NOTIFICATIONS FOR USERS
export async function getAllAdminNotification(req, res) {
    try {
        const allNotification = await NotificationsModel.find({
            suspended: false,
            accountFor: "Admin"
        });

        return res.status(200).json({ success: true, data: allNotification });
    } catch (error) {
        console.log('UNABLE TO GET ALL NOTIFICATIONS', error);
        res.status(500).json({ success: false, data: 'Unable to get all notifications' });
    }
}