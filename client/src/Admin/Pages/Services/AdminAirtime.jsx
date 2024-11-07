import { Link } from "react-router-dom"
import Aside from "../../Components/Aside"
import Sidebar from "../../Components/Sidebar"
import TopNav from "../../Components/TopNav"
import { useFetAllNetworks } from "../../../Helpers/fetch.hooks"
import { IoMdAdd } from "react-icons/io";

function AdminAirtime() {
  const { isFetchingNetworkData, networkData } = useFetAllNetworks()
  const mobileNetworkData = networkData?.data

    return (
        <div className="relative w-full overflow-x-hidden flex">
    
          <div className="h-[100vh] w-[276px] fixed left-0 top-0">
            <Sidebar />
          </div>
    
          <div className="relative w-full mb-40 ml-[276px]">
            <TopNav />
    
            <div className="mt-[100px] px-12">
              <div className="flex items-center gap-8">
                <Link to='/new-network/noid' className="bg-gray-60 py-[9px] px-[4px] rounded-[15px] text-white text-[16px] font-medium cursor-pointer">
                    Add New Network
                </Link>
              </div>

              <h1 className='text-[26px] mt-11 font-semibold text-[#1F2937]'>
                Airtime Service Provider
              </h1>

              <div className="mt-32 flex flex-wrap items-center justify-center gap-5">
                {
                  mobileNetworkData?.map((item) => (
                    <div className="flex flex-col gap-5 items-center justify-center">
                      <Link to={`/new-network/${item._id}`} className="flex items-center justify-center w-[197px] h-[178px] bg-[#EFF3FB] border-[1px] border-[#4169E1] rounded-[20px] p-4">
                        <img className="w-[103px]" alt={item?.name} src={item?.icon} />
                      </Link>
                      {item?.name}
                    </div>
                  ))
                }
                <Link to={`/new-network/noid`} className="flex items-center justify-center flex-col w-[197px] gap-5 bg-[#6882B6] border-[1px] border-[#4169E1] rounded-[20px] p-4">
                  <p className="text-[16px] font-medium text-white">Add New Network</p>
                  <IoMdAdd className="text-white text-[48px] font-bold" />
                </Link>
              </div>

            </div>
            
          </div>
    
          <div className="ml-auto w-[215px]" >
            <Aside />
          </div>
    
            
        </div>
      )
}

export default AdminAirtime
