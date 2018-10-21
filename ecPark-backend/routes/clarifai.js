var express = require("express");
var router = express.Router();
const Clarifai = require("clarifai");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const predictImg = require("./alpr");

let elTiming = {
  HEYI64: {
    start_time: new Date()
  }
};
let state = { current: "UNINITIALIZED" };

const app = new Clarifai.App({
  apiKey: "c1e1e8ea3da0406e8048cd551ff6fe32"
});
let concepts;

let prediction = concepts => {
  // console.log(concepts);
  var i;
  for (i = 0; i < concepts.length; i++) {
    if (concepts[i]["name"] == "car" && concepts[i]["value"] >= 0.9) {
      return true;
    }
  }
  return false;
};

router.post("/", upload.single("image"), (req, res) => {
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    app.models
      .predict(Clarifai.GENERAL_MODEL, { base64: data.toString("base64") })
      .then(
        async response => {
          concepts = response["outputs"][0]["data"]["concepts"];
          let pred = prediction(concepts);

          if (pred == true) {
            let tag = await predictImg(req.file.path);
            if (elTiming.tag != undefined) {
              elTiming.tag.endtime = new Date();
              io.emit("endDate", elTiming.tag.endtime);
              io.emit(
                "timedelta",
                elTiming.tag.endtime - elTiming.tag.starttime
              );
            } else {
              elTiming.tag = {
                starttime: new Date()
              };
              io.emit("startDate", elTiming.tag.starttime);
            }
          } else {
            // Fine the car
          }
        },
        error => {
          console.log(error);
        }
      );
  });
  res.sendStatus(200);
});

router.get("/timer", (req, res) => {
  res.json({
    status: state.current,
    start_time: elTiming["HEYI64"].start_time
  });
});

module.exports = router;
