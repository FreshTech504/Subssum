import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../Helpers/api";
import Button from "../../Components/Helpers/Button";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import Navbar from "../../Components/Helpers/Navbar";

function VerifyUser() {
    const navigate = useNavigate()
    const { id, token } = useParams();
    const [ errorMsg, setErrorMsg ] = useState(null)

    useEffect(() => {
        const verify = async () => {
            try {
                setErrorMsg(null)
                const res = await verifyUser({ id, token})

                if(res.data.success){
                    navigate('/login')
                } 
            } catch (error) {
                setErrorMsg('Unable To verify Account')
                
            }    
        }

        verify();
    }, [id, token])

    const relaod = () => {
        window.location.reload()
    }
    return (
        <div className='page1 w-full h-[100vh]'>
            <Navbar />
    
            <div className="pad3 mt-[110px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
                {
                    errorMsg ? (
                        <div className="flex flex-col gap-3">
                            <p className="font-semibold text-error text-center">{errorMsg}</p>
                            <ButtonTwo onClick={relaod} text={'Retry'} />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <p className="mb-4 text-center text-second-color text-[20px] font-semibold">Verifying Account please wait...</p>
                            <div className="loading"></div>
                        </div>
                    )
                }
            </div>
    
        </div>
      )
}

export default VerifyUser