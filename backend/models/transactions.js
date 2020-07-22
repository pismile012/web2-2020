const db = require("./db");
const sequelize = require("sequelize");

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
    }
},{
    sequelize: db,
    ModelName: "Transactions"
});

module.exports = Transactions;