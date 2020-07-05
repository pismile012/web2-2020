const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const Banks = require("./models/banks");
const BankBranches = require("./models/bank-branches");
const TransactionStatus = require("./models/transaction-status");
const Accounts = require("./models/accounts");
const StaffTypes = require("./models/staff-types");
const CustomerTypes = require("./models/customer-types");
const Customers = require("./models/customers");
const Staffs = require("./models/staffs");

const Transactions = require("./models/transactions");
const TransactionDetails = require("./models/transaction-details");

const app = express();

const userRoutes = require("./api/routes/users");
const customerRoutes = require("./api/routes/customers");
const staffRoutes = require("./api/routes/staffs");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");

        return res.status(200).json({});
    }

    next();
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/staffs", staffRoutes);

app.get("/", async (req, res) => {
    await TransactionStatus.initialize();
    await StaffTypes.initialize();
    await CustomerTypes.initialize();
    await Banks.initialize();
    await BankBranches.initialize();
    res.status(100).json({
        status: "done"
    });
});

app.use((req, res, next) => {
    const error = new Error("404 - Page not found!");
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`You are listening at port: ${port}`);
});