const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");
let model;
const context = canvas.getContext("2d");
const options = {
  flipHorizontal: false,
  maxNumBoxes: 3,
  scoreThreshold: 0.7,
};
handTrack.load(options).then(function (modelData) {
  model = modelData;
  console.log(model);
});
handTrack.startVideo(video).then(function (status) {
  if (status) {
    console.log(status);
    startDetection();
  } else {
    console.log("video loading failed");
  }
});
function startDetection() {
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas, context, video);
    requestAnimationFrame(startDetection);
  });
}
