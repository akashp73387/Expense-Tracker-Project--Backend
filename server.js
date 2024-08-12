const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnection = require('./databaseConnection/db');
const userRoutes = require('./router/userRoutes');
const expenseRoutes = require('./router/expenseRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
dbConnection();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/expense', expenseRoutes);

app.listen(port, () => {
    console.log("Server is running on port", port);
});