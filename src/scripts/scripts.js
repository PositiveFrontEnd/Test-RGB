//choice of hte country

document.addEventListener("DOMContentLoaded", () => {
	const input = document.querySelector("#phone");

	fetch("https://ipapi.co/json")
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.then((data) => {
			window.intlTelInput(input, {
				initialCountry: data.country_code.toLowerCase(),
				utilsScript: "/intl-tel-input/js/utils.js?1716383386062",
			});
		})
		.catch((error) => {
			console.error("Помилка при отриманні країни:", error);

			window.intlTelInput(input, {
				initialCountry: "ua",
				utilsScript: "/intl-tel-input/js/utils.js?1716383386062",
			});
		});
});

// privacy policy
const buttonPrivate = document.querySelector(".frontEnd__politicInfo-link");
const aboutPrivate = document.querySelector(".about__private");
const info = document.querySelector(".private__text");

buttonPrivate.addEventListener("click", () => {
	aboutPrivate.style.display = "flex";
});

info.addEventListener("click", (event) => {
	event.stopPropagation();
});

aboutPrivate.addEventListener("click", () => {
	aboutPrivate.style.display = "none";
});

//form
const form = document.querySelector(".form__box");
const nameInput = document.querySelector("#name");
const telInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const namem = document.querySelector(".form__input-name");
const phone = document.querySelector(".form__input-phone");
const email = document.querySelector(".form__input-email");
const nameRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ'-]+\s[A-Za-zА-Яа-яЇїІіЄєҐґ'-]+$/;
const phoneRegex = /^(\+?[0-9]{1,3}\.)?[0-9]{7,14}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const inputElements = event.target.querySelectorAll(".form__input");
	const valuesObject = Array.from(inputElements).reduce(
		(accumulator, input) => {
			accumulator[input.name] = input.value;
			return accumulator;
		},
		{}
	);

	if (!nameRegex.test(nameInput.value.trim())) {
		namem.style.display = "block";
		return;
	} else {
		namem.style.display = "none";
	}

	if (!phoneRegex.test(telInput.value)) {
		phone.style.display = "block";
		return;
	} else {
		phone.style.display = "none";
	}

	if (!emailRegex.test(emailInput.value)) {
		email.style.display = "block";
		return;
	} else {
		email.style.display = "none";
	}

	const createFormInfo = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(valuesObject),
	};

	fetch(
		"https://protect-shop-back-end.onrender.com/api/letters",
		createFormInfo
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.then((data) => {
			console.log("Успішна відповідь:", data);
			inputElements.forEach((input) => (input.value = ""));
		})
		.catch((error) => {
			console.error("Помилка при відправці запиту:", error);
		});
});
