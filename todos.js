var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'base1'
});

connection.connect();

// var user = {
// 	Nombre: "German",
// 	Apellido: "Acierno",
// 	Mail: "german@thebytery.com",
// 	password: "n3m3515"
// }

connection.query('select * from users1', function(err, result){
	console.log(result);
});

connection.end();