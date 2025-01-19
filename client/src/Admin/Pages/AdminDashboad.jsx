import { useFetchAdminNotification, useFetchSalesAnalysis, useFetchServicesStatistics, useFetchWebStatistics } from "../../Helpers/fetch.hooks"
import Aside from "../Components/Aside"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"
import { FiTrendingUp } from 'react-icons/fi';

function AdminDashboad() {
  const { notificationsData } = useFetchAdminNotification()
  const notification = notificationsData?.data
  
  const { isFetchingWebStatistic, webStatisticsData } = useFetchWebStatistics()
  const webStats = webStatisticsData?.data

  const { isFetchingWebServices, webServicesData } = useFetchServicesStatistics()
  const servicesStats = webServicesData?.data
  
  const { isFetchingSalesData, salesData } = useFetchSalesAnalysis('30days')
  const sales = salesData?.data

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative ml-[276px]  w-full">
        <TopNav />

        <div className="mt-[100px] px-12 mb-20">
                          {/**NOTIFICATIONS */}
                          <marquee className={`font-semibold`}>
                    <div className="flex items-center gap-4">
                        {
                            notification?.map((item) => (
                                <p key={item?._id} className="">
                                    ***{item?.note}***
                                </p>
                            ))
                        }
                    </div>
                </marquee>


          <div className="flex flex-col">
            {/**TOP */}
            <div className="flex items-center gap-4">
              <div className="relative bg-[#E3F5FF] flex-1 flex flex-col p-[24px] rounded-[16px] gap-2 card">
                <p className="text-[12px] font-semibold text-[#1C1C1C]">Total Users</p>
                <p className="text-[24px] font-bold text-[#000000]">{webStats?.totalUsers}</p>
                {/* <p className="absolute right-[24px] bottom-[24px]">{webStats?.percentageIncrease}%<FiTrendingUp className="text-[#000000] ml-12 " /></p> */}
                <p className="absolute right-[24px] bottom-[24px] flex items-center text-[14px]  text-[#000000]"> {webStats?.percentageIncrease}% <FiTrendingUp className="text-[#000000] ml-1" /> </p>
              </div>
              <div className="bg-[#E5ECF6] flex-1 flex flex-col p-[24px] rounded-[16px] gap-2 card">
                <p className="text-[12px] font-semibold text-[#1C1C1C]">Active Users</p>
                <p className="text-[24px] font-bold text-[#000000]">{webStats?.activeUsers}</p>
              </div>
              <div className="bg-[#FFAE4240] flex-1 flex flex-col p-[24px] rounded-[16px] gap-2 card">
                <p className="text-[12px] font-semibold text-[#1C1C1C]">Amount made for the day</p>
                <p className="text-[24px] font-bold text-[#000000]">{webStats?.last24HrsSales}</p>
              </div>
              <div className="bg-[#50DC3940] flex-1 flex flex-col p-[24px] rounded-[16px] gap-2 card">
                <p className="text-[12px] font-semibold text-[#1C1C1C]">New Users</p>
                <p className="text-[24px] font-bold text-[#000000]">{webStats?.currentMonthUsers}</p>
              </div>
            </div>

            {/**MIDDLE */}
            <div className="flex items-center gap-4 mt-20">
              <div className="bg-[#F32A8A40] flex-1 flex flex-col py-[27px] px-[15px] rounded-[16px] gap-3 card">
                <p className="text-[16px] font-semibold text-[#1C1C1C]">Data Service</p>
                <p className="text-[10px] font-semibold text-[#000000]">Customer with the highest transaction:</p>
                <p className="text-[13px] font-medium text-[#000000]">{servicesStats?.dataPurchase?._id}: {servicesStats?.dataPurchase?.transactionCount}</p>
              </div>
              <div className="bg-[#42FFDD59] flex-1 flex flex-col py-[27px] px-[15px] rounded-[16px] gap-3 card">
                <p className="text-[16px] font-semibold text-[#1C1C1C]">Airtime Service</p>
                <p className="text-[10px] font-semibold text-[#000000]">Customer with the highest transaction:</p>
                <p className="text-[13px] font-medium text-[#000000]">{servicesStats?.airtimePurchase?._id}: {servicesStats?.airtimePurchase?.transactionCount}</p>
              </div>
              <div className="bg-[#D23A0B40] flex-1 flex flex-col py-[27px] px-[15px] rounded-[16px] gap-3 card">
                <p className="text-[16px] font-semibold text-[#1C1C1C]">Tv subscription</p>
                <p className="text-[10px] font-semibold text-[#000000]">Customer with the highest transaction:</p>
                <p className="text-[13px] font-medium text-[#000000]">{servicesStats?.tvPurchase?._id}: {servicesStats?.tvPurchase?.transactionCount}</p>
              </div>
              <div className="bg-[#FFAE4240] flex-1 flex flex-col py-[27px] px-[15px] rounded-[16px] gap-3 card">
                <p className="text-[16px] font-semibold text-[#1C1C1C]">Airtime to cash</p>
                <p className="text-[10px] font-semibold text-[#000000]">Customer with the highest transaction:</p>
                <p className="text-[13px] font-medium text-[#000000]">{servicesStats?.airtime2cashPurchase?._id}: {servicesStats?.airtime2cashPurchase?.transactionCount}</p>
              </div>
            </div>

            {/**BOTTOM */}
            <div className="flex items-center gap-20 mt-20 w-full">
                <div className="flex flex-col gap-8 w-full">
                  <div className="bg-[#75ACFF33] card3 w-full flex flex-1 rounded-[16px] flex-col gap-6">
                    <h2 className="text-[#000000] font-semibold text-[24px]">Airtime Subscription</h2>
                    <p className="text-[#000000] font-normal text-[14px]">Total number of airtime bought: {sales?.totalAirtimeSalesNumber}</p>
                    <p className="text-[#000000] font-normal text-[14px]">Total amount made: {sales?.totalAirtimeSales}</p>
                  </div>
                  <div className="bg-[#D9D9D980] card3 w-full flex flex-1 rounded-[16px] flex-col gap-6">
                    <h2 className="text-[#000000] font-semibold text-[24px]">Electricity Subscription</h2>
                    <p className="text-[#000000] font-normal text-[14px]">Total number of electricity subscription: {sales?.totalElectricitySalesNumber}</p>
                    <p className="text-[#000000] font-normal text-[14px]">Total amount made: {sales?.totalElectricitySales}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-8 w-full">
                <div className="bg-[#DCEE0B33] card3 w-full flex flex-1 rounded-[16px] flex-col gap-6">
                    <h2 className="text-[#000000] font-semibold text-[24px]">Data Subscription</h2>
                    <p className="text-[#000000] font-normal text-[14px]">Total number of data bought: {sales?.totalDataSalesNumber}</p>
                    <p className="text-[#000000] font-normal text-[14px]">Total amount made: {sales?.totalDataSales}</p>
                  </div>
                  <div className="bg-[#D355FF33] card3 w-full flex flex-1 rounded-[16px] flex-col gap-6">
                    <h2 className="text-[#000000] font-semibold text-[24px]">TV Subscription</h2>
                    <p className="text-[#000000] font-normal text-[14px]">Total number of tv subscription bought: {sales?.totalCableTvSalesNumber}</p>
                    <p className="text-[#000000] font-normal text-[14px]">Total amount made: {sales?.totalCableTvSales}</p>
                  </div>
                </div>
            </div>

          </div>


        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default AdminDashboad