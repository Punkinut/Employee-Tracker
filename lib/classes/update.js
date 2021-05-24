const connection = require('../config/connection');

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

const updateManager = (where, set) => {
    connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
            {
                manager_id: set
            },
            {
                first_name: where
            },
        ],
        (err, res) => {
            if (err) throw err;
            console.log('Manager updated...')
        }
    )
}

module.exports = {
    updateRole,
    updateManager,
};