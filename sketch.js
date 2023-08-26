var dropzone;
var button;
var jumpButton;
var slider;
var preLoadedd;
var preLoadedd2;
var ranButton;

var song;
var bands;
var smoothing;
var loudness;
var fft;
var fftPeak;
var vol;
var peakDetect;
var start;
var end;
var theta1;
var theta2;
var sign;
var low;
var high;
var visual;
var ranArray;
var loading;
var angle;
var randArray;
var randomVar;

var x6;
var x8;
var x9;
var y7;
var y8;
var y9;
var speed6;
var speed7;
var speed8;
var speed9;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  bands = 32
  smoothing = 0.6;
  loudness = 0.3;
  start = 8
  end = 14
  theta1 = 90;
  theta2 = 90;
  sign = -1;
  low = 40;
  high = 150;
  ranArray = [];
  loading = false;
  angle = 0;
  randomVar = 0;
  
  x6 = 0;
  x8 = 0;
  x9 = width;
  y7 = 0;
  y8 = 0;
  y9 = 0;
  
  speed6 = 4;
  speed7 = 4;
  speed8 = 4;
  speed9 = 3;

  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unHighlight);
  dropzone.drop(gotFile, unHighlight);
  dropzone.position(0, 460);

  button = createButton("Play");
  jumpButton = createButton("Jump");
  preLoadedd = createButton("Pre-loaded Song 1")
  preLoadedd.mousePressed(preLoaded);
  preLoadedd2 = createButton("Pre-loaded Song 2")
  preLoadedd2.mousePressed(preLoaded2);
  ranButton = createButton("Click to change circle");
  ranButton.mousePressed(randomNumArray1);
  slider = createSlider(0, 1, loudness, 0.01);

  fft = new p5.FFT(smoothing, bands);
  vol = new p5.Amplitude();
  fftPeak = new p5.FFT();
  //peakDetect = new p5.PeakDetect(14000, 14100);
  peakDetect = new p5.PeakDetect(9200, 9200);
  visual = new Visualizer(bands, smoothing, loudness, fft, vol, start, end);

  randomNumArray(start, end, bands, ranArray);
}

function draw() {
  background(200);
  translate(width / 2, height / 2);

  fftPeak.analyze();
  peakDetect.update(fftPeak);

  if (peakDetect.isDetected) {
    randomVar = Math.floor(random(0, 12));
  }

  //randomVar = 11;

  if (song != null && song.isLoaded() && randomVar == 0) {

    colorMode(HSB, 360, 100, 100, 100);
    background(330, 100, 100);
    visual.visualize(0, 0, theta1, theta2, sign, low, high, ranArray);
    loading = false;
    colorMode(RGB);

  } else if (song != null && song.isLoaded() && randomVar == 1) {

    colorMode(HSB, 360, 100, 100, 100);
    background(0, 100, 100);
    visual.visualize(-100, -100, theta1, theta2, sign, low, high, ranArray);
    colorMode(RGB);
    
  } else if (song != null && song.isLoaded() && randomVar == 2) {

    colorMode(HSB, 360, 100, 100, 100);
    background(20, 100, 100);
    visual.visualize(100, -100, theta1, theta2, sign, low, high, ranArray);
    colorMode(RGB);

  } else if (song != null && song.isLoaded() && randomVar == 3) {

    colorMode(HSB, 360, 100, 100, 100);
    background(40, 100, 100);
    visual.visualize(-100, 100, theta1, theta2, sign, low, high, ranArray);
    colorMode(RGB);

  } else if (song != null && song.isLoaded() && randomVar == 4) {

    colorMode(HSB, 360, 100, 100, 100);
    background(60, 100, 100);
    visual.visualize(100, 100, theta1, theta2, sign, low, high, ranArray);
    colorMode(RGB);

  } else if (song != null && song.isLoaded() && randomVar == 6) {

    colorMode(HSB, 360, 100, 100, 100);
    background(80, 100, 100);
    translate(-width / 2, -height / 2);
     
    visual.visualize(x6, height / 2, theta1, theta2, sign, low, high, ranArray);
    
    if (x6 > width || x6 < 0) {
      speed6= speed6 * -1;
    }
    x6 += speed6;
    colorMode(RGB);
    
  } else if (song != null && song.isLoaded() && randomVar == 7) {

    colorMode(HSB, 360, 100, 100, 100);
    background(320, 100, 100);
    translate(-width / 2, -height / 2);
     
    visual.visualize(width / 2, y7, theta1, theta2, sign, low, high, ranArray);
    
    if (y7 > width || y7 < 0) {
      speed7 = speed7 * -1;
    }
    y7 += speed7;
    colorMode(RGB);
    
  } else if (song != null && song.isLoaded() && randomVar == 8) {

    colorMode(HSB, 360, 100, 100, 100);
    background(340, 100, 100);
    translate(-width / 2, -height / 2);
     
    visual.visualize(x8, y8, theta1, theta2, sign, low, high, ranArray);
    
    if ((x8 > width || x8 < 0) && (y8 > width || y8 < 0)) {
      speed8 = speed8 * -1;
    }
    x8 += speed8;
    y8 += speed8;
    colorMode(RGB);
    
  } else if (song != null && song.isLoaded() && randomVar == 9) {

    colorMode(HSB, 360, 100, 100, 100);
    background(30, 100, 100);
    translate(-width / 2, -height / 2);
     
    visual.visualize(x9, y9, theta1, theta2, sign, low, high, ranArray);
    
    if ((x9 > width || x9 < 0) && (y9 > width || y9 < 0)) {
      speed9 = speed9 * -1;
    }
    x9 -= speed9;
    y9 += speed9;
    colorMode(RGB);
    
  } else if (song != null && song.isLoaded() && randomVar == 5) {

    colorMode(HSB, 360, 100, 100, 100);
    background(50, 100, 100);
    translate(-width / 2, -height / 2);
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= height; y += 50) {
        visual.visualize(x, y, theta1, theta2, sign, 8, 30, ranArray);
      }
    }
    colorMode(RGB);

  } else if (song != null && song.isLoaded() && randomVar == 10) {

    colorMode(HSB, 360, 100, 100, 100);
    background(70, 100, 100);
    translate(-width / 2, -height / 2);
    for (let x = 0; x <= width; x += 100) {
      for (let y = 0; y <= height; y += 100) {
        visual.visualize(x, y, theta1, theta2, sign, 10, 60, ranArray);
      }
    }
    colorMode(RGB);

  } else if (song != null && song.isLoaded() && randomVar == 11) {

    colorMode(HSB, 360, 100, 100, 100);
    background(350, 100, 100);
    translate(-width / 2, -height / 2);
    visual.visualize(width / 2, height / 2, theta1, theta2, sign, low, high, ranArray);
    visual.visualize(0, 0, theta1, theta2, sign, low, high, ranArray);
    visual.visualize(0, height, theta1, theta2, sign, low, high, ranArray);
    visual.visualize(width, height, theta1, theta2, sign, low, high, ranArray);
    visual.visualize(width, 0, theta1, theta2, sign, low, high, ranArray);
    colorMode(RGB);
    
  } else if (loading == true) {

    loadingAnimation();

  } else {

    visual.visualize(0, 0, theta1, theta2, sign, low, high, ranArray);

  }

  if (song != null && song.isLoaded()) {
    song.setVolume(slider.value());
  }
}







function gotFile(file) {
  if (song != null) {
    song.stop();
  }
  loading = true;
  song = loadSound(file.data, loaded);
}

function highlight() {
  dropzone.style('background-color', '#bbb');
}

function unHighlight() {
  dropzone.style('background-color', '#fff');
}

function loadingAnimation() {
  strokeWeight(10);
  stroke(20);
  rotate(angle);

  for (let i = 0; i < 360; i += 60) {
    let r = 35;
    let x = r * cos(i);
    let y = r * sin(i);
    point(x, y);
  }

  angle += 8
}

function randomNumArray1() {
  for (let i = start; i < bands - end; i++) {
    ranArray.push(i);
  }
  shuffle(ranArray, true);
}

function randomNumArray(start, end, bands, array) {
  for (let i = start; i < bands - end; i++) {
    array.push(i);
  }
  shuffle(array, true);
}

function preLoaded() {
  if (song != null) {
    song.stop();
  }
  loading = true;
  song = loadSound("Music/Vicetone ft. D Brown - What I've Waited For (online-audio-converter.com).mp3", loaded);
}

function preLoaded2() {
  if (song != null) {
    song.stop();
  }
  loading = true;
  song = loadSound("Music/RIOT - Overkill [Monstercat Release] (online-audio-converter.com).mp3", loaded);
}

function jumpPoint() {
  let len = song.duration();
  song.jump(len / 2);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(loudness);
    button.html("pause");
  } else {
    song.pause();
    button.html("play");
  }
}

function loaded() {
  console.log("loaded");

  button.mousePressed(togglePlaying);
  jumpButton.mousePressed(jumpPoint);
}