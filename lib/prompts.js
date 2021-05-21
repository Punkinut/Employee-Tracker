const inquirer = require('inquirer');
const connection = require('./config/connection')
const logo = require('asciiart-logo');
const Read = require('./read');
const ReadJoin = require('./readJoin');

const menuPrompts = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Exit']
            },
        ])
        .then((res) => {
            const { choice } = res;
            // Conditional Statements depending on the user's choice
            if (choice === 'View All Departments') {
                const showDepartments = new Read('department');
                showDepartments.printInfo().then(() => {
                    menuPrompts();
                });
            } else if (choice === 'View All Roles') {
                const showRoles = new ReadJoin('role');
                showRoles.printInfo('SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department ON role.department_id=department.id;').then(() => {
                    menuPrompts();
                })
            } else if (choice === 'Exit') {
                console.log('Exiting...')
                connection.end();
            }
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