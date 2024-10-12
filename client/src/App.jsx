import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Pages/Authorization/Register'
import Login from './Pages/Authorization/Login'
import SignupSuccessful from './Pages/Authorization/SignupSuccessful'
import { Toaster } from 'react-hot-toast'
import ResetPassword from './Pages/Authorization/ResetPassword'
import ForgotPasword from './Pages/Authorization/ForgotPasword'
import ResetEmailSent from './Pages/Authorization/ResetEmailSent'
import VerifyUser from './Pages/Authorization/VerifyUser'
import CreatePin from './Pages/CreatePin'
import PinCreated from './Pages/PinCreated'
import JoinWhatsappCommunity from './Pages/JoinWhatsappCommunity'
import Dashboard from './Pages/Dashboard'
import BuyData from './Pages/BuyData'
import BuyAirtime from './Pages/BuyAirtime'
import Profile from './Pages/Profile'
import { useEffect, useState } from 'react'
import EditProfile from './Components/Modals/EditProfile'
import FundWallet from './Components/Modals/FundWallet'
import Support from './Pages/Support'
import AirtimeToCash from './Pages/AirtimeToCash'
import TranscationHistroy from './Pages/TranscationHistroy'
import TransactionPin from './Components/Modals/TransactionPin'
import TransactionSuccessful from './Components/Modals/TransactionSuccessful'
import TransactionFailed from './Components/Modals/TransactionFailed'
import TransactionPending from './Components/Modals/TransactionPending'
import TvSubscription from './Pages/TvSubscription'
import PayElectricBill from './Pages/PayElectricBill'
import TransactionDetailPage from './Pages/TransactionDetailPage'
import WithdrawalCashOut from './Components/Modals/WithdrawalCashOut'
import { AuthorizeUser } from './Auth/ProtectRoute'
import LandingPage from './Pages/LandingPage'
import ContactUs from './Pages/ContactUs'
import FAQ from './Pages/FAQ'
import Blogs from './Pages/Blogs'
import BlogPage from './Pages/BlogPage'
import ReportTransaction from './Components/Modals/ReportTransaction'
import AirtimeToCashInfo from './Components/Modals/AirtimeToCashInfo'
import QuickBuyAirtime from './Pages/QuickBuy/QuickBuyAirtime'
import QuickBuyData from './Pages/QuickBuy/QuickBuyData'
import QuickBuyElectricity from './Pages/QuickBuy/QuickBuyElectricity'
import QuickBuyCableTv from './Pages/QuickBuy/QuickBuyCableTv'
import Transalate from './Components/Helpers/Transalate'

function App() {
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ popupBg, setPopupBg ] = useState(false)
  const [ showMenu, setShowMenu ] = useState(false)

  const [ formData, setFormData ] = useState({})

  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
        return text;
    }

    const truncated = text?.slice(0, maxLength);
    const lastSpaceIndex = truncated?.lastIndexOf(' ');
    
    // Adjust to the last space to avoid cutting off in the middle of a word
    const result = lastSpaceIndex > -1 ? truncated.slice(0, lastSpaceIndex) : truncated;

    return result + '...';
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const renderPopup = () => {
    switch(selectedCard){
      case 'editProfile' : 
        return (
          <div>
            <EditProfile formData={formData} setFormData={setFormData} setSelectedCard={setSelectedCard} />
          </div>
        )
       case 'fundWallet' : 
        return (
          <div>
            <FundWallet setPopupBg={setPopupBg} formData={formData} setFormData={setFormData} setSelectedCard={setSelectedCard} />
          </div>
        ) 
      case 'setTransactionPin':
        return (
          <div>
            <TransactionPin setFormData={setFormData} formData={formData} setSelectedCard={setSelectedCard} />
          </div>
        ) 
      case 'transactionSuccessful':
        return (
          <div>
            <TransactionSuccessful setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'transactionFailed':
        return (
          <div>
            <TransactionFailed setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'transactionPending':
        return (
          <div>
            <TransactionPending setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'withdrawalCashOut':
        return (
          <div>
            <WithdrawalCashOut setSelectedCard={setSelectedCard} formData={formData} setFormData={setFormData} />
          </div>
        )
      case 'reportTransaction':
        return (
          <div>
            <ReportTransaction formData={formData} setFormData={setFormData} setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'airtimeToCashInfo':
        return (
          <div>
            <AirtimeToCashInfo setSelectedCard={setSelectedCard} />
          </div>
        )  
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closePopup = () => {
    setSelectedCard(null);
  };

    return (
      <>
        <div className='app'>
          <div className='absolute top-20 phone:top-8 right-8 cursor-pointer z-[99999]'>
            <Transalate />
          </div>
          {
            selectedCard && (
              <>
                <div className='popup-overlay z-40 fixed flex items-center justify-center top-0 left-0 w-[100vw] h-[100vh] bg-gray-100-opa '>
                  <div className={`z-50 w-[432px] phone:w-[90%] h-auto m-auto rounded-[12px] border-[1px] p-[24px] flex flex-col gap-6 ${popupBg ? 'bg-gray-10' : 'bg-white'} border-gray-30`}>
                    <div className='w-full'>
                        {renderPopup()}
                    </div>
                  </div>
                </div>
              </>
            )
          }
          <Toaster position='top-center'></Toaster>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/blogs' element={<Blogs />} /> 
              <Route path='/blog/:id' element={<BlogPage />} /> 
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPasword />} />
              <Route path='/signup-successful' element={<SignupSuccessful />} />
              <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
              <Route path='/reset-email-sent' element={<ResetEmailSent />} />
              <Route path='/:id/verify/:token' element={<VerifyUser />} />
              <Route path='/login' element={<Login />} />

              //QUICK BUY OPTIONS
              <Route path='/quickbuy-airtime' element={<QuickBuyAirtime setSelectedCard={setSelectedCard} />} />
              <Route path='/quickbuy-data' element={<QuickBuyData setSelectedCard={setSelectedCard} />} />
              <Route path='/quickbuy-electric' element={<QuickBuyElectricity setSelectedCard={setSelectedCard} />} />
              <Route path='/quickbuy-tv' element={<QuickBuyCableTv setSelectedCard={setSelectedCard} />} />




              <Route element={<AuthorizeUser />} >
                <Route path='create-pin' element={<CreatePin />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/pin-created' element={<PinCreated />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/join-whatsapp-community' element={<JoinWhatsappCommunity />} />
              </Route>
              
              <Route element={<AuthorizeUser />} >
                <Route path='/buy-airtime' element={<BuyAirtime toggleMenu={toggleMenu} showMenu={showMenu} setSelectedCard={setSelectedCard} formData={formData} setFormData={setFormData} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/buy-data' element={<BuyData toggleMenu={toggleMenu} showMenu={showMenu} setSelectedCard={setSelectedCard} formData={formData} setFormData={setFormData} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/tv-subscription' element={<TvSubscription toggleMenu={toggleMenu} showMenu={showMenu} setSelectedCard={setSelectedCard} formData={formData} setFormData={setFormData} />} /> 
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/pay-electric-bill' element={<PayElectricBill toggleMenu={toggleMenu} showMenu={showMenu} setSelectedCard={setSelectedCard} formData={formData} setFormData={setFormData} />} /> 
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/dashboard' element={<Dashboard shortText={truncateText} setSelectedCard={setSelectedCard} toggleMenu={toggleMenu} showMenu={showMenu} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/support' element={<Support toggleMenu={toggleMenu} showMenu={showMenu} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/airtime-to-cash' element={<AirtimeToCash toggleMenu={toggleMenu} showMenu={showMenu} setSelectedCard={setSelectedCard} formData={formData} setFormData={setFormData} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/profile' element={<Profile setSelectedCard={setSelectedCard} toggleMenu={toggleMenu} showMenu={showMenu} shortText={truncateText} formData={formData} setFormData={setFormData} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/transaction-histroy' element={<TranscationHistroy setSelectedCard={setSelectedCard} toggleMenu={toggleMenu} showMenu={showMenu} />} />
              </Route>
              <Route element={<AuthorizeUser />} >
                <Route path='/transaction/:id' element={<TransactionDetailPage setSelectedCard={setSelectedCard} toggleMenu={toggleMenu} showMenu={showMenu} />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </>
  )
}

export default App
