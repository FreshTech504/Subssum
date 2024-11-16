import ActivitiesModel from "../../model/Activities.js"
import MobileNetworkModel from "../../model/MobileNetworks.js"

export async function createNetwork(req, res){
    const { name, code, icon } = req.body
    console.log('ON', req.body)
    const { firstName, lastName, _id } = req.admin
    try {
        if(!name){
            return res.status(404).json({ success: false, data: 'Provide a newtwork name' })
        }
        if(!code){
            return res.status(404).json({ success: false, data: 'Provide a newtwork code' })
        }

        const networkExist = await MobileNetworkModel.findOne({ code: code })
        if(networkExist){
            return res.status(400).json({ success: false, data: 'Mobile Network with code already exist' })
        }

        const newNetwork = await MobileNetworkModel.create({
            name, code, icon
        })

        const newActivity = await ActivitiesModel.create({
            note: `New ${name} nedtword created`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: `${newNetwork.name} Network Created.` })
    } catch (error) {
        console.log('UNABLE TO CREATE NEW NETWORK', error)
        res.status(500).json({ success: false, data: 'Unable to create new network' })
    }
}

export async function updateNetwork(req, res){
    const { _id, name, code, icon } = req.body
    console.log('object', req.body)
    try {
        const findNetwork = await MobileNetworkModel.findById({ _id: _id });
        if(!findNetwork){
            return res.status(404).json({ success: false, data: 'No network with this id found'})
        }

        const updateNetwork = await MobileNetworkModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    name,
                    code,
                    icon
                }
            },
            { new: true }
        )

        return res.status(201).json({ success: true, data: 'Network updated Successfull' })
    } catch (error) {
        console.log('UNABLE TO UPDATE CODE', error)
        res.status(500).json({ success: false, data: 'Unable to update network' })
    }
}

export async function deleteNetwork(req, res){
    const { id } = req.body
    const { firstName, lastName, _id } = req.admin
    try {
        const deleteNewtwork = await MobileNetworkModel.findByIdAndDelete({ _id: id })
        
        const newActivity = await ActivitiesModel.create({
            note: `Network Deleted`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: 'Network Deleted' })
    } catch (error) {
        console.log('UNABLE TO DELETE NETWORK', error)
        res.status(500).json({ success: false, data: 'Unable to delete network' })
    }
}

export async function getAllNetwork(req, res){
    try {
        const allNetworks = await MobileNetworkModel.find()

        return res.status(200).json({ success: true, data: allNetworks })
    } catch (error) {
        console.log('UNABLE TO GET ALL NETWORKS', error)
        res.status(500).json({ success: false, data: 'Unable to get all networks' })
    }
}

export async function getANetwork(req, res){
    const { id } = req.params
    if(!id){
        return res.status(404).json({ success: false, data: 'Provide an ID' })
    }
    try {
        const network = await MobileNetworkModel.findById(id)
        
        if(!network){
            return res.status(404).json({ success: false, data: 'Network not found' })
        }

        res.status(200).json({ success: true, data: network })
    } catch (error) {
        res.status(500).json({ success: false, data: 'Unable to get network' })
    }
}