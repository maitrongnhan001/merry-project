const mysql = require('mysql');

const connection =mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

let connect = () => {
    connection.connect((error) => {
        if (error) {
            console.log('database connection is failed, exiting now...');
            console.log(error);
            process.exit(1);
        }

        console.log('Successfull connected to database');
    });
}

module.exports = {
    connect,
    connection
}