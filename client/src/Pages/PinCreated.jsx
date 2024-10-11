import Button from "../Components/Helpers/Button"
import Navbar from "../Components/Helpers/Navbar"

function PinCreated() {
    return (
        <div className='page1 w-full h-[100vh]'>
            <Navbar />
    
            <div className="pad3 mt-[110px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
                <div className="flex flex-col items-center w-full gap-[54px]">
                    <div className='flex flex-col w-full gap-[24px]'>
                        <div></div>
                        <p className="text-[24px] text-center text-gray-70">
                            Transaction Pin Created Successfully
                        </p>
                    </div>

                    <div className="w-full">
                        <Button bg={true} link={'join-whatsapp-community'} name={'Done'} />
                    </div>
                </div>
            </div>
    
        </div>
      )
}

export default PinCreated