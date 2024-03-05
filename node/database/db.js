import { Sequelize } from "sequelize";

const db = new Sequelize('database_mern', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;