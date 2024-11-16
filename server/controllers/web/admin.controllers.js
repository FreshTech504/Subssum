import { registerMail } from "../../middleware/mailer.js";
import ActivitiesModel from "../../model/Activities.js";
import AdminModel from "../../model/Admin.js"
import OtpModel from "../../model/AdminOtp.js";
import SiteSettingsModel from "../../model/SiteSettings.js";
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
    const { _id, firstName, lastName } = req.admin
    try {
        if(!id){
            return res.status(400).json({ success: false, data: 'provide a user id' })
        }
        if(!password){
            return res.status(400).json({ success: false, data: 'provide a password' })
        }
        if(!role){
            return res.status(400).json({ success: false, data: 'provide a admin role' })
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

        const adminExist = await AdminModel.findOne({ userId: id })
        if(adminExist){
            return res.status(403).json({ success: false, data: 'User already exist as an admin' })
        }

        const newAdmin = await AdminModel.create({
            userId: id,
            email: getUser?.email,
            password: password,
            profile: getUser.profile,
            username: getUser?.username,
            firstname: getUser?.firstName ? getUser?.firstName : getUser?.username,
            lastName: getUser?.lastName,
            role: role
        })

        const newNotification = await ActivitiesModel.create({
            note: 'New Admin memeber added',
            name: `${firstName} ${lastName}`,
            userId: _id
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

        const getUser = await AdminModel.findOne({ email })
        if(!getUser){
            return res.status(404).json({ success: false, data: 'User does not exist' })
        }

        if(getUser.blocked){
            return res.status(403).json({ success: false, data: 'Account has been blocked' });
        }

        const isMatch = await getUser.matchPasswords(password);

        if(!isMatch){
            return res.status(403).json({ success: false, data: 'Invalid Credentials'})
        }

        const otpExist = await OtpModel.findOne({ email })
        if(otpExist){
            console.log('code exist', otpExist?.otp)
            return res.status(200).json({ success: true, data: 'Check email for passcode sent', email: email })
        }

        try {
            const code = await generateRandomSixDigitNumber()
            const newOtp = await OtpModel.create({
                userId: getUser._id,
                email: getUser.email,
                otp: code
            })
            console.log('code', code)

            await registerMail({
                username: `${getUser.firstName ? getUser.firstName : ''} ${getUser.lastName ? getUser.lastName : ''}`,
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

        const getUser = await AdminModel.findOne({ email })
        
        //delete passcode
        const deleteOtp = await OtpModel.findByIdAndDelete({ _id: getOtp._id })

        const token = getUser.getSignedToken();
        const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
        const { _id, userId, password, ...userData } = getUser._doc
        res.cookie('subsumauthtoken', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true } ).status(201).json({ success: true, token: token, data: {success: true, data: userData }})

    } catch (error) {
        console.log('UNABLE TO VERIFY PASSCODE', error)
        res.status(500).json({ success: false, data: 'Unable to verify passcode'})
    }
}

export async function updateAdmin(req, res) {
    const { _id, firstName, lastName, username, role } = req.body
    try {
        if(!_id){
            return res.status(404).json({ success: false, data: 'A user ID is required' })
        }
        const getAdmin = await AdminModel.findById({ _id: _id })
        
        if(!getAdmin){
            return res.status(404).json({ success: false, data: 'Admin with ID not Found' })
        }

        const updateAdmin = await AdminModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    firstName,
                    lastName,
                    username,
                    role
                }
            },
            { new: true }
        )

        res.status(201).json({ success: true, data: 'User Updated succsssful '})
    } catch (error) {
        console.log('UNABEL TO UPDATE ADMIN', error)
        res.status(500).josn({ success: false, data: 'Unable to update admin' })
    }
}

export async function adminUserUpdateProfile(req, res) {
    const { firstName, lastName, username, email, dob, address, postalCode, password, country, city, profile } = req.body
    const { _id } = req.admin
    try {
        if(!_id){
            return res.status(404).json({ success: false, data: 'A user ID is required' })
        }
        const getAdmin = await AdminModel.findById({ _id: _id })
        
        if(!getAdmin){
            return res.status(404).json({ success: false, data: 'Admin with ID not Found' })
        }

        if(password){
            if(password.length !== 6){
                return res.status(401).json({ success: false, data: 'Password must be six digit long' })
            }
        }

        const updateAdmin = await AdminModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    firstName,
                    lastName,
                    username,
                    email,
                    dob,
                    address,
                    postalCode,
                    password,
                    country,
                    city,
                    profile
                }
            },
            { new: true }
        )

        res.status(201).json({ success: true, msg: 'User Updated succsssful', data: { success: true, data: updateAdmin }  })
    } catch (error) {
        console.log('UNABEL TO UPDATE ADMIN', error)
        res.status(500).josn({ success: false, data: 'Unable to update admin' })
    }
}

export async function signout(req, res){
    res.clearCookie('subsumauthtoken').status(200).json({success: true, data: 'Signout success'})
}

//MAKE OR UPDATE SITE SETTINGS
export async function siteSettings(req, res) {
    const { siteName, url, electricCharges, referralBonusFee } = req.body;
    try {
        let findSettings = await SiteSettingsModel.findOne();

        // If no settings found, create new settings
        if (!findSettings) {
            findSettings = await SiteSettingsModel.create({
                siteName, url, electricCharges, referralBonusFee
            });
            return res.status(201).json({ success: true, data: 'Site Settings Created' });
        }

        // Update settings fields if provided in the request
        findSettings.siteName = siteName || findSettings.siteName;
        findSettings.url = url || findSettings.url;
        findSettings.electricCharges = electricCharges || findSettings.electricCharges;
        findSettings.referralBonusFee = referralBonusFee || findSettings.referralBonusFee;
        await findSettings.save();

        res.status(200).json({ success: true, data: 'Site Settings Updated' });
    } catch (error) {
        console.log('UNABLE TO UPDATE SITE SETTINGS', error);
        res.status(500).json({ success: false, data: 'Unable to update site settings' });
    }
}

//GET SITE SETTINGS
export async function getSiteSettings(req, res) {
    try {
        const getSettings = await SiteSettingsModel.find()

        res.status(200).json({ success: true, data: getSettings })
    } catch (error) {
        console.log('UNABLE TO GET SITE SETTINGS', error)
        res.status(500).json({ success: false, data: 'Unable to get site settings' })
    }
}

//GET ALL ADMIN
export async function getAllAdmin(req, res) {
    try {
        const allAdmin = await AdminModel.find()

        res.status(200).json({ success: false, data: allAdmin })
    } catch (error) {
        console.log('UNABLE TO GET ALL ADMIN',error)
        res.status(500).json({ success: false, data: 'Unable to get all admin user' })
    }
}

//GET ADMIN
export async function getAdmin(req, res) {
    const { id } = req.params
    try {
        const admin = await AdminModel.findById({ _id: id })

        res.status(200).json({ success: false, data: admin })
    } catch (error) {
        console.log('UNABLE TO GET ALL ADMIN',error)
        res.status(500).json({ success: false, data: 'Unable to get all admin user' })
    }
}

//BLOCK ADMIN USER
export async function blockAdmin(req, res){
    const { id } = req.body
    try {
        if(!id){
            return res.status(404).json({ success: false, data: 'A user ID is required' })
        }
        const getAdmin = await AdminModel.findById({ _id: id })
        
        if(!getAdmin){
            return res.status(404).json({ success: false, data: 'Admin with ID not Found' })
        }

        getAdmin.blocked = !getAdmin.blocked
        await getAdmin.save()


        res.status(201).json({ success: true, data:`Admin user has been ${ getAdmin.blocked ? 'blocked' : 'Unblocked'} ` })
    } catch (error) {
        console.log('UNABLE TO BLOCK ADMIN', error)
        res.status(500).json({ success: false, data:'Unable to block admin' })
    }
}

//DLETE ADMIN USER
export async function deleteAdmin(req, res) {
    const { id } = req.body
    try {
        if(!id){
            return res.status(404).json({ success: false, data: 'A user ID is required' })
        }

        const getAdmin = await AdminModel.findByIdAndDelete({ _id: id })
        
        res.status(201).json({ success: true, data: 'Admin user deleted' })
    } catch (error) {
        console.log('UNABLE TO DELETE ADMIN', error)
        res.status(500).json({ success: false, data: 'Unable to delete admin' })
    }
}

//GET ALL ACTIVITIES
export async function getAllActivities(req, res) {
    try {
        const allNotifications = await ActivitiesModel.find()

        res.status(200).json({ success: true, data: allNotifications })
    } catch (error) {
        console.log('UNABLE TYO GET ALL NOTIFICATIONS', error)
        res.status(500).json({ success: false, data: 'Unable to get notifications' })
    }
}