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

//FETCH ALL TV PROVIDERS
export function useFetAllTVProviders(query){
    const [ networkData, setNetworkData ] = useState({ isFetchingTvProviderData: true, tvProviderDataData: null, tvProviderStatusStatus: null, TvProviderServerError: null, })
    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/cabletv/getTVProvider`, {withCredentials: true}) : await axios.get(`/cabletv/getATVProvider/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setNetworkData({ isFetchingTvProviderData: false, tvProviderDataData: data, tvProviderStatusStatus: status, TvProviderServerError: null})
                } else{
                    setNetworkData({ isFetchingTvProviderData: false, tvProviderDataData: null, tvProviderStatusStatus: status, TvProviderServerError: null})
                }
            } catch (error) {
                setNetworkData({ isFetchingTvProviderData: false, tvProviderDataData: null, tvProviderStatusStatus: null, TvProviderServerError: error})
            }
        }
        fetchNetworks()
    }, [query])

    return networkData
}

//FETCH ALL CABLETV PLANS
export function useFetchAdminCableTvPlans(query){
    const [ cabletvplan, setCabletvplan] = useState({ isFetchingCableTvPlans: true, cabletvplan: null, cabletvplanStatus: null, cabletvplanServerError: null, })
    useEffect(() => {
        const fetchcabletvPlan = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/cabletv/getAdminAllCableTv`, {withCredentials: true}) : await axios.get(`/cabletv/getAdminACableTv/${query}`, {withCredentials: true})
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

//FETCH ALL ELECTRIC PROVIDERS
export function useFetAllElectricProviders(query){
    const [ electricProviderData, setElectricProviderData ] = useState({ isFetchingElectricProviderData: true, electricProviderData: null, electricProviderStatusStatus: null, electricProviderServerError: null, })
    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/electric/getAllElectricProvider`, {withCredentials: true}) : await axios.get(`/electric/getAElectricProvider/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setElectricProviderData({ isFetchingElectricProviderData: false, electricProviderData: data, electricProviderStatusStatus: status, electricProviderServerError: null})
                } else{
                    setElectricProviderData({ isFetchingElectricProviderData: false, electricProviderData: null, electricProviderStatusStatus: status, electricProviderServerError: null})
                }
            } catch (error) {
                setElectricProviderData({ isFetchingElectricProviderData: false, electricProviderData: null, electricProviderStatusStatus: null, electricProviderServerError: error})
            }
        }
        fetchNetworks()
    }, [query])

    return electricProviderData
}

//FETCH ALL AIRTIME TO CASH TRANSACIONS
export function useFetAllAirtimeToCash(query){
    const [ airtimeToCashData, setAirtimeToCashData ] = useState({ isFetchingTransactionData: true, transactionData: null, transactionDataStatus: null, transactionDataServerError: null, })
    useEffect(() => {
        const fetchAirtimeToCashTransaction = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/airtimeToCash/getAllTransactions`, {withCredentials: true}) : await axios.get(`/airtimeToCash/getATransaction/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setAirtimeToCashData({ isFetchingTransactionData: false, transactionData: data, transactionDataStatus: status, transactionDataServerError: null})
                } else{
                    setAirtimeToCashData({ isFetchingTransactionData: false, transactionData: null, transactionDataStatus: status, transactionDataServerError: null})
                }
            } catch (error) {
                setAirtimeToCashData({ isFetchingTransactionData: false, transactionData: null, transactionDataStatus: null, transactionDataServerError: error})
            }
        }
        fetchAirtimeToCashTransaction()
    }, [query])

    return airtimeToCashData
}

//FETCH ALL PAYOUT TRANSACTION
export function useFetAllpayoutRequest(query){
    const [ payoutRequestData, setPayoutRequestData ] = useState({ isFetchingPayoutRequest: true, payoutrequestData: null, payoutRequestStatus: null, payoutRequestServerError: null, })
    useEffect(() => {
        const fetchPayoutRequestData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/user/getAllPayoutRequest`, {withCredentials: true}) : await axios.get(`/user/getAPayoutRequest/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setPayoutRequestData({ isFetchingPayoutRequest: false, payoutrequestData: data, payoutRequestStatus: status, payoutRequestServerError: null})
                } else{
                    setPayoutRequestData({ isFetchingPayoutRequest: false, payoutrequestData: null, payoutRequestStatus: status, payoutRequestServerError: null})
                }
            } catch (error) {
                setPayoutRequestData({ isFetchingPayoutRequest: false, payoutrequestData: null, payoutRequestStatus: null, payoutRequestServerError: error})
            }
        }
        fetchPayoutRequestData()
    }, [query])

    return payoutRequestData
}

//FETCH SALES ANALYSIS
export function useFetchSalesAnalysis(query) {
    const [salesData, setSalesData] = useState({
        isFetchingSalesData: true,
        salesData: null,
        salesDataStatus: null,
        salesDataServerError: null,
    });

    const fetchSalesData = async () => {
        setSalesData((prev) => ({ ...prev, isFetchingSalesData: true }));
        try {
            const { data, status } = await axios.get(`/statistics/salesAnalysis/${query}`, { withCredentials: true });
            if (status === 200) {
                setSalesData({ isFetchingSalesData: false, salesData: data, salesDataStatus: status, salesDataServerError: null });
            } else {
                setSalesData({ isFetchingSalesData: false, salesData: null, salesDataStatus: status, salesDataServerError: null });
            }
        } catch (error) {
            setSalesData({ isFetchingSalesData: false, salesData: null, salesDataStatus: null, salesDataServerError: error });
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, [query]);

    return { ...salesData, refetchSalesData: fetchSalesData };
}

//FETCH SITES SETTINGS
export function useFetchSiteSettings(query){
    const [ siteSettingsData, setSiteSettingsData ] = useState({ isFetchSiteSettingsData: true, siteSettingsData: null, siteSettingsStatus: null, siteSettingsServerError: null, })
    useEffect(() => {
        const fetchSiteSettings = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/admin/getSiteSettings`, {withCredentials: true}) : await axios.get(`/admin/getSiteSettings/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setSiteSettingsData({ isFetchSiteSettingsData: false, siteSettingsData: data, siteSettingsStatus: status, siteSettingsServerError: null})
                } else{
                    setSiteSettingsData({ isFetchSiteSettingsData: false, siteSettingsData: null, siteSettingsStatus: status, siteSettingsServerError: null})
                }
            } catch (error) {
                setSiteSettingsData({ isFetchSiteSettingsData: false, siteSettingsData: null, siteSettingsStatus: null, siteSettingsServerError: error})
            }
        }
        fetchSiteSettings()
    }, [query])

    return siteSettingsData
}

//FETCH NOTIFICATION
export function useFetchNotification(query){
    const [ notificationData, setNotificationData ] = useState({ isFetchingNotifications: true, notificationsData: null, notificationStatus: null, notificationServerError: null, })
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/notification/getAllNotification`, {withCredentials: true}) : await axios.get(`/notification/getANotification/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setNotificationData({ isFetchingNotifications: false, notificationsData: data, notificationStatus: status, notificationServerError: null})
                } else{
                    setNotificationData({ isFetchingNotifications: false, notificationsData: null, notificationStatus: status, notificationServerError: null})
                }
            } catch (error) {
                setNotificationData({ isFetchingNotifications: false, notificationsData: null, notificationStatus: null, notificationServerError: error})
            }
        }
        fetchNotifications()
    }, [query])

    return notificationData
}

//FETCH USER NOTIFICATION
export function useFetchUserNotification(query){
    const [ notificationData, setNotificationData ] = useState({ isFetchingNotifications: true, notificationsData: null, notificationStatus: null, notificationServerError: null, })
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/notification/getAllUserNotification`, {withCredentials: true}) : await axios.get(`/notification/getAllUserNotification/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setNotificationData({ isFetchingNotifications: false, notificationsData: data, notificationStatus: status, notificationServerError: null})
                } else{
                    setNotificationData({ isFetchingNotifications: false, notificationsData: null, notificationStatus: status, notificationServerError: null})
                }
            } catch (error) {
                setNotificationData({ isFetchingNotifications: false, notificationsData: null, notificationStatus: null, notificationServerError: error})
            }
        }
        fetchNotifications()
    }, [query])

    return notificationData
}

//FETCH ADMIN NOTIFICATION
export function useFetchAdminNotification(query){
    const [ notificationData, setNotificationData ] = useState({ isFetchingNotifications: true, notificationsData: null, notificationStatus: null, notificationServerError: null, })
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/notification/getAllAdminNotification`, {withCredentials: true}) : await axios.get(`/notification/getAllAdminNotification/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setNotificationData({ isFetchingNotifications: false, notificationsData: data, notificationStatus: status, notificationServerError: null})
                } else{
                    setNotificationData({ isFetchingNotifications: false, notificationsData: null, notificationStatus: status, notificationServerError: null})
                }
            } catch (error) {
                setNotificationData({ isFetchingNotifications: false, notificationsData: null, notificationStatus: null, notificationServerError: error})
            }
        }
        fetchNotifications()
    }, [query])

    return notificationData
}

//FETCH ADMIN
export function useFetchAdminData(query){
    const [ adminData, setAdminData ] = useState({ isFetchingAdminData: true, adminData: null, adminStatus: null, adminServerError: null, })
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/admin/getAllAdmin`, {withCredentials: true}) : await axios.get(`/admin/getAdmin/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setAdminData({ isFetchingAdminData: false, adminData: data, adminStatus: status, adminServerError: null})
                } else{
                    setAdminData({ isFetchingAdminData: false, adminData: null, adminStatus: status, adminServerError: null})
                }
            } catch (error) {
                setAdminData({ isFetchingAdminData: false, adminData: null, adminStatus: null, adminServerError: error})
            }
        }
        fetchAdminData()
    }, [query])

    return adminData
}

//FETCH ADMIN NOTIFICATION
export function useFetchActivities(query){
    const [ activitiesData, setActivitiesData ] = useState({ isFetchingActivities: true, activitiesData: null, activitiesStatus: null, activitiesServerError: null, })
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/admin/getAllActivities`, {withCredentials: true}) : await axios.get(`/admin/getAllActivities/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setActivitiesData({ isFetchingActivities: false, activitiesData: data, activitiesStatus: status, activitiesServerError: null})
                } else{
                    setActivitiesData({ isFetchingActivities: false, activitiesData: null, activitiesStatus: status, activitiesServerError: null})
                }
            } catch (error) {
                setActivitiesData({ isFetchingActivities: false, activitiesData: null, activitiesStatus: null, activitiesServerError: error})
            }
        }
        fetchActivities()
    }, [query])

    return activitiesData
}

//FETCH WEB STATISTICS
export function useFetchWebStatistics(query){
    const [ webStatisticsData, setWebStatisticsData ] = useState({ isFetchingWebStatistic: true, webStatisticsData: null, webStatisticsStatus: null, webStatisticsError: null, })
    useEffect(() => {
        const fetchWebStatistics = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/statistics/websiteStatistics`, {withCredentials: true}) : await axios.get(`/statistics/websiteStatistics/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setWebStatisticsData({ isFetchingWebStatistic: false, webStatisticsData: data, webStatisticsStatus: status, webStatisticsError: null})
                } else{
                    setWebStatisticsData({ isFetchingWebStatistic: false, webStatisticsData: null, webStatisticsStatus: status, webStatisticsError: null})
                }
            } catch (error) {
                setWebStatisticsData({ isFetchingWebStatistic: false, webStatisticsData: null, webStatisticsStatus: null, webStatisticsError: error})
            }
        }
        fetchWebStatistics()
    }, [query])

    return webStatisticsData
}

//FETCH SERVICES STATISTICS
export function useFetchServicesStatistics(query){
    const [ webServicesData, setWebServicesData ] = useState({ isFetchingWebServices: true, webServicesData: null, webServicesStatus: null, webServicesError: null, })
    useEffect(() => {
        const fetchWebServices = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/statistics/servicesStatistics`, {withCredentials: true}) : await axios.get(`/statistics/servicesStatistics/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setWebServicesData({ isFetchingWebServices: false, webServicesData: data, webServicesStatus: status, webServicesError: null})
                } else{
                    setWebServicesData({ isFetchingWebServices: false, webServicesData: null, webServicesStatus: status, webServicesError: null})
                }
            } catch (error) {
                setWebServicesData({ isFetchingWebServices: false, webServicesData: null, webServicesStatus: null, webServicesError: error})
            }
        }
        fetchWebServices()
    }, [query])

    return webServicesData
}

//FETCH REPORTED TRANSACTIONS
export function useFetchReportedTransactions(query){
    const [ reportedTransactionsData, setTeportedTransactionsData ] = useState({ isFetchingReportedTransactions: true, reportedTransactionsData: null, reportedTransactionsStatus: null, reportedTransactionsServerError: null, })
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/transactions/fetchAllReportTransaction`, {withCredentials: true}) : await axios.get(`/transactions/fetchAReportTransaction/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTeportedTransactionsData({ isFetchingReportedTransactions: false, reportedTransactionsData: data, reportedTransactionsStatus: status, reportedTransactionsServerError: null})
                } else{
                    setTeportedTransactionsData({ isFetchingReportedTransactions: false, reportedTransactionsData: null, reportedTransactionsStatus: status, reportedTransactionsServerError: null})
                }
            } catch (error) {
                setTeportedTransactionsData({ isFetchingReportedTransactions: false, reportedTransactionsData: null, reportedTransactionsStatus: null, reportedTransactionsServerError: error})
            }
        }
        fetchActivities()
    }, [query])

    return reportedTransactionsData
}