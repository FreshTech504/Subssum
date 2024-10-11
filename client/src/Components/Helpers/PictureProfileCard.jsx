import { useDispatch, useSelector } from 'react-redux';
import BgImg from '../../assets/bg.png'
import { IoCameraOutline } from "react-icons/io5";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'
import { useEffect, useRef, useState } from 'react';
import { updateUserProfilePicture } from '../../Helpers/api';
import { signInSuccess } from '../../Redux/user/userSlice';
import toast from 'react-hot-toast';

function PictureProfileCard() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.subSubUser);
  const user = currentUser?.data

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
                setImgUrl(downloadURL)
              );
          }
      );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (imgUrl) {
        try {
          const res = await updateUserProfilePicture({imgUrl});
          if(res.success){
            toast.success('Account Updated Successful')
            dispatch(signInSuccess(res?.data))
          }
        } catch (error) {
          setImgUrl()
          setImageError()
        } finally {
          setImgUrl()
          setImageError()
          setImage(undefined)
        }
      }
    };
  
    fetchData(); 
  }, [imgUrl]); 
  


  return (
    <div className="card1 tablet:w-full flex flex-col">
        <div onClick={() => fileRef.current.click()} className="flex justify-center items-center flex-col gap-[16px] cursor-pointer">
          <input type="file" hidden ref={fileRef} accept='image/png, image/jpeg' onChange={(e) => setImage(e.target.files[0])} />
            <img src={user?.profile ? user?.profile : BgImg} alt={`image of ${user?.firstName}`} className="w-[100px] h-[100px] rounded-full" />
            <div className="flex items-center gap-[8px] text-second-color">
                <IoCameraOutline className="w-[24px]" />
                <p className="text-[16px]">Upload Image</p>
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
    </div>
  )
}

export default PictureProfileCard