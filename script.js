const steps = document.querySelectorAll('.step'),
	nextBtns = document.querySelectorAll('.btns li:nth-of-type(2)'),
	prevBtns = document.querySelectorAll('.btns li:nth-of-type(1)'),
	radio = document.querySelectorAll('.radio '),
	userName = document.getElementById('name'),
	userMail = document.getElementById('mail'),
	userPhoneNumber = document.getElementById('phone-number'),
	forms = document.querySelectorAll('.form '),
	options = document.querySelectorAll('.options li'),
	addOns = document.querySelectorAll('.form-3 li'),
	change = document.querySelector('.change '),
	summaryPlan = document.querySelector('.summary li:nth-child(1) '),
	summaryAddOns = document.querySelector('.summary li:nth-child(2) ul'),
	total = document.querySelector('.total h2');

let hasInfo,
	selected,
	checked,
	stepIn = 0,
	hasMail,
	hasName,
	hasNum,
	mailPattern,
	textPattern,
	numPattern,
	array = [],
	plan,
	addOn,
	monthPrice,
	yearPrice,
	checkArray = [],
	monthArray = [],
	yearArray = [];

const sumTotal = () => {
		let month, year, monthPlan, yearPlan;
		monthArray = [];
		yearArray = [];

		if (summaryAddOns.childElementCount) {
			monthPlan = Number(
				summaryPlan
					.querySelector('.price.monthly')
					.textContent.replace(/[^0-9]/g, '')
			);
			yearPlan = Number(
				summaryPlan
					.querySelector('.price.yearly')
					.textContent.replace(/[^0-9]/g, '')
			);

			month = summaryAddOns.querySelectorAll('.monthly');
			year = summaryAddOns.querySelectorAll('.yearly');

			month.forEach(e => {
				monthArray.push(Number(e.textContent.replace(/[^0-9]/g, '')));
			});
			year.forEach(e => {
				yearArray.push(Number(e.textContent.replace(/[^0-9]/g, '')));
			});

			month = monthArray.reduce((prev, cur) => {
				prev += cur;
				return prev;
			}, 0);
			year = yearArray.reduce((prev, cur) => {
				prev += cur;
				return prev;
			}, 0);

			total.innerHTML = `<span class="monthly">+$${
				monthPlan + month
			}/mo</span><span class="yearly">+$${yearPlan + year}/yr</span>`;
		}
	},
	changeSummary = () => {
		change.addEventListener('click', () => {
			stepIn = 1;
			radio.forEach(e => {
				e.classList.remove('show');
			});
			steps.forEach(e => {
				e.classList.remove('show');
			});
			radio[stepIn].classList.add('show');
			steps[stepIn].classList.add('show');

			clearAddOns();
		});
	},
	fillSummaryAddOns = () => {
		array.forEach(e => {
			if (e) {
				summaryAddOns.innerHTML += `<li><div  class="summary-description">${e.addOn}</div> ${e.monthPrice} ${e.yearPrice} </li>`;
			}
		});
	},
	checkIfChecked = () => {
		checkArray = [];
		addOns.forEach(e => {
			e.classList.contains('checked')
				? checkArray.push('true')
				: !e.classList.contains('checked')
				? checkArray.push('false')
				: '';
			checkArray.includes('true')
				? (checked = true)
				: !checkArray.includes('true')
				? (checked = false)
				: '';
		});
	},
	clearAddOns = () => {
		addOns.forEach(e => {
			e.classList.remove('checked');
		});
		checked = false;
		array = [];
		summaryAddOns.innerHTML = '';
	},
	selectAddOns = () => {
		for (let i = 0; i < 3; i++) {
			addOns[i].addEventListener('click', e => {
				addOn = addOns[i].querySelector('h3').textContent;
				monthPrice = addOns[i].querySelector('.monthly').outerHTML;
				yearPrice = addOns[i].querySelector('.yearly').outerHTML;

				addOns[i].classList.contains('checked')
					? (addOns[i].classList.remove('checked'), (array[i] = ''))
					: (addOns[i].classList.add('checked'),
					  (array[i] = {
							addOn: addOn,
							monthPrice: monthPrice,
							yearPrice: yearPrice,
					  }));

				checkIfChecked();
			});
		}
		changeSummary();
	},
	clearPlan = () => {
		options.forEach(e => {
			e.classList.remove('selected');
		});
		selected = false;
	},
	selectPlan = () => {
		for (let i = 0; i < options.length; i++) {
			options[i].addEventListener('click', e => {
				options[i].classList.contains('selected')
					? (options[i].classList.remove('selected'), (selected = false))
					: (options.forEach(e => e.classList.remove('selected')),
					  options[i].classList.add('selected'),
					  (summaryPlan.querySelector('div h3').innerHTML = `${
							options[i].querySelector('h3').textContent
					  } <span class="yearly">(Yearly)</span> <span class="monthly">(Monthly)</span>`),
					  (summaryPlan.querySelector('.price').innerHTML = `${
							options[i].querySelector('.price.monthly').outerHTML
					  }  ${options[i].querySelector('.price.yearly').outerHTML}`),
					  (selected = true));
			});
		}
	},
	clearError = () => {
		userName.nextElementSibling.innerHTML = ' ';
		userName.style.border = '  var(--border)';
		userMail.nextElementSibling.innerHTML = ' ';
		userMail.style.border = 'var(--border)';
		userPhoneNumber.nextElementSibling.innerHTML = ' ';
		userPhoneNumber.style.border = 'var(--border)';

		hasInfo = false;
	},
	checkError = () => {
		textPattern = /[a-z, ]/gi;
		mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
		numPattern = /^[0-9, ]/g;

		userName.value.match(textPattern)
			? ((userName.nextElementSibling.innerHTML = ' '),
			  (userName.style.border = '  var(--border)'),
			  (hasName = true))
			: !userName.value
			? ((userName.nextElementSibling.innerHTML = `This field is required`),
			  (userName.style.border = 'var(--error-border)'),
			  (hasName = false))
			: !userName.value.match(mailPattern)
			? ((userName.nextElementSibling.innerHTML = `You such that's your name`),
			  (userName.style.border = 'var(--error-border)'),
			  (hasName = false))
			: ((userName.nextElementSibling.innerHTML = 'Error'),
			  (userName.style.border = 'var(--error-border)'),
			  (hasName = false));

		userMail.value.match(mailPattern)
			? ((userMail.nextElementSibling.innerHTML = ' '),
			  (userMail.style.border = 'var(--border)'),
			  (hasMail = true))
			: !userMail.value
			? ((userMail.nextElementSibling.innerHTML = `This field is required`),
			  (userMail.style.border = 'var(--error-border)'),
			  (hasMail = false))
			: !userMail.value.match(mailPattern)
			? ((userMail.nextElementSibling.innerHTML =
					'Please enter a valid  email address'),
			  (userMail.style.border = 'var(--error-border)'),
			  (hasMail = false))
			: ((userMail.nextElementSibling.innerHTML = 'Error'),
			  (userMail.style.border = 'var(--error-border)'),
			  (hasMail = false));

		userPhoneNumber.value.match(numPattern)
			? ((userPhoneNumber.nextElementSibling.innerHTML = ' '),
			  (userPhoneNumber.style.border = 'var(--border)'),
			  (hasNum = true))
			: !userPhoneNumber.value
			? ((userPhoneNumber.nextElementSibling.innerHTML = `This field is required`),
			  (userPhoneNumber.style.border = 'var(--error-border)'),
			  (hasNum = false))
			: !userPhoneNumber.value.match(mailPattern)
			? ((userPhoneNumber.nextElementSibling.innerHTML =
					'Please enter a valid  phone number'),
			  (userPhoneNumber.style.border = 'var(--error-border)'),
			  (hasNum = false))
			: ((userPhoneNumber.nextElementSibling.innerHTML = 'Error'),
			  (userPhoneNumber.style.border = 'var(--error-border)'),
			  (hasNum = false));

		hasName && hasNum && hasMail
			? ((hasInfo = true),
			  (userName.value = ''),
			  (userPhoneNumber.value = ''),
			  (userMail.value = ''))
			: (hasInfo = false);

		// selectPlan();
	},
	prevStep = () => {
		for (let i = 0; i < steps.length; i++) {
			steps.forEach(e => {
				e.classList.remove('show');
			});

			steps[stepIn - 1].classList.add('show');
			stepIn < 4
				? (radio.forEach(e => e.classList.remove('show')),
				  radio[stepIn - 1].classList.add('show'))
				: radio.forEach(e => e.classList.remove('show')),
				radio[3].classList.add('show');
		}
		stepIn -= 1;

		clearError();
		clearPlan();
		clearAddOns();
	},
	nextStep = () => {
		checkError();

		if (hasInfo || selected || checked) {
			steps.forEach(e => {
				e.classList.remove('show');
			});
			steps[stepIn + 1].classList.add('show');
			if (stepIn < 2) {
				radio.forEach(e => {
					e.classList.remove('show');
				});
				radio[stepIn + 1].classList.add('show');
			} else {
				radio.forEach(e => {
					e.classList.remove('show');
				});
				radio[3].classList.add('show');
			}
			stepIn += 1;
		}
		clearPlan();
		fillSummaryAddOns();
		sumTotal();
	};

for (let i = 0; i < prevBtns.length; i++) {
	prevBtns[i].addEventListener('click', () => {
		prevStep();
	});
}

for (let i = 0; i < nextBtns.length; i++) {
	nextBtns[i].addEventListener('click', () => {
		nextStep();
	});
}

document.querySelector('.toggle').addEventListener('click', () => {
	for (let i = 0; i < forms.length; i++) {
		forms[i].classList.toggle('year');
	}
});

selectAddOns();
selectPlan();
