import { useEffect, useState } from "react";
import { useFetchUsers } from "../../Helpers/fetch.hooks";
import ButtonTwo from "../Helpers/ButtonTwo";
import Loading from "./Loading";
import { blockUser, makeAdmin } from "../../Helpers/api";
import toast from "react-hot-toast";

function MakeAdmin({ setSelectedCard }) {
  const loc = window.location;
  const pathName = loc.pathname.split("/")[2];
  const { isFetchingUser, userData } = useFetchUsers(pathName);

  const userInfo = userData?.data;
  const [ makingAdmin, setMakingAdmin ] = useState(false)
  const [ formData, setFormData ] = useState({ id: pathName, password: '12345' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleMakeAdmin = async () => {
    try {
      setMakingAdmin(true);
      const res = await makeAdmin(formData);
      if (res?.success) {
        toast.success(res.data);
        setSelectedCard(null);

        window.location.reload()
      } else {
        toast.error(res.data);
        setSelectedCard(null);
      }
    } catch (error) {
    } finally {
      setMakingAdmin(false);
    }
  };
  
  useEffect(() => {console.log('object dara', formData)}, [formData])
  return (
    <div className="w-full card2 flex items-center justify-center flex-col">
      {isFetchingUser ? (
        <div className="absolute flex w-full top-20 items-center justify-center">
          <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
        </div>
      ) : (
        <>
          <h2
            className={`text-[24px] font-semibold `}
          >
            Are you sure you want to make {userInfo?.firstName} {userInfo?.lastName} an admin?
          </h2>

          <div className="inputGroup">
            <label className="label">Set Password</label>
            <input type="text" id="password" onChange={handleChange} defaultValue={formData?.password} className="input"  />
          </div>

          <div className="inputGroup">
            <label className="label">Select Admin Role For User</label>
            <select onChange={handleChange} id="role" className="input">
                <option value="">-- SELECT ROLE --</option>
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
            </select>
          </div>

          {makingAdmin ? (
            <Loading />
          ) : (
            <ButtonTwo
              onClick={handleMakeAdmin}
              text={`Make Admin`}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MakeAdmin;
