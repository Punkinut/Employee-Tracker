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
            connection.end();
        })
    }
}

class CreateRole {
    constructor(title, salary, id) {
        this.title = title;
        this.salary = salary;
        this.id = id;
    }

    printInfo() {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: this.title,
                salary:  this.salary,
                department_id: this.id,
            },
            (err, res) => {
            if (err) throw err;
            connection.end();
        })
    }
}

class CreateEmployee {
    constructor(first, last, roleId, managerId) {
        this.first = first;
        this.last = last;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    printInfo() {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: this.first,
                last_name:  this.last,
                role_id: this.roleId,
                manager_id: this.managerId,
            },
            (err, res) => {
            if (err) throw err;
            connection.end();
        })
    }
}

module.exports = {
    CreateDepartment,
    CreateRole,
    CreateEmployee,
};

// const test = new CreateDepartment('Work', 230000);
// test.printInfo();

// const test = new CreateRole('Manager', 324.000, 3)
// test.printInfo();

// const test = new CreateEmployee('Tim', 'Cook', 3, 7)
// test.printInfo();