import ButtonTwo from "../Helpers/ButtonTwo"

function AirtimeToCashInfo({setSelectedCard}) {
    
    const handleUnderstand = () => {
        setSelectedCard(null)
    }

  return (
    <div className="w-full card2 flex flex-col gap-3 h-[80vh] overflow-y-auto scrollbar-thin">
        <h2 className="text-[20px] font-semibold text-gray-60 text-center">CONVERT AIRTIME TO CASH</h2>
        <h5 className="text-[14px] font-bold text-gray-70">Before you proceed to convert airtime to cash Kindly note the conditions below:</h5>

        <div className="text-gray-70">
            <ol className="flex flex-col gap-2">
                <li>The minimum amount is ₦100 and maximum amount is any amount. Glo is #1000 maximum per transfer.</li>
                <li>If you want to send pin, please load it on your sim and then transfer to us</li>
                <li>If you want to send pin, please load it on your sim and then transfer to us</li>
                <li>To transfer mtn airtime use: *600*recipient number*amount*pin#</li>
                <li>To change mtn transfer pin: *600*default pin*new pin*new pin# e.g *600*0000*new pin*new pin#</li>
                <li>To transfer 9mobile airtime: *223*pin*amount*number#</li>
                <li>To change 9mobile transfer pin: *247*default pin*new pin# e.g *247*0000*new pin#</li>
                <li>To transfer Glo airtime: *131*recipient number*amount*pin#</li>
                <li>To change Glo transfer pin: *132*default pin*new pin*new pin# e.g *132*0000*new pin#</li>
                <li>
                    You will be charged Based On the network you are Converting as Seen Below: <br />
                    MTN: 35% <br />
                    GLO: 50% <br />
                    AIRTEL: 40% <br />
                    9MOBILE: 50%
                </li>
                <li>You must not send any amount different from the amount filled in the form below</li>
                <li>We accept airtime transfer only. Any Recharge Card sent to us will not be credited to your wallet.</li>
            </ol>
        </div>

        <div className="mt-4 w-full">
        </div>
            <ButtonTwo onClick={handleUnderstand} text={'I Understand'} />
    </div>
  )
}

export default AirtimeToCashInfo