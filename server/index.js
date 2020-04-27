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
});
connection.connect();
app.get('/diaries', (req, res) => {
    connection.query('select * from `diary-content`', (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

app.post('/post', (req, res) => {
 let diary = req.body;
 connection.query(`insert into \`diary-content\`(title, content, \`creation-date\`) values (\'${diary.title.toString()}\', \'${diary.content.toString()}\', \'${diary.date.toString()}\');`, 
 (err, result) => {
  if(err) throw err;
  res.end(JSON.stringify(result));
 });
})

// app.put('/employees', function (req, res) {
//   connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
//    if (error) throw error;
//    res.end(JSON.stringify(results));
//  });
// });

//rest api to delete record from mysql database
app.delete('/diaries/:id', function (req, res) {
  let id = req.params.id;
  connection.query('DELETE FROM `diary-content` WHERE `id`=?', [id], (error, result) => {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});

app.listen(port, () => console.log(`Example app listening at ${port}`))