import TransctionHistroyModel from '../../model/TransactionHistroy.js';
import UserModel from '../../model/User.js';

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
                    _id: "$userId", // Group by userId
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