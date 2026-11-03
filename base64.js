const base64 =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export function encode(answers) {
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

	return str;
}

export function decode(base64str) {
	const choices = [];

	for (let i = 0; i < base64str.length; i++) {
		let curr = base64.indexOf(base64str[i]);
		let a = Math.floor(curr / 8);
		let b = curr % 8;

		choices.push(a);
		choices.push(b);
	}

	return choices;
}
