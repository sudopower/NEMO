  var express = require("express");
  var app = express();
  const multer  = require('multer')
  const Tesseract  = require('tesseract.js')
  var mongoose = require("mongoose");

  const port = process.env.PORT || 3000;
  const upload = multer({ dest: './public/images/' })
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost:27017/node-demo", {useNewUrlParser: true});
  var nameSchema = new mongoose.Schema({
      name: String,
      phone: String,
      bill: String,
      billText: String,
      total:String
  });
  var User = mongoose.model("User", nameSchema);
  app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
  });

  app.post("/addbill",upload.single('bill'), (req, res) => {
      var myData = new User(req.body);
      myData.file = req.file.filename;
      Tesseract.recognize(req.file.path)
        .then(function (result) { 
          var extractBillVal = new RegExp(/Total Invoice Value ((\d+).(\d+))/);
          let matched = extractBillVal.exec(result.text);        
          myData.billText = result.text
          myData.total = matched[1]
          myData.save()
          .then(item => {
              res.send("Bill Saved !\nExtracted Amount is: "+matched[1]);
          })
          .catch(err => {
              res.status(400).send("Unable to save to database");
          });
        })   
  });

  app.listen(port, () => {
      console.log("Server listening on port " + port);
  });