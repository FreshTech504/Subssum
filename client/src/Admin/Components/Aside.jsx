import { useFetchActivities, useFetchUsers } from "../../Helpers/fetch.hooks";
import { formatDistanceToNow } from "date-fns";

function Aside() {
  const { activitiesData, isFetchingActivities } = useFetchActivities();
  const activities = activitiesData?.data;
  const sortedActivities = activities?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const { isFetchingUser, userData } = useFetchUsers()
  const users = userData?.data;
  const sortedUsers = users?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const limitUser = sortedUsers?.splice(0, 10)
  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
        return text;
    }

    const truncated = text?.slice(0, maxLength);
    const lastSpaceIndex = truncated?.lastIndexOf(' ');
    
    // Adjust to the last space to avoid cutting off in the middle of a word
    const result = lastSpaceIndex > -1 ? truncated.slice(0, lastSpaceIndex) : truncated;

    return result + '...';
  }

  return (
    <div className="w-[215px] h-[100vh] border-l-[1px] boder-left-black-1 p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-3 mt-6">
        <p className="text-[#1C1C1C] text-[14px] font-normal">Activities</p>

        <div className="h-[326px] flex flex-col overflow-x-hidden items-center overflow-y-auto scrollbar-thin">
          {isFetchingActivities ? (
            <div className="absolute flex w-full top-12 items-center justify-center">
              <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
            </div>
          ) : (
            sortedActivities?.map((item) => (
              <>
                <div className="mr-auto w-full relative border-b-[1px] flex items-center gap-2 p-2 group">
                  <img
                    src=""
                    alt=""
                    className="bg-gray-700 h-[24px] w-[24px] rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-normal text-[#1C1C1C]">
                      {truncateText(item?.note, 8)}
                    </p>
                    <p className="text-[12px] font-normal text-[#1C1C1C66]">
                      {formatDistanceToNow(new Date(item?.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <div className="absolute w-full p-4 rounded-[10px] shadow-md bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <p className="text-[14px] font-normal text-[#1C1C1C]">
                      {item.note}
                    </p>
                    <p className="text-[12px] font-normal text-[#1C1C1C66]">
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>

                    <small>By: {item?.name}</small>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[#1C1C1C] text-[14px] font-normal">
          Recently Joined User
        </p>

        <div className="h-[326px] flex flex-col overflow-x-hidden items-center overflow-y-auto scrollbar-thin">
        {isFetchingUser ? (
            <div className="absolute flex w-full top-12 items-center justify-center">
              <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
            </div>
          ) : (
            limitUser?.map((item) => (
              <>
                <div className="mr-auto w-full relative border-b-[1px] flex items-center gap-2 p-2 group">
                  <img
                    src={item?.profile}
                    alt=""
                    className="bg-gray-700 h-[24px] w-[24px] rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-normal text-[#1C1C1C]">
                      {truncateText(`${item?.firstName} ${item?.lastName ? item?.lastName : ''}`, 8)}
                    </p>
                    <p className="text-[12px] font-normal text-[#1C1C1C66]">
                    {item.createdAt && !isNaN(new Date(item.createdAt).getTime())
    ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
    : "Date unavailable"}
                    </p>
                  </div>

                  <div className="absolute w-full p-4 rounded-[10px] shadow-md bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>


    </div>
  );
}

export default Aside;
