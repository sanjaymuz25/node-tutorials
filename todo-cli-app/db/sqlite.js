const IDatabase = require('./IDatabase');
const sqlite3 = require('sqlite3').verbose();

class Sqlite extends IDatabase {
    async connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database('./todo.sqlite', (err) => {
                if (err) {
                    return reject(err);
                }
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS todos
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    todo TEXT NOT NULL,
                    completed BOOLEAN DEFAULT false)
                `, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve('Connected to the database');
                });
            });
        });
    }

    async addTodo(todo) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO todos (todo, completed) VALUES (?, ?)`, [todo, false], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve("Todo added");
            });
        });
    }

    async listTodo() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM todos`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    async updateTodo(id, updates) {
        return new Promise((resolve, reject) => {
            const { todo, completed } = updates;
            this.db.run(`UPDATE todos SET todo=?, completed=? WHERE id=?`, [todo, completed, id], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve("Todo updated");
            });
        });
    }

    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM todos WHERE id=?`, [id], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve("Todo deleted");
            });
        });
    }
}

module.exports = Sqlite;
