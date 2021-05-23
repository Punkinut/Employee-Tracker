const connection = require('../config/connection');
const cTable = require('console.table');

// Will print the information
function printInfo (context) {
    return new Promise(resolve => {
        connection.query(`${context}`, (err, res) => {
            if (err) throw err;
            console.table(res);
            resolve();
        })
    })
}
// Will pass the information back to you
function fetchInfo(context) {
    let names = [];
    return new Promise(resolve => {
        connection.query(`${context}`, (err, res) => {
            if (err) throw err;
            res.forEach(({ title }) => {
                names.push(title);
                resolve(names);
            })
        })
    })

}

module.exports = {
    printInfo,
    fetchInfo,
};