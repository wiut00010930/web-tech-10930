let { Sequelize } = require('sequelize')

let moduleDatabase = new Sequelize('Modules', 'admin', 'admin', {
    host: 'db.dqlite3',
    dialect: 'sqlite'
})

module.exports = {
    moduleDatabase,
}
