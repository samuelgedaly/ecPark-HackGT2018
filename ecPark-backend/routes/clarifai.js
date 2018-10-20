var express = require('express');
var router = express.Router();
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c1e1e8ea3da0406e8048cd551ff6fe32'
});

router.post("/", (req, res, next) => {
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict(req.data.image);
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      })
    let prediciton = prediction(concepts);
    if (prediction == true) {
        res.sendStatus(200);
    } else {
        res.sendStatus(304);
    }
});

function prediction(concepts) {
    var i;
    for (i = 0; i < concepts.length; i++) {
        if (concepts['name'] == 'car' && concepts['value'] >= 0.90) {
            return true;
        }
    }
    return false;
}


