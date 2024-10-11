import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideImg from '../../assets/left-section.png'
import Button from '../../Components/Helpers/Button'
import { IoIosArrowBack } from "react-icons/io";
import Google from '../../Components/Helpers/Google';
import ButtonTwo from '../../Components/Helpers/ButtonTwo';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { registerUser } from '../../Helpers/api';
import LoadingBtn from '../../Components/Helpers/LoadingBtn';
import LogoImg from '../../assets/logo.png'

function Register() {
    const navigate = useNavigate()
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowconfirmPassword ] = useState(false)
    const [ formData, setFormData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorResponse , setErrorResponse ] = useState()
    const [ passwordError, setPasswordError ] = useState()
    const [ confirmPasswordError, setConfirmPasswordError ] = useState()

    const [ emailError, setEmailError ] = useState()
    const [ firstNameError, setFirstNameError ] = useState()
    const [ lastNameError, setLastNameError ] = useState()

    const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/
    const numberRegex = /^[^0-9]*$/;


        //REFF
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const refParams = queryParams.get("ref");
        const referredBy = refParams;
    
        useEffect(() => {
            if(referredBy){
                setFormData({ ...formData, referredBy: referredBy })
            }
        }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }
    const seePassword = () => {
        setShowPassword((prev) => !prev)
    }

    const seeConfirmPassword = () => {
        setShowconfirmPassword((prev) => !prev)
    }

    useEffect(() => {
        //const tesst = numberRegex.test(formData.firstName)
        //console.log(formData)
        if(!numberRegex.test(formData?.firstName)){
            setFirstNameError('First Name must not contain numbers')
        } else{
            setFirstNameError()
        }
        if(!numberRegex.test(formData?.lastName)){
            setLastNameError('Last Name must not contain numbers')
        } else{
            setLastNameError()
        }

        //PASSWORD ERROR
        if(formData.password?.length >= 1 && formData.password?.length < 6){
            setPasswordError('Password must be 6 characters long')
        } else if(!specialChars.test(formData.password) && formData.password?.length >= 6){
            setPasswordError('Password must contain at least one special character')
        } else {
            setPasswordError()
        }

        if(formData.password !== formData.confirmPassword && formData.confirmPassword >= 1){
            setConfirmPasswordError('Password do not match')
        } else {
            setConfirmPasswordError()
        }
    }, [formData.password, formData.confirmPassword, formData?.firstName, formData?.lastName])

    const handleSignup = async (e) => {
        e.preventDefault()
        if(!formData.email){
            setEmailError('Enter Email');
            setTimeout(() => {
                setEmailError();
            }, 2000);
            return
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailPattern.test(formData.email)){
            setEmailError('Please enter a valid email');
            setTimeout(() => {
                setEmailError();
            }, 2000);
            return
        }
        
        if(!formData.firstName){
            setFirstNameError('Enter First Name');
            setTimeout(() => {
                setFirstNameError();
            }, 2000);
            return
        }
        if(!numberRegex.test(formData?.firstName)){
            setFirstNameError('First Name must not contain numbers');
            setTimeout(() => {
                setFirstNameError();
            }, 2000);
            return
        }
        if(!formData.lastName){
            setLastNameError('Enter Last Name');
            setTimeout(() => {
                setLastNameError();
            }, 2000);
            return
        }
        if(!numberRegex.test(formData?.lastName)){
            setLastNameError('Last Name must not contain numbers');
            setTimeout(() => {
                setLastNameError();
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
        if(!formData.confirmPassword){
            setConfirmPasswordError('Enter Confirm Password');
            setTimeout(() => {
                setConfirmPasswordError();
            }, 2000);
            return
        }

        
        if(!specialChars.test(formData.password)){
            setPasswordError('Password must contain at least one special character');
            setTimeout(() => {
                setPasswordError();
            }, 2000);
            return
        }

        if(formData.password.length < 6){
            setPasswordError('Password must be 6 characters long');
            setTimeout(() => {
                setPasswordError();
            }, 2000);
            return
        }

        if(formData.password !== formData.confirmPassword){
            setConfirmPasswordError('Password do not match');
            setTimeout(() => {
                setConfirmPasswordError();
            }, 2000);
            return
        }
        try {
            setIsLoading(true)
            const res = await registerUser(formData)
            if(res.data.success === false){
                setErrorResponse(res.data.data);
                setTimeout(() => {
                    setErrorResponse();
                }, 2000);
        
                return
              }
            
            if(res.success){
                navigate("/signup-successful", {
                    state: { resMsg: `${res?.data}` },
                });
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='flex items-center w-full overflow-x-hidden h-[100vh] tablet:h-auto bg-gray-10 small-pc:justify-center small-pc:bg-white'>
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

                <Button name={'Login'} link={'login'} bg={true} />
            </div>

            <div className='flex flex-col items-center justify-center gap-[26px] w-[500px] phone:w-[90%] mt-[10rem] phone:mt-[7rem]'>
                <div className='text-[25px] phone:[20px] flex text-center items-center text-gray-70' >
                    Sign up
                </div>

                <form onSubmit={handleSignup} className='flex flex-col gap-[24px] w-full mb-4'>
                    <Google setIsLoading={setIsLoading} isLoading={isLoading} text={'Sign up with Google'} />

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
                                    <input className='input' type='email' id='email' onChange={handleChange} placeholder='wabdotmail@gmail.com' />
                                    <p className='text-[14px] text-error font-semibold'>{emailError}</p>
                                </div>
                                <div className='inputGroup'>
                                    <label className='label'>First Name</label>
                                    <input maxLength={50} className='input' type='text' id='firstName' onChange={handleChange} placeholder='Wahab' />
                                    <p className='text-[14px] text-error font-semibold'>{firstNameError}</p>
                                </div>
                                <div className='inputGroup'>
                                    <label className='label'>Last Name</label>
                                    <input maxLength={50} className='input' type='text' id='lastName' onChange={handleChange} placeholder='Lawal' />
                                    <p className='text-[14px] text-error font-semibold'>{lastNameError}</p>
                                </div>
                                <div className='inputGroup relative'>
                                    <label className='label'>Password</label>
                                    <div className='relative w-full'>
                                        <input className='input w-full' type={showPassword ? 'text' : 'password'} id='password' onChange={handleChange} placeholder='Gabon4351' />
                                        <div onClick={seePassword} className={`absolute right-[10px] bottom-[15px] z-10 text-[20px] cursor-pointer`}>
                                            {
                                                showPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaRegEyeSlash />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <p className='text-[14px] text-error min-h-3 font-semibold'>{passwordError}</p>
                                </div>
                                <div className='inputGroup relative'>
                                    <label className='label'>Confirm Password</label>
                                    <div className='relative w-full'>
                                        <input className='input w-full' type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' onChange={handleChange} placeholder='Gabon4351' />
                                        <div onClick={seeConfirmPassword} className='absolute right-[10px] bottom-[15px] z-10 text-[20px] cursor-pointer'>
                                            {
                                                showConfirmPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaRegEyeSlash />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <p className='text-[14px] text-error min-h-3 font-semibold'>{confirmPasswordError}</p>
                                </div>
                            </div>
                            {/**ERROR TEXT */}
                            <p className="text-center text-error font-semibold">{errorResponse}</p>
                            {
                                isLoading ? (
                                    <LoadingBtn />
                                ) : (

                                    <ButtonTwo onClick={handleSignup} text={'Create Account'} />
                                )
                            }
                            
                            <p className='text-center text-gray-90 font-semibold'>
                                Already have an account? {' '}
                                <Link to='/login' className='text-gray-50'>Login here</Link>
                            </p>

                        </div>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
  )
}

export default Register