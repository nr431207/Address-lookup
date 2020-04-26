const express = require('express')
let mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.port || 4000
const corsOptions = {origin:`http://localhost:${port}`};
app.use(cors(corsOptions));
app.use(bodyParser.json())
path = require('path');


app.use(express.static(`${__dirname}/../client/dist`));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'diary'
})
app.get('/diaries', (req, res) => {
  connection.connect();
    connection.query('select * from `diary-content`', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
});

app.post('/post', (req, res) => {
 let diary = req.body;
 connection.query(`insert into \`diary-content\`(title, content, \`creation-date\`) values (\'${diary.title.toString()}\', \'${diary.content.toString()}\', \'${diary.date.toString()}\');`, (err, res) => {
  if(err) throw err;
 });
})

app.listen(port, () => console.log(`Example app listening at ${port}`))