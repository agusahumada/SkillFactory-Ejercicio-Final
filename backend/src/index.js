require('dotenv').config();
require('./database/database');
const express = require('express');
const router = require('./routes/routes');

const app = express();

const PORT = process.env.PORT || 8000;

app.use("/", router())

app.listen(PORT, () => {
    console.log(`Se encedió el puerto ${PORT}`);
});