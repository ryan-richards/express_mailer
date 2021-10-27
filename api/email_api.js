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
      res.send(await email.sendNotification(req.body));
    } catch (err) {
      next(err);
    }
});

router.get("/get_inquires", async (req, res, next) => {
  try {
    res.send(await supabase.get_inquires());
  } catch (err) {p
    next(err);
  }
});


module.exports = router;
