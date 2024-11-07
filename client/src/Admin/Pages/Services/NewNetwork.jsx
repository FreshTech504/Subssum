import { useEffect, useRef, useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import TopNav from '../../Components/TopNav'
import Aside from '../../Components/Aside'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../firebase'
import ButtonTwo from '../../../Components/Helpers/ButtonTwo'
import LoadingBtn from '../../../Components/Helpers/LoadingBtn'
import { IoAddOutline } from "react-icons/io5";
import { newNetwork, updateNetwork } from '../../../Helpers/api'
import toast from 'react-hot-toast'
import { useFetAllNetworks } from '../../../Helpers/fetch.hooks'
import { useLocation, useNavigate } from 'react-router-dom'

function NewNetwork() {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]
    
    const [ newPlan, setNewPlan ] = useState( pathName === 'noid' ? true : false )

    const { isFetchingNetworkData, networkData } = useFetAllNetworks( !newPlan ? pathName : '' )
    const mobileNetworkData = networkData?.data
  
    const [ formData, setFormData ] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const [ image, setImage ] =  useState(undefined)
    const [ imageUploadProgress, setImageUploadProgress ] = useState(0)
    const [ imageError, setImageError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
  
    const fileRef = useRef(null)
    useEffect(() => {
        if(image){
            handleFileUpload(image);
        }

    }, [image])
  
    const handleFileUpload = async (image) => {
      const MAX_FILE_SIZE_MB = 5; 
      const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; 
    
      if (image.size > MAX_FILE_SIZE_BYTES) {
        setImageError(`Image must be less than ${MAX_FILE_SIZE_MB}MB`);
        toast.error(`Image must be less than ${MAX_FILE_SIZE_MB}MB`); 
        return; 
      }
  
      setImageError()
  
        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapShot) => {
                const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
                setImageUploadProgress(Math.round(progress));
            },
            (error) => {
                setImageError('Unable to Upload image')   
                console.log('Unable to Upload image',error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
                    setFormData({ ...formData, icon: downloadURL })
                );
            }
        );
    };

    const handleNewNetwork = async (e) => {
        e.preventDefault()
        if(!formData?.name){
            setImageError('Enter Network Name')
            setTimeout(() => {
                setImageError()
            }, 2500)
            return
        }
        if(!formData?.code){
            setImageError('Enter Network Code')
            setTimeout(() => {
                setImageError()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await newNetwork(formData)
            if(res.success){
                toast.success(res.data)
            } else {
                toast.error(res.data)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateNetwork = async (id) => {
        setFormData({ ...formData, _id: id })
        try {
            setLoading(true)
            const res = await updateNetwork(formData)
            if(res.success){
                toast.success(res.data)
                navigate('/admin-airtime')
            } else {
                toast.error(res.data)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="w-full flex flex-col gap-8 mt-[100px] px-12">
            <h1 className='text-[26px] font-semibold text-[#1F2937]'>
                { newPlan ? 'Add' : 'Update' } New Network
            </h1>

            <form onSubmit={ newPlan ? handleNewNetwork : handleUpdateNetwork } className='flex flex-col gap-6'>
                <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">Network Name</label>
                    <input type="text" defaultValue={mobileNetworkData?.name} onChange={handleChange} id='name' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Network Code</label>
                    <input type="text" defaultValue={mobileNetworkData?.code} onChange={handleChange} id='code' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Icon</label>
                    <div onClick={() => fileRef.current.click()} className='w-full flex flex-col items-center justify-center p-6 border-[3px] border-dotted cursor-pointer'>
                        <IoAddOutline className='text-[36px] font-semibold' />
                        <p className='font-semibold  text-[20px]'>Add Logo</p>
                        <input 
                            type="file" 
                            ref={fileRef} 
                            accept='image/png, image/jpeg' 
                            onChange={(e) => setImage(e.target.files[0])} 
                            className='w-full'
                            hidden
                        />
                    </div>
                </div>

                {imageError ? (
                        <span className='text-center w-full text-red-700'>{imageError}</span>
                        )
                        :
                        imageUploadProgress > 0 && imageUploadProgress < 100 ? (
                            <span className='text-center w-full text-slate-700' >{`Uploading: ${imageUploadProgress}% complete`}</span>
                        )
                        : 
                        imageUploadProgress === 100 ? (
                            <span className='text-center w-full text-green-700' >Image uploaded successfully</span>
                        )
                        :
                        ''
                    }

                    {
                        loading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={ () => newPlan ? handleNewNetwork : handleUpdateNetwork(mobileNetworkData?._id) } text={`${ newPlan  ? 'Add' : 'Update'}`} />
                        )
                    }

            </form>
        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default NewNetwork
