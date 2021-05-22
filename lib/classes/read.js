const connection = require('../config/connection');
const cTable = require('console.table');

// Class that allows you to read all types of data
class Read {
    constructor(table) {
        this.table = table
    }

    // Will print the information
    printInfo(context) {
        return new Promise(resolve => {
            connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
                if (err) throw err;
                console.table(res);
                resolve();
            })
        })
    
    }

    // Will pass the information back to you
    fetchNameInfo() {
        let names = [];
        return new Promise(resolve => {
            connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
                if (err) throw err;
                res.forEach(({ name }) => {
                    names.push(name);
                    resolve(names);
                })
            })
        })
    
    }

    fetchTitleInfo() {
        let names = [];
        return new Promise(resolve => {
            connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
                if (err) throw err;
                res.forEach(({ title }) => {
                    names.push(title);
                    resolve(names);
                })
            })
        })
    }
}

module.exports = Read;