const auth = require('./auth.route');

module.exports = {
  auth,
}


 // MySQLへの接続
// const con = mysql.createConnection({
//   host: 'db',
//   user: 'root',
//   password: 'password',
//   database: 'sample_db'
// });

// con.connect(function(err) {
// 	if (err) throw err;
// 	console.log('Connected');
// });

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   const sql = "select * from sample_data;"
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//       const data = {
//         title: 'Express on Docker',
//         db_datas: result
//       }
//       res.render('index', data);
//   });
// });

// module.exports = router;
