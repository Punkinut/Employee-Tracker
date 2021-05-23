const connection = require('../config/connection');
const cTable = require('console.table');

const updateRole = (where, set) => {
    connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
            {
                role_id: set
            },
            {
                first_name: where
            },
        ],
        (err, res) => {
            if (err) throw err;
            console.log('Employee updated...')
        }
    )
};

module.exports = updateRole;