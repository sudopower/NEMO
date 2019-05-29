const express = require('express');
const app = express();
const router = express.Router();
const upload = require('./uploadMiddleware');

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
  await console.log('post');
});

module.exports = router;