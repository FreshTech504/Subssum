import { useEffect, useState } from "react";
import CardOne from "../Components/Cards/TV/CardOne";
import CardThree from "../Components/Cards/TV/CardThree";
import CardTwo from "../Components/Cards/TV/CardTwo";
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import Loading from "../Components/Modals/Loading";
import { buyCableTvPlan } from "../Helpers/api";
import { signInSuccess } from "../Redux/user/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function TvSubscription({
  toggleMenu,
  showMenu,
  formData,
  setFormData,
  setSelectedCard,
}) {
  const dispatch = useDispatch();
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

  // const handleCardTwo = () => {
  //   if (!formData.serviceProviderCode) {
  //     toast.error("Select a service provider");
  //     return;
  //   }
  //   if (!formData.smartCardNumber) {
  //     toast.error("Enter smart card Number");
  //     return;
  //   }
  //   //check for selected bundle (bundlePlan bundleId) and smart card name
  //   setCardOne(true);
  //   setActiveCard("cardTwo");
  // };

  const handleCardTwo = () => {
    const smartCardNumberRegex = /^[0-9]{10,12}$/; // Only numbers, should be between 10-12 digits
    const smartCardNameRegex = /^[a-zA-Z\s]+$/;    // Only alphabets and spaces

    if (!formData.serviceProviderCode) {
        toast.error("Select a service provider");
        return;
    }
    
    if (!formData.smartCardNumber) {
        toast.error("Enter smart card Number");
        return;
    }

    // Validate smart card number
    if (!smartCardNumberRegex.test(formData.smartCardNumber)) {
        toast.error("Smart card number must be between 10 and 12 digits and can only contain numbers.");
        return;
    }

    // Hypothetical field: Validate smart card name
    if (!formData.smartCardName) {
        toast.error("Enter smart card name");
        return;
    }

    if (!smartCardNameRegex.test(formData.smartCardName)) {
        toast.error("Smart card name can only contain alphabets and spaces.");
        return;
    }

    // Check for selected bundle (bundlePlan bundleId) and smart card name
    setCardOne(true);
    setActiveCard("cardTwo");
};


  //HANDLE CARD THREE SHOULD ONLY COME AFTRE API CALL
  useEffect(() => {
    const handleCableTvPurchase = async () => {
      if (formData.proceed) {
        setSelectedCard(null);
        setIsLoading(true);

        try {
          const res = await buyCableTvPlan(formData);
          if (res.status === 406 || 500) {
            setFormData({ ...formData, proceed: false });
            setSelectedCard("transactionFailed");
          }

          if (res.status === 206) {
            toast.success(res.data.msg);
            dispatch(signInSuccess(res?.data?.data));
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
        //make api call to server here
        //HANDLE CARD THREE SHOULD ONLY COME AFTRE API CALL
        //set formData to empty {} after res from server
      }
    };

    handleCableTvPurchase();
  }, [formData]);

  return (
    <div className="flex w-full min-h-[100vh]">
      {isLoading && <Loading />}
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
              title={"TV Subscription"}
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
                    setIsLoading={setIsLoading}
                    setSelectedCard={setSelectedCard}
                  />
                )}
                {activeCard === "cardThree" && (
                  <CardThree
                    setActiveCard={setActiveCard}
                    formData={formData}
                    setFormData={setFormData}
                    transactionData={transactionData}
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

export default TvSubscription;
