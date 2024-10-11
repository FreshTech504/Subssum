import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Helpers/Navbar'
import Footer from '../Components/Footer'
import { IoIosArrowUp } from 'react-icons/io'

function BlogPage() {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]
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
    <div className='flex flex-col min-h-[100vh] relative'>
        <Navbar showBtn={true} />

        {isVisible && (
          <div
              onClick={scrollToTop}
              className="fixed bottom-24 right-6 cursor-pointer z-[10000] flex items-center justify-center rounded-full bg-primary-color p-5"
          >
              <IoIosArrowUp className="text-white text-[24px] font-bold" />
          </div>
        )}

        <div className='small-pc:pad6 pad4 mt-[6rem]'>
            BlogPage {pathName}
        </div>

        <div className="mt-auto flex items-center justify-center">
            <Footer />
        </div>
    </div>
  )
}

export default BlogPage