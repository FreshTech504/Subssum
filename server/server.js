import express from "express";
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/web/auth.routes.js';
import userRoute from './routes/web/user.routes.js';
import airtimeToCashRoute from './routes/web/airtimeToCash.routes.js';
import fundingRoutes from './routes/web/funding.routes.js';
import dataRoutes from './routes/web/data.routes.js';
import airtimeRoutes from './routes/web/airtime.routes.js';
import transactionsRoutes from './routes/web/transactions.routes.js';
import cabletvRoutes from './routes/web/cabletv.routes.js'
import electricRoutes from './routes/web/electricity.routes.js'
import quickbuyRoutes from './routes/web/quickbuy.routes.js'





//DOCs
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerJSDocs = YAML.load('./api.yaml');

const app = express();

// Swagger setup
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.NEBOUR_URL,
    process.env.CLIENT_URL2,
    process.env.CLIENT_URL3,
    process.env.SERVER_URL,
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Import DB connection
import './connection/db.js';

// Routes
app.get('/', (req, res) => {
    res.status(200).json('Home GET Request');
});

app.use('/api/web/auth', authRoute);
app.use('/api/web/user', userRoute);
app.use('/api/web/airtimeToCash', airtimeToCashRoute);
app.use('/api/web/funding', fundingRoutes);
app.use('/api/web/data', dataRoutes)
app.use('/api/web/airtime', airtimeRoutes)
app.use('/api/web/transactions', transactionsRoutes)
app.use('/api/web/cabletv', cabletvRoutes)
app.use('/api/web/electric', electricRoutes)
app.use('/api/web/quickbuy', quickbuyRoutes)

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
