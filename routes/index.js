var express = require('express');
var router = express.Router();


const pg = require('pg');
const pool = new pg.Pool({
    user: 'pimreader',
    host: '10.3.37.131',
    database: 'pim',
    password: 'p1mre@d0nly',
    port: '5433'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  sql=`
  select * from pim.band;
  select * from pim.tier;
  select * from pim.holding order by "RecordID";
  `
  try{
    pool.query(sql, function (err, result) {
      if (err) {console.log(sql);  res.send(""); return;}

      res.render('index', { 
        title: 'PIM Applet',
        dband: result[0].rows,
        dtier: result[1].rows,
        dholding: result[2].rows
      });
    });
  }
  catch(ex) {
    console.log("SQL exception error: "+sql);
  } 
});

/* response query message  */
router.get('/msg*', function(req, res) {
  var params=decodeURI(req.originalUrl);
  var strarr= params.split("/");
  
  //calculate pim with query message
  var query=strarr[2];
  console.log(query);

  //build & send response
  var response="Here is my response for pim query!"
  res.send(response);
});

module.exports = router;
