import ActivitiesModel from "../../model/Activities.js";
import PayoutModel from "../../model/Payout.js";
import TransctionHistroyModel from "../../model/TransactionHistroy.js";
import UserModel from "../../model/User.js";

function convertToNumber(str) {
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num; 
}

function isNumber(value) {
    return Number.isFinite(value) && value > 0; 
}

//USER CREATE PIN
export async function createPin(req, res) {
    const { _id } = req.user
    const { pin } = req.body
    try {
        const getUser = await UserModel.findById({ _id: _id })
        const numPin = convertToNumber(pin)

        const checkPin = isNumber(numPin)

        if(!checkPin){
            return res.status(400).json({ success: false, data: 'Pin must be a number'})
        }
        const easyPinPattern = /^(1234|2345|3456|4567|5678|6789|7890|9876|8765|7654|6543|5432|4321|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/;
        if(easyPinPattern.test(!pin)){
            return res.status(400).json({ success: false, data: 'Pin Is Easy please use a diffrent one'})
        }

        getUser.pin = pin
        await getUser.save()

        res.status(201).json({ success: true, data: 'Pin Created Successfull'})
    } catch (error) {
        console.log('UANBLE TO CREATE PIN', error)
        return res.status(500).json({ success: false, data: 'Unable to create pin'})
    }
}

//USER UPDATE PIN
export async function updatePin(req, res) {
    const { _id } = req.user
    const { oldPin, pin, confirmPin } = req.body
    try {
        const getUser = await UserModel.findById({ _id: _id })
        const numPin = convertToNumber(pin)

        const checkPin = isNumber(numPin)

        if(!checkPin){
            return res.status(400).json({ success: false, data: 'Pin must be a number'})
        }

        const isMatchOldPin = await getUser.matchPin(oldPin);


        if(!isMatchOldPin){
            return res.status(400).json({ success: false, data: 'Current Pin is not correct'})
        }

        const easyPinPattern = /^(1234|2345|3456|4567|5678|6789|7890|9876|8765|7654|6543|5432|4321|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/;
        if(easyPinPattern.test(!pin)){
            return res.status(400).json({ success: false, data: 'Pin Is Easy please use a diffrent one'})
        }
        if(pin !== confirmPin){
            return res.status(400).json({ success: false, data: 'Pin and Confirm Pin do not match'})
        }

        getUser.pin = pin
        await getUser.save()

        res.status(201).json({ success: true, data: 'Pin Updated Successfull'})
    } catch (error) {
        console.log('UANBLE TO UPDATE PIN', error)
        return res.status(500).json({ success: false, data: 'Unable to update pin'})
    }
}

//UPDATE USER PASSWORD
export async function updatePassword(req, res) {
    const { _id } = req.user
    const { oldPassword, password, confirmPassword } = req.body
    try {
        const getUser = await UserModel.findById({ _id: _id })
        const isMatchOldPin = await getUser.matchPasswords(oldPassword);


        if(!isMatchOldPin){
            return res.status(400).json({ success: false, data: 'Current Password is not correct'})
        }

        const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/;
        if (!specialChars.test(password)) {
            return res.status(400).json({ success: false, data: 'Passwords must contain at least one special character' });
        }
        if(password !== confirmPassword){
            return res.status(400).json({ success: false, data: 'Password and Confirm Password do not match'})
        }

        getUser.password = password
        await getUser.save()

        res.status(201).json({ success: true, data: 'Password Updated Successfull'})
    } catch (error) {
        console.log('UANBLE TO UPDATE PASSWORD', error)
        return res.status(500).json({ success: false, data: 'Unable to update Password'})
    }
}

//GET ALL USERS FOR ADMIN
export async function getAllUsers(req, res){
    try {
        const allUsers = await UserModel.find().select('-password -pin');
        res.status(200).json({ success: true, data: allUsers})
    } catch (error) {
        console.log('UNABLE TO GET ALL USERS', error)
        res.status(500).json({ success: false, data: error.message || 'Uanble to get all users' })
    }
}

//GET A USER FOR ADMIN
export async function getUser(req, res){
    const { id } = req.params
    try {
        const userData = await UserModel.findById(id).select('-password -pin');

        res.status(200).json({ success: true, data: userData})
    } catch (error) {
        console.log('UNABLE TO GET USER', error)
        res.status(500).json({ success: false, data: error.message || 'Uanble to get user' })
    }
}
  
//ADMIN UPDATE USER
export async function adminUpdateUser(req, res){
    const { blocked, _id, username, firstName, lastName, mobile, email, acctBalance, walletBonus, cashWallet, referralLink, transactionTotal } = req.body
    if(req.body.password){
        return res.status(403).json({ success: false, data: 'Not allowed to update password' })
    }
    try {
        const findUser = await UserModel.findById({ _id: _id });
        if(!findUser){
            return res.status(404).json({ success: false, data: 'No user with this id found'})
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    email,
                    blocked,
                    username,
                    firstName,
                    lastName,
                    mobile,
                    acctBalance,
                    walletBonus,
                    cashWallet,
                    referralLink,
                    transactionTotal, 
                }
            },
            { new: true }
        );
        return res.status(200).json({ success: true, data: `User Info Updated` });
    } catch (error) {
        console.log('UNABLE TO UPDATE USER DATA', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to update user data' });
    }
}

//USER ENDPOINT TO UPDATE ACCOUNT
export async function updateUser(req, res){
    const { username, firstName, lastName, mobile, bankName, accountName, accountNumber } = req.body
    const { _id } = req.user
    try {
        const findUser = await UserModel.findById({ _id: _id });
        if(!findUser){
            return res.status(404).json({ success: false, data: 'No user with this id found'})
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    username,
                    firstName,
                    lastName,
                    mobile,
                    bankName, 
                    accountName, 
                    accountNumber
                }
            },
            { new: true }
        );
        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, pin, ...userData } = updateUser._doc
        return res.status(200).json({ success: true, data: {success: true, data: userData} });
    } catch (error) {
        console.log('UNABLE TO UPDATE USER DATA', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to update user data' });
    }
}

//USER ENDPOINT TO UPDATE PROFILE PICTURE
export async function updateUserProfilePicture(req, res){
    const { imgUrl } = req.body
    const { _id } = req.user
    try {
        const findUser = await UserModel.findById({ _id: _id });
        if(!findUser){
            return res.status(404).json({ success: false, data: 'No user with this id found'})
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    profile: imgUrl
                }
            },
            { new: true }
        );
        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, pin, ...userData } = updateUser._doc
        return res.status(200).json({ success: true, data: {success: true, data: userData} });
    } catch (error) {
        console.log('UNABLE TO UPDATE USER DATA', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to update user data' });
    }
}

//USER CASHOUT FROM CASHOUT ACCOUNT
export async function cashoutBonus(req, res) {
    const { _id } = req.user;
    const { cashoutAmount } = req.body;

    try {
        const getUser = await UserModel.findById(_id);

        // Convert cashoutAmount to a number
        const makeNumber = convertToNumber(cashoutAmount);
        const isANumber = isNumber(makeNumber);

        if (!isANumber) {
            return res.status(406).json({ success: false, data: 'Invalid Amount' });
        }

        if (getUser.walletBonus < makeNumber) {
            return res.status(406).json({ success: false, data: 'Insufficient Fund' });
        }

        // Update balances
        getUser.acctBalance += makeNumber;
        getUser.walletBonus -= makeNumber;
        await getUser.save(); // Save changes to the database

        // Exclude sensitive fields
        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, pin, ...userData } = getUser._doc;

        res.status(200).json({ success: true, msg: 'Cash Bonus withdrawal successful', data: { success: true, data: userData } });
    } catch (error) {
        console.log('UNABLE TO PROCESS CASHOUT', error);
        res.status(500).json({ success: false, data: 'Unable to process cashout request' });
    }
}

//USER REQUEST PAYOUT FROM ACCOUNT
export async function requestPayout(req, res) {
    const { _id } = req.user;
    const { cashoutAmount } = req.body;

    try {
        const getUser = await UserModel.findById(_id);

        // Convert cashoutAmount to a number
        const makeNumber = convertToNumber(cashoutAmount);
        const isANumber = isNumber(makeNumber);

        if (!isANumber) {
            return res.status(406).json({ success: false, data: 'Invalid Amount' });
        }

        if (getUser.cashWallet < makeNumber) {
            return res.status(406).json({ success: false, data: 'Insufficient Fund' });
        }

        if (makeNumber < 1000) {
            return res.status(406).json({ success: false, data: 'Minimium Withdrawal is NGN1000' });
        }

        const finalAmount = makeNumber - 50

        //PROCRESS REQUEST TO ADMIN
        const newRequestPayout = await PayoutModel.create({
            userId: getUser._id,
            amount: finalAmount,
            bankName: getUser.bankName,
            accountName: getUser.accountName,
            accountNumber: getUser.accountNumber,
            email: getUser?.email
        })

        const newActivity = await ActivitiesModel.create({
            note: `${getUser?.firstName} ${getUser?.lastName} made a payout request of ${finalAmount}`,
            name: `${getUser?.firstName} ${getUser?.lastName}`,
            userId: getUser?._id
        })

        //CREATE NEW TRANSACTION
        const createPayoutRequestTransaction = await TransctionHistroyModel.create({
            userId: getUser?._id,
            email: getUser?.email,
            service: 'Payout Request',
            platform: 'Cash Withdrawal',
            number: `${getUser.bankName} - ${getUser.accountNumber}`,
            amount: makeNumber,
            totalAmount: finalAmount,
            status: 'initiated',
            paymentMethod: 'Transfer',
            transactionId: newRequestPayout._id,
            serviceId: newRequestPayout._id,
            slug: 'PayoutRequest',
            isUserLogin: true
        })


        // Update balances
        //getUser.acctBalance += makeNumber;
        getUser.cashWallet -= makeNumber;
        await getUser.save(); // Save changes to the database

        // Exclude sensitive fields
        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, pin, ...userData } = getUser._doc;

        res.status(200).json({ success: true, msg: 'Cash withdrawal request successful', data: { success: true, data: userData } });
    } catch (error) {
        console.log('UNABLE TO PROCESS CASHOUT', error);
        res.status(500).json({ success: false, data: 'Unable to process cashout request' });
    }
}

//APPROVE PAYOUT
export async function approvePayout(req, res){
    const { id } = req.body
    const { _id, firstName, lastName } = req.admin
    try {
        const findReq = await PayoutModel.findById({ _id: id })
        if(!findReq){
            return res.status(404).json({ success: false, data: 'Payout request with the ID does not exist '})
        }
        findReq.approved = true
        await findReq.save()

        const findTransaction = await TransctionHistroyModel.findOne({ transactionId: id })
        if(findTransaction){
            findTransaction.income = Number(findTransaction?.amount) - Number(findTransaction?.totalAmount)
            findTransaction.status= 'Successful',
            await findTransaction.save()
        }

        const newActivity = await ActivitiesModel.create({
            note: `${findTransaction?.email} has been paid from payout request NGN ${findTransaction?.totalAmount}`,
            name: `${firstName} ${lastName}`,
            userId: _id
        })

        res.status(201).json({ success: true, data: 'Payout request has been approved' })
    } catch (error) {
        console.log('UNABLE TO APPROVE PAYOUT REQUEST',error)
        res.status(500).json({ success: false, data: 'Unable to approve payout request' })
    }
}

//FETCH ALL PAYOUT REQUEST
export async function getAllPayoutRequest(req, res) {
    try {
        const getPayoutRequest = await PayoutModel.find({ approved: false })

        res.status(200).json({ success: true, data: getPayoutRequest })
    } catch (error) {
        console.log('UNABLED TO GET ALL PAYOUT REQUEST TRANSACTION', error)
        res.status(500).json({ success: false, data: 'Unable to get all transactions' })
    }
}

//FETCH A PAYOUT REQUEST
export async function getAPayoutRequest(req, res) {
    const { id } = req.body
    try {
        const getPayoutRequest = await PayoutModel.findById({ _id: id })

        res.status(200).json({ success: true, data: getPayoutRequest })
    } catch (error) {
        console.log('UNABLED TO GET ALL PAYOUT REQUEST TRANSACTION', error)
        res.status(500).json({ success: false, data: 'Unable to get all transactions' })
    }
}

//GET ALL PEOPLE A USER REFERRED
export async function getAllUserReferrees(req, res){
    const { id } = req.params
    const { _id } = req.user
    try {
        const user = await UserModel.findById({ _id : _id })

        const referrees = user.referrals
        console.log('first', referrees)

        const referredUsers = [];

        for(const reerreeId of referrees){
            const referree = await UserModel.findById({ _id: reerreeId })

            if(referree){
                referredUsers.push({
                    _id: referree._id,
                    username: referree.username,
                    email: referree.email,
                    verified: referree.verified,
                    name: `${referree.firstName} ${referree.lastName}`
                })
            }
        }

        console.log('referredUsers', referredUsers)
        res.status(200).json({ success: true, data: referredUsers})

    } catch (error) {
        console.log('COULD NOT GET ALL REFERRED USERS', error)
        res.status(500).json({ success: false, data: 'Could not get reerred Users'})
    }
}

//ADMIN BLOCK A USER ACCOUNT
export async function blockUser(req, res) {
    const { id } = req.body
    try {
        const getUser = await UserModel.findById({ _id: id})
        if(!getUser){
            return res.status(404).json({ success: false, data: 'User with this id not found'})
        }
        const blockAUser = await UserModel.findById({ _id: id})
        blockAUser.blocked = !blockAUser.blocked
        await blockAUser.save()
        console.log('object', blockAUser.blocked)

        res.status(201).json({ success: true, data: `User ${ blockAUser.blocked ? 'Blocked' : 'Unblock'} Successful` })
    } catch (error) {
        console.log('UNABLE TO BLOCK USER>>', error)
        res.status(500).json({ success: false, data: error.message || 'unable to perform blocking operation on user'})
    }
}



//DANGER
export async function deleteUser(req, res) {
    const { id } = req.body
    try {
        const getUser = await UserModel.findById({ _id: id})
        if(!getUser){
            return res.status(404).json({ success: false, data: 'User with this id not found'})
        }
        const deleteUser = await UserModel.findByIdAndDelete({ _id: id})

        res.status(201).json({ success: true, data: 'User deleted Successful' })
    } catch (error) {
        console.log('UNABLE TO DELETE USER>>', error)
        res.status(500).json({ success: false, data: error.message || 'unable to delete user'})
    }
}