import { useEffect, useState } from "react";
import ContactUs from "../Components/ContactUs";
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import GetStarted from "../Components/GetStarted";
import Navbar from "../Components/Helpers/Navbar";
import Hero from "../Components/Hero";
import HowToFund from "../Components/HowToFund";
import IntergrateApi from "../Components/IntergrateApi";
import OurServices from "../Components/OurServices";
import WhyChoseUs from "../Components/WhyChoseUs";
import { IoIosArrowUp } from "react-icons/io";

function LandingPage() {
    const [isVisible, setIsVisible] = useState(true);

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

    return (
        <div className="flex min-h-[100vh] flex-col relative">
            <Navbar showBtn={true} />

            {isVisible && (
                <div
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 cursor-pointer z-[10000] flex items-center justify-center rounded-full bg-primary-color p-5"
                >
                    <IoIosArrowUp className="text-white text-[24px] font-bold" />
                </div>
            )}

            <div className='small-pc:pad6 pad4 w-full mt-[8rem]'>
                <Hero />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <WhyChoseUs />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <OurServices />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <Features />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <IntergrateApi />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <HowToFund />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <ContactUs />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <GetStarted />
            </div>

            <div className="mt-[8rem] flex items-center justify-center">
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
