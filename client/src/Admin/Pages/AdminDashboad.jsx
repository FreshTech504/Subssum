import Aside from "../Components/Aside"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"

function AdminDashboad() {
  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative ml-[276px]  w-full">
        <TopNav />

        <div className="mt-[100px] px-12">
          <div className="bg-red-200">
          DashBoard

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