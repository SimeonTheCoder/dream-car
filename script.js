import { questionTree } from './questions.js';
import { encode, decode } from './base64.js';

document.querySelector('#extra').style.display = 'none';
document.querySelector('#thank-you').style.display = 'none';

const questionsFlat = [];

for (let topic of Object.keys(questionTree)) {
	for (let currQuestion of questionTree[topic].options) {
		questionsFlat.push({
			str: questionTree[topic].header + currQuestion,
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

let prev = [];

function renderQuestion() {
	for (let elem of prev) questionContainer.removeChild(elem);

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

document.querySelector('#submit').addEventListener('click', () => {
	const code = encode(answers);

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
