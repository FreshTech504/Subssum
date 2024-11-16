import { useLocation } from "react-router-dom"
import { useFetchUsers } from "../../Helpers/fetch.hooks"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"
import Aside from "../Components/Aside"
import { useState } from "react"
import { adminUpdateUser } from "../../Helpers/api"
import toast from "react-hot-toast"
import { jwtDecode } from "jwt-decode"

function UserDetails({ setSelectedCard }) {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]
    const { isFetchingUser, userData } = useFetchUsers(pathName)

    const userInfo = userData?.data

    const [ formData, setFormData ] = useState({ _id: pathName })
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ updatingUser, setUpdatingUser ] = useState(false)

    const handleUpdateUser = async () => {
      if(updatingUser){
        return
      }
      try {
        setUpdatingUser(true)
        const res = await adminUpdateUser(formData)
        if(res.success){
          toast.success(res.data)
        } else {
          toast.error(res.data)
        }
      } catch (error) {
        
      } finally{
        setUpdatingUser(false)
      }
    }

    const handleBlockUser = () => {
      setSelectedCard('blockUser')
    }
    const handleMakeAdmin = () => {
      setSelectedCard('MakeAdmin')
    }

    const adminInfo = localStorage.getItem('subsumauthtoken')
    const decodedToken = jwtDecode(adminInfo);

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] flex flex-col px-12 w-[732px] small-pc:w-full">

            {
                isFetchingUser ? (
                    <div className="absolute flex w-full top-20 items-center justify-center">
                        <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                    </div>
                ) : (
                    <form>
                        <div className="flex items-center justify-between">
                            <h2 className="text-[#1F2937] font-semibold text-[26px]">User Infomation</h2>

                            <div className="flex items-center gap-1">
                                <div className={`w-[19px] h-[19px] rounded-full ${ userInfo?.verified === false || userInfo?.blocked ? 'bg-error' : 'bg-success' }`}></div>
                                <p>{ userInfo?.verified === false ? 'Not Verified' :  userInfo?.blocked ? 'Account Blocked' : 'Verified' }</p>
                            </div>
                        </div>

                        <div className="mt-8 flex w-full flex-col gap-6">
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">Frist Name</label>
                              <input type="text" id="firstName" defaultValue={userInfo?.firstName} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">Last Name</label>
                              <input type="text" id="lastName" defaultValue={userInfo?.lastName} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">Username</label>
                              <input type="text" id="username" defaultValue={userInfo?.username} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">Email</label>
                              <input type="text" id="email" defaultValue={userInfo?.email} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">Phone Number</label>
                              <input type="text" id="mobile" defaultValue={userInfo?.mobile} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">Referral link</label>
                              <input type="text" id="referralLink" defaultValue={userInfo?.referralLink} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">User Account Balance</label>
                              <input type="number" id="acctBalance" defaultValue={userInfo?.acctBalance} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">User Bonus Cash Point(BONUS)</label>
                              <input type="number" id="walletBonus" defaultValue={userInfo?.walletBonus} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">User Cash wallet</label>
                              <input type="number" id="cashWallet" defaultValue={userInfo?.cashWallet} onChange={handleChange} className="input w-full" />
                            </div>
                            <div className="inputGroup flex-row items-center justify-between gap-4">
                              <label className="label w-[40%]">User Transaction Total</label>
                              <input type="number" id="transactionTotal" defaultValue={userInfo?.transactionTotal} onChange={handleChange} className="input w-full" />
                            </div>
                        </div>

                        {/**BUTTONS */}
                        <div className="flex mt-16 mb-24 items-center justify-evenly gap-10">
                          <div onClick={handleBlockUser} className="py-2 px-3 flex-1 flex items-center justify-center font-semibold cursor-pointer text-white rounded-[8px] bg-[#6882B6] border-[1px] border-[#6882B6] shadow-xl">
                              { userInfo?.blocked ? 'Unblock User' : 'Block User' }
                          </div>
                          <div onClick={handleUpdateUser} className="py-2 px-3 flex-1 flex items-center justify-center font-semibold cursor-pointer text-white rounded-[8px] bg-[#6882B6] border-[1px] border-[#6882B6] shadow-xl">
                              { updatingUser ? 'Updating...' : 'Update'}
                          </div>
                          {
                            decodedToken?.role === 'Admin' && (
                              <div onClick={handleMakeAdmin} className="py-2 px-3 flex-1 flex items-center justify-center font-semibold cursor-pointer text-white rounded-[8px] bg-[#6882B6] border-[1px] border-[#6882B6] shadow-xl">
                                  Make Admin
                              </div>
                            )
                          }
                        </div>
                    </form>
                )
            }
          

        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default UserDetails
