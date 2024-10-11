import { useState } from "react"
import { updatePassword } from "../Helpers/api"
import toast from "react-hot-toast"
import ButtonTwo from "./Helpers/ButtonTwo"
import LoadingBtn from "./Helpers/LoadingBtn"

function SetNewPassword({formData, setFormData}) {
    const [ isLoading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        if(!formData.oldPassword){
            toast.error('Enter Current Password')
            return
        }
        if(!formData.password){
            toast.error('Enter New Password')
            return
        }
        if(!formData.confirmPassword){
            toast.error('Enter Confirm Password')
            return
        }
        try {
            setIsLoading(true)
            const res = await updatePassword(formData)
            if(res.success){
                toast.success(res.data)
                setFormData({})
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className={`card1 w-full`}>
        <div className="flex flex-col w-full gap-8">
            <div>
                <div className="inputGroup">
                    <label className="label">Current Password</label>
                    <input type="password" id="oldPassword" onChange={handleChange} className="input" placeholder="Enter Current PIN" />
                </div>
                <div className="inputGroup">
                    <label className="label">New Password</label>
                    <input type="password" id="password" onChange={handleChange} className="input" placeholder="Enter New PIN" />
                </div>
                <div className="inputGroup">
                    <label className="label">Confirm New Password</label>
                    <input type="password" id="confirmPassword" onChange={handleChange} className="input" placeholder="Enter New PIN" />
                </div>
            </div>
            
            {
                isLoading ? (
                    <LoadingBtn />
                ) : (
                    <ButtonTwo onClick={handleUpdatePassword} text={'Submit'} />
                )
            }
        </div>
    </form>
  )
}

export default SetNewPassword