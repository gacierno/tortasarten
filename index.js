var ver = '0.4.139';

var express = require("express"); // llama la libreria de metodos
var path = require('path'); //llama al metodo path para habilitar carpetas
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();
var user = { mail: 'invitado'};

var pg = require('pg');

pg.defaults.ssl = true;


//configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use middleware

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'node_modules')));


//define routes

app.get('/', function(req, res){
	// var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	
	// var client = new pg.Client(dbUrl);
	// client.connect();

	res.render('index', {
			user : user,
			ver
		});
});
app.post('/createtable', function(req, res) {


	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect();

	console.log("estamos conectados");
	var nombreNewTable = req.body.nomTabla;
	var query = client.query('CREATE TABLE ' + nombreNewTable + '(nombre varchar(20), apellido varchar(20), mail varchar(30), password varchar(20), secLevel varchar(20))');
	console.log(query);
	query.on('end', function(){ client.end();});
	res.render('index', {
		user : user,
		ver
	});
});

app.post('/createproject', function(req, res) {

	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect();

	console.log("estamos conectados");
	var nombreNewProj = req.body.nomProject;
	var query = client.query('CREATE TABLE ' + nombreNewProj + '(opnumber int, opdate date, opuser varchar(50), task varchar(20), client varchar(20), proyecto varchar(20), horas int)');
	console.log(query);
	query.on('end', function(){ client.end();});
	res.render('index', {
		user : user,
		ver
	});
});

app.post('/checkusers', function(req, res) {

	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect();

	console.log("estamos conectados");
	var nombreTable = req.body.nomTable;
	var query = client.query('SELECT * FROM ' + nombreTable, function(err, result){

		var movePassing = result.rows;
		console.log(movePassing);
		query.on('end', function(){ client.end();});
		res.render('tables', {
			user : user,
			movePassing : movePassing,
			ver,
			nombreTable
		});		

	});

});

app.post('/checkmoves', function(req, res) {

	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect();

	console.log("estamos conectados");
	var nombreTable = req.body.nomTable;
	var campoBusca = req.body.field;
	var coinsidencia = req.body.busqueda;

	if (campoBusca == undefined || coinsidencia == ''){
		var query = client.query('SELECT * FROM ' + nombreTable, function(err, result){

			var movePassing = result.rows;
			console.log(movePassing);
			query.on('end', function(){ client.end();});
			res.render('tablemove', {
				user : user,
				movePassing : movePassing,
				ver,
				nombreTable
			});		

		});
	}else{
		var query = client.query('SELECT * FROM ' + nombreTable + ' WHERE '+ campoBusca + ' =($1)', [coinsidencia], function(err, result){
			var canLoad = true;

			console.log(result);

			if (result == undefined){canLoad =false;};
			if (canLoad){

				var movePassing = result.rows;
				console.log(movePassing);
				query.on('end', function(){ client.end();});
				res.render('tablemove', {
					user : user,
					movePassing : movePassing,
					ver,
					nombreTable
				});	
			}else{
				var movePassing = { opnumber: 'NO MATCH', 
									opdate: 'NO MATCH', 
									opuser: 'NO MATCH', 
									task: 'NO MATCH', 
									client: 'NO MATCH', 
									proyecto: 'NO MATCH', 
									horas: 'NO MATCH'
								};
				query.on('end', function(){ client.end();});
				res.render('tablemove', {
					user : user,
					movePassing : movePassing,
					ver,
					nombreTable
				});				
			};
	

		});
	}

});


app.get('/workzone', function(req, res){
	res.render('workzone', 
		user, ver
	);
});

app.get('/registrationzone', function(req, res){
		res.render('register',{
			user : user
		}
	);
});



app.post('/login', function(req, res){
	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect()
	var canLoad = false;
	var user = {
		mail: req.body.loginuser,
		password: req.body.logpsw
	}

	var query = client.query('SELECT * FROM users1 WHERE mail = ($1)', [user.mail], function(err, result){

		if(result.rowCount == 0){
			console.log('Unregistered User');
			query.on('end', function(){ client.end();});
			user.mail = 'invitado';
			res.render('index', {
				user : user,	
					ver
			});

		}else{		
			if(result.rows[0].mail == user.mail && result.rows[0].password == user.password){
				canLoad = true;
				user = result.rows[0];
			};
			if(canLoad){
				query = client.query('SELECT * FROM movements', function(err, result2){
					query.on('end', function(){ client.end();});
					var movePassing = result2.rows;
					res.render('workzone', {
						user : user,	
						movePassing : movePassing 
					});
				});
			}else{
				console.log('Unregistered User');
				query.on('end', function(){ client.end();});
				res.render('index', {
					user : user,	
						ver
				});
			};

		};

	});
});


app.post('/registration', function(req, res){

	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect();
	var canLoad = true;
	var user = {
		nombre: req.body.userName,
		apellido: req.body.userLast,
		mail: req.body.userMail,
		password: req.body.psw,
		secLevel: 'user'
	}

	console.log(user);
	var query = client.query('SELECT * FROM users1', function(err, result){
		//console.log(result);
		for (var i = result.rows.length - 1; i >= 0; i--) {
			if (result.rows[i].mail == user.mail) {
				console.log("User Already Exists");
				canLoad = false;
				return;
			};
		};
	});
	if (canLoad){
		var query = client.query('INSERT INTO users1 (nombre, apellido, mail, password, secLevel) values($1, $2, $3, $4, $5)', [user.nombre, user.apellido, user.mail, user.password, user.secLevel]);
		console.log("User Successfuly Loaded");
	};

	//console.log('salio de pedo');
	query.on('end', function(){ 
		client.end();
	});
	res.render('index', { user : user, ver} );
	
});

app.post('/addHours', function(req, res){

	var dbUrl = 'postgres://pawqseeoajiuja:zPqzNPBBBJfp40K42VcMrCZFMB@ec2-107-22-248-209.compute-1.amazonaws.com:5432/d1tcaprntlst2d';
	var client = new pg.Client(dbUrl);
	client.connect();

	var day = new Date();
	var user = {
		mail: req.body.userMail
	};
	var taskhour = {
		opnumber: 0,
		date: day,
		opuser: req.body.userMail,
		task: req.body.task,
		client: req.body.client,
		proyecto: 'cualquiera',
		horas: req.body.hours
	};

	var query = client.query('SELECT * FROM movements', function(err, result){
		var n = result.rowCount + 1;
		taskhour.opnumber = n;
	

		console.log(n);
	
	});
	console.log(taskhour);
	var query = client.query('INSERT INTO movements (opnumber, opdate, opuser, task, client, proyecto, horas) values($1, $2, $3, $4, $5, $6, $7)',
		 [taskhour.opnumber, taskhour.date, taskhour.opuser, taskhour.task, taskhour.client, taskhour.proyecto, taskhour.horas]);

	var query = client.query('SELECT * FROM movements', function(err, result2){
		query.on('end', function(){ client.end();});
		console.log(result2);
		var movePassing = result2.rows;
		query.on('end', function(){ client.end();});
		res.render('workzone', {
			user : user,	
			movePassing : movePassing 
		});
	});

});

//start the server

var port = process.env.PORT || 1337;

 app.listen(port, function(){ 
 	console.log('ready on port ' + port);
 });

// http.listen(process.env.PORT || 1337, function(){
//   console.log('listening on', http.address().port);
// });
