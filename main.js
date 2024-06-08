song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

posenet = ml5.poseNet(video, modelLoaded);
posenet.on("pose", gotPoses);
}

function modelLoaded(){
console.log("Posenet is initialized");
}

function gotPoses(results){
if(results.length > 0){
console.log(results);
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("The left wrist x is " + leftWristX + "and the left wrist y is " + leftWristY);
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("The right wrist x is " + rightWristX + "and the right wrist y is " + rightWristY);
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("The score of left wrist is " + scoreLeftWrist + "and the score of right wrist is " + scoreRightWrist);
}    
}

function draw(){
image(video, 0, 0, 600, 500);
fill("red");
stroke("black");
if(scoreLeftWrist > 0.2){
circle(leftWristX, leftWristY, 20);
inNumberleftWristY = Number(leftWristY);
remove_decimals = floor(inNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume_heading").innerHTML = "Volume = " + volume;
song.setvolume(volume);
}
if(scoreRightWrist > 0.2){
circle(rightWristX, rightWristY, 20)

if(rightWristY>0 && rightWristY <= 100){
document.getElementById("speed_heading").innerHTML = "Speed = 0.5";
song.rate(0.5);
}
else if(rightWristY>100 && rightWristY <= 200){
    document.getElementById("speed_heading").innerHTML = "Speed = 1";
    song.rate(1);
    }
else if(rightWristY>200 && rightWristY <= 300){
    document.getElementById("speed_heading").innerHTML = "Speed = 1.5";
    song.rate(1.5);
    }
else if(rightWristY>300 && rightWristY <= 400){
    document.getElementById("speed_heading").innerHTML = "Speed = 2";
    song.rate(2);
    }
else if(rightWristY>400 && rightWristY <= 500){
    document.getElementById("speed_heading").innerHTML = "Speed = 2.5";
    song.rate(2.5);
    }
}
}

function playing(){
song.play();
song.setvolume(1);
song.rate(1);
}