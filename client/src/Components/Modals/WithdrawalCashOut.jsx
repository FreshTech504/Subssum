import React, { useState } from 'react'
import ButtonTwo from '../Helpers/ButtonTwo'
import Loading from './Loading'
import toast from 'react-hot-toast'
import { cashoutBonus } from '../../Helpers/api'

function WithdrawalCashOut({setSelectedCard, formData, setFormData}) {
    const [ isLoading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleCashout = async () => {
        if(!formData.cashoutAmount){
            toast.error('Enter amount')
            return
        }
        try {
            setIsLoading(true)
            const res = await cashoutBonus(formData)
            //console.log(res)
            if(res.status === 406){
                setSelectedCard('transactionFailed')
            }
            if(res.status === 206){
                setSelectedCard('transactionSuccessful')
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
        <h2 className='text-[20px] font-semibold text-gray-60 text-cente'>Withdraw Cashout</h2>

        <div className='flex w-full flex-col gap-5'>
            <input className='input' id='cashoutAmount' onChange={handleChange} placeholder='Enter amout you want to cash out' />
            <ButtonTwo onClick={handleCashout} text={'Submit'} />
        </div>
    </div>
  )
}

export default WithdrawalCashOut