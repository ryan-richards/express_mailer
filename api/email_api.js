const express = require('express');
const router = express.Router();
const email = require('./email');
var cors = require('cors')


router.use(express.urlencoded({extended: true})); 
router.use(express.json());

router.options('/api/email_api', cors())

router.post("/", cors(), async (req, res, next) => {
    try {
      res.send(await email.sendOrderConfirmation(req.body));
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
