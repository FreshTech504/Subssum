import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'

function Services() {
  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh]">
        <Sidebar />
      </div>

      <div className="relative w-full">
        <TopNav />

        <div className="mt-[100px] px-12">
          Services
        </div>
        
      </div>

      <div className="ml-auto" >
        <Aside />
      </div>

        
    </div>
  )
}

export default Services