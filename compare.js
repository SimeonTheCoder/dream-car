import { decode } from './base64.js';
import { useLocalization } from './localization.js';

useLocalization();

document.querySelector('#results').style.display = 'none';

document.querySelector('#compare-btn').addEventListener('click', (e) => {
	const otherCode = document.querySelector('input[name="other-code"]').value;

	if (
		otherCode == undefined ||
		otherCode == null ||
		otherCode.trim().length < 10
	)
		return;

	const answers1 = decode(localStorage.getItem('code'));
	const answers2 = decode(otherCode);

	const vectorA = convertToVector(answers1);
	const vectorB = convertToVector(answers2);

	console.log(vectorA);
	console.log(vectorB);

	const result = (dot(vectorA, vectorB) * 100).toFixed(1);
	document.querySelector('#results').style.display = 'unset';

	document.querySelector('#similarity').innerText = `${result}%`;
});

function convertToVector(answers) {
	const vector = [];

	let l = 0;

	for (let i = 0; i < answers.length; i++) {
		vector.push(answers[i] / 4);
		l += (answers[i] / 4) ** 2;
	}

	l = Math.sqrt(l);

	for (let i = 0; i < vector.length; i++) {
		vector[i] /= l;
	}

	return vector;
}

function dot(vecA, vecB) {
	let sum = 0;

	for (let i = 0; i < vecA.length; i++) {
		sum += vecA[i] * vecB[i];
	}

	return sum;
}
