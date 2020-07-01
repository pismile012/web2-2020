const db = require("./db");
const sequelize = require("sequelize");

const model = sequelize.Model;

class Types extends model{
    static async initializeTypes(){
        await Types.create({
            id: 1,
            name: "Guess"
        })
        .then(console.log("Successful Initialize TYPE"))
        .catch((err) => {
            if(err){
                console.log("ERROR: " + err);
            } 
        });

        await Types.create({
            id: 2,
            name: "Staff"
        })
        .then(console.log("Successful Initialize TYPE"))
        .catch((err) => {
            if(err){
                console.log("ERROR: " + err);
            } 
        });
    }
}

Types.init(
    {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: sequelize.TEXT,
            allowNull: false
        }
    },
    {
        sequelize: db, 
        ModelName: "Types"
    }
);

module.exports = Types;