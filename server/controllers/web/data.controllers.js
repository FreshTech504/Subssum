import DataPlansModel from "../../model/DataPlans.js"
import TransctionHistroyModel from "../../model/TransactionHistroy.js";
import UserModel from "../../model/User.js";
import axios from 'axios'

export async function buyData(req, res){
    //console.log('DATA BODY', req.body)
    const { networkCode, phoneNumber, planId, planName, transactionId, status } = req.body
    const { _id, email } = req.user
    try {
        const mobileRegex = /^(090|091|080|081|070|071)\d{8}$/;
        if (!mobileRegex.test(phoneNumber)) {
            return res.status(400).json({ success: false, data: 'Invalid phone number' });
        }
        const getUser = await UserModel.findById({ _id: _id})
        const dataPlan = await DataPlansModel.findById({ _id: planId })
        if(!dataPlan){
            console.log('DATA PLAN COULD NOT BE FOUND')
            res.status(406).end()
        }
        if(dataPlan.price > getUser.acctBalance){
            return res.status(406).json({ success: false, data: 'Insufficient Wallet Balance' })
        }

        const getData = await axios.post(
            `${process.env.HUSMODATA_URL}/data/`,
            {
                "network": dataPlan?.networkCode,
                "mobile_number": phoneNumber,
                "plan": dataPlan?.dataCode,
                "Ported_number": true
            },
            {
                headers: {
                    "Authorization": `Token ${process.env.HUSMODATA_API_KEY}`,
                    "Content-Type": 'application/json',
                    "Accept" : '*/*'
                },
            }
        )

        //console.log('API RESPONSE FOR DATA', getData?.data)
        const dataResponse = getData?.data
        if (dataResponse.Status === 'successful') {
            // Debit user
            getUser.acctBalance -= Number(dataPlan.price);
            await getUser.save();

            // Create new transaction
            const newTransaction = await TransctionHistroyModel.create({
                userId: _id,
                email: email,
                service: `${dataResponse?.plan_name} ${dataResponse?.plan_network} data`,
                platform: dataResponse.plan_network,
                number: dataResponse.mobile_number,
                amount: dataResponse.plan_amount,
                totalAmount: dataPlan.price,
                status: dataResponse.Status,
                paymentMethod: 'Wallet',
                transactionId: transactionId,
                serviceId: dataResponse.id,
                slug: 'Data',
                isUserLogin: true,
                income: Number(dataPlan.price) - Number(dataResponse.plan_amount)
            });

            const { amount, income, ...transactionData } = newTransaction._doc;
            const { resetPasswordToken, resetPasswordExpire, password: hashedFinalPassword, pin, ...userData } = getUser._doc;

            return res.status(206).json({
                success: true,
                msg: `${dataResponse.plan_name} ${dataResponse.plan_network} Data purchase successful`,
                data: { success: true, data: userData },
                transaction: transactionData
            });
        } else {
            return res.status(400).json({ success: false, data: 'Data purchase failed' });
        }
        
        
    } catch (error) {
        console.log('UNABLE TO BUY DATA', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to buy data'})
    }
}

export async function createDataPlans(req, res) {
    const { networkCode, networkName, dataCode, slug, planName, price, validity, costPrice } = req.body;
    try {
        if (!networkCode || !networkName || !dataCode || !planName || !price || !validity || !costPrice) {
            return res.status(400).json({ success: false, data: 'All fields are required' });
        }

        // Find data plans based on network code
        const findAllData = await DataPlansModel.find({ networkCode: networkCode });

        // Ensure two data codes do not exist on the same network code
        const findExistingCode = findAllData.filter(option => option.dataCode === dataCode);

        if (findExistingCode.length > 0) {
            return res.status(400).json({ success: false, data: `${networkName} data plan with this code: ${dataCode} already exists` });
        }

        const newDataPlan = await DataPlansModel.create({
            networkCode, networkName, dataCode, slug, planName, price, validity, costPrice
        });
        console.log(newDataPlan);
        return res.status(201).json({ success: true, data: `New data plan created for ${networkName}` });
    } catch (error) {
        console.log('UNABLE TO CREATE NEW DATA PLAN', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to create new data plan' });
    }
}

export async function updateDataPlans(req, res) {

    const { _id, networkCode, networkName, dataCode, slug, planName, price, costPrice, validity } = req.body;
    console.log(req.body)
    try {
        const findDataPlan = await DataPlansModel.findById({ _id: _id });
        if(!findDataPlan){
            return res.status(404).json({ success: false, data: 'No data Plan with this id found'})
        }

        const updatedDataPlan = await DataPlansModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    networkCode,
                    networkName,
                    dataCode,
                    slug,
                    planName,
                    price,
                    costPrice,
                    validity
                }
            },
            { new: true }
        );
        console.log(updatedDataPlan);
        return res.status(200).json({ success: true, data: `${updatedDataPlan?.planName} has been updated successfully` });
    } catch (error) {
        console.log('UNABLE TO UPDATE DATA PLAN', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to create new data plan' });
    }
}
 


export async function deleteDataPlan(req, res){
    const { id } = req.body
    try {
        const deletDataPlan = await DataPlansModel.findByIdAndDelete({ _id: id })
        
        res.status(201).json({ success: false, data: 'Data Plan deleted successful '})
    } catch (error) {
        console.log('UNABLE TO DELETE DATA PLAN', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to delete data plan'})
    }
}

export async function fetAllDataPlans(req, res){
    try {
        const fetchDataPlans = await DataPlansModel.find().select('-costPrice')

        res.status(200).json({ success: true, data: fetchDataPlans })
    } catch (error) {
        console.log('UNABLE TO FETCH ALL DATA PLANS FROM DB')
        res.status(500).json({ success: false, data: error.message || 'Unable to fetch data plans'})
    }
}

export async function adminFetAllDataPlans(req, res){
    try {
        const fetchDataPlans = await DataPlansModel.find()
        
        res.status(200).json({ success: true, data: fetchDataPlans })
    } catch (error) {
        console.log('UNABLE TO FETCH ALL DATA PLANS FROM DB')
        res.status(500).json({ success: false, data: error.message || 'Unable to fetch data plans'})
    }
}

//HELPERS
/**
 export async function updateDataPlans(req, res) {
    const { networkName, newNetworkCode } = req.body;
 
    try {
        // Find all data plans with the specified networkName
        const dataPlans = await DataPlansModel.find({ networkName });
 
        if (dataPlans.length === 0) {
            return res.status(404).json({ success: false, data: 'No data plans found for this network name' });
        }
 
        // Update the networkCode for all matching data plans
        const updatedDataPlans = await DataPlansModel.updateMany(
            { networkName },
            { $set: { networkCode: newNetworkCode } }
        );
 
        console.log(`${updatedDataPlans.modifiedCount} plans updated.`, updatedDataPlans);
        return res.status(200).json({
            success: true,
            data: `${updatedDataPlans.modifiedCount} plans have been updated successfully`
        });
    } catch (error) {
        console.log('UNABLE TO UPDATE NETWORK CODE', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to update network codes' });
    }
 }
 */
