const express = require('express');
const router = express.Router();
const email = require('./email');
const supabase = require('./supabase');
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
  res.json({message: 'Supabase route Live'});
});


module.exports = router;
