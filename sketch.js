var gameImg;
var R = 17;
var w, h;

var heights = [];

function preload() {
  gameImg = loadImage("game.png");
}

function setup() {
  w = 50 * R;
  h = 30 * R;
  createCanvas(w, h);
}

function draw() {
  background(0);
  image(gameImg, 0, 0, w, h);

  // pointer
  stroke(255, 100, 0);
  line(0, mouseY, w, mouseY);
  line(mouseX, 0, mouseX, h);

  // connection from last line
  stroke(50, 100, 150);
  if (heights.length > 0) {
    let last = heights[heights.length - 1];
    line(last.x, last.y, mouseX, last.y);
  }

  // connections
  stroke(32);
  if (heights.length > 1) {
    for (let i = 0; i < heights.length - 1; ++i) {
      let t = heights[i];
      let n = heights[i + 1];
      line(t.x, t.y, n.x, t.y);
      line(n.x, t.y, n.x, n.y);
    }
  }
}

function mouseClicked() {
  if (heights.length > 0 && heights[heights.length - 1].x >= mouseX) return;
  heights.push({ x: mouseX, y: mouseY });
}

function keyPressed() {
  if (keyCode == ENTER) {
    console.log("generating function");
    console.log(generateBasicEquation(scaleH(heights)));
  }
}

function geq(b, s) {
  s = s || 0.1;
  return `((((abs(x-(${b.toFixed(2)}))-abs(x-(${b.toFixed(2)})-${s.toFixed(
    2
  )})-abs(x-(100))+abs(x-100-${s.toFixed(2)}))/${s.toFixed(2)}))/2)`;
}

function scaleH(heights) {
  return heights.map((e) => ({
    x: map(e.x, 0, w, -25, 25),
    y: map(e.y, 0, h, -15, 15),
  }));
}

function generateBasicEquation(heights) {
  if (heights.length <= 0) return;
  let r = `${heights[0].y.toFixed(2)}`;
  for (let i = 1; i < heights.length; ++i) {
    let c = heights[i];
    let p = heights[i - 1];
    let n = heights[i + 1] || { x: 100 };

    let diff = p.y - c.y;
    r += `+(${diff.toFixed(2)})*${geq(c.x)}`;
  }
  return r;
}
