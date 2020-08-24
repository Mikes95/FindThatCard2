
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
var { nanoid } = require("nanoid");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var multer = require('multer')
const request = require('request')


mongoose.connect('mongodb://localhost:27017/findthatcard');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection succeeded");
})

router.post('/signup', async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  let user = await db.collection('registered').findOne({ email: email });
  if (user) {
    return res.status(400).send(JSON.stringify({
      code: 400,
      error: true,
      message: 'This email is already used'
    }));
  } else {
    var data = {
      "username": username,
      "email": email,
      "password": pass,
      "balance": 0,
      "address": '',
      "phone": '',
      "transactions": []
    }
    console.log(data)
    db.collection('registered').insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully");

    });
    return res.status(200).send(JSON.stringify({
      code: 200,
      message: 'ok'
    }));
  }
});

router.post('/login', async (req, res) => {
  var username = req.body.username;
  var pass = req.body.password;
  let user = await db.collection('registered').findOne({ username: username });
  console.log(username, pass)
  if (user) {
    if (user.username == username && user.password == pass) {
      console.log('loggato con successo')
      return res.status(200).send(JSON.stringify({
        code: 200,
        error: false,
        message: 'Loggato',
        user: user,
        token: nanoid()
      }));
    }
    else {
      return res.status(400).send(JSON.stringify({
        code: 400,
        error: true,
        message: 'Wrong credentials'
      }));
    }
  }
  else {
    return res.status(400).send(JSON.stringify({
      code: 400,
      error: true,
      message: 'This username does not exist'
    }));
  }

});

router.post('/detail', async (req, res) => {
  var username = req.body.username;

  let user = await db.collection('registered').findOne({ username: username });

  if (user) {
    if (user.username == username) {

      return res.status(200).send(JSON.stringify({
        code: 200,
        error: false,
        message: 'Loggato',
        user: user,
        token: nanoid()
      }));
    }
    else {
      return res.status(400).send(JSON.stringify({
        code: 400,
        error: true,
        message: 'Wrong credentials'
      }));
    }
  }
  else {
    return res.status(400).send(JSON.stringify({
      code: 400,
      error: true,
      message: 'This username does not exist'
    }));
  }

});


router.post('/refill', async (req, res) => {
  var username = req.body.username;

  let user = await db.collection('registered').findOne({ username: username });

  if (user) {
    let transactions = []
    if (user.transactions) { transactions = user.transactions }
    transactions.push({
      "time": Date.now(),
      "amount": req.body.money,
      "order_id": req.body.payment_data.orderID
    });
    if (user.username == username) {
      db.collection('registered').updateOne({ username: username }, { $set: { "balance": user.balance + req.body.money } })
      db.collection('registered').updateOne({ username: username }, { $set: { "transactions": transactions } })
      return res.status(200).send(JSON.stringify({
        code: 200,
        error: false,
        message: 'Payment succefull',
        user: user,
      }));
    }
    else {
      return res.status(400).send(JSON.stringify({
        code: 400,
        error: true,
        message: 'Error'
      }));
    }
  }
  else {
    return res.status(400).send(JSON.stringify({
      code: 400,
      error: true,
      message: 'Error'
    }));
  }

});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.body.data = JSON.parse(req.body.data)

    fs.mkdir(path.join('public/SellingCards', req.body.data.username), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    })
    req.body.data['path'] = path.join('public/SellingCards', req.body.data.username)
    cb(null, path.join('public/SellingCards', req.body.data.username))
  },
  filename: function (req, file, cb) {
    req.body.data['filename'] = Date.now() + '-' + file.originalname
    cb(null, Date.now() + '-' + file.originalname)
  },


})
var upload = multer({ storage: storage }).single('file')

router.post('/newcard', (req, res) => {


  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    console.log(req.body.data)
    db.collection('selling-cards').insertOne(req.body.data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully");

    });
    return res.status(200).send(JSON.stringify({
      code: 200,
      error: false,
      message: 'Card added successfully',
    }));

  })

});

router.post('/wishlist', async (req, res) => {
  var username = req.body.username;

  let user = await db.collection('registered').findOne({ username: username });

  if (user) {
    /* let wishlist = []
    if (user.wishlist) { wishlist = user.wishlist } */
    console.log(user.wishlist)
    db.collection('registered').update(
      { username: username },
      { $addToSet: { wishlist: req.body.data } }
    )
    /*   wishlist.push(
  
        req.body.data
      ); */

    /* db.collection('registered').updateOne({ username: username }, { $set: { "wishlist": wishlist } }) */
    return res.status(200).send(JSON.stringify({
      code: 200,
      error: false,
      message: 'Card added to wishlist',
      user: user,
    }));
  }
  else {
    return res.status(400).send(JSON.stringify({
      code: 400,
      error: true,
      message: 'Error'
    }));
  }

});


router.get('/stats', async (req, res) => {
  var username = req.query.username;
  console.log('stats')
  const projection = { "_id": 0 };
  let query = {
    "username": req.query.username
  }
  let logs = await db.collection('search_log').find(query, projection).sort()
    .toArray();

  if (logs) {
    var brandAll = 0
    var brandPokemon = 0
    var brandYugioh = 0
    var brandMagic = 0
    logs.forEach(element => {
      if (element.brand == 'All') brandAll = brandAll + 1
      else if (element.brand == 'Pokémon') brandPokemon = brandPokemon + 1
      else if (element.brand == 'Yugioh') brandYugioh = brandYugioh + 1
      else if (element.brand == 'Magic') brandMagic = brandMagic + 1

    });
    let data = {
      'count': logs.length,
      'brandAll': brandAll,
      'brandPokemon': brandPokemon,
      'brandYugioh': brandYugioh,
      'brandMagic': brandMagic
    }
    console.log(logs)
    return res.status(200).send(JSON.stringify({
      code: 200,
      error: false,
      message: 'Card added to wishlist',
      stats: data,
    }));
  }
  else {
    return res.status(400).send(JSON.stringify({
      code: 400,
      error: true,
      message: 'Error'
    }));
  }

});


module.exports = router;