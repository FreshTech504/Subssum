import axios from 'axios'
import UserModel from '../../model/User.js'
import TransctionHistroyModel from "../../model/TransactionHistroy.js";
import ElectricityModel from '../../model/ElectricityModel.js';
import ActivitiesModel from '../../model/Activities.js';
import SiteSettingsModel from '../../model/SiteSettings.js';

//BUY ELECTRICITY
export async function buyElectricBill(req, res) {
    //console.log(req.body);
    const { providerCode, providerName, meterNumber, amount: inputAmount, transactionId, phoneNumber, meterType } = req.body; // Rename here
    const { _id, email } = req.user;
    
    try {
        if (!providerCode || !meterNumber || !inputAmount || !phoneNumber) {
            return res.status(406).json({ success: false, data: 'Fill all required Fields' });
        }
        if (inputAmount < 1000) {
            return res.status(406).json({ success: false, data: 'Minimum amount is NGN1000' });
        }
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(inputAmount)) {
            return res.status(406).json({ success: false, data: 'Invalid amount Number format' });
        }
        
        const getUser = await UserModel.findById({ _id: _id });
        const siteSetting = await SiteSettingsModel.findOne()
        const fullAmount = Number(siteSetting?.electricCharges || 100) + Number(inputAmount); // Use inputAmount here
        if (fullAmount > getUser.acctBalance) {
            return res.status(406).json({ success: false, data: 'Insufficient Wallet Balance' });
        }

        const payNepaLight = await axios.post(
            `${process.env.HUSSY_URL}/electricity/`,
            {
                "provider": providerCode, 
                "meternumber": meterNumber,
                "amount": Number(inputAmount), // Use inputAmount here
                "metertype": meterType ? meterType.toLowerCase() : 'prepaid',
                "phone": phoneNumber,
                "ref": transactionId,
            },
            {
                headers: {
                    "Authorization": `Token ${process.env.HUSSY_API_KEY}`,
                    "Content-Type": 'application/json',
                    "Accept": '*/*'
                },
            }
        );

        const dataResponse = payNepaLight?.data;
        console.log('ELECTRICITY RESPONSE', dataResponse);
        if (dataResponse.status.toLowerCase() === 'success') {
            // Debit user
            getUser.acctBalance -= fullAmount;
            await getUser.save();
        
            // Create new transaction
            const newTransaction = await TransctionHistroyModel.create({
                userId: _id,
                email: email,
                service: `Electric bills. ${dataResponse?.token}`,
                platform: providerName,
                number: meterNumber,
                amount: inputAmount, // Use inputAmount here
                totalAmount: fullAmount,
                status: 'Successful',
                paymentMethod: 'Wallet',
                transactionId: transactionId,
                serviceId: dataResponse?.token,
                slug: 'Electricity',
                isUserLogin: true,
                income: Number(fullAmount) - Number(inputAmount) // Use inputAmount here
            });

            const { amount, income, ...transactionData } = newTransaction._doc; // Here you can use the amount from newTransaction
            const { resetPasswordToken, resetPasswordExpire, password: hashedFinalPassword, pin, ...userData } = getUser._doc;

            return res.status(206).json({
                success: true,
                msg: `${inputAmount} electric bill for ${providerName} purchase successful`,
                data: { success: true, data: userData },
                transaction: transactionData
            });
        } else {
            return res.status(400).json({ success: false, data: 'Electricity purchase failed' });
        }
        
    } catch (error) {
        console.log('UNABLE TO BUY ELECTRIC BILL', error);
        res.status(500).json({ success: false, data: 'Unable to buy electric bill' });
    }
}

//VALIDATE METER NUMBER
export async function validateMeterNumber(req, res){
    const { meterNumber, providerSlug, meterType } = req.body
    console.log(req.body)
    try{
        try {
            if(!meterNumber || !providerSlug){
                return res.status(400).json({ success: false, data: '' })
            }
            console.log('HI CARD',)
            try{
                const validateCardNumber = await axios.get(
                    `${process.env.GLAD_URL}/v2/validatemeter/?disco_id=${providerSlug}&meter_type=${meterType ? meterType.toLowerCase() : 'prepaid'}&meter_number=${meterNumber}`,
                )
                const cardName = validateCardNumber.data
                console.log('METER NAME', cardName)
    
                return res.status(200).json({ success: true, data:cardName })
            } catch(error) {
                console.log('ERROR UNABLE TO GET NAME', error)
                res.end()
            }
        } catch (error) {
            console.log('UNABLE TO VERIFY SMART CARD NAME', error)
            res.status(500).json({ success: false, data: 'unable to verify smart card name' })
        }
    } catch {
        console.log('UNABLE TO VERIFY SMART CARD NAME', error)
        res.status(500).json({ success: false, data: 'unable to verify smart card name' })
    }
}

//CREATE NEW ELECTRICITY PROVIDER
export async function createElectricProvider(req, res){
    const { name, code, icon, slug } = req.body
    console.log('ON', req.body)
    const { firstName, lastName, _id } = req.admin
    try {
        if(!name){
            return res.status(404).json({ success: false, data: 'Provide a newtwork name' })
        }
        if(!code){
            return res.status(404).json({ success: false, data: 'Provide a newtwork code' })
        }

        const providerExist = await ElectricityModel.findOne({ code: code })
        if(providerExist){
            return res.status(400).json({ success: false, data: 'Electric Provider with code already exist' })
        }

        const newProvider = await ElectricityModel.create({
            name, code, icon, slug
        })

        const newActivity = await ActivitiesModel.create({
            note: `New Electricity Provider created`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: `${newProvider.name} provider Created.` })
    } catch (error) {
        console.log('UNABLE TO CREATE NEW ELECTRIC PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to create new electric provider' })
    }
}

//UPDATE ELECTRICITY PROVIDER
export async function updateElectricProvider(req, res){
    const { _id, name, code, icon, slug } = req.body
    console.log('object', req.body)
    try {
        const findProvider = await ElectricityModel.findById({ _id: _id });
        if(!findProvider){
            return res.status(404).json({ success: false, data: 'No electric provider with this id found'})
        }

        const updateProvider = await ElectricityModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    name,
                    code,
                    icon,
                    slug
                }
            },
            { new: true }
        )
        console.log('data', updateProvider)
        return res.status(201).json({ success: true, data: 'Electric Provider updated Successfull' })
    } catch (error) {
        console.log('UNABLE TO UPDATE ELECTRIC PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to update provider' })
    }
}

//DELETE ELECTRICITY PROVIDER
export async function deleteElectricProvider(req, res){
    const { id } = req.body
    const { firstName, lastName, _id } = req.admin
    try {
        const deleteProvider = await ElectricityModel.findByIdAndDelete({ _id: id })

        const newActivity = await ActivitiesModel.create({
            note: `Electricity Provider deleted`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: 'Electric provider Deleted' })
    } catch (error) {
        console.log('UNABLE TO DELETE ELECTRIC PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to delete electric provider' })
    }
}

//GET ALL ELECTRICITY PROVIDER
export async function getAllElectricProvider(req, res){
    try {
        const allProvider = await ElectricityModel.find()

        return res.status(200).json({ success: true, data: allProvider })
    } catch (error) {
        console.log('UNABLE TO GET ALL NETWORKS', error)
        res.status(500).json({ success: false, data: 'Unable to get all networks' })
    }
}

//GET A ELECTRICITY PROVIDER
export async function getAElectricProvider(req, res){
    const { id } = req.params
    if(!id){
        return res.status(404).json({ success: false, data: 'Provide an ID' })
    }
    try {
        const provider = await ElectricityModel.findById(id)
        
        if(!provider){
            return res.status(404).json({ success: false, data: 'Electric Provider not found' })
        }

        res.status(200).json({ success: true, data: provider })
    } catch (error) {
        res.status(500).json({ success: false, data: 'Unable to get electric provider' })
    }
}