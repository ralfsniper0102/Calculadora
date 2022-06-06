const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'calculadoradb'
});

async function main(req, res, ip) {
    try {
        const today = new Date();
        const conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO req_res VALUES (?,?,?)`, [req, res, today]);
        console.log(rows);

        conn.end();
    }
    catch (err) {
        console.log(err);
    }
}
const express = require('express');
const app = express();

app.use(express.static('public')); // to serve static files

const port = 3000;

//rotas

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

app.get('/calcular', (req, res) => {
    const tela = req.query.tela;
    if (tela === "") {
        res.send("expressão incorreta");
    }

    let result;
    try {
        result = eval(tela);
    }
    catch (e) {
        res.send("expressão incorreta");
    }
    finally {
        res.send(result.toString());
    }
    main(tela.toString(), result.toString());
});

//inicialização do servidor
app.listen(port, () => console.log(`Example app listening port http://localhost:${port}`));
///


