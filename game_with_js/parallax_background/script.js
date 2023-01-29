const canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './backgroundLayer/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './backgroundLayer/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './backgroundLayer/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './backgroundLayer/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './backgroundLayer/layer-5.png';

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', event => {
  gameSpeed = event.target.value;
  showGameSpeed.innerHTML = gameSpeed;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    // this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) this.x = 0;
    this.x = Math.floor(this.x - this.speed);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1.0);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObjects.forEach(layer => {
    layer.update();
    layer.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// let x = 0;
// let x2 = 2400;

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   ctx.drawImage(backgroundLayer4, x, 0);
//   ctx.drawImage(backgroundLayer4, x2, 0);

//   x < -2400 ? (x = 2400 + x2 - gameSpeed) : (x -= gameSpeed);
//   x2 < -2400 ? (x2 = 2400 + x - gameSpeed) : (x2 -= gameSpeed);

//   requestAnimationFrame(animate);
// }

// animate();
