const video = document.querySelector("#videoElement");
const videoBtn = document.querySelector("#on-video");
const micBtn = document.querySelector("#on-mic");

videoBtn.onclick = function() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: { max: 400 }, height: { max: 550 } }})
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
      }
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

micBtn.onclick = function() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const microphone = context.createMediaStreamSource(stream);
        const filter = context.createBiquadFilter();
        // microphone -> filter -> destination
        microphone.connect(filter);
        filter.connect(context.destination);
      });
}
