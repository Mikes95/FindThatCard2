var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/findthatcard');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection succeeded");
})
/* GET home page. */
router.get('/', function (req, res, next) {
  /* res.render('index', { title: 'Express' }); */

  res.json({ username: 'Flavio' })
});



router.post('/cardlist', (req, res) => {







  const projection = { "_id": 0 };
  let query = {}

  db.collection('selling-cards').find(query, projection)
    .sort({ name: 1 })
    .toArray()
    .then(items => {
      console.log(`Successfully found ${items.length} documents.`)

      return res.status(200).send(JSON.stringify({
        code: 200,
        error: false,
        message: 'Payment succefull',
        items: items
      }));
    })


});

router.post('/searchcardlist', (req, res) => {
  console.log(req.body)
  var data = {
    "brand": req.body.data.brand,
    "min": req.body.data.min_price,
    "name": req.body.data.name,
    "date": new Date().toISOString().
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, ''),
    "username": req.body.data.username,

  }
  console.log(data)
  db.collection('search_log').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");

  });

  const projection = { "_id": 0 };
  let query = {/* brand : data.brand, */
  /*   "price": {
      $lte: 8000000
    } */
  }

  db.collection('selling-cards').find(query, projection)
    .sort({ name: 1 })
    .toArray()
    .then(items => {
      console.log(`Successfully found ${items.length} documents.`)

      return res.status(200).send(JSON.stringify({
        code: 200,
        error: false,
        message: 'Payment succefull',
        items: items
      }));
    })


});
module.exports = router;
