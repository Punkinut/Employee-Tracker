const connection = require('./connection');
const cTable = require('console.table');

class Read {
    constructor(table) {
        this.table = table
    }

    printInfo() {
        connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
            if (err) throw err;
            console.table(res);
            connection.end();
        })
    }
}

module.exports = Read;

// const test = new Read('department');
// test.printInfo();