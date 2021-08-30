const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'movies_db',
//     user: 'root',
//     password: ''
// });

// connection.connect(function(error){
//     if (error) {
//         throw error;
//     }else{
//         console.log('BASE DE DATOS CONECTADA');
//     }
// });

// connection.query('SELECT * FROM movies_db.users WHERE email =' + mysql.escape(email),function(error, result){
//     if (error) 
//         throw error;

//         results.forEach(result => {
//             console.log(result);
//         });
// })


// connection.end();