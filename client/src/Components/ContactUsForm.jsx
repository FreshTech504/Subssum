import { useRef, useState } from "react"
import ButtonTwo from "./Helpers/ButtonTwo"
import toast from "react-hot-toast"
import emailjs from '@emailjs/browser';
import LoadingBtn from "./Helpers/LoadingBtn";

function ContactUsForm() {
    const [ formData, setFormData ] = useState({});
    const [ sending, setSending ] = useState(false);
    const [ errorResponse, setErrorResponse ] = useState();
    const [ successResponse, setSuccessResponse ] = useState()
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) {
            setErrorResponse('Please enter your name');
            setTimeout(() => setErrorResponse(), 2000);
            return;
        }
        if (!formData.email) {
            setErrorResponse('Please enter your email address');
            setTimeout(() => setErrorResponse(), 2000);
            return;
        }
        if (!formData.phoneNumebr) {
            setErrorResponse('Please enter your phone number');
            setTimeout(() => setErrorResponse(), 2000);
            return;
        }
        if (!formData.message) {
            setErrorResponse('Please enter your message');
            setTimeout(() => setErrorResponse(), 2000);
            return;
        }
        
        setSending(true);

        emailjs
            .sendForm(
                `${import.meta.env.VITE_SERVICE_ID}`,
                `${import.meta.env.VITE_TEMPLATE_ID}`,
                form.current,
                `${import.meta.env.VITE_EMAILJS_KEY}`
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success("Message Sent Successfully");
                    setSuccessResponse('Message Sent Successfully');
                    setTimeout(() => setSuccessResponse(), 2000);
                    form.current.reset(); 
                    return;
                },
                (error) => {
                    console.log('Unable to send message', error.text);
                    toast.error("Unable to send message");
                }
            )
            .finally(() => {
                setSending(false);
            });
    };

  return (
    <div className="flex flex-col w-[432px] phone:w-[94%] rounded-[12px] border-[1px] p-6 border-gray-30 bg-white gap-3">
        <h2 className="font-bold text-[20px] text-gray-70">SEND US A MESSAGE</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit} ref={form} >
            <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col">
                    <label className="label">Name</label>
                    <input onChange={handleChange} type="text" id="name" name="name" className="input" />
                </div>
                <div className="flex flex-col">
                    <label className="label">Email</label>
                    <input onChange={handleChange} type="email" id="email" name="email" className="input" />
                </div>
                <div className="flex flex-col">
                    <label className="label">Phone Number</label>
                    <input onChange={handleChange} type="text" id="phoneNumebr" name="phoneNumebr" className="input" />
                </div>
                <div className="flex flex-col">
                    <label className="label">Message</label>
                    <textarea onChange={handleChange} type="text" id="message" name="message" className="input textarea h-[120px]" ></textarea>
                </div>
                {/**ERROR RESPONSE */}
                <p className="text-center text-error font-semibold">{errorResponse}</p>
                {/**SUCCESS RESPONSE */}
                <p className="text-center text-success font-semibold">{errorResponse}</p>

            </div>

            {
                sending ? (
                    <LoadingBtn />
                ) : (
                    <ButtonTwo text={'Submit'} onClick={handleSubmit} />
                )
            }

        </form>
    </div>
  )
}

export default ContactUsForm