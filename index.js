const fs = require('fs')
const Tesseract  = require('tesseract.js')

fs.readFile('./public/images/file.jpg', (err, data) => {
  if (err) throw err;
  Tesseract.recognize(data)
       .progress(function  (p) { console.log('progress', p)    })
       .then(function (result) { console.log('result', result.text) })
});
