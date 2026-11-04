import { questionTreeBg, questionTreeEn } from './questions.js';
import { useLocalization } from './localization.js';
import { encode, decode } from './base64.js';
import { convertToVector, dot } from './vector-math.js';

let questionTree = questionTreeBg;

useLocalization();

let questionsFlat = flattenTree();

document.querySelector('#bg-button').addEventListener('click', (e) => {
	questionTree = questionTreeBg;
	questionsFlat = flattenTree();

	renderQuestion();
});

document.querySelector('#en-button').addEventListener('click', (e) => {
	questionTree = questionTreeEn;
	questionsFlat = flattenTree();

	renderQuestion();
});

document.querySelector('#extra').style.display = 'none';
document.querySelector('#thank-you').style.display = 'none';

function flattenTree() {
	const flat = [];

	for (let topic of Object.keys(questionTree)) {
		for (let currQuestion of questionTree[topic].options) {
			flat.push({
				str: questionTree[topic].header + currQuestion,
			});
		}
	}

	return flat;
}

const answers = [];

const colors = ['darkred', 'red', 'gray', 'green', 'darkgreen'];

const section = document.createElement('section');
document.querySelector('.questions').appendChild(section);

let questionIndex = 0;

const questionContainer = document.createElement('div');
const questionStr = document.createElement('h2');
section.appendChild(questionContainer);

let prev = [];

function renderQuestion() {
	for (let elem of prev) questionContainer.removeChild(elem);

	if (questionIndex == questionsFlat.length) {
		document.querySelector('#extra').style.display = 'unset';
		document.querySelector('article').style.display = 'none';
		return;
	}

	questionStr.textContent =
		questionsFlat[questionIndex].str +
		` (${questionIndex}/${questionsFlat.length})`;

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

	const backButton = document.createElement('button');
	backButton.innerText = 'Back';

	backButton.addEventListener('click', () => {
		if (answers.length > questionIndex) answers.pop();

		questionIndex--;
		if (questionIndex < 0) questionIndex = 0;

		renderQuestion();
	});

	questionContainer.appendChild(backButton);

	prev = [optionsDiv, backButton];
}

renderQuestion();

document.querySelector('#submit').addEventListener('click', async () => {
	const code = encode(answers);

	const data = {
		questions: code,
		age: document.querySelector('input[name="age"]').value,
		gender: document.querySelector('select').value,
	};

	document.querySelector('#extra').style.display = 'none';
	document.querySelector('#thank-you').style.display = 'unset';
	document.querySelector('#code').innerText = code;

	localStorage.setItem('code', code);
	console.log(data);

	const asVector = convertToVector(answers);
	findClosestMatch(asVector);
});

async function renderCar(car, stats) {
	const card = document.createElement('article');

	const title = document.createElement('h1');
	title.innerText = car;
	title.style.textDecoration = 'underline';
	title.addEventListener('click', () => {
		window.open(
			`https://www.google.com/search?hl=en&q=${encodeURIComponent(car)}`,
		);
	});
	title.style.cursor = 'pointer';

	const desc = document.createElement('h2');
	desc.innerHTML = `${stats.hp} hp<br>${stats.top_speed} km/h<br>${stats.acceleration}s 0-100km/h<br>${stats.engine_type}`;

	card.appendChild(title);
	card.appendChild(desc);

	document.querySelector('main').appendChild(card);
}

async function findClosestMatch(asVector) {
	console.log(asVector);

	const carDb = await fetch('./db.json').then((r) => r.json());

	let closestMatchingCar = [];
	let closestMatch = -1;

	for (let car in carDb) {
		const currMatch = dot(carDb[car].vector, asVector);

		if (currMatch > closestMatch) {
			closestMatchingCar.splice(0, 0, car);
			closestMatch = currMatch;

			if (closestMatchingCar.length > 10) closestMatchingCar.pop();
		}
	}

	for (let i = 0; i < 5; i++) {
		await renderCar(
			closestMatchingCar[i],
			carDb[closestMatchingCar[i]].stats,
		);
	}
}

if (localStorage.getItem('code'))
	findClosestMatch(convertToVector(decode(localStorage.getItem('code'))));
