const sequelize = require("sequelize");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:Taolatao0@localhost:5432/QLTODO";

const db = new sequelize(connectionString);

db.sync()
.then(console.log("DONE"))
.catch((err) => {
    console.log("ERR: " + err);
});

module.exports = db;