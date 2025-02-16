const {TarefaModel} = require('./bd')

module.exports = {
    criar: async (tarefa) => {
        return await TarefaModel.create(tarefa)
    },
    
    excluir: async (id) => {
        const tarefa = await TarefaModel.findByPk(id)
        if (!tarefa) {
            return ({ error: 'Tarefa não encontrada' });
        }
        return await tarefa.destroy(tarefa)
    },

    listar: async () => {
        return await TarefaModel.findAll()
    }
}