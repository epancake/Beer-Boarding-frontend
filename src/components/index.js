var express = require('express');
var router = express.Router();
var db = require('../db/knex.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  db('movie')
    .join('person', 'person.id', '=', 'movie.director_id')
    .select({director: 'person.name'}, 'movie.title')
    .then(function(data){
      res.json(data)
    })

})

module.exports = router;
