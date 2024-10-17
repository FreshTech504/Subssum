import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";

function LoginPasscode({ passcodeInput, showPasscode, isLoading, formData, onKeyDown, handleShowPasscode, handlePasscode, handlePasscodeLogin, error }) {
  return (
    <div className="w-full mt-4 flex items-center flex-col justify-center gap-6">
        <div className="inputGroup">
            <label className="label">Passcode:</label>
            <div className="flex relative w-full items-center gap-2">
                    <div className="flex items-center gap-2 w-full">
                        {
                            passcodeInput.map((data, i) => {
                            return <input 
                                        key={i}
                                        type={showPasscode ? 'text' : 'password'} 
                                        value={data} 
                                        maxLength={1} 
                                        onChange={(e) => handlePasscode(e, i)} 
                                        onKeyDown={(e) => onKeyDown(e, i)}
                                        className="input flex-1 w-[100%] items-center text-center h-[60px] text-[20px] placeholder:text-[24px]"
                                        placeholder="*"
                                    />
                            })
                        }
                    </div>
                    <span onClick={handleShowPasscode}>
                        {
                        showPasscode ? (
                            <FaEye className="text-[20px] cursor-pointer" />
                        ) : (
                            <FaEyeSlash className="text-[20px] cursor-pointer" />
                        )
                        }
                  </span>
                </div>
        </div>
        
        <p className="text-center text-error font-semibold">{error}</p>

        {
            isLoading ? (
                <div className="w-full">
                    <LoadingBtn />
                </div>
            ) : (
                <div className="w-full">
                    <ButtonTwo onClick={handlePasscodeLogin} text={'login'} />
                </div>
            )
        }
    </div>
  )
}

export default LoginPasscode