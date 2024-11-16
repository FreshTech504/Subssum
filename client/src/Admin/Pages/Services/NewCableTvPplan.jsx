import { useLocation, useNavigate } from "react-router-dom"
import Aside from "../../Components/Aside"
import Sidebar from "../../Components/Sidebar"
import TopNav from "../../Components/TopNav"
import { useFetAllTVProviders, useFetchAdminCableTvPlans } from "../../../Helpers/fetch.hooks"
import { useEffect, useState } from "react"
import LoadingBtn from "../../../Components/Helpers/LoadingBtn"
import ButtonTwo from "../../../Components/Helpers/ButtonTwo"
import { createCableTvPlan, deleteCableTvPlan, updateCableTvPlan } from "../../../Helpers/api"
import toast from "react-hot-toast"

function NewCableTvPplan() {
  const navigate = useNavigate()
  const loc = useLocation()
  const pathName = loc.pathname.split('/')[2]

  const [ newPlan, setNewPlan ] = useState( pathName === 'noid' ? true : false )

  const { cabletvplan, isFetchingCableTvPlans } = useFetchAdminCableTvPlans( !newPlan ? pathName : '' );
  const tvPlanData = cabletvplan?.data;

  //fetch providers
  const { isFetchingTvProviderData, tvProviderDataData } = useFetAllTVProviders();
  const TvServicesData = tvProviderDataData?.data;

  const [ formData, setFormData ] = useState({ _id: !newPlan ? pathName : '' })
  const [ loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProvidersChange = (e) => {
    const value = e.target.value;
    const selectedProvider = TvServicesData?.find(provider => provider?.code === value);
        setFormData({ ...formData, platformCode: selectedProvider.code, platformName: selectedProvider.name });
};

  const handleNewCableTvPlan = async () => {
    try {
      setLoading(true)
      const res = await createCableTvPlan(formData)
      if(res.success){
        toast.success(res.data)
        navigate('/admin-tv-subscription')
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCableTvPlan = async () => {
    setFormData({ ...formData, _id: pathName })
    try {
      setLoading(true)
      const res = await updateCableTvPlan(formData)
      if(res.success){
        toast.success(res.data)
        navigate('/admin-tv-subscription')
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlans = async (id) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this plan')
      if(confirm){
        setLoading(true)
        const res = await deleteCableTvPlan({ id: id })
        if(res.success){
          toast.success(res.data)
          navigate('/admin-tv-subscription')
        } else {
          toast.error(res.data)
        }
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  //useEffect(() => {console.log('object', formData, tvPlanData)}, [formData, tvPlanData])
  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px] ">
        <TopNav />

        <div className="mt-[100px] px-12">
            <h1 className='text-[26px] font-semibold text-[#1F2937]'>
                { newPlan ? 'Add new' : 'Update' } {!newPlan && tvPlanData?.platformName} Cable Tv Plan 
          </h1>

          <form className="flex flex-col gap-6 mt-16">
            <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">Select Network</label>
                    <select id="networkCode" onChange={handleProvidersChange} className="input w-full">
                      <option value="">-- SELECT PROVIDER --</option>
                      {
                                    TvServicesData?.map((item, idx) => (
                                        <option key={idx} value={item.code}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                    </select>
                </div>
                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Plan Name</label>
                    <input type="text" defaultValue={tvPlanData?.planName} onChange={handleChange} id='planName' className="input w-full" />
                </div>
                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Plan ID</label>
                    <input type="text" defaultValue={tvPlanData?.planId} onChange={handleChange} id='planId' className="input w-full" />
                </div>
                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Cost Price</label>
                    <input type="number" defaultValue={tvPlanData?.costPrice} onChange={handleChange} id='costPrice' className="input w-full" />
                </div>
                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Price</label>
                    <input type="number" defaultValue={tvPlanData?.price} onChange={handleChange} id='price' className="input w-full" />
                </div>

                <div className="flex items-center gap-12">
                    {
                        loading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={newPlan ? handleNewCableTvPlan : handleUpdateCableTvPlan } text={`${newPlan ? 'Add' : 'Update'}`} />
                        )
                    }

                    {
                      !newPlan && (
                        loading ? (
                          <LoadingBtn />
                      ) : (
                        <ButtonTwo onClick={() => handleDeletePlans(tvPlanData?._id)} text={`Delete`} />
                      )
                      )
                    }

                </div>

          </form>
        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default NewCableTvPplan
