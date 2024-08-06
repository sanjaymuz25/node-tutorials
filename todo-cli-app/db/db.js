const Sqlite = require('./sqlite');
const MongoDB = require('./mongo');

const getDatabase = () => {
    const connections = {
        'sqlite': () => new Sqlite(),
        'mongo': () => new MongoDB(),
    };

    const dbConnection = process.env.DB_CONNECTION;

    if (!dbConnection || !connections[dbConnection]) {
        throw new Error('Invalid or undefined DB_CONNECTION environment variable');
    }

    return connections[dbConnection]();
};

module.exports = {
    getDatabase
};
