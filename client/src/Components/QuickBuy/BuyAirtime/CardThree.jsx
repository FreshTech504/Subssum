import { useEffect, useState } from 'react';
import LogoImg from '../../../assets/logo.png'
import Button from '../../Helpers/Button'
import ButtonTwo from '../../Helpers/ButtonTwo'
import LoadingBtn from '../../Helpers/LoadingBtn';
import { downloadReciept } from '../../../Helpers/api';

function CardThree({ formData, setFormData, setActiveCard, transactionData, setSelectedCard}) {
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setFormData({ ...formData, proceed: false });
  }, []);

  const handleDownloadRecipt = async (id) => {
    try {
      setIsLoading(true)
      const res = await downloadReciept({id})
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }

  const handleReportTransaction = () => {
    setSelectedCard('reportTransaction')
  }

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

  return (
    <div className="card3">
        <div className="w-full flex flex-col gap-8 items-center">

          <img src={LogoImg} alt='subsum logo' className='w-[162px] h-[31px]' />

          <div className='w-full flex flex-col gap-2'>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>Date</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}>{formatDate(transactionData?.createdAt)}</p>
            </span>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>Status</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}>{transactionData?.status}</p>
            </span>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>Transaction Details</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}></p>
            </span>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>Service</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}>{transactionData?.service}</p>
            </span>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>Network</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}>{transactionData?.platform}</p>
            </span>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>transaction ID</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}>{transactionData?.transactionId}</p>
            </span>
            <span className='flex items-center justify-between'>
              <h3 className='font-normal text-[14px] text-gray-70'>Total</h3>
              <p className={`text-[14px] text-gray-80 font-medium`}>{transactionData?.totalAmount}</p>
            </span>
          </div>

          <div className="w-full border-[1px] border-l-gray-30 bg-white rounded-[12px] flex flex-col p-4 gap-4">
            {
              isLoading ? (
                <LoadingBtn />
              ) : (
                <>
                  <ButtonTwo onClick={() => handleDownloadRecipt(transactionData?.transactionId)} text={'Download Recept'} />
    
                  <Button bg={false} name={'Report Transaction'} onClick={handleReportTransaction} styles={`text-error bg-gray-10 border-[2px]`} />
                </>
              )
            }
          </div>

        </div>
    </div>
  )
}

export default CardThree