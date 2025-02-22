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
                As an agent, you have the opportunity to earn a commission for each transaction you successfully facilitate, ensuring satisfaction for your valued customers while rewarding your hard work.
                </p>
            </div>
            
            {/* <div className="bg-[#0373DB] pt-[17.39px] pb-[17.39px] pl-[51.16px] pr-[51.16px] rounded-[10.23px] mt-12">
                <Link to='/register' className='link text-white font-semibold text-[16px]'>
                    Get Started
                </Link>
            </div> */}

            <img alt='star' src={StarsImg} className="w-[400px] phone:w-[85%] phone:h-[60%] phone:bottom-[-130px] relative left-[20px] bottom-[-160px]" />
        </div>

        <div className="flex-1 flex flex-col gap-[20.46px] h-[734.68px]">
            <div className="flex-1 h-full bg-[#FFF6E5] pt-3 pl-6 small-pc:p-6 relative overflow-hidden rounded-[24.56px]">
                <div className="mr-auto mt-3 w-[50%] phone:w-[60%] flex flex-col gap-[24.56px]">
                    <h2 className="text-[36.84px] font-bold text-[#BB5B17]">Your Loyalty is Rewarded!</h2>
                    <p className="font-normal text-[20px] text-[#D28B3E]">
                    It's not merely about convenience; it's about turning your time into earnings while thoroughly enjoying what we provide.
                    </p>
                </div>

                <img alt="gold" src={GoldImg} className="absolute bottom-0 right-0 phone:w-[150px] h-[370px]" />
            </div>

            <div className="flex-1 h-full bg-[#AEB7EF] relative small-pc:p-6 overflow-hidden rounded-[24.56px]">
                <div className="ml-auto mt-8 small-pc:mt-4 ml-45 w-[50%] phone:w-[60%] flex flex-col gap-[24.56px]">
                    <h2 className="text-[36.84px] font-bold text-[#414CA5]">Instant Withdrawal</h2>
                    <p className="font-normal text-[20px] text-[#414CA5]">
                    Are you in need of fast cash? Seamlessly transfer your earnings to your wallet or bank account instantly and get the funds you need now!
                    </p>
                </div>

                <img src={WIthdrawImg} alt="withdrawal" className="absolute left-0 top-0 phone:top-0 phone:w-[200px] phone:h-[450px] h-[350px]" />
            </div>

        </div>
    </div>
  )
}

export default Features