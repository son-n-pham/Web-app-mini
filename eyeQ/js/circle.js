const timeCounterText = document.querySelector(".time-counter");
const circleEl = document.querySelector(".circle");
console.dir(circleEl);
console.log(typeof circleEl.clientHeight);
console.log(document.documentElement.clientHeight);

// Wait function returning a Promise
const wait = function(seconds) {
	return new Promise(resolve => {
		setTimeout(resolve, seconds*1000)
})
};

// wait(3)
// 	.then(()=>{
// 		console.log('I waited for 3 seconds');
// 		return wait(10);
// 	})
// 	.then(() => console.log("I waited for another 10 seconds"))


let initial = 0;
let currentRadius=circleEl.clientHeight;
let currentBorder = 1;

const expandElelemt = function(el) {
	// console.log(currentRadius);
	el.style.width = `${currentRadius}px`;
	el.style.height = el.style.width;
	// circleEl.style.border = `${currentBorder}px solid red`;
	if (currentRadius > document.documentElement.clientHeight || currentRadius > document.documentElement.clientWidth) currentRadius=1;
}

const timeCounter = function(timeStep) {
	return new Promise(resolve => {
		const eternalLoop = setInterval(resolve => {
			initial ++;

			timeCounterText.textContent = initial;
			expandElelemt(circleEl)
			// if (currentRadius > document.documentElement.clientHeight || currentRadius > document.documentElement.clientWidth) clearInterval(eternalLoop);
			currentRadius += 100;
			currentBorder += 1;

		}, timeStep*1000);
	})
}

timeCounter(0.5);