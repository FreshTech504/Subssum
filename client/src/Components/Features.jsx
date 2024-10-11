import { Link } from "react-router-dom"
import StarsImg from '../assets/groupStar.png'
import GoldImg from '../assets/gold.png'
import WIthdrawImg from '../assets/cashWithdraw.png'

function Features() {
  return (
    <div className="small-pc:pad6 pad4 w-full flex items-center justify-between gap-[20.46px] small-pc:flex-col">
        <div className="h-[734.68px] flex-1 bg-gray-20 rounded-[24.56px] overflow-hidden flex flex-col relative items-center">
            <div className="w-[80%] flex flex-col mt-8 justify-center">
                <h2 className="text-center text-[36.84px] font-bold text-gray-90">Become an Agent</h2>
                <p className="text-center font-normal text-[20px] text-gray-70">
                    As an agent, you receive a commission for every transaction you facilitate on behalf of your valued customers."
                </p>
            </div>
            
            <div className="bg-[#0373DB] pt-[17.39px] pb-[17.39px] pl-[51.16px] pr-[51.16px] rounded-[10.23px] mt-12">
                <Link to='/register' className='link text-white font-semibold text-[16px]'>
                    Get Started
                </Link>
            </div>

            <img alt='star' src={StarsImg} className="w-[442px] phone:w-[85%] relative left-[78px] bottom-[-70px]" />
        </div>

        <div className="flex-1 flex flex-col gap-[20.46px] h-[734.68px]">
            <div className="flex-1 h-full bg-[#FFF6E5] pt-3 pl-6 small-pc:p-6 relative overflow-hidden rounded-[24.56px]">
                <div className="mr-auto mt-3 w-[50%] phone:w-[60%] flex flex-col gap-[24.56px]">
                    <h2 className="text-[36.84px] font-bold text-[#BB5B17]">Your Loyalty is Rewarded!</h2>
                    <p className="font-normal text-[20px] text-[#D28B3E]">
                        It's not just about convenience; it's about earning while you make the most of what we offer.
                    </p>
                </div>

                <img alt="gold" src={GoldImg} className="absolute bottom-0 right-0 phone:w-[150px]" />
            </div>

            <div className="flex-1 h-full bg-[#AEB7EF] relative small-pc:p-6 overflow-hidden rounded-[24.56px]">
                <div className="ml-auto mt-16 small-pc:mt-4 mr-12 w-[50%] phone:w-[60%] flex flex-col gap-[24.56px]">
                    <h2 className="text-[36.84px] font-bold text-[#414CA5]">Instant Withdrawal</h2>
                    <p className="font-normal text-[20px] text-[#414CA5]">
                        Require fast cash? Instantly transfer your earnings to your wallet or bank account.
                    </p>
                </div>

                <img src={WIthdrawImg} alt="withdrawal" className="absolute left-0 top-4 phone:w-[150px]" />
            </div>

        </div>
    </div>
  )
}

export default Features