import { decode } from './base64.js';
import { useLocalization } from './localization.js';
import { convertToVector, dot } from './vector-math.js';

useLocalization();

document.querySelector('#compare-btn').addEventListener('click', (e) => {
	const codeA = document.querySelector('input[name="code-a"]').value;
	const codeB = document.querySelector('input[name="code-b"]').value;

	if (codeA == undefined || codeA == null || codeA.trim().length < 10) return;
	if (codeB == undefined || codeB == null || codeB.trim().length < 10) return;

	const answers1 = decode(codeA);
	const answers2 = decode(codeB);

	const vectorA = convertToVector(answers1, true);
	const vectorB = convertToVector(answers2, true);

	const result = (dot(vectorA, vectorB) * 100).toFixed(1);

	document.querySelector('#results').style.display = 'unset';
	document.querySelector('#similarity').innerText = `${result}%`;
});
