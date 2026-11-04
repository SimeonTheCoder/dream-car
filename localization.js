export const localizationEn = {
	title: 'Your Dream Car',
	'take-the-test': 'Take the Test',
	compare: 'Compare with Others',
	'global-stats': 'Global Stats',
	'bg-button': 'BG',
	'en-button': 'EN',
	slogan: "Your dream car,<br />if money wasn't a problem!",
	'desc-text':
		'Answer the questions below to find your dream car.<br />Every question can be answered using the following:',
	'no-circle': 'No',
	'maybe-not-circle': 'Maybe Not',
	'unsure-circle': 'Unsure',
	'maybe-circle': 'Maybe',
	'yes-circle': 'Yes',
	'a-few-more-questions': 'A few more questions',
	age: "What's your age?",
	gender: "What's your gender?",
	submit: 'Submit',
	'thank-you-text': 'Thank you for your time!',
	'your-code': 'Your code:',
	'enter-code': 'Enter codes:',
	'compare-with-a-friend': 'Compare with a friend',
	'compare-btn': 'Compare',
	'you-have-a': 'Your tastes have a similarity of:',
	'continue-to-the-test': 'Take the test',
	continue: 'Continue',
	'take-the-test-again': 'Take the test again',
};

export const localizationBg = {
	title: 'Мечтана кола',
	'take-the-test': 'Направете теста',
	compare: 'Сравнете',
	'global-stats': 'Статистика',
	'bg-button': 'БГ',
	'en-button': 'EN',
	slogan: 'Твоята мечтана кола<br />ако парите не бяха проблем!',
	'desc-text':
		'Отговорете на въпросите долу за да откриете вашата мечтана кола.<br />Всеки въпрос следва следният формат:',
	'no-circle': 'Не',
	'maybe-not-circle': 'По-скоро не',
	'unsure-circle': 'Несигурен/а',
	'maybe-circle': 'По-скоро да',
	'yes-circle': 'Да',
	'a-few-more-questions': 'Още няколко въпроса',
	age: 'На колко години сте?',
	gender: 'Какъв е вашият пол?',
	submit: 'Изпратете',
	'thank-you-text': 'Благодарим за отделеното време!',
	'your-code': 'Вашият код:',
	'enter-code': 'Въведете кодове:',
	'compare-with-a-friend': 'Сравнете с приятел',
	'compare-btn': 'Сравнете',
	'you-have-a': 'Имате сходство на вкуса:',
	'continue-to-the-test': 'Започнете теста',
	continue: 'Продължете',
	'take-the-test-again': 'Направете теста отново',
};

export function loadStrings(localization) {
	for (let key in localization) {
		if (document.getElementById(key))
			document.getElementById(key).innerHTML = localization[key];
	}
}

export function useLocalization() {
	document.querySelector('#bg-button').addEventListener('click', (e) => {
		loadStrings(localizationBg);

		e.currentTarget.classList.add('salmon');
		document.querySelector('#en-button').classList.remove('salmon');
	});

	document.querySelector('#en-button').addEventListener('click', (e) => {
		loadStrings(localizationEn);

		e.currentTarget.classList.add('salmon');
		document.querySelector('#bg-button').classList.remove('salmon');
	});

	loadStrings(localizationBg);
}
