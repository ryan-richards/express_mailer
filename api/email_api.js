const express = require('express');
const router = express.Router();
const email = require('./email');
var cors = require('cors')

router.use(cors({
    origin: '*'
}));


router.all('*', cors());

router.use(express.urlencoded({extended: true})); 
router.use(express.json());


router.post("/", async (req, res, next) => {
    try {
      res.send(await email.getData());
    } catch (err) {
      next(err);
    }
});

router.post("/contact", async (req, res, next) => {
  try {
    res.send(await email.getContactData());
  } catch (err) {
    next(err);
  }
});


module.exports = router;
