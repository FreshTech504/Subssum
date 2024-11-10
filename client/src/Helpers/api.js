import axios from 'axios'
import toast from 'react-hot-toast'

//axios.defaults.baseURL = 'https://subssum-api-1bhd.onrender.com/api/web'
//axios.defaults.baseURL = 'http://localhost:9000/api/web'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

export async function registerUser(formData){
    try {
        const res = await axios.post('/auth/register', formData, {withCredentials: true})
        if(res.data.success){
            return res.data
        }
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to register User'
        //toast.error(errorMsg)
        //console.log('REGISTER ERROR', error)
        const res = error.response || 'Unable to register user'
        return res
    }
}

export async function loginUser(formData){
    try {
        const res = await axios.post('/auth/login', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to Login User'
        //toast.error(errorMsg)
        //console.log('LOGIN ERROR', error)
        const res = error.response || 'Unable to login user'
        return res
    }
}

//GOOGLE LOGIN
export async function oAuth(formData){
    try {
        const res = await axios.post('/auth/google', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Login User via Google'
        toast.error(errorMsg)
        //console.log('LOGIN ERROR', error)
    }
}

export async function verifyUser({ id, token}){
    try {
        const res = await axios.post(`/auth/${id}/verify/${token}`)
        if(res.data.success){
            toast.success('Email Verified')
            return res
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Verify Account'
        toast.error(errorMsg)
        //console.log('first', error)
    }
}

export async function forgotPassword(formData){
    try {
        const res = await axios.post('/auth/forgotPassword', formData, {withCredentials: true})
        //console.log('forgot password',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess forgot password request'
        //toast.error(errorMsg)
        //console.log('FORGOT PASSWORD', error)
        const res = error.response || 'Unable to login user'
        return res
    }
}

export async function resetPassword(formData){
    try {
        const res = await axios.post(`/auth/resetPassword/${formData.resetToken}`, formData, {withCredentials: true})
        console.log('reset password',res)
        return res
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess forgot password request'
        //toast.error(errorMsg)
        console.log('RESET PASSWORD', error)
        const res = error.response || 'Unable to reset password'
        return res
    }
}

//USER SIGNOUT
export async function signoutUser(){
    try {
        const res = await axios.post(`/auth/signout`, {withCredentials: true})
        //console.log('signout',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess signout request'
        toast.error(errorMsg)
        //console.log('SIGNOUT REQUEST', error)
    }
}

export async function createNewPin(formData){
    try {
        const res = await axios.post(`/user/createPin`, formData, {withCredentials: true})
        //console.log('create new pin',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to create new pin'
        toast.error(errorMsg)
        //console.log('CREATE NEW PIN', error)
    }
}

export async function updatePin(formData){
    try {
        const res = await axios.post(`/user/updatePin`, formData, {withCredentials: true})
        //console.log('update pin',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to update new pin'
        toast.error(errorMsg)
        //console.log('UPDATE PIN', error)
    }
}

export async function updatePassword(formData){
    try {
        const res = await axios.post(`/user/updatePassword`, formData, {withCredentials: true})
        //console.log('update password',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to update new password'
        toast.error(errorMsg)
        //console.log('UPDATE PASSWORD', error)
    }
}

export async function updateTransactionPin(formData){
    try {
        const res = await axios.post(`/user/updatePin`, formData, {withCredentials: true})
        //console.log('update new pin',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to update new pin'
        toast.error(errorMsg)
        //console.log('RESET PASSWORD', error)
    }
}

//update user endpoint
export async function updateUser(formData){
    try {
        const res = await axios.post(`/user/updateUser`, formData, {withCredentials: true})
        //console.log('update user',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to update user details'
        toast.error(errorMsg)
        //console.log('UPDATE USER', error)
    }
}

//update user profile picture endpoint
export async function updateUserProfilePicture({imgUrl}){
    try {
        const res = await axios.post(`/user/updateUserProfilePicture`, {imgUrl}, {withCredentials: true})
        //console.log('update user',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to update user details'
        toast.error(errorMsg)
        //console.log('UPDATE USER', error)
    }
}

//User cashout bounus wallet
export async function cashoutBonus(formData){
    try {
        const res = await axios.post(`/user/cashoutBonus`, formData, {withCredentials: true})
        //console.log('cash out pin',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response || 'Unable to cashout bonus'
        toast.error(res.data.data)
        //console.log('RESET PASSWORD', error)
        return res
    }
}

//Pay with paystack
export async function payWithPaystack(formData){
    try {
        const res = await axios.post(`/funding/payWithPaystack`, formData, {withCredentials: true})
        const url = res.data.authorizationUrl
        window.location.href = url

    } catch (error) {
        const res = error.response || 'Unable to pay with paystack'
        toast.error(res.data.data)
        //console.log('|PAYSTACK ERROR', error)
        return res
    }
}

//pay with monnify
export async function payWithMonnify(formData){
    try {
        const res = await axios.post(`/funding/payWithMonnify`, formData, {withCredentials: true})
        if(res.data){
            const authorizationUrl = res.data.authorizationUrl;
            window.location.href = authorizationUrl; 
        }
    } catch (error) {
        const res = error.response || 'Unable to pay with monnify'
        toast.error(res.data.data)
        //console.log('MONNIFY ERROR', error)
        return res
    }
}

//Verify payment
export async function verifyPaymentTransactions({paymentReference}){
    try {
        const res = await axios.post(`/funding/verifyPaymentTransactions`, {paymentReference}, {withCredentials: true})
        if(res.data.success){
            return res.data
        }

    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Verify Payment request'
        toast.error(errorMsg)
        //console.log('PAYMENT REQUEST', error)
    }
}

//DATA
//Buy data
export async function buyData(formData){
    try {
        const res = await axios.post(`/data/buyData`, formData, {withCredentials: true})
        //console.log('buy data',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy data'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}

//AIRTIME
//Buy airtime
export async function buyAirtime(formData){
    try {
        const res = await axios.post(`/airtime/buyAirtime`, formData, {withCredentials: true})
        //console.log('buy data',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy data'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}


//TRANSACTIONS
//Download Transaction reciept
export async function downloadReciept({id}){
    try {
        const res = await axios.post(`/transactions/downloadReciept`, {id}, { responseType: 'blob', withCredentials: true })
        //console.log('buy data',res)
        if(res?.data){
            // Create a Blob directly from the response data
            const blob = new Blob([res.data], { type: 'application/pdf' });
            //window.location.reload()
            // Use window.open to open a new window with the PDF content
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } else {
            console.error('PDF data not received from the server');
            // Handle the case where the server did not provide the PDF data
        }
    } catch (error) {
        const res = error.response || 'Unable to buy data'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}

export async function reportTransaction(formData){
    try {
        const res = await axios.post(`/transactions/reportTransaction`, formData, {withCredentials: true})
        //console.log('report transactions',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to report transaction'
        //toast.error(res.data.data)
        //console.log('REPORT TRANSACTIONS', error)
        return res
    }
}


//CABLE TV
//buy cable Tv Plan
export async function buyCableTvPlan(formData){
    try {
        const res = await axios.post(`/cabletv/buyCableTvPlan`, formData, {withCredentials: true})
        //console.log('buy cabeletv',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy cable tv'
        toast.error(res.data.data)
        //console.log('BUY CABLETV', error)
        return res
    }
}

//validate smart card number
export async function validateCardNumber({id, number}) {
    try {
        const res = await axios.post('/cabletv/validateCardNumber', {id, number}, {withCredentials: true})
        return res
    } catch (error) {
        console.log('UNable to validate name:', error)
        return res
    }
}

//ELECTRICITY
//validate meter number
export async function validateMeterNumber({providerSlug, meterNumber}) {
    try {
        const res = await axios.post('/electric/validateMeterNumber', {providerSlug, meterNumber}, {withCredentials: true})
        return res
    } catch (error) {
        console.log('UNable to validate name:', error)
        return res
    }
}

//buy cable Tv Plan
export async function buyElectricBill(formData){
    try {
        const res = await axios.post(`/electric/buyElectricBill`, formData, {withCredentials: true})
        //console.log('buy cabeletv',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy cable tv'
        toast.error(res.data.data)
        //console.log('BUY CABLETV', error)
        return res
    }
}

//AIRTIME TO CASH
//Check for airtime to cash availablity
export async function checkAirtime2CashAvailbe(formData) {
    try {
        const res = await axios.post('/airtimeToCash/checkAirtime2CashAvailbe', formData, { withCredentials: true })
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable initialze transfer process'
        toast.error(res.data.data)
        //console.log('UNABLE CHECK AVAILABILTY OF AIRTIME TO CASH', error)
        return res
    }
}

//validate airtime transfer
export async function validateAirtimeTransfer(formData) {
    try {
        const res = await axios.post('/airtimeToCash/validateAirtimeTransfer', formData, { withCredentials: true })
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable validate airtime transfer process'
        toast.error(res.data.data)
        //console.log('UNABLE TO VALIDATE AIRTIME TRANSFER', error)
        return res
    }
}

//QUICK BUY
// /quick buy Airtime
export async function quickBuyAirtime(updatedFormData){
    try {
        const res = await axios.post(`/quickbuy/quickBuyAirtime`, updatedFormData)
        //console.log('buy data',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy airtime'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}

//quick buy Data
export async function quickBuyData(formData){
    try {
        const res = await axios.post(`/quickbuy/quickBuyData`, formData)
        //console.log('buy data',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy data'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}

//quick buy CableTv
export async function quickBuyCableTv(formData){
    try {
        const res = await axios.post(`/quickbuy/quickBuyCableTv`, formData)
        //console.log('buy data',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to pay cable tv'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}

//quick buy Electricity
export async function quickBuyElectricity(formData){
    try {
        const res = await axios.post(`/quickbuy/quickBuyElectricity`, formData)
        //console.log('buy data',res)
        if(res.data){
            return res
        }
    } catch (error) {
        const res = error.response || 'Unable to buy electricity'
        toast.error(res.data.data)
        //console.log('BUY DATA', error)
        return res
    }
}

//ADMIN
export async function adminPasswordLogin(formData){
    try {
        const res = await axios.post('/admin/login', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to Login User'
        //toast.error(errorMsg)
        //console.log('LOGIN ERROR', error)
        const res = error.response || 'Unable to login user'
        return res
    }
}

//Validate passcode
export async function adminPasscodeLogin(formData){
    try {
        const res = await axios.post('/admin/validatePasscode', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to Login User'
        //toast.error(errorMsg)
        //console.log('LOGIN ERROR', error)
        const res = error.response || 'Unable to login user'
        return res
    }
}

export async function signoutAdmin(){
    try {
        const res = await axios.post(`/admin/signout`, {withCredentials: true})
        //console.log('signout',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess signout request'
        toast.error(errorMsg)
        //console.log('SIGNOUT REQUEST', error)
    }
}

export async function updateTracStatus({ id, status }){
    try {
        const res = await axios.post(`/transactions/updateTracStatus`, { id, status }, {withCredentials: true})
        console.log('update transactions',res)
        if(res.data.success){
            toast.success(res.data.dat)
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess signout request'
        const res = error.response || 'error'
        toast.error(errorMsg)
        //console.log('update transaction status REQUEST', error)
    }
}

//Admin update user
export async function adminUpdateUser(formData){
    try {
        const res = await axios.post('/user/adminUpdateUser', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to Login User'
        //toast.error(errorMsg)
        //console.log('UPADATE USER ERROR', error)
        const res = error.response || 'Unable to update user'
        return res.data
    }
}

// ADMIN toggle block user
export async function blockUser({ id }){
    try {
        const res = await axios.post('/user/blockUser', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to toggle user'
        //toast.error(errorMsg)
        //console.log('UPADATE USER ERROR', error)
        const res = error.response || 'Unable to block/unblock user'
        return res.data
    }
}

// ADMIN 
export async function makeAdmin(formData){
    try {
        const res = await axios.post('/admin/makeAdmin', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //const errorMsg = error.response.data.data || 'Unable to make admin'
        //toast.error(errorMsg)
        //console.log('UPADATE USER ERROR', error)
        const res = error.response || 'Unable to make admin'
        return res.data
    }
}

// NEW NETWORK 
export async function newNetwork(formData){
    try {
        const res = await axios.post('/network/createNetwork', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('NEW NETWORK',error)
        const res = error.response || 'Unable to add new network'
        return res.data
    }
}

// UPDATE NETWORK 
export async function updateNetwork(formData){
    try {
        const res = await axios.post('/network/updateNetwork', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('UPDATE NETWORK',error)
        const res = error.response || 'Unable to update network'
        return res.data
    }
}

// CREATE DATA PLAN  
export async function createDataPlans(formData){
    try {
        const res = await axios.post('/data/createDataPlans', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('CREATE DATA PLAN',error)
        const res = error.response || 'Unable to create data plam'
        return res.data
    }
}

// UPDATE DATA PLAN 
export async function updateDataPlans(formData){
    try {
        const res = await axios.post('/data/updateDataPlans', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('UPDATE DATA PLAN',error)
        const res = error.response || 'Unable to update data plan'
        return res.data
    }
}

// DELETE DATA PLAN 
export async function deleteDataPlan({ id }){
    try {
        const res = await axios.post('/data/deleteDataPlan', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('DELETE DATA PLAN',error)
        const res = error.response || 'Unable to delete data plan'
        return res.data
    }
}

// NEW TV PROVIDER 
export async function createTVProvider(formData){
    try {
        const res = await axios.post('/cabletv/createTVProvider', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('NEW TV PROVIDER',error)
        const res = error.response || 'Unable to add new tv provider'
        return res.data
    }
}

// UPDATE TV PROVIDER 
export async function updateTvProvider(updatedFormData){
    try {
        const res = await axios.post('/cabletv/updateTVProvider', updatedFormData, {withCredentials: true})
        return res.data
    } catch (error) {
        //console.log('UPDATE TV PROVIDER',error)
        const res = error.response || 'Unable to update tv provider'
        return res.data
    }
}