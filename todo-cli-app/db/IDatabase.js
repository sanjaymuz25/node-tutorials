class IDatabase {
    async connect() {
        throw new Error('Connect not implemented');
    }
    async addTodo(todo) {
        throw new Error('Add todo not implemented');
    }

    async updateTodo(id, todo, completed) {
        throw new Error('Update todo not implemented');
    }

    async listTodo() {
        throw new Error('List todo not implemented');
    }

    async deleteTodo(todoId) {
        throw new Error('Delete todo not implemented');
    }
}

module.exports = IDatabase;