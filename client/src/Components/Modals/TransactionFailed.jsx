import ErrorImg from '../../assets/error.png'
import ButtonTwo from '../Helpers/ButtonTwo'

function TransactionFailed({setSelectedCard}) {
    
    const closeModal = () => {
        setSelectedCard(null)
    }

  return (
    <div className="w-full card2">
        <div className="flex flex-col gap-[56px]">
            <div className="flex flex-col items-center">
                <img src={ErrorImg} alt='transaction error' className='w-[132px] h-[132px]' />
                <p className="font-semibold text-[24px] text-gray-70 text-center">Transaction Failed</p>
            </div>

            <ButtonTwo onClick={closeModal} text={'Finish'} />
        </div>
    </div>
  )
}

export default TransactionFailed