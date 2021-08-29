const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'movies_db',
    user: 'root',
    password: ''
});

connection.connect(function(error){
    if (error) {
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
});

connection.query('SELECT * from movies', function(error, results, fields){
    if (error) 
        throw error;

        results.forEach(result => {
            console.log(result);
        });
})

connection.end();