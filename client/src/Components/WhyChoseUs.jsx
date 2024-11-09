import SearchImg from '../assets/search.png'
import LockImg from '../assets/lock.png'
import ArrowImg from '../assets/arrow.png'


function WhyChoseUs() {
    const whyChooeUsData = [
        {
            text: 'Efficient Customer Supports',
            img: SearchImg,
            style: 'bg-[#EFF3FB]',
        },
        {
            text: 'Safe & Secure Transactions',
            img: LockImg,
            style: 'bg-[#FFF6E5]',
        },
        {
            text: 'Fast & Reliable Services',
            img: ArrowImg,
            style: 'bg-[#EFF3FB]',
        },
    ]
  return (
    <div className="small-pc:pad6 pad4 w-full flex flex-col gap-[48.09px] items-center justify-center">
        <div className="flex flex-col gap-[16.37px] text-center items-center">
            <h2 className="text-[36.84px]  font-bold text-gray-90">Discover the Benefits of Choosing Us!</h2>

            <p className="text-[20.46px] phone:text-[16px] tablet:text-[18px] text-gray-70 font-normal w-[80%] text-center items-center justify-center">
            We stand for excellence in every aspect. Our commitment to delivering top-notch service, innovative solutions, and customer satisfaction sets us apart, which includes reliable connectivity, affordable tariffs, creative services, exceptional customer support, rewards and loyalty programs, reseller programs, secure billing, and business solutions.
            Efficient Customer Supports
            <br />
            Safe & Secure Transactions
            <br />
            Fast & Reliable Services
            <br />
            Your All-in-One Subscription Hub
            <br />
            Eliminate the inconvenience of using multiple apps and platforms; enjoy the ease and convenience of managing all your subscriptions with us.

            </p>
        </div>

        <div className="flex items-center gap-[32.74px] justify-center flex-wrap">
            {
                whyChooeUsData.map((item, idx) => (
                    <div key={idx} className={`relative overflow-hidden p-4 w-[306.97px] h-[306.97px] phone:w-[94%] rounded-[24.56px] ${item.style}`}>
                        <p className='text-[24px] phone:text-[25px] text-gray-90 font-bold'>{item.text}</p>

                        <img alt={item.text} src={item.img} className='absolute bottom-[-10px] right-[-10px]' />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default WhyChoseUs