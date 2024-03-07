
const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const routes_postgresql = require('./routes/routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes_postgresql);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Servidor Rodando');
  console.log(`PORT: ${port}`);
});