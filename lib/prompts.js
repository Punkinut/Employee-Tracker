const inquirer = require('inquirer');
const connection = require('./config/connection')
const logo = require('asciiart-logo');
const read = require('./classes/read');
const create = require('./classes/create');
const deleteitem = require('./classes/delete');
const updateRole = require('./classes/update')

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

// Promise the fetches specific information from the database and places them in variables
let employees;
let roles;
let departments;
let managers;
let managerIds;
const fetchMult = new Promise (resolve => {
    fetchInfo('SELECT department.id, department.name as title, department.utilized_budget FROM department')
    .then((data) => departments = data);
    fetchInfo('SELECT first_name as title FROM employee')
    .then((data) => employees = data);
    fetchInfo('SELECT * FROM role')
    .then((data) => roles = data); 
    fetchInfo('SELECT first_name as title FROM employee WHERE role_id = 1 OR role_id = 3 OR role_id = 5;')
    .then((data) => {
        managers = data
        resolve();
    })
    fetchInfo('SELECT id as title FROM employee WHERE role_id = 1 OR role_id = 3 OR role_id = 5;')
    .then((data) => {
        managerIds = data
        resolve();
    })
})

// Main prompts that display the main menu
const menuPrompts = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Departments','Add Department','Delete Department', 'View All Roles', 'Add Role', 'View All Employees','Add Employee','Update Employee Role','View All Managers', 'Exit']
            },
        ])
        .then((res) => {
            const { choice } = res;
            // Conditional Statements depending on the user's choice
            switch (choice) {
                case 'View All Departments':
                    printInfo('SELECT * FROM department').then(() => menuPrompts());
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Delete Department':
                    fetchMult.then(() => deleteDepartment(departments))
                    break;
                case 'View All Roles':
                    printInfo('SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department ON role.department_id=department.id').then(() => menuPrompts());
                    break;
                case 'Add Role':
                    fetchMult.then(() => addRole(departments));
                    break;
                case 'View All Employees':
                    printInfo('SELECT employee.id, employee.first_name as FirstName, employee.last_name as LastName, role.title, department.name as department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee manager ON employee.manager_id=manager.id').then(() => menuPrompts());
                    break;
                case 'Add Employee':
                    fetchMult.then(() => addEmployee(roles, managers));
                    break;
                case 'Update Employee Role':
                    fetchMult.then(() => updateEmployeeRole(employees, roles));
                    break;
                case 'View All Managers':
                    printInfo('SELECT id, first_name as FirstName, last_name as LastName FROM employee WHERE role_id = 1 OR role_id = 3 OR role_id = 5;').then(() => menuPrompts());
                    break;
                case 'Exit':
                    console.log('Exiting...')
                    connection.end();
                    break;
            }
        })
};

const deleteDepartment = (departments) => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which department would you like to delete?',
                name: 'employee',
                choices: [...departments]
            },
        ])
}

const updateEmployeeRole = (employee, roley) => {
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
                choices: [...roley]
            },
        ])
        .then((res) => {
            const { employee, role } = res;
            let roleId;
            let addition = new Promise (resolve => {
                roley.forEach((ro) => {
                    if (ro === role) {
                        roleId = (roley.indexOf(ro)) + 1;
                        resolve();
                    }
                })
            })

            addition.then(() => {
                updateRole(employee, roleId);
                menuPrompts();
            })
        })
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
            add.addInfo().then(() => menuPrompts());
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
                message: 'What department will this role belong to?',
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
                   add.addInfo().then(() => menuPrompts());
                }
            })
        })
};

const addEmployee = (roles, managers) => {
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
                choices: ['No Manager',...managers]
            },
        ])
        .then((res) => {
            const { firstName, lastName, roleChoice, manager } = res;
            roles.forEach((role) => {
                if (role === roleChoice) {
                    let roleId = (roles.indexOf(role)) + 1;
                    if (manager === 'None') {
                        const add = new CreateEmployee(firstName, lastName, roleId, null);
                        add.addInfo().then(() => menuPrompts());
                    } else {
                        managers.forEach((man) => {
                            if (man === manager) {
                                let manIndex = managers.indexOf(man)
                                let manId = managerIds[manIndex]
                                const add = new CreateEmployee(firstName, lastName, roleId, manId);
                                add.addInfo().then(() => menuPrompts());
                            }
                        })
                    }
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