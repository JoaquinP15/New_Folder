prediction = " "

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png_format',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '">';
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/njFt_zMQH/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

function speak(){
    var Synth = window.speechSynthesis;

    speak_data = "Prediction Is " + prediction;

    utter_this = new SpeechSynthesisUtterance(speak_data);
    Synth.speak(utter_this);
}