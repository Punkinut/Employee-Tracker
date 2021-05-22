const inquirer = require('inquirer');
const connection = require('./config/connection')
const logo = require('asciiart-logo');
const Read = require('./classes/read');
const create = require('./classes/create');
const printJoin = require('./classes/readJoin');

const { CreateDepartment, CreateRole, CreateEmployee } = create;

const validation = async (input) => {
    if(input.trim(' ') === '') {
        return 'Please put in an answer'
    }
    return true;
}

const menuPrompts = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Departments','Add Department', 'View All Roles', 'Add Role', 'View All Employees','Add Employee', 'Exit']
            },
        ])
        .then((res) => {
            const { choice } = res;
            // Conditional Statements depending on the user's choice
            switch (choice) {
                case 'View All Departments':
                    const showDepartments = new Read('department');
                    showDepartments.printInfo().then(() => {
                        menuPrompts();
                    });
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'View All Roles':
                    printJoin('SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department ON role.department_id=department.id').then(() => {
                        menuPrompts();
                    })
                    break;
                case 'Add Role':
                    readDepartments();
                    break;
                case 'View All Employees':
                    printJoin('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, employee.manager_id FROM employee INNER JOIN role  ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id').then(() => {
                        menuPrompts();
                    })
                    break;
                case 'Add Employee':
                    readRoles();
                    break;
                case 'Exit':
                    console.log('Exiting...')
                    connection.end();
                    break;
            }
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
}

const readDepartments = () => {
    const getDep = new Read('department');
        getDep.fetchNameInfo().then((depNames) => {
            addRole(depNames);
        })
};

const readRoles = () => {
    const getRole = new Read('role');
        getRole.fetchTitleInfo().then((roleNames) => {
            addEmployee(roleNames)
        })
}

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