import { useState } from "react"
import { useFetchAdminData } from "../../Helpers/fetch.hooks"
import ButtonTwo from "../Helpers/ButtonTwo"
import LoadingBtn from "../Helpers/LoadingBtn"
import toast from "react-hot-toast"
import { updateAdmin } from "../../Helpers/api"

function EditAdmin({ adminUserId }) {
    const { adminData, isFetchingAdminData } = useFetchAdminData(adminUserId)
    const data = adminData?.data


    const [ loading, setLoading ] = useState(false)
    const [ formData, setFormData ] = useState({ _id: adminUserId, })

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleUpateAdmin = async () => {
        try {
            setLoading(true)
            const res = await updateAdmin(formData)
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
    <div>
      {
        isFetchingAdminData ? (
            <div className="absolute flex w-full top-12 items-center justify-center">
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
            </div>
        ) : (
            <>
            <h2
              className={`text-[24px] font-semibold `}
            >
              Edit Admin
            </h2>
  
            <div className="inputGroup">
              <label className="label">First Name</label>
              <input type="text" id="firstName" onChange={handleChange} defaultValue={data?.firstName} className="input"  />
            </div>

            <div className="inputGroup">
              <label className="label">Last Name</label>
              <input type="text" id="lastName" onChange={handleChange} defaultValue={data?.lastName} className="input"  />
            </div>

            <div className="inputGroup">
              <label className="label">User Name</label>
              <input type="text" id="username" onChange={handleChange} defaultValue={data?.username} className="input"  />
            </div>
  
            <div className="inputGroup mb-6">
              <label className="label">Edit Admin Role For</label>
              <select defaultValue={data?.role} onChange={handleChange} id="role" className="input">
                  <option value="">-- SELECT ROLE --</option>
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
              </select>
            </div>
  
            {loading ? (
              <LoadingBtn />
            ) : (
              <ButtonTwo
                onClick={handleUpateAdmin}
                text={`Update`}
              />
            )}
          </>
        )
      }
    </div>
  )
}

export default EditAdmin
