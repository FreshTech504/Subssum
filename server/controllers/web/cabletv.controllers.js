import CableTvPlanModel from "../../model/CableTvPlans.js"
import axios from 'axios'
import UserModel from "../../model/User.js"
import TransctionHistroyModel from "../../model/TransactionHistroy.js";
import TvProviderModel from "../../model/TvProvider.js";
import ActivitiesModel from "../../model/Activities.js";

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
    const { firstName, lastName, _id } = req.admin
    try {
        if(!platformCode || !platformName || !planName || !planId || !costPrice || !price){
            return res.status(400).json({ success: false, data: 'Fill all required fileds' })
        }
        if(price < costPrice ){
            return res.status(400).json({ success: false, data:'Price cannot be less than cost price' })
        }

        const findCableTvPlan = await CableTvPlanModel.findOne({ planId: planId })
        if(findCableTvPlan){
            return res.status(400).json({ success: false, data: 'Cable Tv with this plan already exist' })
        }

        const newCableTvPlan = await CableTvPlanModel.create({
            platformCode, platformName, planName, planId, slug, costPrice, price
        })

        const newActivity = await ActivitiesModel.create({
            note: `Cable TV plan created`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        console.log('NEW DATA', newCableTvPlan)
        res.status(201).json({ success: true, data: `New ${platformName} cable TV plan created`})
    } catch (error) {
        console.log('UNABLE TO CREATE DATA PLAN', error)
        res.status(500).json({ success: false, data: 'Unable to create new cable tv data plan'})
    }
}

export async function updateCableTvPlan(req, res) {
    const { _id, platformCode, platformName, planName, planId, slug, costPrice, price } = req.body
    try {

        const findCableTvPlan = await CableTvPlanModel.findById({ _id: _id })
        if(!findCableTvPlan){
            return res.status(400).json({ success: false, data: 'Cable Tv with this plan does not exist' })
        }

        const updateCableTvPlan = await CableTvPlanModel.findByIdAndUpdate(
            _id,
            {
                platformCode, platformName, planName, planId, slug, costPrice, price
            },
            { new: true }
        )

        console.log('UPDATED DATA', updateCableTvPlan)
        res.status(201).json({ success: true, data: `New ${updateCableTvPlan?.platformName} cable TV plan updated`})
    } catch (error) {
        console.log('UNABLE TO UPDATE DATA PLAN', error)
        res.status(500).json({ success: false, data: 'Unable to update cable tv data plan'})
    }
}

export async function deleteCableTvPlan(req, res){
    const { id } = req.body
    const { firstName, lastName, _id } = req.admin

    try {
        const deleteNewtwork = await CableTvPlanModel.findByIdAndDelete({ _id: id })

        const newActivity = await ActivitiesModel.create({
            note: ` Cable TV Plan deleted`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: 'Cable TV Plan Deleted' })
    } catch (error) {
        console.log('UNABLE TO DELETE CABLE TV PLAN', error)
        res.status(500).json({ success: false, data: 'Unable to delete tv plan' })
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

export async function getAdminAllCableTv(req, res){
    try {
        const plans = await CableTvPlanModel.find()

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

export async function getAdminACableTv(req, res) {
    const { id } = req.params
    try {
        const plan = await CableTvPlanModel.findById({ _id: id })
        if(!plan){
            return res.status(404).json({ success: false, data: 'Cable TV Plan not found' })
        }

        res.status(200).json({ success: false, data: plan})
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

//TV PROIVIDER
export async function createTVProvider(req, res){
    const { name, code, img, slugName, disabled } = req.body
    console.log('object cc')
    const { firstName, lastName, _id } = req.admin
    try {
        if(!name){
            return res.status(404).json({ success: false, data: 'Provide a name' })
        }
        if(!code){
            return res.status(404).json({ success: false, data: 'Provide a code' })
        }

        const tvProviderExist = await TvProviderModel.findOne({ code: code })
        if(tvProviderExist){
            return res.status(400).json({ success: false, data: 'Mobile Network with code already exist' })
        }

        const newTvProvider = await TvProviderModel.create({
            name, code, img, slugName, disabled
        })

        const newActivity = await ActivitiesModel.create({
            note: `Cable TV Provider created`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: `${newTvProvider.name} Tv Provider Created.` })
    } catch (error) {
        console.log('UNABLE TO CREATE NEW TV PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to create new provider' })
    }
}

export async function updateTVProvider(req, res){
    const { _id, name, code, img, slugName, disabled } = req.body
    console.log('object', req.body)
    try {
        const findNetwork = await TvProviderModel.findById({ _id: _id });
        if(!findNetwork){
            return res.status(404).json({ success: false, data: 'No tv provider with this id found'})
        }

        const updateNetwork = await TvProviderModel.findByIdAndUpdate(
            _id,
            {
                name, 
                code, 
                img, 
                slugName, 
                disabled
            },
            { new: true }
        )

        return res.status(201).json({ success: true, data: 'TV Provider updated Successfull' })
    } catch (error) {
        console.log('UNABLE TO UPDATE TV PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to update tv provider' })
    }
}

export async function deleteTVProvider(req, res){
    const { id } = req.body
    const { firstName, lastName, _id } = req.admin
    try {
        const deleteNewtwork = await TvProviderModel.findByIdAndDelete({ _id: id })

        const newActivity = await ActivitiesModel.create({
            note: `Cable TV Provider deleted`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: 'TV Provider Deleted' })
    } catch (error) {
        console.log('UNABLE TO DELETE TV PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to delete tv provider' })
    }
}

export async function getTVProvider(req, res){
    try {
        const allNetworks = await TvProviderModel.find()

        return res.status(200).json({ success: true, data: allNetworks })
    } catch (error) {
        console.log('UNABLE TO GET ALL TV PROVIDER', error)
        res.status(500).json({ success: false, data: 'Unable to get all tv provider' })
    }
}

export async function getATVProvider(req, res){
    const { id } = req.params
    if(!id){
        return res.status(404).json({ success: false, data: 'Provide an ID' })
    }
    try {
        const network = await TvProviderModel.findById(id)
        
        if(!network){
            return res.status(404).json({ success: false, data: 'Tv provider not found' })
        }

        res.status(200).json({ success: true, data: network })
    } catch (error) {
        res.status(500).json({ success: false, data: 'Unable to get tv provider' })
    }
}