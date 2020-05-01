const express = require('express')
let mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.port || 4000
const corsOptions = {origin:`http://localhost:${port}`};
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/../client/dist`));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'diary'
});
connection.connect((err) => {
  if(err) console.log(err)
    console.log('DB  connected!')
});
app.get('/diaries', (req, res) => {
    connection.query('select * from `diary-content`', (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

app.post('/post', (req, res) => {
 const {title, content, creationDate} = req.body
 connection.query('insert into `diary-content`(title, content, creationDate) values(?, ?, ?)',[title, content, creationDate], 
 (err, result) => {
  if(err) throw err;
  res.end(JSON.stringify(result));
 });
})

app.put('/put/:id', (req, res) => {
  let diary = req.body;
  let id = req.params.id
  connection.query('UPDATE `diary-content` SET title=?,content=? WHERE `id`=?', [diary.title, diary.content, id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.delete('/diaries/:id', (req, res) => {
  let id = req.params.id;
  console.log(id)
  connection.query('DELETE FROM `diary-content` WHERE `id`=?', [id], (error, result) => {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});

app.listen(port, () => console.log(`Example app listening at ${port}`))