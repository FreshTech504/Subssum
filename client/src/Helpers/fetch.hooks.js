import { useEffect, useState } from "react";
import axios from 'axios'

//axios.defaults.baseURL = 'https://subssum-api-1bhd.onrender.com/api/web'
//axios.defaults.baseURL = 'http://localhost:9000/api/web'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

//FETCH ALL DATA PLANS
export function useFetchDataPlans(query){
    const [ dataPlans, setDataPlans] = useState({ isFetchingDataPlans: true, dataPlans: null, dataPlansStatus: null, dataPlansServerError: null, })
    useEffect(() => {
        const fetchDataPlans = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/data/fetAllDataPlans`, {withCredentials: true}) : await axios.get(`/data/fetAllDataPlans/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setDataPlans({ isFetchingDataPlans: false, dataPlans: data, dataPlansStatus: status, dataPlansServerError: null})
                } else{
                    setDataPlans({ isFetchingDataPlans: false, dataPlans: null, dataPlansStatus: status, dataPlansServerError: null})
                }
            } catch (error) {
                setDataPlans({ isFetchingDataPlans: false, dataPlans: null, dataPlansStatus: null, dataPlansServerError: error})
            }
        }
        fetchDataPlans()
    }, [query])

    return dataPlans
}

//FETCH ALL TRANSACTION OF A USER
export function useFetchUserTransaction(query){
    const [ transactionData, setTransactionData ] = useState({ isFetchingUserTransction: true, userTransaction: null, userTransactionStatus: null, userTransactionServerError: null, })
    useEffect(() => {
        const fetchUserTransaction = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/transactions/fetchAllUserTransactions`, {withCredentials: true}) : await axios.get(`/transactions/fetchAUserTransaction/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTransactionData({ isFetchingUserTransction: false, userTransaction: data, userTransactionStatus: status, userTransactionServerError: null})
                } else{
                    setTransactionData({ isFetchingUserTransction: false, userTransaction: null, userTransactionStatus: status, userTransactionServerError: null})
                }
            } catch (error) {
                setTransactionData({ isFetchingUserTransction: false, userTransaction: null, userTransactionStatus: null, userTransactionServerError: error})
            }
        }
        fetchUserTransaction()
    }, [query])

    return transactionData
}

//FETCH ALL CABLETV PLANS
export function useFetchCableTvPlans(query){
    const [ cabletvplan, setCabletvplan] = useState({ isFetchingCableTvPlans: true, cabletvplan: null, cabletvplanStatus: null, cabletvplanServerError: null, })
    useEffect(() => {
        const fetchcabletvPlan = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/cabletv/getAllCableTv`, {withCredentials: true}) : await axios.get(`/cabletv/getAllCableTv/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCabletvplan({ isFetchingCableTvPlans: false, cabletvplan: data, cabletvplanStatus: status, cabletvplanServerError: null})
                } else{
                    setCabletvplan({ isFetchingCableTvPlans: false, cabletvplan: null, cabletvplanStatus: status, cabletvplanServerError: null})
                }
            } catch (error) {
                setCabletvplan({ isFetchingCableTvPlans: false, cabletvplan: null, cabletvplanStatus: null, cabletvplanServerError: error})
            }
        }
        fetchcabletvPlan()
    }, [query])

    return cabletvplan
}

//FETCH ALL TRANSACTION 
export function useFetchTransaction(query){
    const [ transactionData, setTransactionData ] = useState({ isFetchingTransction: true, transaction: null, TransactionStatus: null, TransactionServerError: null, })
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/transactions/fetchAllTransactions`, {withCredentials: true}) : await axios.get(`/transactions/fetchATransaction/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTransactionData({ isFetchingTransction: false, transaction: data, TransactionStatus: status, TransactionServerError: null})
                } else{
                    setTransactionData({ isFetchingTransction: false, transaction: null, TransactionStatus: status, TransactionServerError: null})
                }
            } catch (error) {
                setTransactionData({ isFetchingTransction: false, transaction: null, TransactionStatus: null, TransactionServerError: error})
            }
        }
        fetchTransaction()
    }, [query])

    return transactionData
}

//FETCH ALL USERS
export function useFetchUsers(query){
    const [ userDataInfo, setUserDataInfo ] = useState({ isFetchingUser: true, userData: null, userDataStatus: null, userServerError: null, })
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/user/getAllUsers`, {withCredentials: true}) : await axios.get(`/user/getUser/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setUserDataInfo({ isFetchingUser: false, userData: data, userDataStatus: status, userServerError: null})
                } else{
                    setUserDataInfo({ isFetchingUser: false, userData: null, userDataStatus: status, userServerError: null})
                }
            } catch (error) {
                setUserDataInfo({ isFetchingUser: false, userData: null, userDataStatus: null, userServerError: error})
            }
        }
        fetchUser()
    }, [query])

    return userDataInfo
}

//FETCH ALL DATA PLANS
export function useFetAllDataPlans(query){
    const [ dataPlans, setDataPlans ] = useState({ isFetchingDataPlans: true, dataPlans: null, dataPlansStatus: null, dataPlansServerError: null, })
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/data/adminFetchAllDataPlans`, {withCredentials: true}) : await axios.get(`/data/adminFetchDataPlans/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setDataPlans({ isFetchingDataPlans: false, dataPlans: data, dataPlansStatus: status, dataPlansServerError: null})
                } else{
                    setDataPlans({ isFetchingDataPlans: false, dataPlans: null, dataPlansStatus: status, dataPlansServerError: null})
                }
            } catch (error) {
                setDataPlans({ isFetchingDataPlans: false, dataPlans: null, dataPlansStatus: null, dataPlansServerError: error})
            }
        }
        fetchUser()
    }, [query])

    return dataPlans
}

//FETCH ALL MOBILE NETWORKS
export function useFetAllNetworks(query){
    const [ networkData, setNetworkData ] = useState({ isFetchingNetworkData: true, networkData: null, networkStatus: null, networkServerError: null, })
    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/network/getAllNetwork`, {withCredentials: true}) : await axios.get(`/network/getANetwork/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setNetworkData({ isFetchingNetworkData: false, networkData: data, networkStatus: status, networkServerError: null})
                } else{
                    setNetworkData({ isFetchingNetworkData: false, networkData: null, networkStatus: status, networkServerError: null})
                }
            } catch (error) {
                setNetworkData({ isFetchingNetworkData: false, networkData: null, networkStatus: null, networkServerError: error})
            }
        }
        fetchNetworks()
    }, [query])

    return networkData
}