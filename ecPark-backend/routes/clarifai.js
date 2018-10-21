var express = require('express');
var router = express.Router();
const Clarifai = require('clarifai');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const fs = require('fs');

const predictImg = require('./alpr');


const app = new Clarifai.App({
 apiKey: 'c1e1e8ea3da0406e8048cd551ff6fe32'
});
let concepts;


var prediction = (concepts) => {
    // console.log(concepts);
    var i;
    for (i = 0; i < concepts.length; i++) {
        if (concepts[i]['name'] == 'car' && concepts[i]['value'] >= 0.90) {
            return true;
        }
    }
    return false;
};


router.post("/", upload.single('image'), (req, res) => {

    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        app.models.predict(Clarifai.GENERAL_MODEL, {base64: data.toString('base64')})
          .then(response => {

            concepts = response['outputs'][0]['data']['concepts'];

            let pred = prediction(concepts);

            if (pred == true) {

                res.sendStatus(200);
            } else {
                // Fine the motherffuckrt
                res.sendStatus(204);
            }
          }, error => {
            console.log(error);
          });

    });
});



module.exports = router;
