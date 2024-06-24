"use strict";

//choice of hte country

document.addEventListener("DOMContentLoaded", function () {
  var input = document.querySelector("#phone");
  fetch("https://ipapi.co/json").then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }).then(function (data) {
    window.intlTelInput(input, {
      initialCountry: data.country_code.toLowerCase(),
      utilsScript: "/intl-tel-input/js/utils.js?1716383386062"
    });
  })["catch"](function (error) {
    console.error("Помилка при отриманні країни:", error);
    window.intlTelInput(input, {
      initialCountry: "ua",
      utilsScript: "/intl-tel-input/js/utils.js?1716383386062"
    });
  });
});

// privacy policy
var buttonPrivate = document.querySelector(".frontEnd__politicInfo-link");
var aboutPrivate = document.querySelector(".about__private");
var info = document.querySelector(".private__text");
buttonPrivate.addEventListener("click", function () {
  aboutPrivate.style.display = "flex";
});
info.addEventListener("click", function (event) {
  event.stopPropagation();
});
aboutPrivate.addEventListener("click", function () {
  aboutPrivate.style.display = "none";
});

//form
var form = document.querySelector(".form__box");
var nameInput = document.querySelector("#name");
var telInput = document.querySelector("#phone");
var emailInput = document.querySelector("#email");
var namem = document.querySelector(".form__input-name");
var phone = document.querySelector(".form__input-phone");
var email = document.querySelector(".form__input-email");
var nameRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ'-]+\s[A-Za-zА-Яа-яЇїІіЄєҐґ'-]+$/;
var phoneRegex = /^(\+?[0-9]{1,3}\.)?[0-9]{7,14}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var inputElements = event.target.querySelectorAll(".form__input");
  var valuesObject = Array.from(inputElements).reduce(function (accumulator, input) {
    accumulator[input.name] = input.value;
    return accumulator;
  }, {});
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
  var createFormInfo = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(valuesObject)
  };
  fetch("https://protect-shop-back-end.onrender.com/api/letters", createFormInfo).then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }).then(function (data) {
    console.log("Успішна відповідь:", data);
    inputElements.forEach(function (input) {
      return input.value = "";
    });
  })["catch"](function (error) {
    console.error("Помилка при відправці запиту:", error);
  });
});
//# sourceMappingURL=scripts.js.map
