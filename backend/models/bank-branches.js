const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Banks = require("./banks");

class BankBranches extends Model{ 
    static async initialize() {
        await BankBranches.create({
            id: 1,
            name: "Chi nhánh Gò Vấp",
            bankId: 1
        })
        .catch((err) => {
            console.log("Initialized bank branches");
        });

        await BankBranches.create({
            id: 2,
            name: "Chi nhánh quận 1",
            bankId: 1
        })
        .catch((err) => {
            console.log("Initialized bank branches");
        });

        await BankBranches.create({
            id: 3,
            name: "Chi nhánh quận 2",
            bankId: 1
        })
        .catch((err) => {
            console.log("Initialized bank branches");
        });

        await BankBranches.create({
            id: 4,
            name: "Chi nhánh Gò Vấp",
            bankId: 2
        })
        .catch((err) => {
            console.log("Initialized bank branches");
        });

        await BankBranches.create({
            id: 5,
            name: "Chi nhánh quận 1",
            bankId: 2
        })
        .catch((err) => {
            console.log("Initialized bank branches");
        });

        await BankBranches.create({
            id: 6,
            name: "Chi nhánh quận 2",
            bankId: 2
        })
        .catch((err) => {
            console.log("Initialized bank branches");
        });
    }
}

BankBranches.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false
    },
    bankId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            key: "id",
            model: Banks
        }
    }
},{
    sequelize: db,
    ModelName: "BankBranches"
});


module.exports = BankBranches;