export function convertToVector(answers, normalize) {
	const vector = [];

	let l = 0;

	for (let i = 0; i < answers.length; i++) {
		vector.push(answers[i] / 4);
		l += (answers[i] / 4) ** 2;
	}

	if (normalize) {
		l = Math.sqrt(l);

		for (let i = 0; i < vector.length; i++) {
			vector[i] /= l;
		}
	}

	return vector;
}

export function dot(vecA, vecB) {
	let sum = 0;

	for (let i = 0; i < vecA.length; i++) {
		sum += vecA[i] * vecB[i];
	}

	return sum;
}
