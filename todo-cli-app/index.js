require('dotenv').config();

const yargs = require('yargs');
const chalk = require("chalk");
const { getDatabase } = require('./db/db');

const run = async () => {
    let db = getDatabase();
    try {
        const status = await db.connect();
        console.log(chalk.green(status));
    } catch (err) {
        console.log(chalk.red('Failed to connect to the database:', err));
        return;
    }

    yargs.command('add <todo>', 'Add a new todo',
        (yargs) => {
            yargs.positional('todo', {
                describe: 'Todo description',
                type: 'string'
            });
        },
        async (argv) => {
            try {
                const status = await db.addTodo(argv.todo);
                console.log(chalk.green(status));
            } catch (err) {
                console.log(chalk.red('Failed to add todo:', err));
            }
        })
        .command('update <id> <todo> <completed>', 'Edit todo',
            (yargs) => {
                yargs.positional('id', {
                    describe: 'Todo id',
                    type: 'string'
                }).positional('todo', {
                    describe: 'Todo description',
                    type: 'string'
                }).positional('completed', {
                    describe: 'Todo completion status',
                    type: 'string',
                    choices: ['true', 'false']
                });
            },
            async (argv) => {
                try {
                    const status = await db.updateTodo(argv.id, { todo: argv.todo, completed: argv.completed === 'true' });
                    console.log(chalk.green(status));
                } catch (err) {
                    console.log(chalk.red('Failed to update todo:', err));
                }
            })
        .command('delete <id>', 'Delete todo',
            (yargs) => {
                yargs.positional('id', {
                    describe: 'Todo Id',
                    type: 'string'
                });
            },
            async (argv) => {
                try {
                    const status = await db.deleteTodo(argv.id);
                    console.log(chalk.green(status));
                } catch (err) {
                    console.log(chalk.red('Failed to delete todo:', err));
                }
            })
        .command('list', 'List todos',
            async () => {
                try {
                    const todos = await db.listTodo();
                    console.table(todos);
                } catch (err) {
                    console.log(chalk.red('Failed to list todos:', err));
                }
            })
        .demandCommand(1, 'Provide at least one option')
        .help()
        .argv;
}

run();
