const db = require("./db");
const Types = require("./typesOfUser");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const model = sequelize.Model;

class Users extends model{
    static async initializeUsers(){
        var password = "admin";
        var hashPassword = await bcrypt.hash(password, 10);
        const userA = await Users.create({
            id: "260620",
            username: "admin",
            password: hashPassword,
            displayName: "Admin",
            email: "sangngo01693166366@gmail.com",
            phone: "0393166366",
            type: 2
        })
        .then(console.log("Successful Initialize USER"))
        .catch((err) => {
            if(err){
                console.log("ERROR: " + err);
            } 
        });
    }
}

Users.init(
    {
        id: {
            type: sequelize.TEXT,
            primaryKey: true
        },
        username: {
            type: sequelize.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize.TEXT,
            allowNull: false
        },
        displayName: {
            type: sequelize.TEXT,
            defaultValue: "default name",
            allowNull: true
        },
        email: {
            type: sequelize.TEXT,
            allowNull: true
        },
        phone: {
            type: sequelize.TEXT,
            allowNull: true,
            defaultValue: "Chưa cập nhật số điện thoại"
        },
        token: {
            type: sequelize.TEXT,
            allowNull: true
        },
        type: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Types,
                key: "id"
            }
        }
    },
    {
        sequelize: db, 
        ModelName: "Users"
    }
);

module.exports = Users;