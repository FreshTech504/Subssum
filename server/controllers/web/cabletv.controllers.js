import CableTvPlanModel from "../../model/CableTvPlans.js"
import axios from 'axios'
import UserModel from "../../model/User.js"
import TransctionHistroyModel from "../../model/TransactionHistroy.js";

export async function buyCableTvPlan(req, res){
    //console.log(req.body)
    const { serviceProviderCode, serviceProviderName, smartCardNumber, planId, desc, transactionId } = req.body
    const { _id, email } = req.user
    try {
        if(!planId || !smartCardNumber){
            return res.status(400).json({ success: false, data: 'Fill all required fileds'})
        }

        const findcabletvplan = await CableTvPlanModel.findById({ _id : planId })
        if(!findcabletvplan){
            return res.status(406).status({ success: false, data: 'Cable Tv with plan ID not found '})
        }
        const getUser = await UserModel.findById({ _id: _id})

        if (Number(findcabletvplan?.price) > getUser.acctBalance) {
            return res.status(406).json({ success: false, data: 'Insufficient Wallet Balance' });
        }

        const payCableTvPlan = await axios.post(
            `${process.env.HUSSY_URL}/cabletv/`,
            {
                "provider": findcabletvplan?.platformCode,
                "plan": findcabletvplan?.planId,
                "iucnumber": smartCardNumber,
                "subtype":"renew/change",
                "ref": transactionId
            },
            {
                headers: {
                    "Authorization": `Token ${process.env.HUSSY_API_KEY}`,
                    "Content-Type": 'application/json',
                    "Accept" : '*/*'
                },
            }
        )

        console.log('API RESPONSE FOR CABLE TV', payCableTvPlan?.data)
        const dataResponse = payCableTvPlan?.data
        if (dataResponse.status.toLowerCase() === 'success') {
            
            // Debit user
            getUser.acctBalance -= Number(findcabletvplan.price);
            await getUser.save();
            
            // Create new transaction
            const newTransaction = await TransctionHistroyModel.create({
                userId: _id,
                email: email,
                service: `${desc}`,
                platform: findcabletvplan.platformName,
                number: smartCardNumber,
                amount: findcabletvplan.costPrice,
                totalAmount: findcabletvplan.price,
                status: 'Successsful',
                paymentMethod: 'Wallet',
                transactionId: transactionId,
                serviceId: Date.now(),
                slug: 'CableTv',
                isUserLogin: true,
                income: Number(findcabletvplan.price) - (findcabletvplan.costPrice)
            });

            const { amount, income, ...transactionData } = newTransaction._doc;
            const { resetPasswordToken, resetPasswordExpire, password: hashedFinalPassword, pin, ...userData } = getUser._doc;

            return res.status(206).json({
                success: true,
                msg: `${findcabletvplan.planName} for ${findcabletvplan.platformName} purchase successful`,
                data: { success: true, data: userData },
                transaction: transactionData
            });
        } else {
            return res.status(400).json({ success: false, data: 'Cable TV purchase failed' });
        }

    } catch (error) {
        console.log('UNABLE TO BUT CABLE TV SUBCRIPTION', error)
        res.status(500).json({ success: false, data: 'unable to buy cable tv subcription' })
    }
}

export async function createCableTvPlan(req, res) {
    const { platformCode, platformName, planName, planId, slug, costPrice, price } = req.body
    try {
        if(!platformCode || !platformName || !planName || !planId || !costPrice || !price){
            return res.status(400).json({ success: false, data: 'Fill all required fileds' })
        }

        const findCableTvPlan = await CableTvPlanModel.findOne({ planId: planId })
        if(findCableTvPlan){
            return res.status(400).json({ success: false, data: 'Cable Tv with this plan already exist' })
        }

        const newCableTvPlan = await CableTvPlanModel.create({
            platformCode, platformName, planName, planId, slug, costPrice, price
        })

        console.log('NEW DATA', newCableTvPlan)
        res.status(201).json({ success: true, data: `New ${platformName} cable TV plan created`})
    } catch (error) {
        console.log('UNABLE TO CREATE DATA PLAN', error)
        res.status(500).json({ success: false, data: 'Unable to create new cable tv data plan'})
    }
}

export async function getAllCableTv(req, res){
    try {
        const plans = await CableTvPlanModel.find().select('-costPrice')

        res.status(200).json({ success: true, data: plans })
    } catch (error) {
        console.log('UNABLE TO GET AL CABLE TV PLAN', error)
        res.status(500).jscon({ success: false, data: 'Unable to get all cable tv plan' })
    }
}

export async function getACableTv(req, res) {
    const { id } = req.params
    try {
        const plan = await CableTvPlanModel.findById({ _id: id })
        if(!plan){
            return res.status(404).json({ success: false, data: 'Cable TV Plan not found' })
        }

        const { costPrice, ...getPlan } = plan._doc
        res.status(200).json({ success: false, data: getPlan})
    } catch (error) {
        console.log('UNABLE TO GET A CABLE TV', error)
    }
}

export async function validateCardNumber(req, res) {
    const { id, number } = req.body
    try {
        if(!id || !number){
            return res.status(400).json({ success: false, data: '' })
        }
        console.log('HI CARD', id, number)
        try{
            const validateCardNumber = await axios.post(
                `${process.env.HUSSY_URL}/cabletv/verify/`,
                {
                    "provider": id, 
                    "iucnumber": number
                },
                {
                    headers: {
                        "Authorization": `Token ${process.env.HUSSY_API_KEY}`,
                        "Content-Type": 'application/json',
                        "Accept" : '*/*'
                    },
                }
            )
            const cardName = validateCardNumber.data
            console.log('CARD DATA:', cardName)

            return res.status(200).json({ success: true, data:cardName })
        } catch(error) {
            console.log('ERROR UNABLE TO GET NAME', error.response.data)
            return res.status(200).json({ success: true, data: error.response.data })
        }
    } catch (error) {
        console.log('UNABLE TO VERIFY SMART CARD NAME', error)
        res.status(500).json({ success: false, data: 'unable to verify smart card name' })
    }
}

export async function deletetvs(req, res){
    try{
        console.log('YOO')
        const del = await CableTvPlanModel.deleteMany({ platformName: 'Startimes' })
        res.status(200).json({ success: true, data: 'deleted' })
    } catch {

    }
}