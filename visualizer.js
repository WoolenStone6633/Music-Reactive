class Visualizer {
  constructor(_bands, _smoothing, _level, _fft, _vol, _start, _end) {
    this.level = _level;
    this.fft = _fft;
    this.vol = _vol;
    this.bands = _bands;
    this.smoothing = _smoothing;
    this.start = _start;
    this.end = _end;
  }

  visualize(positionX, positionY, theta1, theta2, sign, lowR, highR, ranArray) {

    let spectrum = this.fft.analyze();
    let total = 360;

    beginShape();

    this.colorChanger();
    
    //starts calculating the values used to create the circle
    for (let i = 0; i < spectrum.length - this.end - this.start; i++) {
      let angle = map(i, this.start, spectrum.length - this.end, 0, total);
      let amp = spectrum[ranArray[i]];
      let r = map(amp, 0, 256, lowR, highR) + map(this.vol.getLevel(), 0, this.level, 0, 50);

      //reverses the r and makes it go the opposite direction at a certain threshold (this.high / 1.2)
      if (i % 2 == 0 && r > Math.floor(highR / 1.2)) {
        r += (Math.floor(highR / 1.2) - r) * 2;
      }

      //sets the points of the circle at x and y
      let x = r * sign * -cos(angle + theta1);
      let y = r * -sin(angle + theta2);

      //creates the points of the circle and connects them
      curveVertex(x + positionX, y + positionY);
      // stroke(0, 255, 255);
      // strokeWeight(8);
      // point(x + positionX, y + positionY);
      // colorChanger();

      //closes the circle with extra points
      if (i == spectrum.length - this.end - this.start - 1) {
        angle = map(0, this.start, spectrum.length - this.end, 0, total);
        amp = spectrum[ranArray[0]];
        r = map(amp, 0, 256, lowR, highR) + map(this.vol.getLevel(), 0, this.level, 0, 50);
        if (r > Math.floor(highR / 1.2)) {
          r += (Math.floor(highR / 1.2) - r) * 2;
        }
        x = r * sign * -cos(angle + theta1);
        y = r * -sin(angle + theta2);
        curveVertex(x + positionX, y + positionY);
        //vertex(x + positionX, y + positionY)
        // stroke(0, 255, 255);
        // strokeWeight(8);
        // point(x + positionX, y + positionY);
        // colorChanger();

        angle = map(1, this.start, spectrum.length - this.end, 0, total);
        amp = spectrum[ranArray[1]];
        r = map(amp, 0, 256, lowR, highR) + map(this.vol.getLevel(), 0, this.level, 0, 50);
        x = r * sign * -cos(angle + theta1);
        y = r * -sin(angle + theta2);
        curveVertex(x + positionX, y + positionY);
        //vertex(x + positionX, y + positionY)
        // stroke(0, 255, 255);
        // strokeWeight(8);
        // point(x + positionX, y + positionY);
        // colorChanger();

        angle = map(2, this.start, spectrum.length - this.end, 0, total);
        amp = spectrum[ranArray[2]];
        r = map(amp, 0, 256, lowR, highR) + map(this.vol.getLevel(), 0, this.level, 0, 50);
        if (r > Math.floor(highR / 1.2)) {
          r += (Math.floor(highR / 1.2) - r) * 2;
        }
        x = r * sign * -cos(angle + theta1);
        y = r * -sin(angle + theta2);
        curveVertex(x + positionX, y + positionY);
        //vertex(x + positionX, y + positionY);
        // stroke(0, 255, 255);
        // strokeWeight(8);
        // point(x + positionX, y + positionY);
        // colorChanger();
      }
    }

    endShape();
  }

  //function changes the color of the circle
  colorChanger() {
    colorMode(HSB, 360, 100, 100, 100);
    fill(map(this.vol.getLevel(), 0, this.level, 150, 250), 100, 100, 30);
    strokeWeight(8);
    stroke(map(this.vol.getLevel(), 0, this.level, 150, 250), 100, 100, 50);
    colorMode(RGB);
  }
}