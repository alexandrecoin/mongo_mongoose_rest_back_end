const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json())

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
