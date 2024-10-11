import CardImg from '../assets/creditCard.png'
import PhoneTransfer from '../assets/phoneTransfer.png'


function HowToFund() {
  return (
    <div className="small-pc:pad6 pad4 w-full flex flex-col gap-[32.74px] items-center justify-center">
        <div className="flex gap-[16.37px] items-center justify-center flex-col">
          <h2 className="text-[36.84px]  tablet:text-[24px] font-bold text-gray-90 text-center">Buy & Fund your wallet Seamlessly</h2>

        </div>

        <div className="flex items-center justify-between gap-[20.3px] small-pc:flex-col">
            <div className="flex-1 rounded-[24.56px] bg-gray-20 pt-4 pb-4 pl-12 tablet:p-4 relative overflow-hidden">
                <div className='flex flex-col gap-8 '>
                    <div className='flex flex-col gap-4 w-[50%] tablet:w-full z-10 '>
                        <h3 className="text-[36.84px] tablet:text-[24px] font-bold text-gray-90">Fund & Buy <br /> with your <span className="text-second-color">Card</span></h3>
                        <p className="text-gray-70 font-normal text-[20.46px] tablet:text-[18px]">
                            Access any of our services with a card, even without an account, and conveniently fund your wallet as well.
                        </p>
                    </div>

                    <img alt='card image' src={CardImg} className='absolute right-0 bottom-0 tablet:w-[100px] tablet:bottom-[-20px]' />
                </div>
            </div>

            <div className="flex-1 rounded-[24.56px] bg-gray-20 pt-4 pb-4 pl-12 tablet:p-4 relative overflow-hidden">
                <div className='flex flex-col gap-8 '>
                    <div className='flex flex-col gap-4 w-[50%] tablet:w-full z-10'>
                        <h3 className="text-[36.84px] tablet:text-[24px] font-bold text-gray-90">Fund & Buy with Bank Transfer</h3>
                        <p className="text-gray-70 font-normal text-[20.46px] tablet:text-[18px]">
                        Access any of our services with a card, even without an account, and conveniently fund your wallet as well.
                        </p>
                    </div>

                    <img alt='phone transafer' src={PhoneTransfer} className='absolute right-0 bottom-0 tablet:w-[100px] tablet:bottom-[-20px]' />
                </div>
            </div>
        </div>

    </div>
  )
}

export default HowToFund