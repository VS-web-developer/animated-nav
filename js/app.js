const sections = document.querySelectorAll('section');
const anchors = document.querySelectorAll('.main-menu__link a')
const bubble = document.querySelector('.main-menu__bubble');
const gradients = [
	'linear-gradient(to right top, #c0392b, #8e44ad)',
	'linear-gradient(to right top, #159957, #155799)',
	'linear-gradient(to right top,	#30e8bf, #ff8235)'
];

const options = {
	threshold: 0.7
}

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
	entries.forEach(entry => {
		const className = entry.target.className;
		const activeAnchor = document.querySelector(`[data-page=${className}]`);
		const gradientIndex = entry.target.getAttribute('data-index');
		const coords = activeAnchor.getBoundingClientRect();

		const directions = {
			height: coords.height,
			width: coords.width,
			top: coords.top,
			left: coords.left
		};
		if (entry.isIntersecting) {
			bubble.style.display = 'block';
			bubble.style.setProperty('left', `${directions.left}px`);
			bubble.style.setProperty('top', `${directions.top}px`);
			bubble.style.setProperty('width', `${directions.width}px`);
			bubble.style.setProperty('height', `${directions.height}px`);
			bubble.style.background = gradients[gradientIndex];
			activeAnchor.style.color = 'white';
		}
		else {
			activeAnchor.style.color = 'black';
		}
	});
}
sections.forEach(section => {
	observer.observe(section);
});

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const blockID = anchor.getAttribute('href').substr(1)

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}