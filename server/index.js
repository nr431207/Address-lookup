const express = require('express');
const cors = require('cors');
const app = express();

app.use((cors));

app.get('/', (req, res) => {
  console.log(res)
  res.send('hello from the product server')
})


app.use(express.static(`${__dirname}/../client/dist`));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});