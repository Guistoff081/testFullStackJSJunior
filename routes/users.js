var express = require('express');
var router = express.Router();
const connection = require('../db/db_connection');

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection('users').select().then(users => {
    //res.json({users: users});
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({key:"value"}));
    res.render('users/all',{users: users})
    //res.send({users: users});
  });
});

module.exports = router;
