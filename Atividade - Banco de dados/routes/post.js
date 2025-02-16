var express = require('express');
var router = express.Router();

const {sequelize} = require('../model/bd')
const TarefaService = require('../model/Tarefa')

/* GET home page. */
router.get('/install',  async function(req, res, next) {
  await sequelize.sync({force: true})

  res.json({msg: "Instalado com Sucesso!"});
});

// Criar Tarefa
router.post('/', async (req, res) => {
  try {
    let tarefa = await TarefaService.criar(req.body)
    res.json({tarefa: tarefa})
  }
  catch (e) {
    res.status(400).json({msg: 'Falha ao Criar'})
  }
})

// Excluir tarefa
router.delete('/:id', async (req, res) => {
  try {
    let tarefa = await TarefaService.excluir(req.params.id)
    res.json({tarefa: tarefa})
  } catch (error) {
      res.status(500).json({ error: 'Falha ao Excluir' });
  }
})

// Listar tarefas
router.get('/', async (req, res) => {
  res.json({lista: await TarefaService.listar()})
})

module.exports = router;
