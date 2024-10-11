import MonnifyModel from "../../model/Monnify.js";
import PendingFundingModel from "../../model/PendingFunding.js";
import TransctionHistroyModel from "../../model/TransactionHistroy.js";
import UserModel from "../../model/User.js";
import axios from 'axios'
import schedule  from 'node-schedule'
import { v4 as uuidv4 } from 'uuid';

function convertToNumber(str) {
    return parseFloat(str);
}

function isNumber(value) {
    return Number.isFinite(value);
}

export async function payWithPaystack(req, res) {
    const { _id, email } = req.user
    const { amount } = req.body
    try {
        const geUser = await UserModel.findById({ _id })
        const makeNumber = convertToNumber(amount)
        const isANumber = isNumber(makeNumber) 

        if(!isANumber){
            return res.status(406).json({ success: false, data: 'Invalid Amount'})
        }

        if(makeNumber < 500){
            return res.status(400).json({ success: false, data: 'Minimium Amount is 500'})
        }

        const fullAmount = makeNumber * 100
        const response = await axios.post(
            `${process.env.PAYSTACK_INITIALIZE_URL}`,
            {
              email,
              amount: fullAmount,
              callback_url: process.env.CALLBACK_URL
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_TEST_SK}`,
                'Content-Type': 'application/json'
              }
            }
          );
      
          console.log(response.data);
          const { authorization_url, reference } = response.data.data;
          console.log('refrence',reference)
          const newPendingFunding = await PendingFundingModel.create({
            source: 'paystack', transactionRef: reference, monnifyRef: reference
            })
          
          res.send({ authorizationUrl: authorization_url });

    } catch (error) {
        console.log('UNABLE TO INITIALIZE PAYSTACK PAYMENT', error)
        res.status(500).json({ success: false, data: 'Unable to initailze paystack payment'})
    }
}


//MONNIFY
// Scheduler to run every 45 minute
const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 45); // This task runs every 45 minute
let isRunningMonnify = false; 
// Schedule the task
const task = schedule.scheduleJob(rule, async () => {
    if (isRunningMonnify) {
        return;
    }

    isRunningMonnify = true;

    try {
        const apikey = process.env.MONNIFY_API_KEY
        const secretKey = process.env.MONNIFY_SECRET_KEY
        const monnifyUrl = process.env.MONNIFY_API
        

        const decodeApikey = btoa(`${apikey}:${secretKey}`)
        
        const res = await axios.post(
            `${monnifyUrl}/api/v1/auth/login`,
            {},
            {
                headers: {
                    Authorization: `Basic ${decodeApikey}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const token = res?.data.responseBody.accessToken

        if(token){
            await MonnifyModel.findOneAndUpdate(
                {},
                { apikey: token },
                { upsert: true, new: true}
            )
        }

        console.log('TOKEN SAVED SUCCESSFUL')

    } catch (error) {
        console.log('UNABLE TO GENERATE AN API AUTHORIZATION TOKEN FOR MONNIFY', error)
    } finally {
        isRunningMonnify = false
    }
});


export async function payWithMonnify(req, res) {
    const { _id, email, firstName, lastName } = req.user
    const { amount } = req.body
    try {
        const geUser = await UserModel.findById({ _id })
        const makeNumber = convertToNumber(amount)
        const isANumber = isNumber(makeNumber) 

        if(!isANumber){
            return res.status(406).json({ success: false, data: 'Invalid Amount'})
        }

        if(makeNumber < 500){
            return res.status(400).json({ success: false, data: 'Minimium Amount is 500'})
        }

        const userId = _id
        const generatedUniqueCode = `${userId}-${uuidv4()}`;
        const monnifyUrl = process.env.MONNIFY_API
        const callbackUrl = process.env.CALLBACK_URL
        const contractCode = process.env.MONNIFY_CONTRACT_CODE
        const tokenDoc = await MonnifyModel.findOne();
        const token = tokenDoc ? tokenDoc.apikey : null;

        if (!token) {
            return res.status(404).json({ success: false, data: 'Monnify token not found' });
        }

        const response = await axios.post(
            `${monnifyUrl}/api/v1/merchant/transactions/init-transaction`,
            {
                amount: makeNumber,
                customerName: `${firstName} ${lastName}`,
                customerEmail: `${email}`,
                paymentReference: generatedUniqueCode,
                paymentDescription: "Wallet Funding",
                currencyCode: "NGN",
                contractCode: contractCode,
                redirectUrl: callbackUrl,
                paymentMethods:["CARD","ACCOUNT_TRANSFER", "USSD"]
            },
            {
                headers: {
                    Authorization: `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        console.log(response.data.responseBody)
        const newPendingFunding = await PendingFundingModel.create({
            source: 'monnify', transactionRef: response.data.responseBody.paymentReference, monnifyRef: response.data.responseBody.transactionReference
            })

            res.send({ authorizationUrl: response.data.responseBody.checkoutUrl });
    } catch (error) {
        console.log('UNABLE TO INITIALIZE MONNIFY PAYMENT', error)
        res.status(500).json({ success: false, data: 'Unable to initailze monnify payment'})
    }
}

export async function verifyPaymentTransactions(req, res){
    const { paymentReference } = req.body
    const { _id } = req.user
    console.log('REFF',paymentReference)
    try {
        if(!paymentReference){
            console.log('Invalid Payment refrence')
            return res.end()
        }

        const pendingFundingExist = await PendingFundingModel.findOne({ transactionRef: paymentReference })
        if(pendingFundingExist){
            console.log('TRANSACVTION FOUND', pendingFundingExist)
        }
        if(!pendingFundingExist){
            console.log('TRANSACTIONS EXPIRED')
            return res.end()
          }
        
        const transactionExist = await TransctionHistroyModel.findOne({ transactionId: paymentReference })
            
        if(transactionExist){
          console.log('TRANSACTIONS ALREADY VERIFIED')
          return res.end()
        }

        //VERIFY FOR PAYSTACK
        if(pendingFundingExist.source === 'paystack' ){
            const response = await axios.get(
                `${process.env.PAYSTACK_VERIFY_URL}/${paymentReference}`,
                {
                  headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_TEST_SK}`,
                    'Content-Type': 'application/json'
                  }
                }
              );
          
              console.log('PAYSTACK VERIFY DATA>>',response.data);
              const data = response.data.data
              if(data.status !== 'success' && data.gateway_response !== 'Successful'){
                return res.status(403).json({ success: false, data: 'Invalid'})
              }
    
              const amount = data.amount
              const email = data.customer.email
              const reference = data.reference
              const channel = data.channel
    
              const user = await UserModel.findOne({ email });
              if(!user){
                console.log('USER NOT FOUND', email)
              }

    
              if (user) {
                const value = amount / 100; // Convert from kobo to naira
                user.acctBalance += value;
                await user.save();
                console.log('Account funded for user:', email);
                const transactionRef = reference || 'no transaction refrence';
              
                // Saving the transaction
                const transactionData = {
                    userId: user._id,
                    email: user.email,
                    service: 'Account Funding',
                    number: transactionRef,
                    amount: parseFloat(value),
                    platform: 'Paystack',
                    totalAmount: parseFloat(value),
                    status: 'Successful',
                    paymentMethod: channel,
                    transactionId: transactionRef,
                    credit: true,
                    isUserLogin: true,
                    slug: 'Funding'
                };
                const createdTransaction = await TransctionHistroyModel.create(transactionData);
                //console.log('Transaction>>', createdTransaction)
                const deleteRef = await PendingFundingModel.findOneAndDelete({ transactionRef: paymentReference })
            }
    
            const { resetPasswordToken, resetPasswordExpire, password, pin, ...userData } = user._doc
            return res.status(200).json({ success: true, data: userData })
        }

        //VERIFY FOR MONNIFY
        if(pendingFundingExist.source === 'monnify'){
            const tokenDoc = await MonnifyModel.findOne();
            const token = tokenDoc ? tokenDoc.apikey : null;
    
            if (!token) {
                return res.status(404).json({ success: false, data: 'Monnify token not found' });
            }

            const response = await axios.get(
                `${process.env.MONNIFY_API}/api/v2/transactions/${encodeURIComponent(pendingFundingExist.monnifyRef)}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
    
            console.log('RESPONSE', response.data.responseBody);
            console.log('RESPONSE', response.data.responseBody.customer);
            const data = response.data.responseBody
    
            const findUser = await UserModel.findOne({ email: response.data.responseBody.customer.email })
            if(data.paymentStatus === 'PAID'){
                if(!findUser){
                    return res.status(404).json({ success: false, data: 'Invalid User - Not Found' })
                }
                
                console.log('first',findUser.acctBalance)
                findUser.acctBalance = Number(findUser.acctBalance) + Number(response.data.responseBody.amountPaid);
                await findUser.save()
                console.log('first',findUser.acctBalance)
    
                
                const transactionData = {
                    userId: findUser._id,
                    email: findUser.email,
                    service: 'Account Funding',
                    number: data.transactionReference,
                    amount: data.amountPaid,
                    platform: 'Monnify',
                    totalAmount: data.amountPaid,
                    status: 'Successful',
                    paymentMethod: data.paymentMethod,
                    transactionId: data.transactionReference,
                    credit: true,
                    isUserLogin: true,
                    slug: 'Funding'
                }
                
                const createdTransaction = await TransctionHistroyModel.create(transactionData);
    
                await PendingFundingModel.findOneAndDelete({ transactionRef: paymentReference })
            }
    
            const { resetPasswordToken, resetPasswordExpire, password, pin, ...userData } = findUser._doc
            return res.status(200).json({ success: true, data: userData })
        }

    } catch (error) {
        console.log('UNABLE TO VERIFY PAYSTACK FUNDING', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to verify paystack funding'})
    }
}