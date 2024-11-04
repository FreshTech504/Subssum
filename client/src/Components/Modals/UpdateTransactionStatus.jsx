import { useLocation } from "react-router-dom";
import ButtonTwo from "../Helpers/ButtonTwo";

function UpdateTransactionStatus() {
    const loc = window.location;
    const pathName = loc.pathname.split("/")[3];

    co

    const handleUpdateTransaction = async () => {
        try {
            const res = await ''
        } catch (error) {
            
        } finally {
            set
        }
    }

  return (
    <div className="w-full bg-[#EFF3FB] flex flex-col">
        <h2 className="text-[20px] font-semibold text-primary-color">
            Update Transaction Status
        </h2>

        <div>

        </div>

        <ButtonTwo onClick={handleUpdateTransaction} text={'Update'} />
    </div>
  )
}

export default UpdateTransactionStatus
