import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'
import LoadingBtn from '../../Components/Helpers/LoadingBtn'
import ButtonTwo from '../../Components/Helpers/ButtonTwo'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { siteSettings } from '../../Helpers/api'
import { useFetchSiteSettings } from '../../Helpers/fetch.hooks'

function SiteSettings() {
  const { isFetchSiteSettingsData, siteSettingsData } = useFetchSiteSettings()
  const settingsData = siteSettingsData?.data[0] || {}

  const [ formData, setFormData ] = useState({})
  const [ loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleUpdateSiteSettings = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await siteSettings(formData)
      if(res.success){
        toast.success(res.data)
      } else {
        toast(res.data)
      }
    } catch (error) {
      
    } finally{
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

          <h1 className='text-[26px] mb-8 font-semibold text-[#1F2937]'>
            Site settings
          </h1>

          <div className="">
            <form onSubmit={ handleUpdateSiteSettings } className='flex flex-col gap-6'>
                <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">Website Name</label>
                    <input type="text" defaultValue={settingsData?.siteName} onChange={handleChange} id='siteName' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Website URL</label>
                    <input type="text" defaultValue={settingsData?.url} onChange={handleChange} id='url' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Electricity charges</label>
                    <input type="number" defaultValue={settingsData?.electricCharges} onChange={handleChange} id='electricCharges' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">referral bonus fee</label>
                    <input type="number" defaultValue={settingsData?.referralBonusFee} onChange={handleChange} id='referralBonusFee' className="input w-full" />
                </div>

                    <div className="flex items-center gap-12">
                        {
                            loading ? (
                                <LoadingBtn />
                            ) : (
                                <ButtonTwo onClick={ handleUpdateSiteSettings } text={`${'Update'}`} />
                            )
                        }
                    </div>

            </form>
          </div>

        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default SiteSettings