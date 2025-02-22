import { Link } from 'react-router-dom'
import BellImg from '../assets/bell.png'
import BellTwoImg from '../assets/bell2.png'


function ContactUs() {
  return (
    <div className='small-pc:pad6 pad4 overflow-hidden w-full flex flex-col gap-[32.74px] items-center justify-center'>
        <div className="w-full h-[456.36px] tablet:h-[700px] phone:h-[780px] phone:py-8 overflow-hidden relative rounded-[24.56px] bg-gray-20 tablet:p-4">
            <img alt='contact us bell' src={BellImg} className='absolute left-0 top-[-5px] h-[300px]' />
            <div className='flex flex-col gap-[55.25px] w-[464.55px] tablet:w-full absolute tablet:flex tablet:mt-[12rem] tablet:p-4 top-[74px] right-[150px] tablet:left-4'>
                <div className='flex flex-col gap-[24.56px]'>
                    <h2 className='text-gray-90 font-bold text-[36.84px]'>Contact Us</h2>
                    <p className='text-[20px] font-normal text-gray-70'>
                    We are dedicated to listening, assisting, and responding to your inquiries confidently and professionally. Whatever your question, feedback, or need for assistance, reaching out to us is the decisive first step toward an effective solution.
                    </p>
                </div>

                <div>
                    <div className='bg-[#0373DB] w-[35%] tablet:w-[70%] phone:w-[90%] flex items-center justify-center pt-[17.39px] pb-[17.39px] pl-[51.16px] pr-[51.16px] rounded-[10.23px]'>
                        <Link to='/contact' className='text-white'>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
            <img src={BellTwoImg} alt="contact us bell" className='absolute right-[-5px] top-[-5px]' />        
        </div>
    </div>
  )
}

export default ContactUs