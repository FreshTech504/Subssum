import TransctionHistroyModel from "../../model/TransactionHistroy.js"
import PDFDocument from 'pdfkit';
import fs from 'fs';
import UserModel from "../../model/User.js";
import path from 'path'
import { fileURLToPath } from 'url'

const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11-13
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

// Utility function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get the day, month, year, and time components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert hours to 12-hour format and determine AM/PM
    const isPM = hours >= 12;
    const formattedHours = ((hours + 11) % 12 + 1); // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const period = isPM ? 'PM' : 'AM';
    
    // Format the date string
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}, ${formattedHours}:${formattedMinutes}${period}`;
};

//FETCH ALL USER TRANSCATIONS
export async function fetchAllUserTransactions(req, res) {
    const { _id } = req.user
    try {
        const getAllTransctions = await TransctionHistroyModel.find({ userId: _id }).select('-amount -income')

        res.status(200).json({ success: true, data: getAllTransctions })
    } catch (error) {
        console.log('UNABLE TO FETCH ALL TRANSACTIONS')
        res.status(500).json({ success: false, data: error.message || 'Unable to get all transactions'})
    }
}

//FETCH A TRANSACTION OF A USER
export async function fetchAUserTransaction(req, res) {
    const { _id } = req.user
    const { id } = req.params
    try {
        const getTransction = await TransctionHistroyModel.findById({ _id: id }).select('-amount -income')

        if(getTransction.userId.toString() !== _id.toString()){
            return res.status(403).json({ success: false, data: 'Not allowed to fetch transaction details' })
        }
        console.log('first', getTransction)
        res.status(200).json({ success: true, data: getTransction })
    } catch (error) {
        console.log('UNABLE TO THE TRANSACTIONS')
        res.status(500).json({ success: false, data: error.message || 'Unable to get all transactions'})
    }
}

//DOWNLOAD TRANSACTION RECIEPT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function downloadReciept(req, res) {
    const { id } = req.body
    console.log('first', id)
    try {
        const findTransaction = await TransctionHistroyModel.findOne({ transactionId: id })
        
        if(!findTransaction){
            res.status(404).json({ success: false, data: 'Transaction not found'})
        }
        const findUser = await UserModel.findOne({ email: findTransaction.email })

         // Create a new PDF document using pdfkit
         const outputFilePath = `receipt-${findTransaction.transactionId}.pdf`; // Define output file path
         const outputFileName = `transaction_receipt_${findTransaction.transactionId}.pdf`;
 
         const doc = new PDFDocument({ size: [164, 365], margin: 4 });
         const stream = fs.createWriteStream(outputFilePath);
         const logoImg = path.join(__dirname, '../../assests/logo.png'); 
         doc.pipe(stream);
 
         // Add content to the PDF
         doc.moveDown(2);
         doc.image(logoImg, { width: 80, align: 'left' })
         doc.moveDown(2);
         doc.fillColor('#4169E1')
            .font('Helvetica-Bold')
             .fontSize(11)
             .text('TRANSACTION RECEIPT', { align: 'left' });
         
         doc.moveDown(0.5)
         doc.fillColor('#000')
            .font('Helvetica-Oblique')
             .fontSize(7)
             .text(`Receipt no: ${findTransaction.transactionId}`, { align: 'left' }, )
             .moveDown(0.2)
             .text(`Date: ${formatDate(findTransaction?.createdAt)}`, { align: 'right' })
         
         doc.moveDown(2);
         doc.fillColor('#000')
            .font('Helvetica-Oblique')
             .fontSize(9)
             .text('Customer Name:', { align: 'left' })
             .text(`${findUser.firstName ? findUser.firstName : ''} ${findUser.lastName ? findUser.lastName : ''}`)
             .moveDown(0.5)
             .text(`Service: ${findTransaction.service}`)
             .moveDown(0.5)
             .text(`Service ID: ${findTransaction.serviceId}`)
             .moveDown(0.5)
             .text(`Platform: ${findTransaction.platform}`)
             .moveDown(0.5)
             .text(`Number: ${findTransaction.number}`)
             .moveDown(0.5)
             .text(`Amount: ${findTransaction.totalAmount}`)
             .moveDown(0.5)
             .text(`Status: ${findTransaction.status}`)
             .moveDown(0.5)
             .text(`Payment Method: ${findTransaction.paymentMethod}`)
             .moveDown(0.5)
             .text(`Transaction Id: ${findTransaction.transactionId}`)
             
             
             
         doc.moveDown(2);
         const backgroundColor = '#4169E1'; // Your desired background color
         const textColor = '#FFFFFF'; // White text color
         const text = 'SUBSIDARY OF FRESHTECH INNOVATIONS LTD';
         const textWidth = doc.widthOfString(text);
         const textHeight = 12; // Approximate height; adjust if necessary
         const padding = 4; // Padding around the text
         
         const x = 5; // X position
         const y = doc.y; // Y position (current y)
         
         // Draw the background rectangle
         doc.fillColor(backgroundColor)
            .rect(x - padding, y - padding, textWidth + padding * 2, textHeight + padding * 2) // Background rectangle
            .fill();
         
         // Set the text color and add the text
         doc.fillColor(textColor)
            .font('Times-Roman')
            .fontSize(8)
            .text(text, x, y); // Add text on top of the rectangle

         doc.end();
 
 
         // Wait for the stream to finish writing
         stream.on('finish', () => {
             try {
             // Read the file content synchronously
             const pdfBuffer = fs.readFileSync(outputFilePath);
         
             // Set appropriate headers for PDF
             res.setHeader('Content-Type', 'application/pdf');
             res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
         
             // Send the PDF content in the response
             res.send(pdfBuffer);
         
             // Optionally, delete the file after sending
             fs.unlinkSync(outputFilePath);
             console.log('PDF sent to the client successfully');
             } catch (readFileError) {
             console.error('Error reading PDF file:', readFileError);
             res.status(500).json({ success: false, data: 'Could not read the PDF file' });
             }
         });


    } catch (error) {
        console.log('UNABLE TO DOWNLOAD TRANSACTION RECIEPT', error)
        res.status(500).json({ success: false, data: 'Unable to generate transaction reciept'})
    }
}

//UPDTAE USER TRANSACTIONS