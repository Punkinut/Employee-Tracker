const connection = require('./config/connection');
const cTable = require('console.table');

// Class that allows you to read all types of data
class ReadJoin {
    constructor(table) {
        this.table = table
    }

    printInfo(context) {
        return new Promise(resolve => {
            connection.query(`${context}`, (err, res) => {
                if (err) throw err;
                console.table(res);
                resolve();
            })
        })
    
    }
}

module.exports = ReadJoin;

// const test = new Read('department');
// test.printInfo();