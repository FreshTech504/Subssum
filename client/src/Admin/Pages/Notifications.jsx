import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'
import ButtonTwo from '../../Components/Helpers/ButtonTwo'
import { useFetchNotification } from '../../Helpers/fetch.hooks'
import { deleteNotification } from '../../Helpers/api'
import { useState } from 'react'
import toast from 'react-hot-toast'
import LoadingBtn from '../../Components/Helpers/LoadingBtn'

function Notifications({ setNotificationId, setSelectedCard }) {
  const { isFetchingNotifications, notificationsData } = useFetchNotification()
  const data = notificationsData?.data

  const handleNewNotification = () => {
    setNotificationId()
    setSelectedCard('newNotification')
  }

  const handleEditNotification = (value) => {
    setNotificationId(value)
    setSelectedCard('newNotification')
  }

  const [ loading, setLoading ] = useState(false)
  const handleDelete = async (value) => {
    try {
      setLoading(true)
      if(loading){
        return
      }
      const res = await deleteNotification({ id: value })
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">

          <div className="flex items-center justify-between">
            <h1 className='text-[26px] font-semibold text-[#1F2937]'>
               Notifications
            </h1>

            <div className="">
              <ButtonTwo onClick={handleNewNotification} text={'Add New'} />
            </div>
          </div>

          <div className="">
          <table className="overflow-y-auto mt-8 h-full w-[96%] border-collapse">
            <thead className="w-full bg-[#F9F9F9] phone:text-start">
              <tr className="text-[12px] py-[16px] px-[12px] text-[#333333] font-semibold gap-[10px]">
                <th className="py-[16px] px-[12px] text-start">Subject</th>
                <th className="py-[16px] px-[12px] text-start">For</th>
                <th className="py-[16px] px-[12px] text-start">Status</th>
                <th className="py-[16px] px-[12px] text-start">Action</th>
              </tr>
            </thead>

            <tbody>
              {isFetchingNotifications ? (
                <div className="absolute flex w-full top-12 items-center justify-center">
                  <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                </div>
              ) : (
                data?.map((item) => (
                  <tr key={item._id} className='border-b-[1px] w-full'>
                    <td className='py-[16px] px-[12px] flex flex-col'>
                      <p className='text-[#333333] font-semibold text-[12px]'>{item?.note}</p>
                    </td>
                    <td className='py-[16px] px-[12px] text-[12px] font-normal text-[#828282]'>
                      <p>{item?.accountFor}</p>
                    </td>
                    <td className='py-[16px] px-[12px] text-[12px] font-normal text-[#828282]'>
                      {item?.suspended ? 'Not Active' : 'Active'}
                    </td>
                    <td className='py-[16px] px-[12px] w-full flex items-center gap-4'>
                              <div className="w-[138px]">
                                <ButtonTwo onClick={() => handleEditNotification(item?._id)} text={'Edit'} />
                              </div>
                            <div className="w-[138px]">
                              <ButtonTwo onClick={() => handleDelete(item?._id)} text={'Delete'} />
                            </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>

        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default Notifications