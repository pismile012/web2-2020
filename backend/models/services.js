const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class Services extends Model{ 
    static async initialize(){
        await Services.create({
            id: 1,
            name: "Tài khoản thanh toán"
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });

        await Services.create({
            id: 2,
            name: "Tài khoản tiết kiệm"
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });
    }
}

Services.init({
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
    ModelName: "Services"
});

module.exports = Services;