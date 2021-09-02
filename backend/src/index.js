require('dotenv').config();
const express = require('express');
const router = require('./routes/routes');
const verifyToken = require('./routes/validate-token');

const app = express();
app.use(express.json());

app.use("/", router());

app.get('/api', verifyToken, (req, res) => {
    res.send('estas autenticado');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`La aplicacion se encedió el puerto ${PORT}`);
});