import { useState } from "react"
import Aside from "../Components/Aside"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"
import AdminProfilePage from "../Components/AdminProfilePage"
import ProfileSecurity from "../Components/ProfileSecurity"

function AdminProfile() {
  const tabs = [
    {
      name: 'Edit Profile',
      value: 'editprofile',
    },
    /**
     * 
    {
      name: 'Security',
      value: 'security',
    },
     */
  ]
  const [ tabState, setTabState ] = useState(tabs[0].value)

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px] ">
        <TopNav />

        <div className="mt-[100px] px-12">
          
          <div className="flex items-center gap-6">
            {
              tabs.map((item) => (
                <div onClick={() => setTabState(item?.value)} className={`font-medium text-[16px] p-2 border-b-[3px] cursor-pointer ${tabState === item?.value ? 'text-[#4169E1] border-b-[#4169E1]' : 'text-[#718EBF] border-b-transparent'}`}>
                  {item?.name}
                </div>
              ))
            }
          </div>

          <div className="mt-16">

            {
              tabState === 'editprofile' && (
                <div className="w-full">
                  <AdminProfilePage />
                </div>
              )
            }
            
            {
              tabState === 'security' && (
                <div className="w-full">
                  <ProfileSecurity />
                </div>
              )
            }

          </div>

        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default AdminProfile