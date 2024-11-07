import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'

function ViewBlogs() {
  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          ViewBlogs
        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default ViewBlogs