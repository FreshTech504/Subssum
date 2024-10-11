import fetch from 'node-fetch'; 
import TransctionHistroyModel from '../../model/TransactionHistroy.js';
import DataPlansModel from "../../model/DataPlans.js"
import CableTvPlanModel from '../../model/CableTvPlans.js';
import { registerMail } from '../../middleware/mailer.js';

//buy airtime with logging
export async function quickBuyAirtime(req, res){
    const { amount, phoneNumber, email, networkCode, networkName, transactionId, status } = req.body
    const { amountPaid, transcationRef } = req.paymentDetails
    try {
        let fullAmount
        fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ))
        if(Number(fullAmount) < Number(amount)){
            console.log('first aa1', fullAmount, amount)
            return res.status(406).json({ success: false, data: 'Invalid amount sent' })
        }
        if(Number(amount) >= 2400){
            fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ) - 100)
        }
        console.log('first aa3', fullAmount, amount)

        let finalAmount = Number(fullAmount) < Number(amount) ? Number(fullAmount) : Number(amount)

        const data = {
            network: networkCode,
            mobile_number: phoneNumber,
            amount: finalAmount,
            airtime_type: 'VTU',
            Ported_number: true
        };

        // Make the POST request with fetch
        const response = await fetch(`${process.env.HUSMODATA_URL}/topup/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${process.env.HUSMODATA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const runBuyAirtime = await response.json();
        
        const airtimeResponse = runBuyAirtime;
        console.log('RESS', airtimeResponse)

        // Create new transaction
        const newTransaction = await TransctionHistroyModel.create({
            userId: email,
            email: email,
            service: `${networkName} airtime VTU`,
            platform: networkName,
            number: phoneNumber,
            amount: finalAmount,
            totalAmount: finalAmount,
            status: status,
            paymentMethod: 'Paystack',
            transactionId: transactionId,
            serviceId: transcationRef,
            slug: 'Airtime',
            isUserLogin: false
        });

        if (airtimeResponse.Status === 'successful') {
            newTransaction.amount = airtimeResponse.paid_amount,
            newTransaction.status = airtimeResponse.Status,
            newTransaction.serviceId = airtimeResponse.id,
            newTransaction.income = Number(fullAmount) - Number(airtimeResponse.paid_amount)

            await newTransaction.save()

            const { amount, income, ...transactionData } = newTransaction._doc;
            return res.status(206).json({
                success: true,
                msg: `NGN${airtimeResponse.amount} ${airtimeResponse.plan_network} Airtime purchase successful`,
                data: { success: true, data: `NGN${airtimeResponse.amount} ${airtimeResponse.plan_network} Airtime purchase successful` },
                transaction: transactionData
            });
        } else {
            newTransaction.status = 'Failed',
            await newTransaction.save()

            console.log('QUICK BUY AIRTIME ERROR FROM API>>')
            return res.status(406).json({ success: false, data: 'Airtime purchase failed' });
        }

    } catch (error) {
        console.log('QUICK BUY AIRTIME ERROR FROM API>>', error)
        res.status(500).json({ success: false, data: 'Airtime purchase failed'})    
    }
}

//buy data with logging
export async function quickBuyData(req, res){
    const { networkCode, phoneNumber, planId, planName, transactionId, status } = req.body
    const { amountPaid, transcationRef } = req.paymentDetails
    try {
        const dataPlan = await DataPlansModel.findById({ _id: planId })
        if(!dataPlan){
            console.log('DATA PLAN COULD NOT BE FOUND')
            res.status(406).end()
        }

        let fullAmount
        fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ))
        if(Number(fullAmount) < Number(amount)){
            console.log('first aa1', fullAmount, amount)
            return res.status(406).json({ success: false, data: 'Invalid amount sent' })
        }
        if(Number(amount) >= 2400){
            fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ) - 100)
        }
        console.log('first aa3', fullAmount, amount)


        if(dataPlan.price > fullAmount){
            return res.status(406).json({ success: false, data: 'Insufficient Funds Transfered' })
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

        // Create new transaction
        const newTransaction = await TransctionHistroyModel.create({
            userId: email,
            email: email,
            service: `${dataPlan?.planName} data`,
            platform: dataPlan.networkName,
            number: phoneNumber,
            amount: dataPlan.price,
            totalAmount: dataPlan.price,
            status: status,
            paymentMethod: 'Paystack',
            transactionId: transactionId,
            serviceId: transcationRef,
            slug: 'Data',
            isUserLogin: false
        });

        const dataResponse = getData?.data
        if (dataResponse.Status === 'successful') {
            newTransaction.service = `${dataResponse?.plan_name} ${dataResponse?.plan_network} data`
            newTransaction.amount = dataResponse.plan_amount
            newTransaction.totalAmount = dataPlan.price
            newTransaction.status = dataResponse.Status
            newTransaction.platform = dataResponse.plan_network
            newTransaction.serviceId = dataResponse.id
            newTransaction.income = Number(dataPlan.price) - Number(dataResponse.plan_amount)
            await newTransaction.save()

            const { amount, income, ...transactionData } = newTransaction._doc;
            return res.status(206).json({
                success: true,
                msg: `${dataResponse.plan_name} ${dataResponse.plan_network} Data purchase successful`,
                data: { success: true, data: `${dataResponse.plan_name} ${dataResponse.plan_network} Data purchase successful` },
                transaction: transactionData
            });
        } else {
            newTransaction.status = 'Failed',
            await newTransaction.save()

            console.log('QUICK BUY DATA ERROR FROM API>>')
            return res.status(406).json({ success: false, data: 'Data purchase failed' });
        }

    } catch (error) {
        console.log('QUICK BUY DATA ERROR FROM API>>', error)
        res.status(500).json({ success: false, data: 'Data purchase failed'})   
    }
}

//buy electricity with logging
export async function quickBuyElectricity(req, res){
    const { providerCode, providerName, meterNumber, amount: inputAmount, transactionId, phoneNumber, meterType } = req.body
    const { amountPaid, transcationRef, status: paymentStatus } = req.paymentDetails
    try {
        let fullAmount
        fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ))
        if(Number(fullAmount) < Number(inputAmount)){
            console.log('first aa1', fullAmount, inputAmount)
            return res.status(406).json({ success: false, data: 'Invalid amount sent' })
        }
        if(Number(inputAmount) >= 2400){
            fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ) - 100)
        }
        console.log('first aa3', fullAmount, inputAmount)

        let finalAmount = Number(fullAmount) < Number(inputAmount) ? Number(fullAmount) : Number(inputAmount)
        
        const payNepaLight = await axios.post(
            `${process.env.HUSSY_URL}/electricity/`,
            {
                "provider": providerCode, 
                "meternumber": meterNumber,
                "amount": Number(finalAmount),
                "metertype":"prepaid/postpaid",
                "phone": phoneNumber,
                "ref": transactionId,
            },
            {
                headers: {
                    "Authorization": `Token ${process.env.HUSSY_API_KEY}`,
                    "Content-Type": 'application/json',
                    "Accept" : '*/*'
                },
            }
        )

        // Create new transaction
        const newTransaction = await TransctionHistroyModel.create({
            userId: _id,
            email: email,
            service: `Electric bills`,
            platform: providerName,
            number: meterNumber,
            amount: inputAmount,
            totalAmount: fullAmount,
            status: status,
            paymentMethod: 'Paystack',
            transactionId: transactionId,
            serviceId: transcationRef,
            slug: 'Electricity',
            isUserLogin: false,
            income: Number(fullAmount) - Number(inputAmount)
        });

        const dataResponse = payNepaLight?.data
        console.log('ELECTRICITY RESPONSE', dataResponse)
        if (dataResponse.status.toLowerCase() === 'success') {
            newTransaction.platform = providerName
            newTransaction.totalAmount = finalAmount
            newTransaction.serviceId = dataResponse?.token
            newTransaction.income = Number(fullAmount) - Number(amount)
            newTransaction.status = 'Successfull'
            await newTransaction.save()

            //SEND EMAIL TO USER
            try {
                await registerMail({
                    username: email,
                    userEmail: email,
                    subject: 'SUCCESSFUL ELECTRIC BILLS PURCHASE',
                    intro: `Successfull Electricity purchase for ${providerName}`,
                    instructions: ` ${dataResponse.token}`,
                    outro: `
                        Buy Airtime, Data, Cable Tv Subscription Pay Electric bills on Subssum visit ${process.env.MAIL_WEBSITE_LINK} to get started
                    `,
                    verifyUrl: `${process.env.MAIL_WEBSITE_LINK}/login`,
                    text: 'Visit Dashboard',
                });
    
            } catch (error) {
                console.log('ERROR SENDING ELECTRIC BILLS PURCHASE EMAIL', error);
            }

            const { amount, income, ...transactionData } = newTransaction._doc;
            return res.status(206).json({
                success: true,
                msg: `${dataResponse?.amount} electric bill for ${providerName} purchase successful`,
                data: { success: true, data: `${inputAmount}  electric bill for ${providerName} purchase successful` },
                transaction: transactionData
            });
        } else {
            newTransaction.status = 'Failed',
            await newTransaction.save()

            console.log('QUICK BUY ELECTRICITIY ERROR FROM API>>')
            return res.status(406).json({ success: false, data: 'Electricity purchase failed' });
        }

    } catch (error) {
        console.log('QUICK BUY ELECTRICITIY ERROR FROM API>>', error)
        res.status(500).json({ success: false, data: 'Electricity purchase failed' })   
    }
}

//buy cableTv with logging
export async function quickBuyCableTv(req, res){
    console.log('PAYMENT', req.paymentDetails)
    console.log('BODY', req.body)
    const { planId, serviceProviderName, smartCardNumber, status, transactionId, email, desc, amount, totalAmount } = req.body
    const { amountPaid, transcationRef, status: paymentStatus } = req.paymentDetails
    try {
        const findcabletvplan = await CableTvPlanModel.findById({ _id : planId })
        if(!findcabletvplan){
            return res.status(406).status({ success: false, data: 'Cable Tv with plan ID not found '})
        }

        // Create new transaction
        const newTransaction = await TransctionHistroyModel.create({
            userId: email,
            email: email,
            service: `${desc}`,
            platform: findcabletvplan.platformName,
            number: smartCardNumber,
            amount: findcabletvplan.costPrice,
            totalAmount: findcabletvplan.price,
            status: status,
            paymentMethod: 'Paystack',
            transactionId: transactionId,
            serviceId: transcationRef,
            slug: 'CableTv',
            isUserLogin: false,
            income: Number(findcabletvplan.price) - (findcabletvplan.costPrice)
        });
        if(!planId || !smartCardNumber){
            return res.status(406).json({ success: false, data: 'Fill all required fileds'})
        }

        let fullAmount
        fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ))
        if(Number(fullAmount) < Number(amount)){
            console.log('first aa1', fullAmount, amount)
            return res.status(406).json({ success: false, data: 'Invalid amount sent' })
        }
        if(Number(amount) >= 2400){
            fullAmount = Math.ceil(Number(Number(amountPaid) - ((amountPaid * 1.5) / 100) ) - 100)
        }
        console.log('first aa3', fullAmount, amount)

        if(findcabletvplan.price > fullAmount){
            return res.status(406).json({ success: false, data: 'Insufficient Funds Transfered' })
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
            newTransaction.status = 'Successsful'
            newTransaction.income = Number(fullAmount) - (findcabletvplan.costPrice)
            await newTransaction.save()

            const { amount, income, ...transactionData } = newTransaction._doc;

            return res.status(206).json({
                success: true,
                msg: `${findcabletvplan.planName} for ${findcabletvplan.platformName} purchase successful`,
                data: { success: true, data: `${findcabletvplan.planName} for ${findcabletvplan.platformName} purchase successful` },
                transaction: transactionData
            });
        } else {
            newTransaction.status = 'Failed'
            await newTransaction.save()

            console.log('QUICK BUY CABLE TV ERROR FROM API>>')
            return res.status(406).json({ success: false, data: 'Cable Tv purchase failed' });
        }
        
    } catch (error) {
        console.log('QUICK BUY CABLE TV ERROR FROM API>>>', error)
        res.status(500).json({ success: false, data: 'able Tv purchase failed'})   
    }
}