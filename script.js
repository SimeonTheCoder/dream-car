document.addEventListener('scroll', () => {
	let max = this.visualViewport.width / 100;
	let t = Math.max(0, Math.min(1, this.scrollY / 1000));

	let currBlur = t * max;
	console.log(document.querySelector('.bg-image'));
	document.querySelector('.bg-image').style.filter =
		`blur(${currBlur.toFixed(0)}px)`;
});

const questions = {
	'body-type': [
		'Sedan',
		'Coupe',
		'Hatchback',
		'SUV',
		'Minivan',
		'Wagon',
		'Cabriolet',
		'Pickup',
	],
};

const answers = [];

const colors = ['darkred', 'red', 'gray', 'green', 'darkgreen'];

for (let topic of Object.keys(questions)) {
	const section = document.getElementById(topic);

	for (let i = 0; i < questions[topic].length; i++) {
		const questionContainer = document.createElement('div');
		const questionStr = document.createElement('h2');
		questionStr.textContent = questions[topic][i];

		questionContainer.appendChild(questionStr);

		const optionsDiv = document.createElement('div');
		optionsDiv.className = 'options';

		for (let j = 0; j < 5; j++) {
			const currCircle = document.createElement('span');
			currCircle.id = `${i}_${j}`;
			currCircle.className = `circle ${colors[j]}`;

			currCircle.onclick = (e) => {
				for (let k = 0; k < 5; k++) {
					if (k == j) continue;
					document
						.getElementById(`${i}_${k}`)
						.classList.remove('pressed');
				}

				answers.push({
					question: i,
					choice: j,
				});

				e.currentTarget.classList.add('pressed');
			};

			optionsDiv.appendChild(currCircle);
		}

		questionContainer.appendChild(optionsDiv);
		section.appendChild(questionContainer);
	}
}
