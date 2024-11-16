import { useLocation, useNavigate } from "react-router-dom"
import ButtonTwo from "../../../Components/Helpers/ButtonTwo"
import LoadingBtn from "../../../Components/Helpers/LoadingBtn"
import Aside from "../../Components/Aside"
import Sidebar from "../../Components/Sidebar"
import TopNav from "../../Components/TopNav"
import { useEffect, useState } from "react"
import { useFetAllDataPlans, useFetAllNetworks } from "../../../Helpers/fetch.hooks"
import toast from "react-hot-toast"
import { createDataPlans, deleteDataPlan, updateDataPlans } from "../../../Helpers/api"

function NewDataPlan() {
  const navigate = useNavigate()
  const loc = useLocation()
  const pathName = loc.pathname.split('/')[2]

  const [ newPlan, setNewPlan ] = useState( pathName === 'noid' ? true : false )

  const { isFetchingNetworkData, networkData } = useFetAllNetworks()
  const mobileNetworkData = networkData?.data
  const { dataPlans, isFetchingDataPlans } = useFetAllDataPlans( !newPlan ? pathName : '' )
  const dataPlansData = dataPlans?.data
  //console.log('object', dataPlansData)

  const [ formData, setFormData ] = useState({})
  const [ loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNetworkChange = (e) => {
    const value = e.target.value;
    const selectedNetwork = mobileNetworkData?.find(network => network?.code === value);
        setFormData({ ...formData, networkCode: selectedNetwork.code, networkName: selectedNetwork.name });
};

useEffect(() => {console.log('FORM DATA', formData)}, [formData])

  const handleNewDataPlans = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await createDataPlans(formData)
      if(res.success){
        toast.success(res.data)
        navigate('/admin-data')
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateDataPlans = async (e) => {
    console.log('DELETE EDN1')
    e.preventDefault()
    try {
      setFormData({ ...formData, _id: pathName })
      const res = await updateDataPlans(formData)
      if(res.success){
        toast.success(res.data)
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlans = async (e, { id }) => {
    console.log('DELETE EDN2')
    e.preventDefault()
    try {
      const performDelete = window.confirm('Are you sure you want to delete this data plan?')
      if(performDelete){
        setLoading(true)
        const res = await deleteDataPlan({ id })
        if(res.success){
          toast.success(res.data)
          navigate('/admin-data')
        } else {
          toast.error(res.data)
        }
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          <h1 className='text-[26px] font-semibold text-[#1F2937]'>
                { newPlan ? 'Add' : 'Update' } {!newPlan && dataPlansData?.networkName} Data Plan 
          </h1>

          <form onSubmit={newPlan ? handleNewDataPlans : handleUpdateDataPlans} className='flex flex-col gap-6 mt-16'>
                <div className="inputGroup flex items-center justify-between w-full flex-row">
                    <label className="label w-[20%]">Select Network</label>
                    <select id="networkCode" onChange={handleNetworkChange} className="input w-full">
                      <option value="">-- SELECT NETWORK --</option>
                      {
                                    mobileNetworkData?.map((item, idx) => (
                                        <option key={idx} value={item.code}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                    </select>
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Data Code</label>
                    <input type="text" defaultValue={dataPlansData?.dataCode} onChange={handleChange} id='dataCode' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Plan Name</label>
                    <input type="text" defaultValue={dataPlansData?.planName} onChange={handleChange} id='planName' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Cost Price</label>
                    <input type="number" defaultValue={dataPlansData?.costPrice} onChange={handleChange} id='costPrice' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Data Price</label>
                    <input type="number" defaultValue={dataPlansData?.price} onChange={handleChange} id='price' className="input w-full" />
                </div>

                <div className="inputGroup flex items-center w-full flex-row">
                    <label className="label w-[20%]">Data Validity</label>
                    <input type="text" defaultValue={dataPlansData?.validity} onChange={handleChange} id='validity' className="input w-full" />
                </div>

                
                <div className="flex items-center gap-12">
                    {
                        loading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={newPlan ? handleNewDataPlans : handleUpdateDataPlans} text={`${newPlan ? 'Add' : 'Update'}`} />
                        )
                    }

                    {
                      !newPlan && (
                        loading ? (
                          <LoadingBtn />
                      ) : (
                        <ButtonTwo onClick={(e) => handleDeletePlans(e, { id: dataPlansData?._id })} text={`Delete`} />
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

export default NewDataPlan
