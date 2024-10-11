import { useState } from "react"
import ButtonTwo from "./Helpers/ButtonTwo"
import toast from "react-hot-toast"
import emailjs from '@emailjs/browser';

function ContactUsForm() {
    const [ formData, setFormData ] = useState({})
    const [ sending, setSending ] = useState(false)
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name){
            toast.error('Please enter your name')
            return
        }
        if(!formData.email){
            toast.error('Please enter your email address')
            return
        }
        if(!formData.phoneNumebr){
            toast.error('Please enter your phone number')
            return
        }
        if(!formData.message){
            toast.error('Please enter your name')
            return
        }
        try {
            setSending(true)
    
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
                e.target.reset();
                toast.success("Message Sent Successful");
                },
                (error) => {
                console.log(error.text);
                toast.error("Unable to send Messages");
                }
            );
            
        } catch (error) {
            console.log('ERROR SEND TICKET', error)
        } finally {
            setSending(false)
        }
    }

  return (
    <div className="flex flex-col w-[432px] phone:w-[94%] rounded-[12px] border-[1px] p-6 border-gray-30 bg-white gap-3">
        <h2 className="font-bold text-[20px] text-gray-70">SEND US A MESSAGE</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit} >
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
            </div>

            <ButtonTwo text={'Submit'} onClick={handleSubmit} />

        </form>
    </div>
  )
}

export default ContactUsForm