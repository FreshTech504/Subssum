import { useEffect, useRef, useState } from "react";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { adminUserUpdateProfile } from "../../Helpers/api";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'
import { signInSuccess } from "../../Redux/admin/adminSlice";

function AdminProfilePage() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.subSubAdmin);
  const user = currentUser?.data

  const [ loading, setLoading ] = useState(false)
  const [ formData, setFormData ] = useState({ })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const [ image, setImage ] =  useState(undefined)
  const [ imageUploadProgress, setImageUploadProgress ] = useState(0)
  const [ imageError, setImageError ] = useState(false)
  const [ imgUrl, setImgUrl ] = useState()

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
                setFormData({ ...formData, profile: downloadURL })
              );
          }
      );
  };


  const handleUpdateAccount = async () => {
    try {
      setLoading(true)
      const res = await adminUserUpdateProfile(formData)
      if(res.success){
        toast.success(res.msg)
        dispatch(signInSuccess(res?.data))
      } else {
        toast.error(res.data)
        setImgUrl()
        setImageError()
        setImage(undefined)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className='flex w-full items-start justify-center gap-12'>
        
        <div onClick={() => fileRef.current.click()} className="flex items-center justify-center flex-col w-[130px] h-[132px] relative mr-8">
        <input type="file" hidden ref={fileRef} accept='image/png, image/jpeg' onChange={(e) => setImage(e.target.files[0])} />
          <img alt={`profile`} src={user?.profile} className="w-full h-full rounded-full" />
          <div className="absolute">

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
        </div>

        <div className="flex flex-1 flex-col gap-3">
            <div className="inputGroup">
              <label className="label">First Name</label>
              <input type="text" id="firstName" onChange={handleChange} defaultValue={user?.firstName} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">User Name</label>
              <input type="text" id="username" onChange={handleChange} defaultValue={user?.username} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">Date of Birth</label>
              <input type="date" id="dob" onChange={handleChange} defaultValue={user?.dob} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">Address</label>
              <input type="text" id="address" onChange={handleChange} defaultValue={user?.address} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">Postal Code</label>
              <input type="text" id="postalCode" onChange={handleChange} defaultValue={user?.postalCode} className="input" />
            </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
            <div className="inputGroup">
              <label className="label">Last Name</label>
              <input type="text" id="lastName" onChange={handleChange} defaultValue={user?.lastName} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">Password</label>
              <input type="text" id="password" onChange={handleChange} defaultValue={`******`} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">Country</label>
              <input type="text" id="country" onChange={handleChange} defaultValue={user?.country} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">City</label>
              <input type="text" id="city" onChange={handleChange} defaultValue={user?.city} className="input" />
            </div>
            <div className="inputGroup">
              <label className="label">Email</label>
              <input type="text" id="" disabled onChange={handleChange} defaultValue={user?.email} className="input" />
            </div>
        </div>

      </div>

      <div className="ml-auto mt-16 ">
        {
          loading ? (
            <LoadingBtn />
          ) : (
            <ButtonTwo onClick={handleUpdateAccount} text={'Save'} />
          )
        }
      </div>
    </div>
  )
}

export default AdminProfilePage
