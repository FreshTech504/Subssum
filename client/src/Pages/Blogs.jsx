// import { useState } from "react"
// import Footer from "../Components/Footer"
// import All from "../Components/Blogs/All"
// import Recent from "../Components/Blogs/Recent"
// import Navbar from "../Components/Helpers/Navbar"

// function Blogs() {
//     const blogOptions =  [
//         {
//             text: 'All',
//             slug: 'all'
//         },
//         {
//             text: 'Recent',
//             slug: 'recent'
//         }
//     ]
//     const [ blogOption, setBlogOption ] = useState(blogOptions[0].slug)

//     const handleBlogChange = (faq) => {
//         setBlogOption(faq)
//     }

//   return (
//     <div className="flex min-h-[100vh] flex-col">
//         <Navbar showBtn={true} />

//         <div className="flex flex-col gap-[64px] medium-pc:pad6 pad4 w-full mt-[8rem] items-center justify-center">
//             <div className="flex flex-col gap-6 items-center justify-center">
//                 <h2 className="font-bold text-[48px] phone:text-[24px] text-gray-90 text-center">BLOG & UPDATES</h2>

//                 <div className="flex items-center justify-center gap-[28px]">
//                     {
//                         blogOptions.map((item, idx) => (
//                             <div key={idx} onClick={() => handleBlogChange(item.slug)} className="flex flex-col gap-[8px] cursor-pointer">
//                                 <p className="text-gray-70 text-[16px] font-medium">{item.text}</p>
//                                 <span className={`w-full h-[2px] rounded-[10px] ${blogOption === item.slug ? 'bg-gray-70 transition-all' : 'bg-transparent'}`}></span>
//                             </div>  
//                         ))
//                     }
//                 </div>
//             </div>

//             <div className="mt-8 mb-16">
//                 {
//                     blogOption === 'all' && (
//                         <All />
//                     ) 
//                 }
//                 {
//                     blogOption === 'recent' && (
//                         <Recent />
//                     ) 
//                 }
//             </div>
//         </div>

//         <div className="mt-auto flex items-center justify-center">
//             <Footer />
//         </div>
//     </div>
//   )
// }

// export default Blogs


import { useState, useEffect } from "react"; // Import useEffect
import Footer from "../Components/Footer";
import All from "../Components/Blogs/All";
import Recent from "../Components/Blogs/Recent";
import Navbar from "../Components/Helpers/Navbar";
import { IoIosArrowUp } from "react-icons/io";

function Blogs() {
    const [isVisible, setIsVisible] = useState(true);

    const blogOptions =  [
        {
            text: 'All',
            slug: 'all'
        },
        {
            text: 'Recent',
            slug: 'recent'
        }
    ];
    const [ blogOption, setBlogOption ] = useState(blogOptions[0].slug);

    const handleBlogChange = (faq) => {
        setBlogOption(faq);
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

    return (
        <div className="flex min-h-[100vh] flex-col">
            <Navbar showBtn={true} />

            {isVisible && (
                <div
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 cursor-pointer z-[10000] flex items-center justify-center rounded-full bg-primary-color p-5"
                >
                    <IoIosArrowUp className="text-white text-[24px] font-bold" />
                </div>
            )}

            <div className="flex flex-col gap-[64px] medium-pc:pad6 pad4 w-full mt-[8rem] items-center justify-center">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <h2 className="font-bold text-[48px] phone:text-[24px] text-gray-90 text-center">BLOG & UPDATES</h2>

                    <div className="flex items-center justify-center gap-[28px]">
                        {
                            blogOptions.map((item, idx) => (
                                <div key={idx} onClick={() => handleBlogChange(item.slug)} className="flex flex-col gap-[8px] cursor-pointer">
                                    <p className="text-gray-70 text-[16px] font-medium">{item.text}</p>
                                    <span className={`w-full h-[2px] rounded-[10px] ${blogOption === item.slug ? 'bg-gray-70 transition-all' : 'bg-transparent'}`}></span>
                                </div>  
                            ))
                        }
                    </div>
                </div>

                <div className="mt-8 mb-16">
                    {
                        blogOption === 'all' && (
                            <All />
                        ) 
                    }
                    {
                        blogOption === 'recent' && (
                            <Recent />
                        ) 
                    }
                </div>
            </div>

            <div className="mt-auto flex items-center justify-center">
                <Footer />
            </div>
        </div>
    );
}

export default Blogs;
