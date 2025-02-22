import TokenModel from "../../model/Token.js";
import UserModel from "../../model/User.js";
import crypto from 'crypto'
import sendEmail from "../../middleware/sendEmail.js";
import { registerMail } from "../../middleware/mailer.js";
import Mailgen from "mailgen";
import ActivitiesModel from "../../model/Activities.js";
import SiteSettingsModel from "../../model/SiteSettings.js";

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Subssum',
        link: `${process.env.MAIL_WEBSITE_LINK}`,
        copyright: ''
    }
})

//REGISTER NEW USER
export async function register(req, res) {
    console.log('REGISTRATION BODY>>>',req.body);
    const { email, firstName, lastName, password, confirmPassword, referredBy } = req.body;


    if (!email || !password || !firstName ||!lastName || !confirmPassword ) {
        return res.status(400).json({ success: false, data: 'Please provide all required fields' });
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)){
        res.status(400).json({ success: false, data: 'Please enter a valid email address'})
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, data: 'Passwords must be at least 6 characters long' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, data: 'Passwords do not match' });
    }

    const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/;
    if (!specialChars.test(password)) {
        return res.status(400).json({ success: false, data: 'Passwords must contain at least one special character' });
    }

    //const mobileRegex = /^(090|080|070)\d{8}$/;

    try {
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, data: 'Email already exists. Please use another email' });
        }

        const user = await UserModel.create({ firstName, lastName, email, password, createdSource: 'web' });
        console.log('USER CREATED');

        const siteSetting = await SiteSettingsModel.findOne()

        const referralLink = `${siteSetting?.url}/register?ref=${user._id}`;
        user.referralLink = referralLink;
        await user.save();

        if (referredBy) {
            if (!user.referrals.includes(user._id)) {
                const referrer = await UserModel.findById(referredBy);
                if (referrer) {
                    referrer.referrals.push(user._id);
                    referrer.walletBonus += siteSetting?.referralBonusFee ? Number(siteSetting?.referralBonusFee) : 0
                    await referrer.save();
                    user.referredBy = referrer._id;
                    await user.save();
                } else {
                    console.log('REFERRER NOT FOUND');
                }
            }
        }

        const token = await new TokenModel({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();

        const verifyUrl = `${process.env.MAIL_WEBSITE_LINK}/${user._id}/verify/${token.token}`;
         console.log('USER VERIFICATION URL', verifyUrl)
        try {
            await registerMail({
                username: `${user.firstName} ${user.lastName}`,
                userEmail: user.email,
                subject: 'SIGNUP SUCCESSFUL',
                intro: 'PLEASE VERIFY EMAIL',
                instructions: `You Have Successfully Signed Up to ${siteSetting?.siteName}, Please Click on the Button Below to verify your Email Address. Note Email is Valid for One (1) Hour.`,
                outro: `
                If you cannot click the reset button, copy and paste the url here in your browser ${verifyUrl}
                  \n  
                If you did not Sign Up, please ignore this email and report.
                `,
                verifyUrl: verifyUrl,
                text: 'Verify Email',
            });

            return res.status(200).json({ success: true, data: `Verification Email Sent to ${email}` });
        } catch (error) {
            console.log('ERROR SENDING VERIFY EMAIL', error);
            return res.status(500).json({ success: false, data: 'Email could not be sent' });
        }
    } catch (error) {
        console.log('ERROR REGISTERING USER', error);
        res.status(500).json({ success: false, data: 'Unable to create account' });
    }
}

//VERIFY NEW USER
export async function verifyNewUser(req, res, next){
    const { id } = req.params
    const { token } = req.params
    console.log('PARAMS ID', id)
    console.log('TOKEN', token)
    try {
        const user = await UserModel.findById({ _id: id})
        console.log('ID', user._id)
        if(!user){
            return res.status(400).json({ success: false, data: 'Invalid Verification Link'})
        }


        const findToken = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token
        })
        //console.log('TOKEN', findToken)

        if(!findToken){
            return res.status(400).json({ success: false, data: 'Invalid Link'})
        }

        //await UserModel.updateOne({ _id: user._id, verified: true})
        user.verified = true;
        await user.save()
        console.log('USER VERIFIED')
        const deleteToken = await TokenModel.findByIdAndDelete({ _id: findToken._id })
        
        const newActivity = await ActivitiesModel.create({
            note: `New user created`,
            name: `${user?.firstName} ${user?.lastName}`,
            userId: user?._id
        })

        //sendToken(user, 200, res)
        res.status(200).json({ success: true, data: 'Account Verified' })


    } catch (error) {
        console.log('COULD NOT VERIFY USER', error)
        res.status(500).json({ success: false, data: 'Unable to Verify User Account' })        
    }
}

//LOGIN USER
export async function login(req, res){
    const { emailOrMobile, password } = req.body;

    if(!emailOrMobile || !password){
        return res.status(401).json({ success: false, data: 'Please provide an email and password'})
    }

    try {
        const isEmail = emailOrMobile.includes('@');

        let user;

        if(isEmail){
            user = await UserModel.findOne({ email: emailOrMobile }).select('+password')
        } else {
            user = await UserModel.findOne({ mobile: emailOrMobile }).select('+password')
        }

        console.log('USER NUMBER', user)
        
        if(!user){
            return res.status(403).json({ success: false, data: 'Invalid User'})
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return res.status(403).json({ success: false, data: 'Invalid Credentials'})
        }

        if(!user.verified){
            let token = await TokenModel.findOne({ userId: user._id})
            if(!token){
                const token = await new TokenModel({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
                
        
                const verifyUrl = `${process.env.MAIL_WEBSITE_LINK}/${user._id}/verify/${token.token}`
                console.log('LOGIN VERIFY URL', verifyUrl, user.email)
                const siteSetting = await SiteSettingsModel.findOne()
                try {
                    // send mail
                    const emailContent = {
                        body: {
                            intro: 'PLEASE VERIFY EMAIL',
                            action: {
                                instructions: `Your ${siteSetting?.siteName} Account is not yet valid, Please Click on the Button Below to verify your Email Address. Note Email is Valid for One (1) Hour.`,
                                button: {
                                    color: '#33b5e5',
                                    text: 'Verify Your Email',
                                    link: verifyUrl
                                },
                            },
                            outro: `
                                If you cannot click the reset button, copy and paste the url here in your browser ${verifyUrl}
        
                                If you did not SignUp to ${siteSetting?.siteName}, please ignore this email and report.
                            `
                        },
                    };
        
                    const emailTemplate = mailGenerator.generate(emailContent)
                    const emailText = mailGenerator.generatePlaintext(emailContent)
                    
                    await sendEmail({
                        to: user.email,
                        subject: 'Verify Your Email',
                        text: emailTemplate
                    })

        
                    return res.status(200).json({success: true, isVerified: false , data: `Verification Email Sent. Check your email address and verify your account`})
                } catch (error) {
                    console.log('ERROR SENDING VERIFY EMAIL', error)
                    return res.status(500).json({ success: false, data: 'Email could not be sent'})
                }
            } else{
                return res.status(200).json({ success: false, isVerified: false, data: 'Account Not Verified. An Email Has been sent to You Please Verify Account'})
            }
        }

        const pinSet = user.pin ? true : false 
        //sendToken(user, 200, res)
        const token = user.getSignedToken();
        const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, pin, ...userData } = user._doc
        //res.status(200).json({ success: true, token: token, isVerified: true, data: {success: true, data: userData }})
        res.cookie('subsumtoken', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true } ).status(201).json({ success: true, token: token, isVerified: true, pinSet: pinSet, data: {success: true, data: userData }})
    } catch (error) {
        console.log('ERROR LOGGING USER', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

//SIGNUP AND LOGIN WITH GOOGLE
export async function google(req, res){
    const { name, email, photo, referredBy } = req.body
    console.log(req.body)
    try {
        const user = await UserModel.findOne({ email: email })
        if(user){
            console.log('USER EXIST')
            user.verified = true
            await user.save()
            const token = user.getSignedToken();
            const pinSet = user.pin ? true : false 
            const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, pin, ...userData } = user._doc
            const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
            res.cookie('subsumtoken', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true}).status(201).json({ success: true, token: token, isVerified: true, pinSet: pinSet, data: {success: true, data: userData }})
        } else {
            console.log('USER IS NEW')
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            //const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new UserModel({
                username: name,
                firstName: name,
                email: email,
                password: generatedPassword,
                profile: photo,
                verified: true,
            })
            const siteSetting = await SiteSettingsModel.findOne()
            await newUser.save()
            const referralLink = `${siteSetting?.siteName}/register?ref=${newUser._id}`;
            newUser.referralLink = referralLink
            await newUser.save()

            //handle referral
            if (referredBy) {
                if (!newUser.referrals.includes(newUser._id)) {
                    const referrer = await UserModel.findById(referredBy);
                    if (referrer) {
                        referrer.referrals.push(newUser._id);
                        await referrer.save();
                        newUser.referredBy = referrer._id;
                        await newUser.save();
                    } else {
                        console.log('REFERRER NOT FOUND');
                    }
                }
            }

            const newActivity = await ActivitiesModel.create({
                note: `New user created`,
                name: `${newUser?.firstName}`,
                userId: newUser?._id
            })

            const token = newUser.getSignedToken();
            const pinSet = newUser.pin ? true : false 
            const { resetPasswordToken, resetPasswordExpire, password: hashedFinalPassword, pin, ...userData } = newUser._doc
            const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
            res.cookie('subsumtoken', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true}).status(201).json({ success: true, token: token, isVerified: true, pinSet: pinSet, data: {success: true, data: userData }})
        }
    } catch (error) {
        console.log('ERROR SINGIN USER WITH GOOGLE', error)
        res.status(500).json({ success: false, data: 'Could not signin user'})
    }
}

//USER FORGOT PASSWORD REQUEST
export async function forgotPassword (req, res, next){
    const { email } = req.body
    console.log('EMAIL', email)
    if(!email){
        return res.status(404).json({ success: false, data: 'Provide your registered email address'})
    }

    try {
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(404).json({ success: false, data: 'Email Does Not Exist'})
        }

        const resetToken = user.getResetPasswordToken()

        await user.save()
        const resetUrl = `${process.env.MAIL_WEBSITE_LINK}/reset-password/${resetToken}`
        console.log('reset url', resetUrl)
        try {
            // send mail
            const emailContent = {
                body: {
                    intro: `
                        <span style="color: #000080; font-weight: 400;">
                            You have Requested a password reset for your account. To proceed with resetting your password, please click the button below.
                        </span>
                    `,
                    action: {
                        instructions: `
                            <span style="color: #000080; font-weight: 400;">
                                Please note that this link will expire in 10 minutes, so make sure to complete the process promptly. 
                                If you did not request a password reset, you can safely ignore this message.
                            </span>
                        `,
                        button: {
                            color: '#000080',
                            text: 'Reset Your Password',
                            link: resetUrl
                        },
                    },
                    outro: `
                        <span style="color: #000080; font-weight: 400;">
                            you can easily resolve this by copying and pasting the URL into your browser:
                        </span>
                        <br><br>
                        <a href="${resetUrl}" style="color: #000080; font-weight: 400; text-decoration: none;">${resetUrl}</a>
                    `
                },
            };
            

            let emailTemplate = mailGenerator.generate(emailContent)
            emailTemplate = emailTemplate.replace(
                'Subssum',
                `<img src="https://res.cloudinary.com/dsjwuwjm1/image/upload/v1734470897/logo_u3h8pr.png" alt="Subssum Logo" style="width: 150px; height: auto;" />`
            );
            emailTemplate = emailTemplate.replace(
                'Yours truly,',
                `<p style="color: #000080; font-weight: 400;">Yours truly,<br>Subssum</p>`
            );
            emailTemplate = emailTemplate.replace(
                'Subssum',
                ``
            );
            const emailText = mailGenerator.generatePlaintext(emailContent)

            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Password Reset Request',
                    text: emailTemplate
                })
                res.status(200).json({success: true, msg: 'Email sent', data: email })
                
            } catch (error) {
                console.log('FORGOT PASSWORD EMAIL ERROR?>', error)
            }
            
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            console.log('EMAIL COULD NOT BE SENT', error)
            return res.status(500).json({ success: false, data: 'Email could not be sent' })
        }
    } catch (error) {
        console.log('ERROR GENERATING RESET LINK', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

//USER RESET PASSWORD
export async function resetPassword (req, res, next){
    const { password, confirmPassword } = req.body
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        if (password.length < 6) {
            return res.status(400).json({ success: false, data: 'Passwords must be at least 6 characters long' });
        }
    
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, data: 'Passwords do not match' });
        }
    
        const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/;
        if (!specialChars.test(password)) {
            return res.status(400).json({ success: false, data: 'Passwords must contain at least one special character' });
        }

        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return  res.status(400).json({ success: false, data: 'Invalid Reset Token'})
        }

        const isMatch = await user.matchPasswords(password);

        if(isMatch){
            return res.status(403).json({ success: false, data: 'Old password and new password cannot be the same'})
        }

        user.password = password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save();

        res.status(201).json({
            success: true,
            data: 'Password Reset success'
        })
    } catch (error) {
        console.log('ERROR RESETING USER PASSWORD', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, isVerified: true})
}

export async function signout(req, res){
    res.clearCookie('subsumtoken').status(200).json({success: true, data: 'Signout success'})
}