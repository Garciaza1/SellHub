const express = require('express');
const router = require('./router');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Aumentar o limite de carga
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json()); 

app.use('/', router);  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});