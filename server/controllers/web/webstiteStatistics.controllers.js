import TransctionHistroyModel from '../../model/TransactionHistroy.js';
import UserModel from '../../model/User.js';
import { startOfDay, subDays } from 'date-fns';

export async function websiteStatistics(req, res) {
    try {
        // Get current month users
        const currentMonthUsers = await UserModel.find({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
            }
        });

        // Get last month users
        const lastMonthStartDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        const lastMonthEndDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const lastMonthUsers = await UserModel.find({
            createdAt: {
                $gte: lastMonthStartDate,
                $lt: lastMonthEndDate
            }
        });

        // Calculate percentage increase
        const currentMonthCount = currentMonthUsers.length;
        const lastMonthCount = lastMonthUsers.length;
        let percentageIncrease = 0;
        
        if (lastMonthCount > 0) {
            percentageIncrease = ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;
        }

        //Total User
        const allUsers = await UserModel.find()
        
        //Total Active User
        const allActiveUsers = await UserModel.find({ verified: true, blocked: false })

        //get total sales within the last 24hrs
        // Get the current date and time
        const now = new Date();
        // Get the date and time 24 hours ago
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Fetch transactions within the last 24 hours excluding those with slug "Funding"
        const transactions = await TransctionHistroyModel.find({
            createdAt: {
                $gte: yesterday,
                $lte: now
            },
            slug: { $ne: 'Funding' } // Exclude transactions with slug "Funding"
        });

        // Sum the totalAmount of the filtered transactions
        const totalSales = transactions.reduce((sum, transaction) => sum + transaction.totalAmount, 0);

        const result = {
            totalUsers: allUsers?.length,
            percentageIncrease: percentageIncrease.toFixed(2),
            activeUsers: allActiveUsers?.length,
            last24HrsSales: totalSales.toFixed(2),
            currentMonthUsers: currentMonthCount,
            lastMonthUsers: lastMonthCount,
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching website statistics:', error);
        res.status(500).json({ success: false, data: 'Unable to fetch data' });
    }
}

export async function getUserWithHighestTransactions(slug) {
    try {
        // Get the current date and the date 30 days ago
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Use aggregation to find the user with the highest number of transactions for the given slug
        const result = await TransctionHistroyModel.aggregate([
            {
                $match: {
                    slug: slug, 
                    createdAt: {
                        $gte: thirtyDaysAgo,
                        $lte: now
                    }
                }
            },
            {
                $group: {
                    _id: "$email", // Group by userId
                    transactionCount: { $sum: 1 } // Count transactions
                }
            },
            {
                $sort: { transactionCount: -1 } // Sort by transaction count descending
            },
            {
                $limit: 1 // Get the user with the highest count
            }
        ]);

        return result.length > 0 ? result[0] : 'No User'; 
    } catch (error) {
        console.error('Error fetching user with highest transactions:', error);
        throw new Error('Unable to process request');
    }
}

export async function servicesStatistics(req, res) {
    try {
        //user with the highest number of data transactions in the last 30 days
        const dataPurchase = await getUserWithHighestTransactions('Data');

        //user with the highest number of airtime transactions in the last 30 days
        const airtimePurchase = await getUserWithHighestTransactions('Airtime');

        //user with the highest number of cable tv transactions in the last 30 days
        const tvPurchase = await getUserWithHighestTransactions('CableTv');


        //user with the highest number of data transactions in the last 30 days
        const airtime2cashPurchase = await getUserWithHighestTransactions('AirtimeToCash');
        
        const result = {
            dataPurchase,
            airtimePurchase,
            tvPurchase,
            airtime2cashPurchase
        }

        res.status(200).json({ success: false, data: result })
    } catch (error) {
        console.log('UNABLE TO GET SERVICE STATISTICS', error)
        res.status(500).json({ success: false, data: 'Unable to process request' })
    }
}

export async function getServicesSalesReport(req, res) {
    try {
        
    } catch (error) {
        console.log('UNABLE TO GET ALL SERVICES SALES REPORT', error)
        res.status(500).json({ success: false, data: 'Unable to get all services sales report' })
    }
}

/**
 * 
export async function salesAnalysis(req, res) {
    const { period } = req.params;
  
    let dateLimit;
    switch (period) {
      case '24hrs':
        dateLimit = subDays(new Date(), 1);
        break;
      case '3days':
        dateLimit = subDays(new Date(), 3);
        break;
      case '7days':
        dateLimit = subDays(new Date(), 7);
        break;
      case '30days':
        dateLimit = subDays(new Date(), 30);
        break;
      case '60days':
        dateLimit = subDays(new Date(), 60);
        break;
      default:
        dateLimit = null;
    }
  
    try {
      const matchConditions = {
        createdAt: { $gte: dateLimit },
        slug: { $ne: 'Funding' }
      };
  
      // Aggregation pipeline
      const salesData = await TransctionHistroyModel.aggregate([
        { $match: matchConditions },
        {
          $group: {
            _id: null,
            totalSales: { $sum: 1 },
            totalSalesValue: { $sum: '$totalAmount' },
            totalProfits: { $sum: '$income' }
          }
        }
      ]);


      const data = salesData[0]
      console.log('object', data)
  
      res.status(200).json({ success: true, data: data || {} });
    } catch (error) {
      console.log('UNABLE TO GET SALES ANALYTICS', error);
      res.status(500).json({ success: false, message: 'Unable to get sales analysis' });
    }
  }
 */

  export async function salesAnalysis(req, res) {
    const { period } = req.params;
  
    let dateLimit;
    switch (period) {
      case '24hrs':
        dateLimit = subDays(new Date(), 1);
        break;
      case '3days':
        dateLimit = subDays(new Date(), 3);
        break;
      case '7days':
        dateLimit = subDays(new Date(), 7);
        break;
      case '30days':
        dateLimit = subDays(new Date(), 30);
        break;
      case '60days':
        dateLimit = subDays(new Date(), 60);
        break;
      default:
        dateLimit = null;
    }
  
    try {
      const matchConditions = {
        createdAt: { $gte: dateLimit },
        slug: { $ne: 'Funding' }
      };
  
      // Aggregation pipeline
      const salesData = await TransctionHistroyModel.aggregate([
        { $match: matchConditions },
        {
          $facet: {
            totalMetrics: [
              {
                $group: {
                  _id: null,
                  totalSales: { $sum: 1 },
                  totalSalesValue: { $sum: '$totalAmount' },
                  totalProfits: { $sum: '$income' }
                }
              }
            ],
            successfulTransactions: [
              {
                $match: { status: { $regex: '^successful$', $options: 'i' } } // case-insensitive
              },
              {
                $count: 'totalSuccessfulTransactions'
              }
            ],
            airtimeSales: [
              { $match: { slug: 'Airtime' } },
              {
                $group: {
                  _id: null,
                  totalAirtimeSales: { $sum: '$totalAmount' },
                  totalAirtimeProfit: { $sum: '$income' },
                  totalAirtimeSalesNumber: { $sum: 1 }
                }
              }
            ],
            dataSales: [
              { $match: { slug: 'Data' } },
              {
                $group: {
                  _id: null,
                  totalDataSales: { $sum: `$totalAmount` },
                  totalDataProfit: { $sum: '$income' },
                  totalDataSalesNumber: { $sum: 1 }
                }
              }
            ],
            cableTvSales: [
              { $match: { slug: 'CableTv' } },
              {
                $group: {
                  _id: null,
                  totalCableTvSales: { $sum: `$totalAmount` },
                  totalCableTvProfit: { $sum: '$income' },
                  totalCableTvSalesNumber: { $sum: 1 }
                }
              }
            ],
            electricitySales: [
              { $match: { slug: 'Electricity' } },
              {
                $group: {
                  _id: null,
                  totalElectricitySales: { $sum: `$totalAmount` },
                  totalElectricityProfit: { $sum: '$income' },
                  totalElectricitySalesNumber: { $sum: 1 }
                }
              }
            ],
            airtimeToCashSales: [
              { $match: { slug: 'AirtimeToCash' } },
              {
                $group: {
                  _id: null,
                  totalAirtimeToCashSales: { $sum: `$totalAmount` },
                  totalAirtimeToCashProfit: { $sum: '$income' },
                  totalAirtimeToCashSalesNumber: { $sum: 1 }
                }
              }
            ]
          }
        },
        {
          $project: {
            totalSales: { $arrayElemAt: ["$totalMetrics.totalSales", 0] },
            totalSalesValue: { $arrayElemAt: ["$totalMetrics.totalSalesValue", 0] },
            totalProfits: { $arrayElemAt: ["$totalMetrics.totalProfits", 0] },
            totalSuccessfulTransactions: { $arrayElemAt: ["$successfulTransactions.totalSuccessfulTransactions", 0] },
            
            totalAirtimeSales: { $arrayElemAt: ["$airtimeSales.totalAirtimeSales", 0] },
            totalAirtimeProfit: { $arrayElemAt: ["$airtimeSales.totalAirtimeProfit", 0] },
            totalAirtimeSalesNumber: { $arrayElemAt: ["$airtimeSales.totalAirtimeSalesNumber", 0] },

            totalDataSales: { $arrayElemAt: ["$dataSales.totalDataSales", 0] },
            totalDataProfit: { $arrayElemAt: ["$dataSales.totalDataProfit", 0] },
            totalDataSalesNumber: { $arrayElemAt: ["$dataSales.totalDataSalesNumber", 0] },
            
            totalCableTvSales: { $arrayElemAt: ["$cableTvSales.totalCableTvSales", 0] },
            totalCableTvProfit: { $arrayElemAt: ["$cableTvSales.totalCableTvProfit", 0] },
            totalCableTvSalesNumber: { $arrayElemAt: ["$cableTvSales.totalCableTvSalesNumber", 0] },
            
            totalElectricitySales: { $arrayElemAt: ["$electricitySales.totalElectricitySales", 0] },
            totalElectricityProfit: { $arrayElemAt: ["$electricitySales.totalElectricityProfit", 0] },
            totalElectricitySalesNumber: { $arrayElemAt: ["$electricitySales.totalElectricitySalesNumber", 0] },
            
            totalAirtimeToCashSales: { $arrayElemAt: ["$airtimeToCashSales.totalAirtimeToCashSales", 0] },
            totalAirtimeToCashProfit: { $arrayElemAt: ["$airtimeToCashSales.totalAirtimeToCashProfit", 0] },
            totalAirtimeToCashSalesNumber: { $arrayElemAt: ["$airtimeToCashSales.totalAirtimeToCashSalesNumber", 0] }
            
          }
        }
      ]);
  
      const data = salesData[0];
      console.log('Sales Analysis Data:', data);
  
      res.status(200).json({ success: true, data: data || {} });
    } catch (error) {
      console.log('UNABLE TO GET SALES ANALYTICS', error);
      res.status(500).json({ success: false, message: 'Unable to get sales analysis' });
    }
  }
  