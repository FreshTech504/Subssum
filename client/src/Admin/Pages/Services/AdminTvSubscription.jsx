import { Link } from "react-router-dom"
import { useFetAllTVProviders } from "../../../Helpers/fetch.hooks"
import Aside from "../../Components/Aside"
import Sidebar from "../../Components/Sidebar"
import TopNav from "../../Components/TopNav"
import { IoMdAdd } from "react-icons/io"

function AdminTvSubscription() {
  const { isFetchingTvProviderData, tvProviderDataData } = useFetAllTVProviders()
  const TvServicesData = tvProviderDataData?.data

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px] ">
        <TopNav />

        <div className="mt-[100px] px-12">
          <h1 className='text-[26px] mt-11 font-semibold text-[#1F2937]'>
            Tv Subscription
          </h1>

          <div className="mt-32 flex flex-wrap items-center justify-center gap-5">
                {
                  TvServicesData?.map((item) => (
                    <div className="flex flex-col gap-5 items-center justify-center">
                      <Link to={`/new-tv/${item._id}`} className="flex items-center justify-center w-[197px] h-[178px] bg-[#EFF3FB] border-[1px] border-[#4169E1] rounded-[20px] p-4">
                        <img className="w-[103px]" alt={item?.name} src={item?.img} />
                      </Link>
                      {item?.name}
                    </div>
                  ))
                }
                <Link to={`/new-tv/noid`} className="flex items-center justify-center flex-col w-[197px] gap-5 bg-[#6882B6] border-[1px] border-[#4169E1] rounded-[20px] p-4">
                  <p className="text-[16px] font-medium text-white">Add New TV Provider</p>
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

export default AdminTvSubscription
