const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const TarefaModel = sequelize.define('Tarefa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false

    }
})

//Retorno
module.exports = {
    sequelize: sequelize,
    TarefaModel: TarefaModel
}