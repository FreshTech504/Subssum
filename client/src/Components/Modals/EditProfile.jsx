import { useDispatch, useSelector } from "react-redux";
import ButtonTwo from "../Helpers/ButtonTwo"
import { useState } from "react";
import LoadingBtn from "../Helpers/LoadingBtn";
import { updateUser } from "../../Helpers/api";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { signInSuccess } from "../../Redux/user/userSlice";

function EditProfile({ formData, setFormData, setSelectedCard }) {
    const dispatch = useDispatch()
    const [ isLoading, setIsLoading ] = useState(false)
    const { currentUser } = useSelector((state) => state.subSubUser);
    const user = currentUser?.data

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

    const handleUpdateProfile = async () => {
        try {
            setIsLoading(true)
            const res = await updateUser(formData)
            if(res.success){
                toast.success('Account Updated Successful')
                dispatch(signInSuccess(res?.data))
                setFormData({})
                setSelectedCard(null)
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className="w-full card2 h-[70vh] overflow-y-auto scrollbar-thin">
        {
            isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
            )
        }
        <h2 className="w-full font-semibold text-[20px] text-gray-70">Edit Details</h2>

        <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
                <div className="inputGroup">
                    <label className="label">First Name</label>
                    <input className="input" id="firstName" onChange={handleChange} defaultValue={`${user.firstName}`} type="text" />
                </div>
                <div className="inputGroup">
                    <label className="label">Last Name</label>
                    <input className="input" id="lastName" onChange={handleChange} defaultValue={`${user.lastName}`} type="text" />
                </div>
                <div className="inputGroup">
                    <label className="label">Phone Number</label>
                    <input className="input" id="mobile" onChange={handleChange} defaultValue={user.mobile} type="text" />
                </div>
                <div className="inputGroup">
                    <label className="label">Username</label>
                    <input className="input" id="username" onChange={handleChange} defaultValue={user.username} type="text" />
                </div>

                <h2 className="w-full font-semibold text-[20px] text-gray-70">Account Details</h2>
                <div className="inputGroup">
                    <label className="label">Bank Name</label>
                    <input className="input" id="bankName" onChange={handleChange} defaultValue={user.bankName} type="text" />
                </div>
                <div className="inputGroup">
                    <label className="label">Account Name</label>
                    <input className="input" id="accountName" onChange={handleChange} defaultValue={user.accountName} type="text" />
                </div>
                <div className="inputGroup">
                    <label className="label">Account Number</label>
                    <input className="input" id="accountNumber" onChange={handleChange} defaultValue={user.accountNumber} type="text" />
                </div>
            </div>
            
            {
                isLoading ? (
                    <LoadingBtn />
                ) : (
                    <ButtonTwo onClick={handleUpdateProfile} text={'Confirm Changes'} />
                )
            }
        </div>
    </div>
  )
}

export default EditProfile