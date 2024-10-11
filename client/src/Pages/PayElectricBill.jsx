import { useEffect, useState } from "react";
import CardOne from "../Components/Cards/Electric/CardOne";
import CardThree from "../Components/Cards/Electric/CardThree";
import CardTwo from "../Components/Cards/Electric/CardTwo";
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import toast from "react-hot-toast";
import Loading from "../Components/Modals/Loading";
import { signInSuccess } from "../Redux/user/userSlice";
import { useDispatch } from "react-redux";
import { buyElectricBill } from "../Helpers/api";

function PayElectricBill({ toggleMenu, showMenu, formData, setFormData, setSelectedCard }) {
    const dispatch = useDispatch()
    const [ activeCard, setActiveCard ] = useState('cardOne')
    const [ cardOne, setCardOne ] = useState(false)
    const [ cardTwo, setCardTwo ] = useState(false)
    const [ cardThree, setCardThree ] = useState(false)
    const [ transactionData, setTransactionData ] = useState()

    const [ isLoading, setIsLoading ] = useState(false)

    const handleCardOne = () => {
        setCardTwo(false)
        setCardThree(false)
        setActiveCard('cardOne')
    }

    // const handleCardTwo = () => {
    //     if(!formData.meterNumber){
    //         toast.error('Enter Meter Number')
    //         return
    //     }
    //     if(!formData.meterType){
    //         toast.error('Select Meter Type')
    //         return
    //     }
    //     if(!formData.providerCode){
    //         toast.error('Select Electric Provider')
    //         return
    //     }
    //     if(!formData.amount){
    //         toast.error('Enter Amount')
    //         return
    //     }
    //     setCardOne(true)
    //     setActiveCard('cardTwo')
    // }

    const handleCardTwo = () => {
      const meterNumberRegex = /^[0-9]{10,12}$/; // Only numbers, must be between 10-12 digits
      const amountRegex = /^[0-9]+$/;            // Amount must contain only numbers
      const alphabetRegex = /^[a-zA-Z]+$/;       // Only alphabets
  
      // Validate Meter Number
      if (!formData.meterNumber) {
          toast.error('Enter Meter Number');
          return;
      }
  
      if (!meterNumberRegex.test(formData.meterNumber)) {
          toast.error('Meter Number must be between 10 and 12 digits and can only contain numbers.');
          return;
      }
  
      // Validate Amount
      if (!formData.amount) {
          toast.error('Enter Amount');
          return;
      }
  
      if (!amountRegex.test(formData.amount)) {
          toast.error('Amount can only contain numbers.');
          return;
      }
  
      // Validate Alphabet Field
      if (!formData.someAlphabetField) {
          toast.error('Enter a valid input with alphabets.');
          return;
      }
  
      if (!alphabetRegex.test(formData.someAlphabetField)) {
          toast.error('This field can only contain alphabets.');
          return;
      }
  
      // If all validations pass, proceed with the next steps
      // Continue with further logic here...
  };
  
  

    //HANDLE CARD THREE SHOULD ONLY COME AFTRE API CALL

    useEffect(() => {
      const handleElectricPurchase = async () => {
        if(formData.proceed){
          setSelectedCard(null)
          setIsLoading(true)
          
          try {
              console.log('first call2')
              const res = await buyElectricBill(formData); 
              //console.log('BUY DATA', res)
              if(res.status === 406 || 500){
                  setFormData({ ...formData, proceed: false })
                  setSelectedCard('transactionFailed')
              }

              if(res.status === 206){
                  toast.success(res.data.msg)
                  dispatch(signInSuccess(res?.data?.data))
                  setFormData({})
                  setCardOne(true)
                  setCardTwo(true)
                  setCardThree(true)
                  setActiveCard('cardThree')
                  setTransactionData(res?.data?.transaction)
                  setSelectedCard('transactionSuccessful')
              }
              // HANDLE CARD THREE SHOULD ONLY COME AFTER API CALL

          } catch (error) {

          } finally {
              setIsLoading(false);
          }
        }
      }

      handleElectricPurchase();
    }, [formData])
  return (
    <div className="flex w-full min-h-[100vh]">
        {
            isLoading && (
                <Loading />
            )
        }
      <div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
        <div className="fixed w-[304px] left-0 top-0 flex h-full">
          <Sidebar />
        </div>
      </div>

      <div className="relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto">
        <div className="w-[96%] phone:w-[96%]">
          <div className="mt-6">
            <TopNav
              toggleMenu={toggleMenu}
              showMenu={showMenu}
              title={"Pay Electric Bill"}
            />
          </div>

          <div className="flex items-center justify-center w-full small-pc:flex-col">
            {/**Card */}
            <div className="w-[500px] phone:w-[90%] mt-8 flex flex-col gap-[54px]">
              <div className="w-full flex gap-2">
                <div
                  onClick={handleCardOne}
                  className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]"
                >
                  <p
                    className={`text-[14px] ${
                      activeCard === "cardOne"
                        ? "text-second-color"
                        : cardOne
                        ? "text-success"
                        : "text-gray-30"
                    }`}
                  >
                    Fill info
                  </p>
                  <span
                    className={`w-full h-[7px] rounded-[100px] ${
                      activeCard === "cardOne"
                        ? "bg-second-color"
                        : cardOne
                        ? "bg-success"
                        : "bg-gray-30"
                    }`}
                  ></span>
                </div>
                <div
                  onClick={handleCardTwo}
                  className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]"
                >
                  <p
                    className={`text-[14px] ${
                      activeCard === "cardTwo"
                        ? "text-second-color"
                        : cardTwo
                        ? "text-success"
                        : "text-gray-30"
                    }`}
                  >
                    Make Payment
                  </p>
                  <span
                    className={`w-full h-[7px] rounded-[100px] ${
                      activeCard === "cardTwo"
                        ? "bg-second-color"
                        : cardTwo
                        ? "bg-success"
                        : "bg-gray-30"
                    }`}
                  ></span>
                </div>
                <div
                  className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]"
                >
                  <p
                    className={`text-[14px] ${
                      activeCard === "cardThree"
                        ? "text-success"
                        : cardThree
                        ? "text-success"
                        : "text-gray-30"
                    }`}
                  >
                    View Receipt{" "}
                  </p>
                  <span
                    className={`w-full h-[7px] rounded-[100px] ${
                      activeCard === "cardThree"
                        ? "bg-success"
                        : cardThree
                        ? "bg-success"
                        : "bg-gray-30"
                    }`}
                  ></span>
                </div>
              </div>

              <div>
                {activeCard === "cardOne" && (
                  <CardOne
                    setActiveCard={setActiveCard}
                    setCardOne={setCardOne}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeCard === "cardTwo" && (
                  <CardTwo
                    setActiveCard={setActiveCard}
                    formData={formData}
                    setFormData={setFormData}
                    setIsLoading={setIsLoading}
                    setSelectedCard={setSelectedCard}
                  />
                )}
                {activeCard === "cardThree" && (
                  <CardThree
                    transactionData={transactionData}
                    setActiveCard={setActiveCard}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </div>
            {/**END OF CARD */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayElectricBill;
