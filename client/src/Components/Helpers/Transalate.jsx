import { useRef, useEffect } from 'react';

function Transalate() {
    const googleTranslateRef = useRef(null);

    useEffect(() => {
        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                clearInterval(intervalId);
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        includedLanguages: 'ha,ig,yo,pcm,ff',
                    },
                    googleTranslateRef.current
                );
            }
        };

        const intervalId = setInterval(checkGoogleTranslate, 100);

        // Cleanup function
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div ref={googleTranslateRef} className='flex items-center justify-center z-99999 bg-black'></div>
    );
}

export default Transalate;
