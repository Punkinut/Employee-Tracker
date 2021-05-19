const connection = require('./connection');
const cTable = require('console.table');

class Read {
    constructor(item) {
        this.item = item
    }

    printInfo() {
        connection.query(`SELECT * FROM ${this.item}`, (err, res) => {
            if (err) throw err;
            console.table(res);
            connection.end();
        })
    }
}

module.exports = Read;

// const test = new Read('department');
// test.printInfo();