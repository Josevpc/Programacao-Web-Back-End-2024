const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) =>
    res.send('<h3> Home </h3>')
)

app.get('/page1', (req, res) =>
    res.send(`<h3>Página 01 </h3>
    <a href="/page1"> Ir para a Próxima página </a>
    `)
);

app.get('/page2', (req, res) =>
    res.send(`<h3>Página 02 </h3>
    <a href="/"> Ir para a Página Anterior </a>
    `)
);

app.get('/reverso', (req, res) => {
    let text = req.query.text;

    if (!text) {
        res.send("Forneça um texto para ser Invertido")
    }

    let reverse_text = text.split('').reverse().join('');

    res.send(`<p> Texto ${text} e Texto Invertido ${reverse_text} </p>`)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.send(`
      <h3>Login</h3>
      <form action="/login" method="POST">
        <label for="usuario">Usuário:</label>
        <input type="text" id="usuario" name="usuario" required>
        <br><br>
        <label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" required>
        <br><br>
        <button type="submit">Entrar</button>
      </form>
    `);
  });

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        res.send("<p> Forneça o usuário ou a senha! </p>");
    }

    if (senha === (usuario + usuario)) {
        res.send(`Usuário: ${usuario}, Acesso Permitido`);
    } else {
        res.send(`Usuário: ${usuario}, Acesso Negado!`);
    }
});


app.listen(port, () =>
    console.log('Servidor Iniciado na Porta 3000')
)