const inquirer = require('inquirer');
const logo = require('asciiart-logo');

const menuPrompts = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Departments', 'View All Roles', 'View All Employees']
            },
        ])
        .then((res) => {
            const { choice } = res;
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