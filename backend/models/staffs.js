const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

const Accounts = require("./accounts");
const Decentralizations = require("./Decentralizations");

class Staffs extends Model{ }

Staffs.init({
    accountId: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "id",
            model: Accounts
        },
        primaryKey: true
    },
    decentralizationId: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: Decentralizations
        }
    }
},{
    sequelize: db,
    ModelName: "Staffs"
});

module.exports = Staffs;