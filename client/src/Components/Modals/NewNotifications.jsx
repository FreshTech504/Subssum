import { useState } from "react"
import { useFetchNotification } from "../../Helpers/fetch.hooks"
import LoadingBtn from "../Helpers/LoadingBtn"
import ButtonTwo from "../Helpers/ButtonTwo"
import { createNotification, updateNotification } from "../../Helpers/api"
import toast from "react-hot-toast"

function NewNotifications({ notificationId }) {
  const { isFetchingNotifications, notificationsData } = useFetchNotification( notificationId ? notificationId : '' )
  const data = notificationsData?.data
  console.log('object', notificationId)

  const [ formData, setFormData ] = useState({ _id: notificationId ? notificationId : ''})
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await createNotification(formData)
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const res = await updateNotification(formData)
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full card2 flex items-center justify-center flex-col">
            {isFetchingNotifications ? (
        <div className="absolute flex w-full top-20 items-center justify-center">
          <div className="loading-spinner flex items-center justify-center h-10 w-10 rounded-full left-0 top-0"></div>
        </div>
      ) : (
        <>
          <h2
            className={`text-[24px] font-semibold `}
          >
            { notificationId ? 'New' : 'Update' } Notifications
          </h2>

          <div className="inputGroup">
            <label className="label">Notification Message</label>
            <input type="text" id="note" onChange={handleChange} defaultValue={data?.note} className="input"  />
          </div>

          <div className="inputGroup">
            <label className="label">Select Who Message is For { data?.accountFor ? (data?.accountFor) : ('')}</label>
            <select onChange={handleChange} id="accountFor" className="input">
                <option value="">-- SELECT ACCOUT --</option>
                <option value="Users">Users</option>
                <option value="Admin">Admin</option>
            </select>
          </div>

          {
            notificationId && (
              <div className="inputGroup">
              <label className="label">Suspend notification</label>
              <select onChange={handleChange} id="suspended" className="input">
                  <option value="">-- SELECT ACCOUT --</option>
                  <option value="false">Unsuspend</option>
                  <option value="true">Suspend</option>
              </select>
            </div>
            )
          }

          {loading ? (
            <LoadingBtn />
          ) : (
            <ButtonTwo
              onClick={ notificationId ? handleUpdate : handleSubmit}
              text={`Submit`}
            />
          )}
        </>
      )}
    </div>
  )
}

export default NewNotifications
