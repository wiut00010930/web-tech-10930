let { DataTypes } = require('sequelize')

let db = require('./database')

let moduleDatabase = db.moduleDatabase

let Modules = moduleDatabase.define('Modules', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
    },
    description : {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.NUMBER,
    },
    full: {
        type: DataTypes.BOOLEAN,
    },
    inCart: {
        type: DataTypes.BOOLEAN,
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: '01/07/2010'
    },
},{
    tableName: 'Modules'
})

module.exports = {Modules,}
