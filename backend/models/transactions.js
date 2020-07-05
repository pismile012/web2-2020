const db = require("./db");
const sequelize = require("sequelize");
const BankBranches = require("./bank-branches");
const Banks = require("./banks");
const Model = sequelize.Model;

class Transactions extends Model{ }

Transactions.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    dOT: {
        type: sequelize.DATE,
        allowNull: false
    },
    branchBankId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            key: "id",
            model: BankBranches
        }
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
    ModelName: "Transactions"
});

module.exports = Transactions;