var express = require('express');

const UserController = require('../api/controllers/UserController.js')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', UserController.addUser);

// list all adult users.
router.get('/users/adult', UserController.getAdultResults)

router.get('/users/gender', UserController.getListByGender)

router.get('/users', UserController.getUsersListByFilter)

module.exports = router;
