const base64 =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export function encode(answers) {
	let str = '';

	for (let i = 0; i < answers.length; i += 2) {
		str += base64[answers[i] * 8 + answers[i + 1]];
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
