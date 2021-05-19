const connection = require('./connection');
const cTable = require('console.table');

class CreateDepartment {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
    }

    printInfo() {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: this.name,
                utilized_budget:  this.budget,
            },
            (err, res) => {
            if (err) throw err;
            console.table(res);
            connection.end();
        })
    }
}

module.exports = CreateDepartment;

// const test = new CreateDepartment('Work', 230000);
// test.printInfo();
