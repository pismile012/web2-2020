const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const StaffTypes = require("./staff-types");
const Accounts = require("./accounts");

class Staffs extends Model{ }

Staffs.init({
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
        references: {
            key: "id",
            model: StaffTypes
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
    ModelName: "Staffs"
});

module.exports = Staffs;