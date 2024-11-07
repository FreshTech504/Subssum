import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchUsers } from "../../Helpers/fetch.hooks";
import ButtonTwo from "../Helpers/ButtonTwo";
import Loading from "./Loading";
import { blockUser } from "../../Helpers/api";
import toast from "react-hot-toast";

function BlockUser({ setSelectedCard }) {
  const loc = window.location;
  const pathName = loc.pathname.split("/")[2];
  const { isFetchingUser, userData } = useFetchUsers(pathName);

  const userInfo = userData?.data;
  const [blockingUser, setBlockingUser] = useState(false);

  const toggleBlockUser = async () => {
    try {
      setBlockingUser(true);
      const res = await blockUser({ id: pathName });
      if (res?.success) {
        toast.success(res.data);
        setSelectedCard(null);

        window.location.reload()
      } else {
        toast.error(res.data);
        setSelectedCard(null);
      }
    } catch (error) {
    } finally {
      setBlockingUser(false);
    }
  };

  return (
    <div className="w-full card2 flex items-center justify-center flex-col">
      {isFetchingUser ? (
        <div className="absolute flex w-full top-20 items-center justify-center">
          <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
        </div>
      ) : (
        <>
          <h2
            className={`text-[24px] font-semibold ${
              userInfo?.blocked ? "text-success" : "text-error"
            }`}
          >
            Are you sure you want to {userInfo?.blocked ? "Unblock" : "Block"}{" "}
            User?
          </h2>

          {blockingUser ? (
            <Loading />
          ) : (
            <ButtonTwo
              onClick={toggleBlockUser}
              text={userInfo?.blocked ? "Unblock User" : "Block"}
              style={`${userInfo?.blocked ? "bg-success" : "bg-error"}`}
            />
          )}
        </>
      )}
    </div>
  );
}

export default BlockUser;
