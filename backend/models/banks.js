const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class Banks extends Model{ 
    static async initialize(){
        await Banks.create({
            id: 1,
            name: "Ngân Hàng Á Châu ACB",
            interest: 7.0
        })
        .then(() => {
            console.log("Successfully initialized banks");
        })
        .catch((err) => {
            console.log("Something went wrong when you initialize banks: " + err);
        });

        await Banks.create({
            id: 2,
            name: "Ngân Hàng Sacombank",
            interest: 6.5
        })
        .then(() => {
            console.log("Successfully initialized banks");
        })
        .catch((err) => {
            console.log("Something went wrong when you initialize banks: " + err);
        });
    }

}

Banks.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false
    },
    interest: {
        type: sequelize.FLOAT,
        allowNull: false
    }
},{
    sequelize: db,
    ModelName: "Banks"
});

module.exports = Banks;