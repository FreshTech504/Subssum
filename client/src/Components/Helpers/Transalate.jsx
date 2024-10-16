import React, { useEffect } from 'react'

function Transalate({style}) {
    useEffect(() => {
        // Load the Google Translate script
        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
    
        // Define the callback function
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
          );
    
          // Hide the "Powered by Google" text after the element is created
          const hideGoogleBranding = () => {
            const googleBranding = document.querySelector('.skiptranslate');
            if (googleBranding) {
              googleBranding.style.display = 'none';
            }
          };
    
          // Set a timeout to allow the Google Translate element to render before hiding branding
          setTimeout(hideGoogleBranding, 1000);
        };
    
        // Cleanup the script on unmount
        return () => {
          document.body.removeChild(script);
          delete window.googleTranslateElementInit;
        };
      }, []);
    
      return <div id="google_translate_element" className={`${style}`} ></div>;
    };
    

export default Transalate