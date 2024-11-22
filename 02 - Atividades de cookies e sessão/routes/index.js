var express = require('express');
var router = express.Router();

var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi");
const cookieParser = require('cookie-parser');

router.use(express.urlencoded({extended: false}));
router.use(cookieParser());

const passport = require('passport');

let globalCounter = 0;

const users = [
  { id: 1, username: 'admin', password: '1234' },
  { id: 2, username: 'teste', password: 'abcd' },

];

const eventos = {
  Grupo_1: [],
  Grupo_2: [],
  Grupo_3: []
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

/* GET home page. */
router.use((req, res, next) => {
  if (!req.session.userType) {
    // Atribuir um tipo de usuário aleatório para teste
    const tipos = ['Grupo_1', 'Grupo_2', 'Grupo_3'];
    req.session.userType = tipos[Math.floor(Math.random() * tipos.length)];
  }
  next();
});

router.get('/', function (req, res) {
  const nome = req.session.nome || 'Visitante';
  
  if (!req.session.tasks) {
    req.session.tasks = [];
    req.session.ids = 0;

    Task.new(req.session, "Tarefa 1");
    Task.new(req.session, "Tarefa 2");
  }

  const taskId = parseInt(req.query.tid, 10);
  let obj = Task.getElementById(req.session, taskId);

  res.render('index', {
    title: `Página Inicial, ${ nome }`,
    message: 'Preencha os dados do Formulário!',
    tasks: Task.list(req.session),
    task: obj,
    isLoggedIn: req.isAuthenticated(),
  });

});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
}));

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/salvaruser', (req, res) => {
  let { nome } = req.body;

  req.session.nome = nome;

  if (!req.session.nome){
    globalCounter++;
  } else {
    req.session.userCounter++;
  }

  res.redirect('/');
});

router.post("/tarefas", ensureAuthenticated, function (req, res){

  if (!req.session.nome){
    globalCounter++;
  } else {
    req.session.userCounter++;
  }
  
  const {error, value} = TaskSchema.validate(req.body);
  if (error) {
    res.render('index', {
       tasks: Task.list(req.session),
       isLoggedIn: req.isAuthenticated(),
       erro: "Dados incompletos" 
      });
    return;
  }
  
  const {id, nome} = value
  if (id === undefined) {
    //Inserir
    Task.new(req.session, nome);
  } else {
    //Alterar
    Task.update(req.session, id, nome);
  }
  
  res.redirect("/");
})

router.get("/tarefas/del/:id", function(req, res){
const {id} = req.params;
const {error, value} = Joi.number().integer().greater(0).validate(id)

if (!req.session.nome){
  globalCounter++;
} else {
  req.session.userCounter++;
}

if (error || !Task.delete(req.session, value)) {
  res.send("Falha ao excluir uma tarefa");
  return;
}
res.redirect("/");
})

router.get('/random', (req, res) => {
  const cookieName = 'randromNumber';

  if (!req.session.nome){
    globalCounter++;
  } else {
    req.session.userCounter++;
  }

  let randomNumber = req.cookies[cookieName];
  if(!randomNumber) {
    randomNumber = Math.floor(Math.random() * 1000) + 1;

    res.cookie(cookieName, randomNumber, { maxAge: 24 * 60 * 60 * 1000 });
  }

  res.send(`Número aleatório: ${randomNumber}`);
})

router.get('/contador', (req, res) => { 
  if (!req.session.userCounter) {
    req.session.userCounter = 0;
  }

  if (!req.session.nome){
    globalCounter++;
  } else {
    req.session.userCounter++;
  }

  res.send(`
    <h1>Contadores</h1>
    <p>Total de requisições (global): ${globalCounter}</p>
    <p>Total de requisições do usuário: ${req.session.userCounter}</p>
  `);
});

router.post('/eventos', (req, res) => {
  const userType = req.session.userType;
  const { tarefa } = req.body;

  if (!tarefa) {
    res.send('Erro: A tarefa não pode estar vazia.');
    return;
  }

  // Adicionar tarefa ao grupo do usuário
  eventos[userType].push(tarefa);

  res.redirect('/');
});


module.exports = router;
