const expresss = require('express');
const app = new expresss();
const data = require('./data.json');

app.get('/api/goods', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(data);
});

app.listen(3000);
