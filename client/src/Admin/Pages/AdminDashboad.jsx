import Aside from "../Components/Aside"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"

function AdminDashboad() {
  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh]">
        <Sidebar />
      </div>

      <div className="relative w-full">
        <TopNav />

        <div className="mt-[100px] px-12">
          <div className="bg-red-200">
          DashBoard

          </div>
        </div>
        
      </div>

      <div className="ml-auto" >
        <Aside />
      </div>

        
    </div>
  )
}

export default AdminDashboad