import { decode } from './base64.js';
import { useLocalization } from './localization.js';
import { convertToVector, dot } from './vector-math.js';

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

	const vectorA = convertToVector(answers1, true);
	const vectorB = convertToVector(answers2, true);

	const result = (dot(vectorA, vectorB) * 100).toFixed(1);
	document.querySelector('#results').style.display = 'unset';

	document.querySelector('#similarity').innerText = `${result}%`;
});
