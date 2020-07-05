const db = require("./db");
const sequelize = require("sequelize");
const BankBranches = require("./bank-branches");
const Model = sequelize.Model;

class Accounts extends Model{ }

Accounts.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    username: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    },
    verifyToken: {
        type: sequelize.TEXT,
        allowNull: true
    },
    isBlocked: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    bankBranchId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            key: "id",
            model: BankBranches
        },
        defaultValue: 1
    }
},{
    sequelize: db,
    ModelName: "Accounts"
});

module.exports = Accounts;