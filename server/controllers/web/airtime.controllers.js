import TransctionHistroyModel from "../../model/TransactionHistroy.js";
import UserModel from "../../model/User.js";
import fetch from 'node-fetch'; 

export async function buyAirtime(req, res) {
    //console.log('first HELLO');
    const { networkCode, phoneNumber, amount, transactionId, networkName, totalAmount, status } = req.body;
    const { _id, email } = req.user;

    try {
        const mobileRegex = /^(090|091|080|081|070|071)\d{8}$/;
        if (!mobileRegex.test(phoneNumber)) {
            return res.status(400).json({ success: false, data: 'Invalid phone number' });
        }

        const getUser = await UserModel.findById(_id);

        const numberRegex = /^\d+$/;
        if(!numberRegex.test(amount)){
            return res.status(406).json({ success: false, data: 'Invalid Number format'})
        }

        if (amount < 50) {
            return res.status(406).json({ success: false, data: 'Minimum airtime purchase amount is 50' });
        }

        if (amount > getUser.acctBalance) {
            return res.status(406).json({ success: false, data: 'Insufficient Wallet Balance' });
        }

        const data = {
            network: networkCode,
            mobile_number: phoneNumber,
            amount: Number(amount),
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

        if (airtimeResponse.Status === 'successful') {
            // Debit user
            getUser.acctBalance -= totalAmount;
            await getUser.save();

            // Create new transaction
            const newTransaction = await TransctionHistroyModel.create({
                userId: _id,
                email: email,
                service: `${airtimeResponse.plan_network} airtime ${airtimeResponse.airtime_type}`,
                platform: airtimeResponse.plan_network,
                number: airtimeResponse.mobile_number,
                amount: airtimeResponse.paid_amount,
                totalAmount: airtimeResponse.amount,
                status: airtimeResponse.Status,
                paymentMethod: 'Wallet',
                transactionId: transactionId,
                serviceId: airtimeResponse.id,
                slug: 'Airtime',
                isUserLogin: true,
                income: Number(airtimeResponse.amount) - Number(airtimeResponse.paid_amount)
            });

            const { amount, income, ...transactionData } = newTransaction._doc;
            const { resetPasswordToken, resetPasswordExpire, password: hashedFinalPassword, pin, ...userData } = getUser._doc;

            return res.status(206).json({
                success: true,
                msg: `NGN${airtimeResponse.amount} ${airtimeResponse.plan_network} Airtime purchase successful`,
                data: { success: true, data: userData },
                transaction: transactionData
            });
        } else {
            return res.status(400).json({ success: false, data: 'Airtime purchase failed' });
        }

    } catch (error) {
        console.log('UNABLE TO BUY AIRTIME', error);
        return res.status(500).json({ success: false, data: error.message || 'Unable to buy airtime' });
    }
}
