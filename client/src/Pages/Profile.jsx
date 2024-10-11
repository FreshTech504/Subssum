import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"
import PictureProfileCard from "../Components/Helpers/PictureProfileCard";
import ProfileDetailsCard from "../Components/Helpers/ProfileDetailsCard";
import { useState } from "react";
import SetNewPin from "../Components/SetNewPin";
import SetNewPassword from "../Components/SetNewPassword";


function Profile({setSelectedCard, toggleMenu, showMenu, formData, setFormData, shortText}) {
    const [ cardState, setCardState ] = useState('changePin')

    const setModal = () => {
        setSelectedCard('editProfile')
    }

  return (
    <div className="flex w-full min-h-[100vh]">
        <div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
            <div className='fixed w-[304px] left-0 top-0 flex h-full'>
                <Sidebar />
            </div>
        </div>

        <div className='relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto'>
            <div className="w-[96%] phone:w-[96%]">
                <div className="mt-6">
                    <TopNav toggleMenu={toggleMenu} showMenu={showMenu} />
                </div>

                <div className="flex items-start gap-12 mt-12 small-pc:flex-col tablet:items-center ">
                    <div className="flex flex-col gap-4 tablet:w-[95%] tablet:items-center tablet:justify-center">
                        <PictureProfileCard />

                        <ProfileDetailsCard setModal={setModal} shortText={shortText} />
                    </div>

                    <div className="flex flex-col gap-[11px] w-[432px] tablet:w-[95%]">
                        <div className="w-full border-[1px] p-2 flex items-center rounded-[1000px] gap-[10px] border-l-gray-30">
                            {
                                cardState === 'changePin' ? (
                                    <>
                                        <div onClick={() => setCardState('changePin')} className={`h-[40px] cursor-pointer w-full rounded-[100px] text-[14px] font-semibold flex justify-center items-center text-center border-[1px] border-gray-20 ${cardState === 'changePin' ? 'text-color-2' : 'bg-gray-30 text-color-3'}`}>
                                            Change PIN
                                        </div>
                                        <div onClick={() => setCardState('changePassword')} className={`h-[40px] cursor-pointer w-full rounded-[100px] text-[14px] font-semibold flex justify-center items-center text-center border-[1px] border-gray-20 ${cardState === 'changePassword' ? 'text-color-2' : 'bg-gray-30 text-color-3'}`}>
                                            Change Password
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div onClick={() => setCardState('changePassword')} className={`h-[40px] cursor-pointer w-full rounded-[100px] text-[14px] font-semibold flex justify-center items-center text-center border-[1px] border-gray-20 ${cardState === 'changePassword' ? 'text-color-2' : 'bg-gray-30 text-color-3'}`}>
                                            Change Password
                                        </div>
                                        <div onClick={() => setCardState('changePin')} className={`h-[40px] cursor-pointer w-full rounded-[100px] text-[14px] font-semibold flex justify-center items-center text-center border-[1px] border-gray-20 ${cardState === 'changePin' ? 'text-color-2' : 'bg-gray-30 text-color-3'}`}>
                                            Change PIN
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="w-full tablet:mb-12">
                            {
                                cardState === 'changePin' ? (
                                    <SetNewPin formData={formData} setFormData={setFormData} />
                                ) : (
                                    <SetNewPassword formData={formData} setFormData={setFormData} />
                                )
                            }
                        </div>
                    </div>
                </div>   

            </div>
        </div>

    </div>
  )
}

export default Profile