import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../firebase'
import Aside from "../../Components/Aside"
import Sidebar from "../../Components/Sidebar"
import TopNav from "../../Components/TopNav"
import { useFetAllTVProviders } from "../../../Helpers/fetch.hooks"
import { IoAddOutline } from "react-icons/io5"
import LoadingBtn from "../../../Components/Helpers/LoadingBtn"
import ButtonTwo from "../../../Components/Helpers/ButtonTwo"
import { createTVProvider, updateTvProvider } from "../../../Helpers/api"
import toast from "react-hot-toast"

function NewTV() {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]

    const { isFetchingTvProviderData, tvProviderDataData } = useFetAllTVProviders(pathName)
    const tvServicesData = tvProviderDataData?.data

    const [ newPlan, setNewPlan ] = useState( pathName === 'noid' ? true : false )

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
                    setFormData({ ...formData, img: downloadURL })
                );
            }
        );
    };

    const handleNewTvProvider = async (e) => {
        e.preventDefault()
        if(!formData?.name){
            setImageError('Enter Name')
            setTimeout(() => {
                setImageError()
            }, 2500)
            return
        }
        if(!formData?.code){
            setImageError('Enter Code')
            setTimeout(() => {
                setImageError()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await createTVProvider(formData)
            if(res.success){
                toast.success(res.data)
                navigate('/admin-tv-subscription')
            } else {
                toast.error(res.data)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!newPlan){
            setFormData({ ...formData, _id: tvServicesData?._id })
        }
    }, [newPlan, tvServicesData])

    const handleUpdateTvProvider = async ({ disabled }) => {
        console.log('disabled', disabled)
        const updatedFormData = { ...formData, disabled };
        try {
            setLoading(true)
            
            const res = await updateTvProvider(updatedFormData)
            if(res.success){
                toast.success(res.data)
                navigate('/admin-tv-subscription')
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

        <div className="mt-[100px] px-12">
            
            <h1 className='text-[26px] font-semibold text-[#1F2937]'>
                { newPlan ? 'Add New' : 'Update' } Provider
            </h1>
            
            <p className="font-bold">{tvServicesData?.disabled && 'Disabled'}</p>
            <form onSubmit={ newPlan ? handleNewTvProvider : handleUpdateTvProvider } className='flex flex-col gap-6 mt-16'>
            <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">TV Provider Name</label>
                    <input type="text" defaultValue={tvServicesData?.name} onChange={handleChange} id='name' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">Tv Provider Code</label>
                    <input type="text" defaultValue={tvServicesData?.code} onChange={handleChange} id='code' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">Tv Provider Slug</label>
                    <input type="text" defaultValue={newPlan ? formData?.name?.toLowerCase().trim() : tvServicesData?.slugName } onChange={handleChange} id='slugName' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Image</label>
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

                    <div className="flex items-center gap-8 flex-wrap">
{
                        loading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={ () => newPlan ? handleNewTvProvider : handleUpdateTvProvider(tvServicesData?._id) } text={`${ newPlan  ? 'Add' : 'Update'}`} />
                        )
                    }

                    {
                        !newPlan && (
                            <>
                                {
                                    loading ? (
                                        <LoadingBtn />
                                    ) : (
                                        <ButtonTwo onClick={() => handleUpdateTvProvider({ disabled: tvServicesData?.disabled === true ? false : true })} text={tvServicesData?.disabled ? 'Enable' : 'Disable'} />
                                    )
                                }
                            </>
                        )
                    }

                    </div>


            </form>

        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default NewTV
