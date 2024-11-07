import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'

function Notifications() {
  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          Notifications
        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default Notifications