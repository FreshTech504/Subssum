import React, { useState } from 'react'
import ButtonTwo from '../Helpers/ButtonTwo'
import Loading from './Loading'
import toast from 'react-hot-toast'
import { requestPayout } from '../../Helpers/api'
import { signInSuccess } from '../../Redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function WithdrawalCashRequest({ setSelectedCard }) {
    const [ isLoading, setIsLoading ] = useState(false)
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.subSubUser);
    const user = currentUser?.data

    const [ formData, setFormData ] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleCashout = async () => {
        if(!formData.cashoutAmount){
            toast.error('Enter amount')
            return
        }
        if(formData.cashoutAmount < 1){
            toast.error('Amount Must be greater than one')
            return
        }
        if(!user?.accountNumber || !user?.accountName || !user?.bankName){
            toast.error('Fill Up account Details in profile page')
            window.location.href = '/profile';
        }
        try {
            setIsLoading(true)
            const res = await requestPayout(formData)
            //console.log(res)
            if(res.success){
                toast.success(res.msg)
                dispatch(signInSuccess(res?.data))
                setSelectedCard('transactionSuccessful')
            } else{
                toast.error(res.data)
                setSelectedCard('transactionFailed')
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='w-full card2 relative flex flex-col gap-6'>
        {
            isLoading && (
                <Loading />
            )
        }
        <div onClick={() => setSelectedCard(null)} className="absolute right-0 p-2 cursor-pointer border-[1px] border-gray-70 text-gray-90 rounded-full h-[30px] w-[30px] text-[30px] flex items-center justify-center">
            <span>&times;</span>
        </div>
        <h2 className='text-[20px] font-semibold text-gray-60 text-cente'>Make Withdrawal Request</h2>

        <div className='flex w-full flex-col gap-5'>
            <input type='number' className='input' id='cashoutAmount' onChange={handleChange} placeholder='Enter amout you want to cash out' />
            <ButtonTwo onClick={handleCashout} text={'Submit'} />
        </div>
    </div>
  )
}

export default WithdrawalCashRequest
