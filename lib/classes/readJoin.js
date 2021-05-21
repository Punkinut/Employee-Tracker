const connection = require('../config/connection');
const cTable = require('console.table');

// Function that allows you to read all types of data
function printJoin(context) {
    return new Promise(resolve => {
        connection.query(`${context}`, (err, res) => {
            if (err) throw err;
            console.table(res);
            resolve();
        })
    })

}


module.exports = printJoin;

// const test = new Read('department');
// test.printInfo();