import { useLocation } from "react-router-dom";
import ButtonTwo from "../Helpers/ButtonTwo";
import { useState } from "react";
import { updateTracStatus } from "../../Helpers/api";

function UpdateTransactionStatus() {
    const loc = window.location;
    const pathName = loc.pathname.split("/")[3];
    const [ newStatus, setNewStatus ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(false)

    const status = [
        {
            name: 'Successful',
            color: '#2DAE32'
        },
        {
            name: 'Initiatied',
            color: '#FFB547'
        },
        {
            name: 'Failed',
            color: '#EE5D50'
        }
    ]

    const handleStatus = (item) => {
        setNewStatus(item)
    }

    const handleUpdateTransaction = async () => {
        if(!newStatus){
            setError('Choose a Status')
        }
        setTimeout(() => {
            setError()
        }, 2500)
        try {
            setLoading(true)
            const res = await updateTracStatus({ status: newStatus, id: pathName})
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="w-full flex flex-col gap-8">
        <h2 className="text-[20px] font-semibold text-primary-color">
            Update Transaction Status
        </h2>

        <div className="flex flex-col gap-8 w-full ml-8">
            {
                status.map((item, idx) => (
                    <div key={idx} onClick={() => handleStatus(item?.name)} className="flex items-center gap-2">
                        <span className={`border-[0.5px] border-gray-20 h-[20px] w-[20px] rounded-full ${item?.name === newStatus ? `bg-[${item.color}]` : `bg-transparent` }`}>

                        </span>

                        <p className={`text-[20px] font-semibold text-[${item?.color}]`} >{item.name}</p>
                    </div>
                ))
            }
        </div>

        <p className="text-error text-[14px] text-center font-bold">{error}</p>

        <ButtonTwo onClick={handleUpdateTransaction} text={'Update'} />
    </div>
  )
}

export default UpdateTransactionStatus
