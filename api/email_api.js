const express = require('express');
const router = express.Router();
const email = require('./email');


router.post("/", async (req, res, next) => {
    try {
      res.json(await email.sendOrderConfirmation(req.body));
    } catch (err) {
      next(err);
    }
  });

module.exports = router;