const connection = require('../config/connection');

const updateRole = (where, set) => {
    return new Promise(resolve => {
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
                resolve();
            }
        )
    })
    
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