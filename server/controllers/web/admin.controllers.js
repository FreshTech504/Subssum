import { registerMail } from "../../middleware/mailer.js";
import ActivitiesModel from "../../model/Activities.js";
import adminModel from "../../model/Admin.js"
import OtpModel from "../../model/AdminOtp.js";
import UserModel from "../../model/User.js"

function convertToNumber(str) {
    return parseFloat(str);
}

function isNumber(value) {
    return Number.isFinite(value);
}

function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

export async function makeAdmin(req, res){
    const { id, password, role } = req.body
    try {
        if(!id){
            return res.status(400).json({ success: false, data: 'provide a user id' })
        }
        if(!password){
            return res.status(400).json({ success: false, data: 'provide a password' })
        }

        const numPin = convertToNumber(password)

        const checkPin = isNumber(numPin)

        if(!checkPin){
            return res.status(400).json({ success: false, data: 'Password must be a number'})
        }

        const getUser = await UserModel.findById({ _id: id })
        if(!getUser){
            return res.status(404).json({ success: false, data: 'User with this Id not found' })
        }

        const adminExist = await adminModel.findOne({ userId: id })
        if(adminExist){
            return res.status(403).json({ success: false, data: 'User already exist as an admin' })
        }

        const newAdmin = await adminModel.create({
            userId: id,
            email: getUser?.email,
            password: password,
            profile: getUser.profile,
            username: getUser?.username,
            firstname: getUser?.firstName,
            lastName: getUser?.lastName,
            role: role
        })

        const newNotification = await ActivitiesModel.create({
            note: 'New Admin memeber added'
        })

        res.status(201).json({ success: true, data: `${getUser.firstName} has been made an admin` })
    } catch (error) {
        console.log('Unable to make user an admin', error)
        res.status(500).json({ success: false, data: 'Unable to make admin' })
    }
}

export async function login(req, res) {
    const { email, password } = req.body
    try {
        if(!email || !password){
            return res.status(400).json({ success: false, data: 'All Feilds are required'})
        }

        const getUser = await adminModel.findOne({ email })
        if(!getUser){
            return res.status(404).json({ success: false, data: 'User does not exist' })
        }

        const isMatch = await getUser.matchPasswords(password);

        if(!isMatch){
            return res.status(403).json({ success: false, data: 'Invalid Credentials'})
        }

        const otpExist = await OtpModel.findOne({ email })
        if(otpExist){
            return res.status(200).json({ success: true, data: 'Check email for passcode sent', email: email })
        }

        try {
            const code = generateRandomSixDigitNumber()
            const newOtp = await OtpModel.create({
                userId: getUser._id,
                email: getUser.email,
                otp: code
            })
            console.log('code', code)

            await registerMail({
                username: `${getUser.firstName} ${getUser.lastName}`,
                userEmail: getUser.email,
                subject: 'Login Passcode',
                intro: '',
                instructions: `Login passcode is: ${code} valid for one hour`,
                text: code,
                verifyUrl: ''
            })

            return res.status(200).json({ success: true, data: 'Check email for passcode sent', email: getUser.email })
        } catch (error) {
            console.log('ERROR SENDING PASSOCDE EMAIL', error);
            return res.status(500).json({ success: false, data: 'Email could not be sent' });
        }

    } catch (error) {
        console.log('UNABLE TO LOGIN ADMIN USER', error)
        res.status(500).json({ success: false, data: 'Unable to login' })
    }
}

export async function verifyPasscode(req, res) {
    const { passcode, email } = req.body
    try {
        if(!passcode || !email){
            return res.status(400).json({ success: false, data: 'Invalid Crendentials' })
        }

        const getOtp = await OtpModel.findOne({ email })

        if(!getOtp){
            return res.status(403).json({ success: false, data: 'Invalid passcode' })
        }
        
        if(getOtp.otp !== passcode){
            return res.status(403).json({ success: false, data: 'Invalid Passcode' })
        }

        const getUser = await adminModel.findOne({ email })
        
        //delete passcode
        const deleteOtp = await OtpModel.findByIdAndDelete({ _id: getOtp._id })

        const token = getUser.getSignedToken();
        const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
        const { password, ...userData } = getUser._doc
        res.cookie('subsumauthtoken', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true } ).status(201).json({ success: true, token: token, data: {success: true, data: userData }})

    } catch (error) {
        console.log('UNABLE TO VERIFY PASSCODE', error)
        res.status(500).json({ success: false, data: 'Unable to verify passcode'})
    }
}

export async function signout(req, res){
    res.clearCookie('subsumauthtoken').status(200).json({success: true, data: 'Signout success'})
}