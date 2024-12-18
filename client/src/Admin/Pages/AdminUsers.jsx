import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'
import ButtonTwo from '../../Components/Helpers/ButtonTwo'
import { useState } from 'react'
import { useFetchAdminData } from '../../Helpers/fetch.hooks'
import { blockAdmin, deleteAdmin } from '../../Helpers/api'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

function AdminUsers({ setAdminUserId, setSelectedCard }) {
  const { adminData, isFetchingAdminData } = useFetchAdminData()
  const data = adminData?.data

  const { currentUser } = useSelector((state) => state.subSubAdmin);
  const user = currentUser?.data

  const handleNewAdminUser = () => {
    setSelectedCard('newAdminUser')
  }

  const [ loading, setLoading ] = useState(false)
  const handleBlock = async (value) => {
    if(loading){
      return
    }
    try {
      const confirm = window.confirm(`Are you sure you want to update user account`)
      if(confirm){
        setLoading(true)
        const res =  await blockAdmin({ id: value })
        if(res.success){
          toast.success(res.data)
          window.location.reload()
        } else{
          toast.error(res.data)
        }
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (value) => {
    if(loading){
      return
    }
    try {
      const confirm = window.confirm('Are you sure you want to delete this admin')
      if(confirm){
        setLoading(true)
        const res =  await deleteAdmin({ id: value })
        if(res.success){
          toast.success(res.data)
          window.location.reload()
        } else{
          toast.error(res.data)
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleEdit = (value) => {
    setAdminUserId(value)
    setSelectedCard('editAdmin')
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
               Admin Users
            </h1>

            {/**
             * 
            <div className="">
              <ButtonTwo onClick={handleNewAdminUser} text={'Add New'} />
            </div>
              */}
          </div>

          <div className="">
          <table className="overflow-y-auto mt-8 h-full w-[96%] border-collapse">
            <thead className="w-full bg-[#F9F9F9] phone:text-start">
              <tr className="text-[12px] py-[16px] px-[12px] text-[#333333] font-semibold gap-[10px]">
                <th className="py-[16px] px-[12px] text-start">Full Name</th>
                <th className="py-[16px] px-[12px] text-start">Role</th>
                <th className="py-[16px] px-[12px] text-start">email</th>
                <th className="py-[16px] px-[12px] text-start">Status</th>
                <th className="py-[16px] px-[12px] text-start">Action</th>
              </tr>
            </thead>

            <tbody>
              {isFetchingAdminData ? (
                <div className="absolute flex w-full top-12 items-center justify-center">
                  <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                </div>
              ) : (
                data?.map((item) => (
                  <tr key={item._id} className='border-b-[1px] w-full'>
                    <td className='py-[16px] px-[12px] flex flex-col'>
                      <p className='text-[#333333] font-semibold text-[12px]'>{`${item?.firstName ? item?.firstName : ''} ${item?.lastName ? item?.lastName : ''}`}</p>
                    </td>
                    <td className='py-[16px] px-[12px] text-[12px] font-normal text-[#828282]'>
                      <p>{item?.role}</p>
                    </td>
                    <td className='py-[16px] px-[12px] text-[12px] font-normal text-[#828282]'>
                      {item?.email}
                    </td>
                    <td className={`py-[16px] px-[12px] text-[12px] font-normal text-[#828282] ${item?.blocked ? 'text-error' : 'text-success'}`}>
                      {item?.blocked ? 'Not Active' : 'Active'}
                    </td>
                    <td className='py-[16px] px-[12px] w-full flex items-center gap-4'>
                             {
                              user?.role === 'Admin' && (
                                <>
                                  <div className="w-[138px]">
                                    <ButtonTwo onClick={() => handleBlock(item?._id)} text={item?.blocked ? 'Unblock' : 'Block'} />
                                  </div>
                                <div className="w-[138px]">
                                  <ButtonTwo onClick={() => handleDelete(item?._id)} text={'Delete'} />
                                </div>
                                <div className="w-[138px]">
                                  <ButtonTwo onClick={() => handleEdit(item?._id)} text={'Edit'} />
                                </div>
                                </>
                              )
                             }
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

export default AdminUsers