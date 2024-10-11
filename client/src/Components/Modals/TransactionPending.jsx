import PendingImg from '../../assets/pending.png'
import ButtonTwo from '../Helpers/ButtonTwo'

function TransactionPending({setSelectedCard}) {
    const closeModal = () => {
        setSelectedCard(null)
    }

  return (
    <div className="w-full card2">
        <div className="flex flex-col gap-[56px]">
            <div className="flex flex-col items-center">
                <img src={PendingImg} alt='transaction successful' className='spin-pending-img w-[132px] h-[132px]' />
                <p className="font-semibold text-[24px] text-gray-70 text-center">Transaction Pending</p>
            </div>

            <ButtonTwo onClick={closeModal} text={'Finish'} />
        </div>
    </div>
  )
}

export default TransactionPending