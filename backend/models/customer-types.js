const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class CustomerTypes extends Model{ 
    static async initialize(){
        await CustomerTypes.create({
            id: 1,
            name: "Nội địa"
        })
        .then(console.log("Successfully Initialized!!!"))
        .catch((err) => {
            console.log("Initialized type of customer: " + err);
        });

        await CustomerTypes.create({
            id: 2,
            name: "VISA"
        })
        .then(console.log("Successfully Initialized!!!"))
        .catch((err) => {
            console.log("Initialized type of customer: " + err);
        });
    }
}

CustomerTypes.init({
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
    ModelName: "CustomerTypes"
});

module.exports = CustomerTypes;