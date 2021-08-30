require('dotenv').config();
require('./database/database');
const express = require('express');
const router = require('./routes/routes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/", router());

app.listen(PORT, () => {
    console.log(`La aplicacion se encedió el puerto ${PORT}`);
});