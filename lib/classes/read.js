const connection = require('../config/connection');
const cTable = require('console.table');

// Class that allows you to read all types of data
class Read {
    constructor(table) {
        this.table = table
    }

    printInfo(context) {
        return new Promise(resolve => {
            connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
                if (err) throw err;
                console.table(res);
                resolve();
            })
        })
    
    }

    fetchInfo(context) {
        return new Promise(resolve => {
            connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
                if (err) throw err;
                resolve(res);
            })
        })
    
    }
}

module.exports = Read;