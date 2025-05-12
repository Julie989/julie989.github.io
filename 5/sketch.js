let bubbles = [];
let numberOfBubbles = 7;
let blurAmount =0; // Adjust this value to control the blur intensity
//const homeSection = document.getElementById('home');
const homeSection = document.querySelector('.center');


function setup() {
  const canvas = createCanvas(homeSection.offsetWidth, homeSection.offsetHeight);
  //createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1'); // Changed to 1 to bring canvas to the top
  canvas.style('pointer-events', 'none');
  canvas.style('backgroundColor', 'rgba(0,0,0,0)');  // Corrected to backgroundColor and added alpha
  
  for (let i = 0; i < numberOfBubbles; i++) {
    let newBubble = new Bubble(); // Create a new Bubble object
    bubbles.push(newBubble);      // Add it to the array
  }
  print(bubbles);
}

function draw() {
   // Apply the blur filter to the entire canvas
  drawingContext.filter = `blur(${blurAmount}px)`;
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  
  }
}

class Bubble{
  constructor(){
    this.x = 200; 
    this.y = 150;  
    this.strokeRed = 0;   
    this.strokeGreen = 0;
    this.strokeBlue = 0;  
    this.pickStrokeColor(); 
  
  }
  
  pickStrokeColor() {
  this.strokeRed = random(150, 200);
  this.strokeGreen = random(50, 100); 
  this.strokeBlue = random(180, 255); 
  }
  
  move(){
    let randomX = random(-10, 10);
  let randomY = random(-10, 10);
    let xDistance = mouseX - this.x;
    let yDistance = mouseY - this.y;
    let speedFactor = 0.01; 
    
  this.x = this.x + randomX + xDistance * speedFactor;
  this.y = this.y + randomY + yDistance * speedFactor;
    
  }
  

  show(){
   stroke(this.strokeRed, this.strokeGreen, this.strokeBlue);
  strokeWeight(2);
  noFill();
  //ellipse(this.x, this.y, 20, 20);
    beginShape();
    //this draw an heart
    
    drawStar(this.x, this.y, 10, 30, 4);
  //curveVertex(this.x, this.y - 10); // Top point
  //curveVertex(this.x + 5, this.y - 15);
  //curveVertex(this.x + 10, this.y - 10);
  //curveVertex(this.x, this.y + 5);
  //curveVertex(this.x - 10, this.y - 10);
  //curveVertex(this.x - 5, this.y - 15);
  //curveVertex(this.x, this.y - 10); // Close the shape
  //endShape(CLOSE);

}
  
}

function drawStar(x, y, innerRadius, outerRadius, numPoints) {

  let angle = TWO_PI / numPoints;  // Angle between points

  let halfAngle = angle / 2.0;     // Half angle for inner points

  beginShape();

  for (let i = 0; i < TWO_PI; i += angle) {
    let sx = x + cos(i) * outerRadius;
    let sy = y + sin(i) * outerRadius;
    vertex(sx, sy);
    sx = x + cos(i + halfAngle) * innerRadius;
    sy = y + sin(i + halfAngle) * innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key === 's') {
    save("pattern.png"); 
  }
} 