const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const CustomerTypes = require("./customer-types");
const Accounts = require("./accounts");

class Customers extends Model{ }

Customers.init({
    fullName: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    dOB: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    sex: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    phone: {
        type: sequelize.TEXT,
        allowNull: true
    },
    type: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: CustomerTypes
        }
    },
    accountId: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "id",
            model: Accounts
        },
        primaryKey: true
    }
},{
    sequelize: db,
    ModelName: "Customers"
});

module.exports = Customers;