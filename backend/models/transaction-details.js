const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Transactions = require("./transactions");
const Customers = require("./customers");
const TransactionStatus = require("./transaction-status");

class TransactionDetails extends Model{ }

TransactionDetails.init({
    transactionId: {
        type: sequelize.TEXT,
        primaryKey: true,
        references: {
            key: "id",
            model: Transactions
        }
    },
    sender: {
        type: sequelize.TEXT,
        primaryKey: true,
        references: {
            key: "accountId", 
            model: Customers
        }
    },
    receiver: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "accountId", 
            model: Customers
        }
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: "Gửi không có nội dung gì cả!!"
    },
    status: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: TransactionStatus
        }
    }
},{
    sequelize: db,
    ModelName: "TransactionDetails"
});

module.exports = TransactionDetails;