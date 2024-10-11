import { useLocation, useNavigate } from 'react-router-dom'
import GoogleImg from '../../assets/google.png'
import { app } from '../../firebase'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { oAuth } from '../../Helpers/api'
import { signInSuccess } from '../../Redux/user/userSlice'

function Google({text, isLoading, setIsLoading}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
          
  //handle referal
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refParams = queryParams.get("ref");
  const referredBy = refParams;
      

  const handleOAuth = async () => {
    try {
        setIsLoading(true)
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result =  await signInWithPopup(auth, provider)

        const formData = {
          name: result?.user.displayName,
          email: result?.user.email,
          photo: result?.user.photoURL,
          referredBy: referredBy ? referredBy : ''
        };
        
        console.log(formData)
        const res = await oAuth(formData)
        if(res.pinSet === false){
          localStorage.setItem('subsumtoken', res?.token)
          dispatch(signInSuccess(res?.data))
          navigate('/create-pin')
        }
        else{  
  
          
         localStorage.setItem('subsumtoken', res?.token)
          dispatch(signInSuccess(res?.data))
          navigate('/dashboard')
        }
    } catch (error) {
        console.log('could not login with google', error)
    } finally {
      setIsLoading(false)
    }
}  

  return (
    <button onClick={handleOAuth} disabled={isLoading} className='pad2 cursor-pointer w-full flex items-center justify-center gap-2 rounded-[12px] bg-white border-[1px] border-[#D7E1F4] shadow-shadow'>
        <img src={GoogleImg} alt='sign up with google' className='w-[21px]  h-[21 px]' />
        <p className='text-[18px]'>{text}</p>
    </button>
  )
}

export default Google