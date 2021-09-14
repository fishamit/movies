const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(process.env.PORT || 1000, () => {
  console.log(`Lisening @${process.env.PORT || 1000}`);
});
