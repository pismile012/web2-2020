const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class StaffTypes extends Model{ 
    static async initialize(){
        await StaffTypes.create({
            id: 1,
            name: "Nhân viên"
        }).then(console.log("Successfully initialized a type of staff"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a type of staff: " + err);
        });
        await StaffTypes.create({
            id: 2,
            name: "Quản lý"
        }).then(console.log("Successfully initialized a type of staff"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a type of staff: " + err);
        });
    }
}

StaffTypes.init({
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
    ModelName: "StaffTypes"
});

module.exports = StaffTypes;