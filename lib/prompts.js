const inquirer = require('inquirer');
const connection = require('./config/connection')
const logo = require('asciiart-logo');
const read = require('./classes/read');
const create = require('./classes/create');
const update = require('./classes/update')

// Destruction for seperate files
const {printInfo, fetchInfo } = read;
const { CreateDepartment, CreateRole, CreateEmployee } = create;

// Validation funtion that can be used throughout the prompts
const validation = async (input) => {
    if(input.trim(' ') === '') {
        return 'Please put in an answer'
    }
    return true;
};

// Main prompts that display the main menu
const menuPrompts = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Departments','Add Department', 'View All Roles', 'Add Role', 'View All Employees','Add Employee','Update Employee Role', 'Exit']
            },
        ])
        .then((res) => {
            const { choice } = res;
            // Conditional Statements depending on the user's choice
            switch (choice) {
                case 'View All Departments':
                    printInfo('SELECT * FROM department').then(() => {
                        menuPrompts();
                    });
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'View All Roles':
                    printInfo('SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department ON role.department_id=department.id').then(() => {
                        menuPrompts();
                    })
                    break;
                case 'Add Role':
                    fetchInfo('SELECT department.id, department.name as title, department.utilized_budget FROM department').then((discNames) => {
                        addRole(discNames);
                    })
                    break;
                case 'View All Employees':
                    printInfo('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee manager ON employee.manager_id=manager.id').then(() => {
                        menuPrompts();
                    })
                    break;
                case 'Add Employee':
                    fetchInfo('SELECT * FROM role').then((discNames) => {
                        addEmployee(discNames);
                    })
                    break;
                case 'Update Employee Role':
                    console.log('UPDATE');
                    break;
                case 'Exit':
                    console.log('Exiting...')
                    connection.end();
                    break;
            }
        })
};

const updateEmployeeRole = (employee, role) => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which employee do you want to update?',
                name: 'employee',
                choices: [...employee]
            },
            {
                type: 'list',
                message: 'Which role do you wish for them to have',
                name: 'role',
                choices: [...role]
            },
        ])
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What would you like to name this department?',
                name: 'name',
                validate: validation
            },
            {
                type: 'list',
                message: 'What budget would you like?',
                name: 'budget',
                choices: [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]
            },
        ])
        .then((res) => {
            const { name, budget } = res;
            const add = new CreateDepartment(name, budget);
            add.addInfo().then(() => {
                menuPrompts();
            })
        })
};

const addRole = (deps) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What would you like to name this role?',
                name: 'name',
                validate: validation
            },
            {
                type: 'list',
                message: 'What salary would you like?',
                name: 'salary',
                choices: [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]
            },
            {
                type: 'list',
                message: 'What department will this person belong to?',
                name: 'depChoice',
                choices: [...deps]
            },
        ])
        .then((res) => {
            const { name, salary, depChoice } = res;
            deps.forEach((dep) => {
                if ( dep === depChoice) {
                   let id = (deps.indexOf(dep)) + 1;
                   const add = new CreateRole(name, salary, id);
                   add.addInfo().then(() => {
                       menuPrompts();
                   })
                }
            })
        })
};

const addEmployee = (roles) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the employee's first name?`,
                name: 'firstName',
                validate: validation
            },
            {
                type: 'input',
                message: `What is the employee's last name?`,
                name: 'lastName',
                validate: validation
            },
            {
                type: 'list',
                message: `What is the employee's role?`,
                name: 'roleChoice',
                choices: [...roles]
            },
            {
                type: 'list',
                message: `Who is the employee's manager?`,
                name: 'manager',
                choices: ['Choice']
            },
        ])
        .then((res) => {
            const { firstName, lastName, roleChoice, manager } = res;
            roles.forEach((role) => {
                if (role === roleChoice) {
                    let roleId = (roles.indexOf(role)) + 1;
                    console.log(roleId)
                    // NEEDS WORK HERE
                }
            })
        })
};

// Function that runs the entire application
const init = () => {
    console.log(
        logo({
            name: 'Employee Manager',
            font: 'Speed',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'black',
            logoColor: 'bold-black',
            textColor: 'black',
        })
        .emptyLine()
        .emptyLine()
        .render()
    );
    menuPrompts();
};

module.exports = init;