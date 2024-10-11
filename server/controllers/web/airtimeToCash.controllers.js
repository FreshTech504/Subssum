import axios from 'axios'
import TransctionHistroyModel from '../../model/TransactionHistroy.js';
import PendingAirtimeToCashModel from '../../model/PendingAirtimeToCash.js';
import UserModel from '../../model/User.js';
import { registerMail } from '../../middleware/mailer.js';

export async function checkAirtime2CashAvailbe(req, res){
    //console.log('CHECK AVAI', req.body)
    console.log(`URL>>>>  ${process.env.SERVER_URL}/api/web/airtimeToCash/airtimeToCashWebhook/`)
    const { networkCode, networkName, phoneNumber, amount, status, totalAmount, transactionId } = req.body
    const { _id, email } = req.user
    try {
        if(!networkCode || !phoneNumber || !amount || !transactionId){
            return res.status(400).json({ success: false, data: 'Please Fill all Input Feilds'})
        }
        const mobileRegex = /^(090|091|080|081|070|071)\d{8}$/;
        
        if (!mobileRegex.test(phoneNumber)) {
            return res.status(400).json({ success: false, data: 'Invalid phone number' });
        }

        const numberRegex = /^\d+$/;
        if(!numberRegex.test(amount)){
            return res.status(406).json({ success: false, data: 'Invalid amount Number format'})
        }

        let networkValue
        let totalValue
        if(networkCode === '1'){
            networkValue = 'mtn'
            totalValue = Number(amount) - (( 35 * Number(amount) ) / 100)
        }
        if(networkCode === '2'){
            networkValue = 'glo'
            totalValue = Number(amount) - (( 50 * Number(amount) ) / 100)
        }        
        if(networkCode === '3'){
            networkValue = '9mobile'
            totalValue = Number(amount) - (( 50 * Number(amount) ) / 100)
        }        
        if(networkCode === '4'){
            networkValue = 'airtel'
            totalValue = Number(amount) - (( 40 * Number(amount) ) / 100)
        }

        //make a api call to check availablity
        const checkAvailability = await axios.post(
            `${process.env.VTU_AFRIC_URL}/merchant-verify/?apikey=${process.env.VTU_AFRIC_API_KEY}&serviceName=Airtime2Cash&network=${networkValue}`
        )

        const response = checkAvailability.data
        console.log('IS AVAIL',response)
        if(response.description.Status === 'Completed'){
            const newTransaction = await PendingAirtimeToCashModel.create({
                networkCode: networkCode,
                networkValue: networkValue,
                networkName: networkName,
                phoneNumber: phoneNumber,
                sitePhoneNumber: response.description.Phone_Number,
                amount: amount,
                status: status,
                totalAmount: totalValue,
                transactionId: transactionId,
            })

            return res.status(200).json({ success: true, data: response.description })
        }
        //on success send msg to client, create temporary airtime2cash db, create a transaction histroy
        //on fail send error msg to client.

        res.status(200).json({ 
            success: true, 
            data: {
                Status: 'Unavailble',
                Phone_Number: '',
                Network: '',
                message: `${networkName} Airtime to cash is Not Availble. Kindly try again after a while`
            } 
        })
    } catch (error) {
        console.log('UNABLE TO CONVERT AIRTIME TO CASH', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to convert airtime to cash'})
    }
}

export async function validateAirtimeTransfer(req, res) {
    const { transactionId } = req.body
    const { _id, email } = req.user
    try {
        const findPendingTransfer = await PendingAirtimeToCashModel.findOne({ transactionId: transactionId })

        if(!findPendingTransfer){
            return res.status(406).json({ success: false, data: 'Not Tranfer records found' })
        }
        console.log('first lets go')

        let transactionInfoDetails
        const transactionExist = await TransctionHistroyModel.findOne({ transactionId: findPendingTransfer.transactionId })

        if(transactionExist) {
            transactionInfoDetails = transactionExist
        } else {
            const createAirtimeToCashTransction = await TransctionHistroyModel.create({
                userId: _id,
                email: email,
                service: 'Airtime to Cash',
                platform: findPendingTransfer.networkName,
                number: findPendingTransfer.phoneNumber,
                amount: findPendingTransfer.amount,
                totalAmount: findPendingTransfer.totalAmount,
                status: findPendingTransfer.status,
                paymentMethod: 'Transfer',
                transactionId: findPendingTransfer.transactionId,
                serviceId: findPendingTransfer.transactionId,
                slug: 'AirtimeToCash',
                isUserLogin: true
            })
    
            transactionInfoDetails = createAirtimeToCashTransction
        }


        //make req to api
        console.log('first lets go api req')
        const makeValidationReq = await axios.post(
            `${process.env.VTU_AFRIC_URL}/airtime-cash/?apikey=${process.env.VTU_AFRIC_API_KEY}&network=${findPendingTransfer.networkValue}&sender=${email}&sendernumber=${findPendingTransfer.phoneNumber}&amount=${findPendingTransfer.amount}&sitephone=${findPendingTransfer.sitePhoneNumber}&ref=${findPendingTransfer.transactionId}&webhookURL=${process.env.SERVER_URL}/api/web/airtimeToCash/airtimeToCashWebhook/`
        )

        const apiResponse = makeValidationReq.data
        console.log('VERIFI AIRTIEM TO CASH DATA', apiResponse)

        if(apiResponse.description.Status === 'Processing'){
            transactionInfoDetails.status = apiResponse.description.Status
            transactionInfoDetails.amount = apiResponse.description.AmountTransferred
            transactionInfoDetails.serviceId = apiResponse.description.ReferenceID
            await transactionInfoDetails.save()

            return res.status(206).json({ 
                success: true,
                msg: `${apiResponse.description.message}`,
                data: { success: true, data: 'Airtime to cash successful'},
                transaction: transactionInfoDetails
            })
        }

        res.status(406).json({ success: false, data: '' })
    } catch (error) {
        console.log('UNABLE TO VALIDATE AIRTME TRANSFER', error)
        res.status(500).json({ success: false, data: 'Unable to validate transafer' })
    }
}

//Handle webhook
export async function airtimeToCashWebhook(req, res) {
    console.log('AIRTIME TO CASH WEB HOOK BODY', req.body)
    const { ref, status, email, amount, credit, message } = req.body
    try {
        const findTransaction = await TransctionHistroyModel.findOne({ transactionId: ref })
        const getUser = await UserModel.findOne({ email: findTransaction.email })
        if(!findTransaction){
            console.log('TRANSACTION NOT FOUND')
            return res.json({code: 101, status: "Completed", message :"Completed" })
        }
        
        if(status === 'Completed'){
            if(findTransaction.status === 'Successful'){
                console.log('PREVIOUSLY VERIFIED')
                return res.json({code: 101, status: "Completed", message :"Completed" })
            }
            findTransaction.status = 'Successful'
            findTransaction.amount = amount
            await findTransaction.save()

            getUser.acctBalance += Number(findTransaction.totalAmount)
            await getUser.save()

            try {
                await registerMail({
                    username: `${getUser.firstName ? getUser.firstName : ''} ${getUser.lastName ? getUser.lastName : ''}`,
                    userEmail: getUser.email,
                    subject: 'SUCCESSFUL AIRTIME TO CASH TRANSFER',
                    intro: `${message}`,
                    instructions: `You Have Successfully transfer and convert ${amount} naira ${findTransaction.platform} airtime to cash. \n Visit your dashboard to see more`,
                    outro: `
                        Buy Airtime, Data, Cable Tv Subscription Pay Electric bills on Subssum visit ${process.env.MAIL_WEBSITE_LINK} to get started
                    `,
                    verifyUrl: `${process.env.MAIL_WEBSITE_LINK}/login`,
                    text: 'Visit Dashboard',
                });
    
            } catch (error) {
                console.log('ERROR SENDING AIRTIME TO CASH EMAIL', error);
            }

            res.json({code: 101, status: "Completed", message :"Completed" })
        }

    } catch (error) {
        console.log('ERROR FROM AIRTIME TO CASH WEB HOOK', error)
        res.status(500).json({ success: false, data: 'Error from airtime to cash webhook' })
    }
}