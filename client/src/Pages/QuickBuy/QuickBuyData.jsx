import toast from "react-hot-toast";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Helpers/Navbar";
import { useState } from "react";
import CardOne from "../../Components/QuickBuy/BuyData/CardOne";
import CardTwo from "../../Components/QuickBuy/BuyData/CardTwo";
import CardThree from "../../Components/QuickBuy/BuyData/CardThree";
import { quickBuyData } from "../../Helpers/api";
import Loading from "../../Components/Modals/Loading";

function QuickBuyData({ setSelectedCard }) {
  const [formData, setFormData] = useState({});
  const [activeCard, setActiveCard] = useState("cardOne");
  const [cardOne, setCardOne] = useState(false);
  const [cardTwo, setCardTwo] = useState(false);
  const [cardThree, setCardThree] = useState(false);
  const [transactionData, setTransactionData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleCardOne = () => {
    setCardTwo(false);
    setCardThree(false);
    setActiveCard("cardOne");
  };

  const handleCardTwo = () => {
    if (!formData.networkCode) {
      toast.error("Select a network");
      return;
    }
    if (!formData.phoneNumber) {
      toast.error("Enter Phone Number");
      return;
    }
    if (!formData.price) {
      toast.error("Enter Amount");
      return;
    }
    if (!formData.planId) {
      toast.error("Select bundle");
      return;
    }
    setCardOne(true);
    setActiveCard("cardTwo");
  };

  const componentProps = {
    email: formData?.email,
    amount: Number(formData?.totalAmount * 100),
    metadata: {
      name: formData?.email,
      phone: formData?.phoneNumber,
    },
    publicKey: `${import.meta.env.VITE_APP_PAYSTACK_PK}`,
    text: "Pay Now",
    onSuccess: async (data) => {
      const updatedFormData = { ...formData, paymentDetails: data };
      setFormData(updatedFormData);

      //console.log('PAYMENT SUCCESS', data, updatedFormData);
      try {
        setIsLoading(true);
        const res = await quickBuyData(updatedFormData);
        //console.log('first quick', res)

        if (res.status === 406 || 500) {
          setFormData({ ...formData, proceed: false });
          setSelectedCard("transactionFailed");
        }

        if (res.status === 206) {
          toast.success(res.data.msg);
          setFormData({});
          setCardOne(true);
          setCardTwo(true);
          setCardThree(true);
          setActiveCard("cardThree");
          setTransactionData(res?.data?.transaction);
          setSelectedCard("transactionSuccessful");
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    onClose: () => {
      setSelectedCard("transactionFailed");
    },
  };

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar showBtn={true} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="small-pc:pad6 pad4 mt-[6rem]">
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
                <div className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]">
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
                    isLoading={isLoading}
                    setSelectedCard={setSelectedCard}
                    componentProps={componentProps}
                  />
                )}
                {activeCard === "cardThree" && (
                  <CardThree
                    setActiveCard={setActiveCard}
                    formData={formData}
                    setFormData={setFormData}
                    transactionData={transactionData}
                    setSelectedCard={setSelectedCard}
                  />
                )}
              </div>
            </div>
            {/**END OF CARD */}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default QuickBuyData;