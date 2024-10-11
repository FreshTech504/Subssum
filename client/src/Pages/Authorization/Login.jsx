import { useEffect, useState } from "react"
import SideImg from '../../assets/left-section.png'
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import Button from "../../Components/Helpers/Button";
import Google from "../../Components/Helpers/Google";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import { loginUser } from "../../Helpers/api";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import toast from "react-hot-toast";
import LogoImg from '../../assets/logo.png'
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../Redux/user/userSlice";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ showPassword, setShowPassword ] = useState(false)
  const [ formData, setFormData ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ remeberMe, setRemeberMe ] = useState(false)
  const [ errorResponse , setErrorResponse ] = useState()
  const [ emailError, setEmailError ] = useState()
  const [ passwordError, setPasswordError ] = useState()

  const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value })
  }

  const seePassword = () => {
      setShowPassword((prev) => !prev)
  }

  //useEffect(() => {console.log(formData)}, [formData])
  const handleLogin = async (e) => {
    e.preventDefault()
    if(!formData.emailOrMobile){
      setEmailError('Enter Email');
      setTimeout(() => {
          setEmailError();
      }, 2000);
      return
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(formData.emailOrMobile)){
        setEmailError('Please enter a valid email');
        setTimeout(() => {
            setEmailError();
        }, 2000);
        return
    }
    if(!formData.password){
      setPasswordError('Enter Password');
      setTimeout(() => {
          setPasswordError();
      }, 2000);
      return
    }
    try {
      setIsLoading(true)
      const res = await loginUser(formData)
      if(res.data.success === false){
        setErrorResponse(res.data.data);
        setTimeout(() => {
            setErrorResponse();
        }, 2000);

        return
      }
      if(res.isVerified === false){
        navigate("/signup-successful", {
          state: { resMsg: res?.data },
        });
      }else if(res.pinSet === false){
        localStorage.setItem('subsumtoken', res?.token)
        dispatch(signInSuccess(res?.data))
        setFormData({})
        navigate('/create-pin')
      }
      else{  

        
       localStorage.setItem('subsumtoken', res?.token)
        dispatch(signInSuccess(res?.data))
        setFormData({})
        navigate('/dashboard')
      }
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center w-full h-[100vh] tablet:h-auto bg-gray-10 small-pc:justify-center small-pc:bg-white'>
        <div className="relative flex w-[470px] h-full overflow-y-hidden small-pc:hidden">
            <div className='fixed left-0 top-0 flex w-full h-full'>
                <img src={SideImg} alt='image of subsum' className='h-full' />
            </div>
        </div>

        <div className='relative flex items-center justify-center h-full w-full'>
            <div className='absolute w-[80%] flex items-center justify-between top-[24px] h-[24px] small-pc:bg-gray-10 small-pc:w-full small-pc:pl-[10%] phone:pl-[2%] small-pc:pr-[10%] phone:pr-[2%] small-pc:top-0 small-pc:p-8 small-pc:border-[1px] small-pc:border-gray-30'>
                <Link to='/' className='flex items-center gap-1 text-[16px] text-second-color phone:hidden'>
                    <IoIosArrowBack />
                    Home
                </Link>

                <Link to='/'>
                    <img src={LogoImg} alt="logo of subsum" className="hidden phone:flex phone:w-[108.97px] phone:h-[25px]" />
                </Link>

                <Button name={'Sign Up'} link={'register'} bg={true} />
            </div>

            <div className='flex flex-col items-center justify-center gap-[26px] phone:-[24px] w-[500px] phone:w-[90%] mt-[2rem] phone:mt-[5rem]'>
                <div className='text-[25px] phone:text-[20px] flex text-center items-center text-gray-70' >
                    Login
                </div>

                <form onSubmit={handleLogin} className='flex flex-col gap-[24px] w-full'>
                    <Google isLoading={isLoading} setIsLoading={setIsLoading} text={'Login with Gmail'} />

                    <div className='flex items-center justify-center gap-[14px] w-full'>
                        <hr className='border-[1px] border-gray-40 w-full' />
                        <p className='text-[13px] text-gray-80 w-full text-center'>Or continue with</p>
                        <hr className='border-[1px] border-gray-40 w-full' />
                    </div>

                    <div className='pad3 phone:pad3b bg-white rounded-[12px] border-[1px] flex gap-[10px] border-gray-30'>
                        <div className='flex flex-col gap-[32px] w-full'>
                            <div className='flex flex-col gap-4 w-full'>
                                <div className='inputGroup'>
                                    <label className='label'>Email Address</label>
                                    <input className='input' type='text' id='emailOrMobile' onChange={handleChange} placeholder='wabdotmail@gmail.com' />
                                    <p className="text-center text-error font-semibold">{emailError}</p>
                                </div>
                                <div className='inputGroup relative'>
                                    <label className='label'>Password</label>
                                    <div className="relative w-full">
                                        <input className='input w-full' type={showPassword ? 'text' : 'password'} id='password' onChange={handleChange} placeholder='Gabon4351' />
                                        <div onClick={seePassword} className='absolute right-[10px] bottom-[10px] text-[20px] cursor-pointer'>
                                            {
                                                showPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaRegEyeSlash />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <p className="text-center text-error font-semibold">{passwordError}</p>
                                </div>
                                <div className='flex items-center justify-between tablet:flex-col-reverse'>
                                        <div className="flex items-center gap-[8px]">
                                            <div onClick={() => setRemeberMe((prev) => !prev)} className={`relative cursor-pointer w-[40px] h-[20px] rounded-[36.5px] border-[0.5px] border-gray-30 ${remeberMe ? 'bg-second-color': 'bg-gray-20' }`}>
                                                <span className={`h-4 w-4 rounded-full bg-white absolute top-[1px] ${ remeberMe ? 'right-[2px]' : 'left-[2px]'}`}></span>
                                            </div>
                                            <p className="text-second-color text-[14px]">Remember me</p>
                                        </div>

                                        <Link to='/forgot-password' className="text-error text-[14px] ml-auto">
                                            Recover Password
                                        </Link>
                                </div>

                                {/**ERROR RESPONSE */}
                                <p className="text-center text-error font-semibold">{errorResponse}</p>

                            </div>
                            {
                                isLoading ? (
                                    <LoadingBtn />
                                ) : (

                                    <ButtonTwo onClick={handleLogin} text={'Login'} />
                                )
                            }

                            <p className='text-center text-gray-90 font-semibold'>
                                New User? {' '}
                                <Link to='/register' className='text-gray-50'>Register here</Link>
                            </p>

                        </div>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
  )
}

export default Login