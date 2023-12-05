const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/judicialflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const judgeRoutes = require('./judgeRoutes');
const caseRoutes = require('./caseRoutes');

app.use(bodyParser.json());

app.use('/judges', judgeRoutes);
app.use('/cases', caseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
