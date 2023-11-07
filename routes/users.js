const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', (req,res,next) => {
  res.send('<h1>test</h1>')
})

module.exports = router;
