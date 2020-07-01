const db = require("./db");
const Users = require("./users");
const sequelize = require("sequelize");

const model = sequelize.Model;

class Todos extends model{
    static async initializeTodos(){
        await Todos.create({
            id: "1",
            name: "Ăn sáng",
            note: "Ăn sáng vào lúc 7 a.m",
            userId: "260620"
        })
        .then(() => {
            console.log("Successful Initialize TODO");
        })
        .catch((err) => {
            if(err){
                console.log("ERR: " + err);
                console.log("There are some errors when you initial todo data");
            }
        });

        await Todos.create({
            id: "2",
            name: "Ăn trưa",
            note: "Ăn trưa vào lúc 12 p.m",
            userId: "260620"
        })
        .then(() => {
            console.log("Successful Initialize TODO");
        })
        .catch((err) => {
            if(err){
                console.log("ERR: " + err);
                console.log("There are some errors when you initial todo data");
            }
        });

        await Todos.create({
            id: "3",
            name: "Ăn tối",
            note: "Ăn tối vào lúc 7 p.m",
            userId: "260620"
        })
        .then(() => {
            console.log("Successful Initialize TODO");
        })
        .catch((err) => {
            if(err){
                console.log("ERR: " + err);
                console.log("There are some errors when you initial todo data");
            }
        });
    }
}

Todos.init(
    {
        id: {
            type: sequelize.TEXT,
            primaryKey: true
        },
        name: {
            type: sequelize.TEXT,
            allowNull: false
        },

        isDone: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        },
        deadline: {
            type: sequelize.DATE,
            allowNull: false
        },
        note: {
            type: sequelize.TEXT,
            allowNull: true,
            defaultValue: "Không có ghi chú gì cả"
        },
        userId: {
            type: sequelize.TEXT,
            references: {
                model: Users,
                key: "id"
            },
            primaryKey: true
        }
    },
    {
        sequelize: db,
        ModelName: "Todos"
    }
);

// Todos.belongsTo(Users, {
//     as: 'testAS',
//     foreignKey: 'userId'
// });

module.exports = Todos;