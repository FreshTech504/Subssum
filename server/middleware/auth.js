import jsonwebtoken from 'jsonwebtoken'
import UserModel from '../model/User.js';
import axios from 'axios'
//authorize user routes
export const Protect = async (req, res, next) => {
    const token = req.cookies.subsumtoken;
    //console.log('PROTECT TOKEN>>', token)
  
    if (!token) {
      return res.status(401).json({ success: false, data: 'Not Allowed Please Login' });
    }
  
    try {
      const user = await new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });
  
      req.user = user;
  
      const { id } = user;
      const isUser = await UserModel.findById(id);
      if (!isUser) {
        return res.status(404).json({ success: false, data: 'Invalid user' });
      }
      if (isUser.verified === false) {
        return res.status(404).json({ success: false, data: 'User Account is not verified' });
      }
      if (isUser.blocked === true) {
        return res.status(404).json({ success: false, data: 'User Account has been blocked' });
      }

      req.user = isUser
  
      //console.log('user', isUser)
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ success: false, data: 'Token expired, please login again' });
      } else {
        return res.status(403).json({ success: false, data: 'User Forbidden Please Login' });
      }
    }
  };

//validate transaction pin
export const ValidateTransactionPin = async (req, res, next) => {
  const { transactionPin } = req.body
  const token = req.cookies.subsumtoken;
  //console.log('PROTECT TOKEN>>', token)

  if (!token) {
    return res.status(401).json({ success: false, data: 'Not Allowed Please Login' });
  }

  try {
    const user = await new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });

    req.user = user;

    const { id } = user;
    const isUser = await UserModel.findById(id);
    const isMatchPin = await isUser.matchPin(transactionPin);
    if (!isMatchPin) {

      return res.status(406).json({ success: false, data: 'Invalid Transcation Pin'});
    }


    req.user = isUser

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ success: false, data: 'Token expired, please login again' });
    } else {
      return res.status(403).json({ success: false, data: 'User Forbidden Please Login' });
    }
  }
};

//Validate transaction payment of quick buy
export const ValidateQuickBuyPayment = async (req, res, next) => {
  const { paymentDetails } = req.body
  console.log('DETAILS>>',paymentDetails)

  try {
    //check transaction
    const verifyTransfer = await axios.get(
      `${process.env.PAYSTACK_VERIFY_URL}/${paymentDetails?.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SK}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('PAYSTACK VERIFY DATA>>',verifyTransfer.data);
    const response = verifyTransfer.data
    if(response.data.status === 'success'){
      const amountPaid = Number((response.data.amount) / 100)
      const transcationRef = response.data.reference,
      status = response.data.status

      const transactionData = {
        amountPaid,
        transcationRef,
        status
      }

      req.paymentDetails = transactionData
      next()
    } else {
      return res.status(406).json({ success: false, data: 'Payment not Valid' })
    }

  } catch (err) {
    console.log('ERROR VALIDATING PAYMENT TRANSACTION FROM PAYSTACK', err)
    res.end()
  }
};

//validates Admin User