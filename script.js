document.querySelector('#extra').style.display = 'none';
document.querySelector('#thank-you').style.display = 'none';

document.addEventListener('scroll', () => {
	let max = this.visualViewport.width / 100;
	let t = Math.max(0, Math.min(1, this.scrollY / 1000));

	let currBlur = t * max;
	document.querySelector('.bg-image').style.filter =
		`blur(${currBlur.toFixed(0)}px)`;
});

const questionsTree = {
	'body-type': {
		header: 'I want to drive a ',
		options: [
			'Sedan',
			'Coupe',
			'Hatchback',
			'SUV',
			'Minivan',
			'Wagon',
			'Cabriolet',
			'Pickup',
		],
	},

	priorities: {
		header: "It's important that ",
		options: [
			"it's fun",
			"it's fast",
			"it's great at offroading",
			"it's comfortable",
			"it's eco-friendly",
			'it has good fuel economy',
			"it's new",
			'it has a lot of space for luggage/people',
		],
	},

	preferences: {
		header: "I'd like ",
		options: [
			'a car with an automatic transmission',
			'a car with a manual transmission',
			'an electric vehicle',
			'a vehicle with a combustion engine',
		],
	},
};

const questionsFlat = [];

for (let topic of Object.keys(questionsTree)) {
	for (let currQuestion of questionsTree[topic].options) {
		questionsFlat.push({
			str: questionsTree[topic].header + currQuestion,
		});
	}
}

const answers = [];

const colors = ['darkred', 'red', 'gray', 'green', 'darkgreen'];

const section = document.createElement('section');
document.querySelector('.questions').appendChild(section);

let questionIndex = 0;

const questionContainer = document.createElement('div');
const questionStr = document.createElement('h2');
section.appendChild(questionContainer);

let prev;

function renderQuestion() {
	if (prev) questionContainer.removeChild(prev);

	if (questionIndex == questionsFlat.length) {
		document.querySelector('#extra').style.display = 'unset';
		document.querySelector('article').style.display = 'none';
		return;
	}

	questionStr.textContent = questionsFlat[questionIndex].str;

	questionContainer.appendChild(questionStr);

	const optionsDiv = document.createElement('div');
	optionsDiv.className = 'options';

	for (let j = 0; j < 5; j++) {
		const currCircle = document.createElement('span');
		currCircle.id = `${questionIndex}_${j}`;
		currCircle.className = `circle dimmed ${colors[j]}`;

		currCircle.onclick = (e) => {
			for (let k = 0; k < 5; k++) {
				if (k == j) continue;
				document
					.getElementById(`${questionIndex}_${k}`)
					.classList.remove('pressed');
			}

			answers.push(j);
			e.currentTarget.classList.add('pressed');

			setTimeout(() => {
				questionIndex++;
				renderQuestion();
			}, 200);
		};

		optionsDiv.appendChild(currCircle);
	}

	questionContainer.appendChild(optionsDiv);
	prev = optionsDiv;
}

renderQuestion();

const base64 =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function hashData(answers) {
	let bin = 0;
	let counter = 0;

	let str = '';

	for (let i = answers.length - 1; i > -1; i--) {
		bin += answers[i];
		counter++;

		if (counter == 2) {
			counter = 0;
			str = base64[bin] + str;
			bin = 0;
		}

		bin *= 8;
	}

	if (counter == 1) {
		str = base64[bin] + str;
	}

	console.log(str);
	console.log(decodeData(str));
	return str;
}

function decodeData(base64str) {
	const choices = [];

	for (let i = 0; i < base64str.length; i++) {
		let curr = base64.indexOf(base64str[i]);
		let a = Math.floor(curr / 8);
		let b = curr % 8;

		choices.push(a);
		choices.push(b);
	}

	console.log(choices);
}

document.querySelector('button').addEventListener('click', () => {
	const code = hashData(answers);

	const data = {
		questions: code,
		age: document.querySelector('input[name="age"]').value,
		gender: document.querySelector('select').value,
	};

	document.querySelector('#extra').style.display = 'none';
	document.querySelector('#thank-you').style.display = 'unset';
	document.querySelector('#code').innerText = code;

	console.log(data);
});
