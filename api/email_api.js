const express = require('express');
const router = express.Router();
const email = require('./email');
var cors = require('cors')

router.all('*', cors());

router.use(express.urlencoded({extended: true})); 
router.use(express.json());


router.post("/", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      res.send(await email.sendOrderConfirmation(req.body));
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
