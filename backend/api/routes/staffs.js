const express = require("express");
const Accounts = require("../../models/accounts");
const Staffs = require("../../models/staffs");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.get("/", async (req, res) => {
    const CustomerList = await Staffs.findAll();

    res.status(300).json({
        listOfCustomers: CustomerList
    });
});

router.post("/", async (req, res) => {
    const id = Date.now();
    const username = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const verifyToken = crypto.randomBytes(3).toString('hex').toUpperCase();
    const bankId = req.body.bankId;
    const bankBranchId = req.body.bankBranchId;


    await Accounts.create({
        id,
        username,
        email,
        password,
        verifyToken,
        bankBranchId
    }).then(() => {
        console.log("Successfully created an account!")
    })
    .catch((err) => {
        console.log("Something went wrong when you create an account!");
    });

    
    const fullName = req.body.fullName;
    const dOB = req.body.dOB;
    const sex = req.body.sex;
    const phone = req.body.phone;
    const accountId = id;
    const type = req.body.type;

    await Staffs.create({
        fullName,
        dOB,
        sex,
        phone,
        accountId,
        type
    }).then(() => {
        res.status(202).json({
            message: "Succesfully created a customer"
        });
    })
    .catch((err) => {
        res.status(303).json({
            message: "There are some errors when you create a staff",
            error: err
        });
    });

    
});

module.exports = router;