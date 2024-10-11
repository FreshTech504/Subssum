import { useState } from "react"
import ButtonTwo from "./Helpers/ButtonTwo"
import LoadingBtn from "./Helpers/LoadingBtn"
import toast from "react-hot-toast"
import { updatePin } from "../Helpers/api"

function SetNewPin({formData, setFormData}) {
    const [ isLoading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleUpdatePin = async (e) => {
        e.preventDefault()
        if(!formData.oldPin){
            toast.error('Enter Current Pin')
            return
        }
        if(!formData.pin){
            toast.error('Enter New Pin')
            return
        }
        if(!formData.confirmPin){
            toast.error('Enter Confirm Pin')
            return
        }
        try {
            setIsLoading(true)
            const res = await updatePin(formData)
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
                    <label className="label">Current Pin</label>
                    <input type="password" id="oldPin" maxLength={4} onChange={handleChange} className="input" placeholder="Enter Current PIN" />
                </div>
                <div className="inputGroup">
                    <label className="label">New Pin</label>
                    <input type="password" id="pin" maxLength={4} onChange={handleChange} className="input" placeholder="Enter New PIN" />
                </div>
                <div className="inputGroup">
                    <label className="label">Confirm New Pin</label>
                    <input type="password" id="confirmPin" maxLength={4} onChange={handleChange} className="input" placeholder="Enter New PIN" />
                </div>
            </div>
            
            {
                isLoading ? (
                    <LoadingBtn />
                ) : (
                    <ButtonTwo onClick={handleUpdatePin} text={'Submit'} />
                )
            }
        </div>
    </form>
  )
}

export default SetNewPin