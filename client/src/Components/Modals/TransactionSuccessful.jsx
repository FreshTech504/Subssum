import CheckedImg from '../../assets/checked.png'
import ButtonTwo from '../Helpers/ButtonTwo'

function TransactionSuccessful({setSelectedCard}) {

    const closeModal = () => {
        setSelectedCard(null)
    }

  return (
    <div className="w-full card2">
        <div className="flex flex-col gap-[56px]">
            <div className="flex flex-col items-center">
                <img src={CheckedImg} alt='transaction successful' className='w-[132px] h-[132px]' />
                <p className="font-semibold text-[24px] text-gray-70 text-center">Transaction Successful</p>
            </div>

            <ButtonTwo onClick={closeModal} text={'Finish'} />
        </div>
    </div>
  )
}

export default TransactionSuccessful