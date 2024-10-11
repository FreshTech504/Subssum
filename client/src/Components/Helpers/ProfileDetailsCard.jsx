import { LuCopy } from "react-icons/lu";
import { useSelector } from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from "react-hot-toast";

function ProfileDetailsCard({setModal, shortText}) {
    const { currentUser } = useSelector((state) => state.subSubUser);
    const user = currentUser?.data

    const clicked = () => {
        toast.success('Copied')  
    }

  return (
    <div className="card1 flex flex-col gap-4 w-[416px] tablet:w-full">
        <div className="flex items-center justify-between text-gray-70">
            <p>
                Name
            </p>
            <p className="font-semibold">
                {user?.firstName} {user?.lastName}
            </p>
        </div>
        <div className="flex items-center justify-between text-gray-70">
            <p>
                Email
            </p>
            <p className="font-semibold">
                {user?.email}
            </p>
        </div>
        <div className="flex items-center justify-between text-gray-70">
            <p>
                Phone Number
            </p>
            <p className="font-semibold">
                {user?.mobile}
            </p>
        </div>
        <div className="flex items-center justify-between text-gray-70">
            <p>
                Account Status
            </p>
            <p className={`font-semibold ${user?.verified ? 'text-success' : user?.blocked ? 'text-error' : 'text-warning'}`}>
                {user?.verified ? 'Active' : user?.blocked ? 'Blocked' : 'Pending'}
            </p>
        </div>
        <div className="flex items-start justify-between text-gray-70">
            <p>
                Referral link
            </p>
            <div className="font-semibold flex flex-col gap-2">
                <p>
                    {shortText(user?.referralLink, 30)}
                </p>
                <CopyToClipboard text={user?.referralLink} onCopy={clicked}>
                    <span className="ml-auto cursor-pointer">
                        <LuCopy />
                    </span>
                </CopyToClipboard>
            </div>  
        </div>

        <div className="text-second-color text-[16px] font-semibold cursor-pointer" onClick={setModal} >
            Edit Detail
        </div>
    </div>
  )
}

export default ProfileDetailsCard