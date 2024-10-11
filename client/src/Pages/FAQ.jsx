import { useState, useEffect } from "react"
import Footer from "../Components/Footer"
import Navbar from "../Components/Helpers/Navbar"
import { accountandloginfaqs, faqOptions, generalfaq, paymentandbillingfaqs, supportandcontactfaqs, technicalissuesfaq } from "../Data/faq"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


function FAQ() {
    const [ faqOption, setFaqOption ] = useState(faqOptions[0].slug)
    const [ showAns, setShowAns ] = useState(false)
    const [ qstId, setQstId ] = useState()
    const [ content, setContent ] = useState([])
    const [isVisible, setIsVisible] = useState(true);

    const handleFaqChange = (faq) => {
        setFaqOption(faq)
    };

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if(faqOption === 'generalfaq'){
            setContent(generalfaq)
        }
        if(faqOption === 'accountandloginfaqs'){
            setContent(accountandloginfaqs)
        }
        if(faqOption === 'paymentandbillingfaqs'){
            setContent(paymentandbillingfaqs)
        }
        if(faqOption === 'technicalissuesfaq'){
            setContent(technicalissuesfaq)
        }
        if(faqOption === 'supportandcontactfaqs'){
            setContent(supportandcontactfaqs)
        }
    }, [faqOption, content, setContent])

    const showAnswer = (id) => {
        setQstId(id)
        setShowAns((prev) => !prev)
    }

  return (
    <div className="flex flex-col min-h-[100vh] relative">
        <Navbar showBtn={true} />

        {isVisible && (
            <div
                onClick={scrollToTop}
                className="fixed bottom-24 right-6 cursor-pointer z-[10000] flex items-center justify-center rounded-full bg-primary-color p-5"
            >
                <IoIosArrowUp className="text-white text-[24px] font-bold" />
            </div>
        )}

        <div className="mt-20 flex flex-col">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 w-full items-center justify-center">
                <div className="flex flex-col gap-6 h-[40vh] p-12">
                    <h1 className="text-center text-[48px] phone:text-[24px] tablet:text-[32px] font-bold text-white">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-center font-normal text-[20px] tablet:text-[18px] phone:text-[16px] text-white">
                        We have answers to all your possible question, contact us
                        if you can’t find the answers to your questions here
                    </p>
                </div>
            </div>

            <div className="small-pc:pad6 pad4">
                <div className="flex items-center justify-center gap-[28px] flex-wrap">
                    {
                        faqOptions.map((item, idx) => (
                            <div key={idx} onClick={() => handleFaqChange(item.slug)} className="flex flex-col gap-[8px] cursor-pointer">
                                <p className="text-gray-70 text-[16px] font-medium">{item.text}</p>
                                <span className={`w-full h-[2px] rounded-[10px] ${faqOption === item.slug ? 'bg-gray-70 transition-all' : 'bg-transparent'}`}></span>
                            </div>  
                        ))
                    }
                </div>

                <div className="mt-8 flex flex-col items-center justify-center mb-16">
                    {/**import from Faq folder each section of faq*/}
                    <h2 className="text-[24px] phone:text-[18px] font-semibold text-primary-color text-center">{content[0]?.title}</h2>
                    
                    {
                        content[0]?.faq?.map((item, idx) => (
                            <div onClick={() => showAnswer(idx)} key={idx} className="border-b-[2px] border-primary-color p-4 flex flex-col w-[500px] phone:w-[94%] cursor-pointer duration-100">
                                <h3 className="flex text-left items-center justify-between text-primary-color font-semibold text-[24px] phone:text-[16px]">
                                    {item.question}
                                    
                                    <span>
                                        {
                                            qstId === idx && showAns ? (
                                                <IoIosArrowUp />
                                            ) : (
                                                <IoIosArrowDown />
                                            )
                                        }
                                    </span>
                                </h3>

                                <p className={`mt-10 text-[18px] phone:text-[14px] font-medium text-gray-70 duration-100 ${qstId === idx && showAns ? 'flex' : 'hidden'}`}>
                                    {item.answer}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

        <div className="mt-auto">
            <Footer />
        </div>
    </div>
  )
}

export default FAQ