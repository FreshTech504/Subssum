import ButtonTwo from "../Helpers/ButtonTwo";
import { FaFileUpload } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { reportTransaction } from "../../Helpers/api";
import toast from "react-hot-toast";
import LoadingBtn from "../Helpers/LoadingBtn";

function ReportTransaction({ setSelectedCard }) {
  const { currentUser } = useSelector((state) => state.subSubUser);
  const user = currentUser?.data;
  const [formData, setFormData] = useState({ email: user.email });
  const [image, setImage] = useState(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageError, setImageError] = useState(false);

  const [errorResponse, setErrorResponse] = useState();
  const [ isLoading, setIsLoading ] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fileRef = useRef(null);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (image.size > MAX_FILE_SIZE_BYTES) {
      setImageError(`Image must be less than ${MAX_FILE_SIZE_MB}MB`);
      toast.error(`Image must be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setImageError();

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        setImageError("Unable to Upload image");
        console.log("Unable to Upload image", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, imgUrl: downloadURL })
        );
      }
    );
  };

  const handleReportTransaction = async () => {
    if (!formData.name) {
      setErrorResponse("Please provide a name or email");
      setTimeout(() => {
        setErrorResponse();
      }, 2000);
      return
    }
    if(!formData.description) {
        setErrorResponse("Please provide a description");
        setTimeout(() => {
          setErrorResponse();
        }, 2000);
        return
      }
      if(imageUploadProgress > 0 && imageUploadProgress < 100){
        return
      }
    try {
        setIsLoading(true)
        const res = await reportTransaction(formData)
        //console.log('RESPONSESSS0', res.data)
        if(res.data.success == false){
            toast.success(res?.data.data)
        }
        if(res.data.success){
            toast.success(res?.data.data)
            setSelectedCard(null)
        }
    } catch (error) {

    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div className="flex gap-6 w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] text-gray-70 font-semibold">
          Report an Incident
        </h2>

        <p className="text-[14px] font-normal text-gray-70">
          Our representative will response as soon as poosible
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="inputGroup flex flex-col gap-4">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              id="name"
              onChange={handleChange}
              placeholder="Lawal Wahab Babatunde"
            />
          </div>
          <div className="inputGroup flex flex-col gap-4">
            <label className="label">Description</label>
            <textarea
              type="text"
              id="description"
              onChange={handleChange}
              className="input textarea h-[120px]"
              placeholder="Enter Description"
            ></textarea>
          </div>
          <div className="w-[50%] small-phone:w-[70%] flex items-center justify-center">
            <div
              onClick={() => fileRef.current.click()}
              className="cursor-pointer rounded-[6px] p-2 flex items-center gap-[10px] bg-gray-20"
            >
              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <p className="text-[16px] font-semibold text-second-color">
                Upload Image
              </p>
              <FaFileUpload className="text-[20px] text-second-color" />
            </div>
          </div>
          {imageError ? (
            <span className="text-center w-full text-red-700">
              {imageError}
            </span>
          ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
            <span className="text-center w-full text-slate-700">{`Uploading: ${imageUploadProgress}% complete`}</span>
          ) : imageUploadProgress === 100 ? (
            <span className="text-center w-full text-green-700">
              Image uploaded successfully
            </span>
          ) : (
            ""
          )}

          {/**ERROR RESPONSE */}
          <p className="text-center text-error font-semibold">
            {errorResponse}
          </p>
        </div>

          {
            isLoading ? (
                <LoadingBtn />
            ) : (
                <ButtonTwo onClick={handleReportTransaction} text={`${imageUploadProgress > 0 && imageUploadProgress < 100 ? 'Uploading Image' : 'Submit'}`} />
            )
          }
      </div>
    </div>
  );
}

export default ReportTransaction;
