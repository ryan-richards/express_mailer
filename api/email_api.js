const express = require('express');
const router = express.Router();
const email = require('./email');


app.use(express.urlencoded({extended: true})); 
app.use(express.json());

router.post("/", async (req, res, next) => {
    const name
    try {
      res.send(await email.sendOrderConfirmation(req.body));
    } catch (err) {
      next(err);
    }
  });

module.exports = router;