import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import Aside from "../../Components/Aside";
import {
  useFetAllTVProviders,
  useFetchAdminCableTvPlans,
} from "../../../Helpers/fetch.hooks";
import { useEffect, useState } from "react";

function AdminCableTvPlans() {
  const { isFetchingTvProviderData, tvProviderDataData } = useFetAllTVProviders();
  const TvServicesData = tvProviderDataData?.data;
  const { cabletvplan, isFetchingCableTvPlans } = useFetchAdminCableTvPlans();
  const tvPlans = cabletvplan?.data;

  const [availablePlans, setAvailablePlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    if (tvPlans) {
      setAvailablePlans(tvPlans);
    }
  }, [tvPlans]);
//console.log('object', tvPlans)
  const handleNetworkChange = (e) => {
    const value = e.target.value;
    if (value) {
        const filterPlans = tvPlans?.filter(plan => plan?.platformCode.toString() === value);
        setAvailablePlans(filterPlans);
    } else {
        setAvailablePlans(tvPlans);
    }
    setCurrentPage(1); // Reset to first page after filtering
};

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = availablePlans.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(availablePlans.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-full overflow-x-hidden flex">
      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full mb-40 ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          <div className="flex items-center gap-8">
            <Link
              to="/admin-tv-provider"
              className="bg-gray-60 py-[9px] px-[4px] rounded-[15px] text-white text-[16px] font-medium cursor-pointer"
            >
              TV Service Providers
            </Link>
            <Link
              to="/new-cabletv-plan/noid"
              className="bg-gray-60 py-[9px] px-[4px] rounded-[15px] text-white text-[16px] font-medium cursor-pointer"
            >
              New Cable Tv Plan
            </Link>
          </div>

          <h1 className="text-[26px] mt-11 font-semibold text-[#1F2937]">
            Cable Tv Plans
          </h1>

          <div className="py-[9px] px-[4px] rounded-[15px] text-[16px] font-medium cursor-pointer">
            <select
              onChange={handleNetworkChange}
              name=""
              id=""
              className="input rounded-[15px]"
            >
              <option value="">-- ALL SERVICE --</option>
              {TvServicesData?.map((item, idx) => (
                <option key={idx} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            {isFetchingCableTvPlans ? (
              <div className="absolute flex w-full top-20 items-center justify-center">
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
              </div>
            ) : (
              currentPlans?.map((item) => (
                <Link
                  key={item._id}
                  to={`/new-cabletv-plan/${item._id}`}
                  className="w-[174px] p-6 gap-5 cursor-pointer hover:shadow-xl mb-4 flex flex-col items-center justify-center rounded-[20px] border-[1px]"
                >
                  <p className="text-gray-70 font-medium text-[20px]">
                    {item.validity}
                  </p>
                  <p className="text-[21px] text-center font-semibold text-[#000000]">
                    {item?.planName}
                  </p>
                  <p className="text-[20px] font-medium">NGN {item.price}</p>
                  <p className="text-[20px] font-medium">{item?.platformName}</p>
                </Link>
              ))
            )}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(idx + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ml-auto w-[215px]">
        <Aside />
      </div>
    </div>
  );
}

export default AdminCableTvPlans;
