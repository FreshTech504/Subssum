import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'
import { days } from '../data/statistics'
import { useEffect, useState } from 'react'
import FilterImg from '../../assets/filter.png'
import VectorImg from '../Assests/Vector.png'
import GrapgImg from '../Assests/graph.png'
import MoneyImg from '../Assests/money.png'
import { useFetchSalesAnalysis } from '../../Helpers/fetch.hooks'
import barChartImg from '../Assests/barChart.png'
import phoneImg from '../Assests/phone.png'
import WifiImg from '../Assests/wifi.png'
import TvImg from '../Assests/tv.png'
import SparkImg from '../Assests/spark.png'

function SalesAnalysis() {
  const dates = days
  const [filterOption, setFilterOption] = useState(false);
  const [filterValue, setFilterValue] = useState(dates[0].value);
  const { isFetchingSalesData, salesData, refetchSalesData } = useFetchSalesAnalysis(filterValue)
  const data = salesData?.data

  /**
   * 
  useEffect(() => {
  }, [filterValue, refetchSalesData]);
   */
  
  const handleFilterOptions = () => {
    setFilterOption((prev) => !prev);
  };
  
  const handleSelectedFilter = (value) => {
    setFilterOption(false);
    setFilterValue(value);
    refetchSalesData();
  };



  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">

          <div className=" relative flex items-center justify-between">
            <h1 className='text-[26px] font-semibold text-[#1F2937]'>
              Sales Analysis
            </h1>

            <div
              onClick={handleFilterOptions}
              className=" ml-auto flex p-2 w-[190px] cursor-pointer rounded-[12px] border-[1px] border-gray-30 bg-gray-10 items-center gap-2"
            >
              <img className="w-[15.6px] h-[9.6px]" alt="filter" src={FilterImg} />
              <p className="text-[16px] text-color-4">Filter: {filterValue}</p>
            </div>
            {filterOption && (
              <div className="absolute z-40 top-[50px] right-0 flex p-2 w-[190px] rounded-[12px] border-[1px] border-gray-30 bg-gray-10 items-center gap-2">
                <div className="flex flex-col w-full">
                  {dates.map((item) => (
                    <div
                      key={item.value}
                      onClick={() => handleSelectedFilter(item.value)}
                      className={`w-full hover:text-color-3 font-semibold cursor-pointer p-2 border-b-[1px] border-b-gray-30 ${
                        filterValue === item.value ? "text-color-3" : "text-color-2"
                      }`}
                    >
                      {item.time}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          
          {
            isFetchingSalesData ? (
              <div className="absolute flex w-full top-20 items-center justify-center">
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
              </div>
            ) : (
              <div className="mt-12">
                {/**TOP */}
                <div className='flex items-center gap-12'>
                  <div className="card3 flex-row flex-1 flex items-center justify-between gap-2 bg-[#FFA50066]">
                      <div className="flex flex-col gap-4">
                        <p className='text-[16px] font-medium text-[#000000]'>Transactions</p>
                        <img src={VectorImg} alt="Transactions" className='w-[50px]' />
                      </div>
                      <div className="text-[24px] text-[#000000] font-semibold">{data?.totalSales}</div>
                  </div>
                  <div className="card3 flex-row flex-1 flex items-center justify-between gap-2 bg-[#0000FF40]">
                      <div className="flex flex-col gap-4">
                        <p className='text-[16px] font-medium text-[#000000]'>Total Sales</p>
                        <img src={GrapgImg} alt="Total Sales" className='w-[50px]' />
                      </div>
                      <div className="text-[24px] text-[#000000] font-semibold">NGN {data?.totalSalesValue}</div>
                  </div>
                  <div className="card3 flex-row flex-1 flex items-center justify-between gap-2 bg-[#00800080]">
                      <div className="flex flex-col gap-4">
                        <p className='text-[16px] font-medium text-[#000000]'>Total Profits</p>
                        <img src={MoneyImg} alt="Total Profits" className='w-[50px]' />
                      </div>
                      <div className="text-[24px] text-[#000000] font-semibold">NGN {data?.totalProfits}</div>
                  </div>
                </div>

                {/**BOTTOM */}
                <div className="mt-12">
                  <h1 className='text-[26px] mb-8 font-semibold text-[#1F2937]'>
                    General Analysis
                  </h1>

                  <div className="flex gap-6 flex-col w-full mb-12">
                    <div className="flex gap-3 items-center justify-between w-full">
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#80BF801A]">
                          <img alt='' src={barChartImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Success Transactions</p>
                            <p className='font-medium text-[20px] text-[#000000]'>{data?.totalSuccessfulTransactions}</p>
                          </div>
                        </div>
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#FF00001A]">
                          <img alt='' src={barChartImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Failed Transactions</p>
                            <p className='font-medium text-[20px] text-[#000000]'>{data?.totalSales - data?.totalSuccessfulTransactions}</p>
                          </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-between w-full">
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#D32D411A]">
                          <img alt='' src={phoneImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Airtime Sales</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN{data?.totalAirtimeSales}</p>
                          </div>
                        </div>
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#8000801A]">
                          <img alt='' src={phoneImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Airtime Profits</p>
                            <p className='font-medium text-[20px] text-[#000000]'>{data?.totalAirtimeProfit}</p>
                          </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-between w-full">
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#D32D411A]">
                          <img alt='' src={WifiImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Data Sales</p>
                            <p className='font-medium text-[20px] text-[#000000]'>{data?.totalDataSales}</p>
                          </div>
                        </div>
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#964B001A]">
                          <img alt='' src={WifiImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Data Profits</p>
                            <p className='font-medium text-[20px] text-[#000000]'>{data?.totalDataProfit}</p>
                          </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-between w-full">
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#6357871A]">
                          <img alt='' src={TvImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Tv Subscription Sales</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN{data?.totalCableTvSales}</p>
                          </div>
                        </div>
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#C040001A]">
                          <img alt='' src={TvImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Tv Subscription Profits</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN{data?.totalCableTvProfit}</p>
                          </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-between w-full">
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#BDFFF31A]">
                          <img alt='' src={SparkImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Electricity Sales</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN{data?.totalElectricitySales}</p>
                          </div>
                        </div>
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#ECECEC]">
                          <img alt='' src={SparkImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Electricity Profits</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN{data?.totalElectricityProfit}</p>
                          </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-between w-full">
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#BDFFF31A]">
                          <img alt='' src={SparkImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Airtime To Cash</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN {data?.totalAirtimeToCashSales}</p>
                          </div>
                        </div>
                        <div className="card3 flex-row flex items-center justify-between gap-4 flex-1 bg-[#ECECEC]">
                          <img alt='' src={SparkImg} className='w-[60px]' />
                          <div className='flex flex-col '>
                            <p className='font-medium text-[20px] text-[#000000]'>Airtime To Cash</p>
                            <p className='font-medium text-[20px] text-[#000000]'>NGN {data?.totalAirtimeToCashProfit}</p>
                          </div>
                        </div>
                    </div>
                  </div>


                </div>

              </div>
            )
          }

        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default SalesAnalysis