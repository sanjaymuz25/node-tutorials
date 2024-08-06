const mongoose = require('mongoose');
const IDatabase = require('./IDatabase');

class MongoDB extends IDatabase {

    #getModel() {
        const schema = mongoose.Schema({
            //            id: { type: Number, unique: true },
            todo: { type: String, required: true },
            completed: { type: Boolean, default: false }
        });

        return mongoose.model('Todo', schema);
    }

    async connect() {
        try {
            await mongoose.connect('mongodb://root:example@mongo:27017/todo?authSource=admin');
            return "Connected with MongoDB";
        } catch (err) {
            throw new Error(err);
        }
    }

    async addTodo(todo) {
        try {
            const Todo = this.#getModel();
            const myTodo = new Todo();
            myTodo.todo = todo;
            await myTodo.save();
            return "Todo added successfully";
        } catch (err) {
            throw new Error(`Add Todo Error: ${err.message}`);
        }
    }

    async listTodo() {
        try {
            const Todo = this.#getModel();
            const todos = await Todo.find();
            return todos.map(({ _id, todo, completed }) => ({
                id: _id.toString(),
                todo,
                completed
            }));
        } catch (err) {
            throw new Error(`Unable to get Todo: ${err.message}`);
        }
    }

    async updateTodo(id, updates) {
        try {
            const { todo, completed } = updates;
            const Todo = this.#getModel();
            await Todo.findByIdAndUpdate(id, { todo: todo, completed: completed });
            return "Todo updated successfully";
        } catch (err) {
            throw new Error(`Unable to update Todo: ${err.message}`);
        }
    }

    async deleteTodo(id) {
        try {
            const Todo = this.#getModel();
            await Todo.findByIdAndDelete(id);
            return "Todo deleted successfully";
        } catch (err) {
            throw new Error(`Unable to delete Todo: ${err.message}`);
        }
    }
}

module.exports = MongoDB;