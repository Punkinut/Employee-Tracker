const connection = require('../config/connection');

const deleteItem = (context) => {
    return new Promise(resolve => {
        connection.query(`${context}`, (err, res) => {
            if (err) throw err;
            console.log('Data has been deleted...')
            resolve();
        })
    })
};

module.exports = deleteItem;

