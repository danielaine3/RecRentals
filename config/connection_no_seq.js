require('dotenv').config();
var mysql = require('mysql2');
var pw = process.env.MYSQL_PW;
var connection;
if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  password: '',
	  port: 3306,
	  database: 'rentalApp_db'
	});
};
connection.connect(function(err) {
  if (err) throw err;
  console.log("\nMYSQL CONNECTION SUCCESSFUL\n");
});
module.exports = connection;