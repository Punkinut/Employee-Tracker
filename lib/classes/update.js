const connection = require('../config/connection');

const updateEx = (where, set, para) => {
    return new Promise(resolve => {
        if (para === 'updateRole') {
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
        } else if (para === 'updateManager') {
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
                    resolve();
                }
            )
        }
    })
};

module.exports = {
    updateEx,
};