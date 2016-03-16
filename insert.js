var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'base1'
});
 
connection.connect();

var user = {
	Nombre: "German",
	Apellido: "Acierno",
	Mail: "german@thebytery.com",
	password: "n3m3515"
}
 
var query = connection.query('insert into users1 set ?', user, function(err, result) {
	if (err) {
		console.error(err)
		return;
	}
	console.error(result);
});
 
connection.end();