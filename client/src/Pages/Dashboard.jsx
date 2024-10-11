import ButtonTwo from "../Components/Helpers/ButtonTwo"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"
import { FaNairaSign } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { PiShareFatLight } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import CreditCardImg from '../assets/creditCard.png'
import { useDispatch, useSelector } from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { verifyPaymentTransactions } from "../Helpers/api";
import { signInSuccess } from "../Redux/user/userSlice";

function Dashboard({setSelectedCard, toggleMenu, showMenu, shortText}) {
    const location = useLocation();
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.subSubUser);
    const user = currentUser?.data

    //verify funding
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        //const paymentReference = query.get('reference' || 'paymentReference');
        const paystack = query.get('reference');
        const monnify = query.get('paymentReference');

        const paymentReference = paystack ? paystack : monnify
    
        if (paymentReference) {
          const postPaymentReference = async (reference) => {
            try {
              const res = await verifyPaymentTransactions({ paymentReference: reference });
              //console.log('Server response:', res.data);
              if(res.success){
                toast.success('Account Funding Successful')
                dispatch(signInSuccess(res))
              }
            } catch (error) {
              console.error('Error posting payment reference:', error);
            }
          };
    
          postPaymentReference(paymentReference);
        }
    }, [location]);

    const handleFundWallet = () => {
        setSelectedCard('fundWallet')
    }

    function formatBalance(balance) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(balance);
    }

    const clicked = () => {
        toast.success('Copied')  
    }

  return (
    <div className="flex w-full min-h-[100vh]">
        <div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
            <div className='fixed w-[304px] left-0 top-0 flex h-full'>
                <Sidebar />
            </div>
        </div>

        <div className='relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto '>
            <div className="w-[96%] phone:w-[96%]">
                <div className="mt-6">
                    <TopNav toggleMenu={toggleMenu} showMenu={showMenu} title={`Welcome, ${user.firstName ? user.firstName : ''} ${user.lastName ? user.lastName : ''}`} />
                </div>

                <div className="flex items-start gap-[24px] mt-12 small-pc:flex-col phone:items-center">
                    <div className="flex flex-col gap-5">
                        <div className="card1 flex items-center gap-[97px]">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[16px] phone:text-[14px] text-gray-80">Wallet Balance</h2>
                                <p className="flex items-center text-[36px] phone:text-[24px] text-gray-80 font-bold">
                                    <FaNairaSign className="text-[28px] phone:text-[24px]" />
                                    {user?.acctBalance}
                                </p>
                            </div>

                            <div>
                                <ButtonTwo onClick={handleFundWallet} text={'Fund Wallet'} />
                            </div>
                        </div>

                        <div className="card1">
                            <div className="flex flex-col gap-[16px]">
                                <div className="flex flex-col gap-[4px] text-second-color text-[16px]">
                                    <p>Referral</p>
                                    <p>Referral Code: <span className="font-semibold">{shortText(user.referralLink, 20)}</span></p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <CopyToClipboard text={user.referralLink} onCopy={clicked}> 
                                        <div className="text-second-color cursor-pointer text-[16px] flex items-center gap-[3px]">
                                            <LuCopy />
                                            Copy
                                        </div>
                                    </CopyToClipboard>
                                    <div className="text-second-color cursor-pointer text-[16px] flex items-center gap-[3px]">

                                    </div>
                                    <div className="text-second-color cursor-pointer text-[16px] flex items-center gap-[3px]">
                                        <PiShareFatLight />
                                        Share
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card1">
                            <div className="flex flex-col items-start gap-4">
                                <div className="flex items-center gap-[32px] text-gray-80">
                                    <div className="flex flex-col gap-2">
                                        <h2>Total referrals made</h2>
                                        <p className="text-[24px] font-semibold">{user?.referrals.length}</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h2>Current wallet Bonus</h2>
                                        <p className="text-[24px] font-semibold flex items-center">
                                            <FaNairaSign className="text-[18px]" />
                                            <span>{formatBalance(user.walletBonus ? user.walletBonus : 0)}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex cursor-pointer items-center gap-[3px] text-second-color text-[16px]">
                                    <IoWalletOutline />
                                    <p onClick={() => setSelectedCard('withdrawalCashOut')}>Cashout</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start w-[504px] h-[248px] phone:w-[95%] phone:h-[180.32px] phone:mt-8 phone:mb-6 bg-gray-20 rounded-[24px] overflow-hidden relative">
                        <p className="absolute top-[44px] phone:top-[34px] left-[46px] text-gray-80 text-[16px] phone:[10.16px]">
                            Cards
                        </p>

                        <p className="text-gray-60 text-[24px] phone:text-[18px] absolute left-[46px] top-[107px] phone:top-[90px]">
                            You Have No <br /> Saved Cards 
                        </p>

                        <img alt="credit card" src={CreditCardImg} className="absolute top-[-1px] right-[0px] w-[205px] h-[206px]" />
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Dashboard