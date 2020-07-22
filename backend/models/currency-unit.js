const sequelize = require("sequelize");
const Model = sequelize.Model;

const db = require("./db");

class CurrencyUnits extends Model{
    static async initialize() {
        await CurrencyUnits.create({
            id: 1,
            name: "VND"
        })
        .then(console.log("Successfully Initialized a currency unit"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a currency unit: " + err);
        });

        await CurrencyUnits.create({
            id: 2,
            name: "$"
        })
        .then(console.log("Successfully Initialized a currency unit"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a currency unit: " + err);
        });
    }
}

CurrencyUnits.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: "CurrencyUnits"
});

module.exports = CurrencyUnits;
