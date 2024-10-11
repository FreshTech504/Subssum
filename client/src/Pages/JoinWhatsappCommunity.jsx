import Button from "../Components/Helpers/Button"
import Navbar from "../Components/Helpers/Navbar"
import WhatsappImg from '../assets/whatsappicon.png'

function JoinWhatsappCommunity() {
    return (
        <div className='page1 w-full h-[100vh]'>
            <Navbar />
    
            <div className="pad3 mt-[110px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
                <div className="flex flex-col items-center w-full gap-[54px]">
                    <div className='flex flex-col w-full gap-[24px] justify-center items-center'>
                        <div>
                            <img alt="whatsapp icon" src={WhatsappImg} className="w-[97px] h-[97.76px]" />
                        </div>
                        <div className="w-full flex flex-col gap-[8px]">
                            <p className="text-[24px] text-center text-gray-70">
                                Join Our Whatsapp Channel
                            </p>
                            <span className="text-center text-[16px] text-gray-90">
                                Stay actively updated, chat and communicate with us
                            </span>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[16px]">
                        <a href="https://whatsapp.com/channel/0029Vamiyx99xVJfJQDVhg0b" target="_blank" className="pad1 rounded-[10px] flex items-center justify-center text-center bg-second-color hover:bg-second-color-hover text-white " >Join</a>
                        <Button bg={false} link={'dashboard'} name={'Skip'} />

                    </div>
                </div>
            </div>
    
        </div>
      )
}

export default JoinWhatsappCommunity