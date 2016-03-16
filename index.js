var express = require("express"); // llama la libreria de metodos
var path = require('path'); //llama al metodo path para habilitar carpetas
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();
var user = { mail: 'invitado'};

//configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use middleware

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'node_modules')));


//define routes

app.get('/', function(req, res){
	res.render('index', {
		user
	});
});

app.get('/workzone', function(req, res){
	res.render('workzone', 
		user
	);
});
app.post('/login', function(req, res){
	var connection = mysql.createConnection({ //conecta con la base1
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'base1'
	});

	var user = {
		mail: req.body.loginuser,
		password: req.body.logpsw
	}

	connection.query('select * from users1 where Mail = ?', user.mail, function(err, result){
		console.log(result);
		if(result == ''){
			console.log('Usuario no registrado');
			user = {mail: 'invitado'}
			res.redirect('/');
		}else{
			console.log(result[0].Nombre);
			if(result[0].Password != user.password){
				console.log('Ha pifiado el password');
				user = {mail: 'invitado'}
				res.redirect('/');
			}else{
				console.log('Se ha logueado correctamente');

				user = {mail: result[0].Mail, 
						nombre: result[0].Nombre, 
						apellido: result[0].Apellido, 
						password: result[0].Password};
				
				connection.query('select * from movements', function(err, result2){
					console.log(result2);
					res.render('workzone', {
						user : user,
						result2: result2
					});		
				});
			}
		};	

	});

});

app.post('/registration', function(req, res){
	var connection = mysql.createConnection({ //conecta con la base1
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'base1'
	});

	var user = {
		Nombre: req.body.userName,
		Apellido: req.body.userLast,
		Mail: req.body.userMail,
		password: req.body.psw,
		secLevel: 'user'
	}
	var query = connection.query('insert into users1 set ?', user, function(err, result) {
		if (err) {
			console.error(err)
			return;
		}
		console.error(result);
	});
	 
	connection.end();
	res.render('index', { user : user} );
});

app.post('/addHours', function(req, res){

	var connection = mysql.createConnection({ //conecta con la base1
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'base1'
	});
	
	connection.query('SELECT * FROM movements', function(err, result2){
		console.log('result es');
		console.log(result2);
		
		var n = result2.length +1;
		var day = new Date();
		var taskhour = {
			OpNumber: n,
			Date: day,
			User: req.body.userMail,
			Task: req.body.task,
			Client: req.body.client,
			Proyecto: req.body.project,
			//Proyecto: 'cualquiera',
			Horas: req.body.hours
		};

		var user = {
			mail: req.body.userMail
		};

		console.log(taskhour);

		var query = connection.query('insert into movements set ?', taskhour, function(err, result) {
			if (err) {
				console.error(err);
				return;
			}
			console.error(result);
		});
		connection.query("select * from movements", function(err, result2){
			res.render('workzone', {user : user, result2 : result2});
		});
	} );
});

//start the server

var port = process.env.PORT || 1337;

 app.listen(port, function(){ 
 	console.log('ready on port ' + port);
 });

// http.listen(process.env.PORT || 1337, function(){
//   console.log('listening on', http.address().port);
// });
