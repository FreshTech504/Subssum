import { useEffect, useState } from 'react'
import LogoImg from '../../assets/logo.png'
import LoginPassword from '../Components/LoginPassword'
import LoginPasscode from '../Components/LoginPasscode'
import { adminPasscodeLogin, adminPasswordLogin } from '../../Helpers/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../../Redux/admin/adminSlice'

function AdminLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ currentCard, setCurrentCard ] = useState('password')
    const [ passwordInput, setPasswordInput ] = useState(new Array(6).fill(''))
    const [ passcodeInput, setPasscodeInput ] = useState(new Array(6).fill(''))
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showPasscode, setShowPasscode ] = useState(false)
    const [formData, setFormData ] = useState({})

    const [ error, setError ] = useState()

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleShowPasscode = () => {
        setShowPasscode((prev) => !prev)
    }

    const handlePassword = (e, index) => {
        //if(isNaN(e.target.value)) return false;
    
        setPasswordInput([
          ...passwordInput.map((data, indx) => (indx === index? e.target.value:data))
        ])
    
        if(e.target.value && e.target.nextSibling){
          e.target.nextSibling.focus()
        }
    }

    const handlePasscode = (e, index) => {
        if(isNaN(e.target.value)) return false;
    
        setPasscodeInput([
          ...passcodeInput.map((data, indx) => (indx === index? e.target.value:data))
        ])
    
        if(e.target.value && e.target.nextSibling){
          e.target.nextSibling.focus()
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }
    //useEffect(() => {console.log('DATA', formData)}, [formData])
    
    const handlePasswordLogin = async (e) => {
        e.preventDefault()
        const passwordlength = passwordInput.join('')
        setFormData({...formData, password: passwordlength})
        console.log('formData', formData)
        if(passwordlength?.length < 6){
            setError('Enter a valid Password');
            setTimeout(() => {
                setError();
            }, 2000);
            return;
        }

                
        try {
            setIsLoading(true)
            if(!formData.email){
                setError('Enter Email');
                setTimeout(() => {
                    setError();
                }, 2000);
                return
            }
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailPattern.test(formData.email)){
                setError('Please enter a valid email');
                setTimeout(() => {
                    setError();
                }, 2000);
                return
            }
            if(!formData.password){
                setError('Enter Password');
                setTimeout(() => {
                    setError();
                }, 2000);
                return
            }

            const res = await adminPasswordLogin(formData)
            if(res.data.success === false){
                setError(res.data.data);
                setTimeout(() => {
                    setError();
                }, 2000);
            }
            if(res.success){
                setFormData({ ...formData, email: res.email })
                setCurrentCard('passcode')
                toast.success(res.data)
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    const handlePasscodeLogin = async (e) => {
        e.preventDefault()
        const passcodelength = passcodeInput.join('')
        setFormData({...formData, passcode: passcodelength})
        if(passcodelength?.length < 6){
            setError('Enter a valid Passcode');
            setTimeout(() => {
                setError();
            }, 2000);
            return;
        }

                
        try {
            setIsLoading(true)
            if(!formData.email){
                setError('Enter Email');
                setTimeout(() => {
                    setError();
                }, 2000);
                return
            }
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailPattern.test(formData.email)){
                setError('Please enter a valid email');
                setTimeout(() => {
                    setError();
                }, 2000);
                return
            }
            if(!formData.passcode){
                setError('Enter Passcode');
                setTimeout(() => {
                    setError();
                }, 2000);
                return
            }

            const res = await adminPasscodeLogin(formData)
            //console.log('Admin Passcode', res)
            if(res.data.success === false){
                setError(res.data.data);
                setTimeout(() => {
                    setError();
                }, 2000);
            }
            if(res.success){
                localStorage.setItem('subsumauthtoken', res?.token)
                dispatch(signInSuccess(res?.data))
                setFormData({})
                navigate('/admin-dashboard')
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value) {
            if (index > 0) {
                e.target.previousSibling.focus();
            }
        }
    };

  return (
    <div className="bg-gray-30 flex items-center justify-center min-h-[100vh]">
        <div className="w-[689px] rounded-[15px] bg-white py-8 px-8 flex flex-col items-center ">
            <img alt='logo' src={LogoImg} className='w-[162px]' />

            <div className='w-full'>
                {
                    currentCard === 'password' && (
                        <LoginPassword 
                            passwordInput={passwordInput}
                            showPassword={showPassword}
                            isLoading={isLoading}
                            formData={formData}
                            handleShowPassword={handleShowPassword}
                            handlePassword={handlePassword}
                            handleChange={handleChange}
                            onKeyDown={handleKeyDown}
                            handlePasswordLogin={handlePasswordLogin}
                            error={error}
                        />
                    )
                }
                {
                    currentCard === 'passcode' && (
                        <LoginPasscode 
                            passcodeInput={passcodeInput}
                            showPasscode={showPasscode}
                            isLoading={isLoading}
                            formData={formData}
                            handleShowPasscode={handleShowPasscode}
                            onKeyDown={handleKeyDown}
                            handlePasscode={handlePasscode}
                            handlePasscodeLogin={handlePasscodeLogin}
                            error={error}
                        />
                    )
                }
            </div>

        </div>
    </div>
  )
}

export default AdminLogin