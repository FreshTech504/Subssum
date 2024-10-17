import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";

function LoginPassword({ passwordInput, showPassword, isLoading, formData, onKeyDown, handleShowPassword, handlePassword, handleChange, handlePasswordLogin, error }) {
  return (
    <div className="w-full flex items-center flex-col justify-center gap-6">
        <div className="inputGroup">
            <label className="label">Email:</label>
            <input type="email" id="email" className="input" onChange={handleChange} />
        </div>

        <div className="inputGroup">
            <label className="label">Password:</label>
            <div className="flex relative w-full items-center gap-2">
                    <div className="flex items-center gap-2 w-full">
                        {
                            passwordInput.map((data, i) => {
                            return <input 
                                        key={i}
                                        type={showPassword ? 'text' : 'password'} 
                                        value={data} 
                                        maxLength={1} 
                                        onChange={(e) => handlePassword(e, i)} 
                                        onKeyDown={(e) => onKeyDown(e, i)}
                                        className="input flex-1 w-[100%] items-center text-center h-[60px] text-[20px] placeholder:text-[24px]"
                                        placeholder="*"
                                    />
                            })
                        }
                    </div>
                    <span onClick={handleShowPassword}>
                        {
                        showPassword ? (
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
                    <ButtonTwo onClick={handlePasswordLogin} text={'Proceed'} />
                </div>
            )
        }
    </div>
  )
}

export default LoginPassword