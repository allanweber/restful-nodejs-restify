
const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const errorHandler = (error, message, rejectFunction) => {
    console.error(error);
    rejectFunction({ error: message });
};

const categoryModule = require('./categories')({ connection, errorHandler });
// const productsModule = require('./products')({ connection, errorHandler });

module.exports = {
    categories: () => categoryModule
    // products: () => productsModule
};
