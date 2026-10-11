document.addEventListener("DOMContentLoaded", () => {

  const themeToggleBtn = document.querySelector("#theme-toggle");
  const eventCards = document.querySelectorAll(".event-card");
  const form = document.querySelector("#registration-form");
  const fullNameInput = document.querySelector("#full-name");
  const emailInput = document.querySelector("#email");
  const groupInput = document.querySelector("#student-group");
  const agreementCheckbox = document.querySelector("#agreement");
  const selectedEventHidden = document.querySelector("#selected-event");
  const selectedEventDisplay = document.querySelector("#selected-event-display");
  const charCounter = document.querySelector("#char-counter");
  const registrationsList = document.querySelector("#registrations-list");
  const confirmationBanner = document.querySelector("#confirmation-banner");

  
  const registrations = [];

  
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggleBtn.textContent = isDark ? "Светлая тема" : "Тёмная тема";
  });

  
  eventCards.forEach((card) => {
    const selectBtn = card.querySelector(".select-btn");
    selectBtn.addEventListener("click", () => {
    
      eventCards.forEach((c) => c.classList.remove("selected-event"));
      
    
      card.classList.add("selected-event");
      
  
      const eventName = card.getAttribute("data-event");
      selectedEventHidden.value = eventName;
      selectedEventDisplay.value = eventName;


      clearError(selectedEventDisplay, "event-error");
    });
  });

 
  fullNameInput.addEventListener("input", () => {
    charCounter.textContent = fullNameInput.value.length;
    validateName(fullNameInput.value);
  });

  
  emailInput.addEventListener("input", () => validateEmail(emailInput.value));
  groupInput.addEventListener("input", () => validateGroup(groupInput.value));
  agreementCheckbox.addEventListener("change", () => validateAgreement(agreementCheckbox.checked));

 
  function validateName(name) {
    if (name.trim().length < 3) {
      showError(fullNameInput, "name-error", "Имя должно содержать не менее 3 символов.");
      return false;
    }
    clearError(fullNameInput, "name-error");
    return true;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showError(emailInput, "email-error", "Введите корректный адрес электронной почты.");
      return false;
    }
    clearError(emailInput, "email-error");
    return true;
  }

  function validateGroup(group) {
    if (group.trim() === "") {
      showError(groupInput, "group-error", "Укажите вашу учебную группу.");
      return false;
    }
    clearError(groupInput, "group-error");
    return true;
  }

  function validateEvent(eventVal) {
    if (!eventVal) {
      showError(selectedEventDisplay, "event-error", "Пожалуйста, выберите мероприятие из списка выше.");
      return false;
    }
    clearError(selectedEventDisplay, "event-error");
    return true;
  }

  function validateAgreement(isChecked) {
    if (!isChecked) {
      showError(agreementCheckbox, "agreement-error", "Необходимо согласие с правилами.");
      return false;
    }
    clearError(agreementCheckbox, "agreement-error");
    return true;
  }

  function showError(inputElement, errorSpanId, message) {
    inputElement.classList.add("error");
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) errorSpan.textContent = message;
  }

  function clearError(inputElement, errorSpanId) {
    inputElement.classList.remove("error");
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) errorSpan.textContent = "";
  }


  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const isNameValid = validateName(fullNameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isGroupValid = validateGroup(groupInput.value);
    const isEventValid = validateEvent(selectedEventHidden.value);
    const isAgreementValid = validateAgreement(agreementCheckbox.checked);


    if (isNameValid && isEmailValid && isGroupValid && isEventValid && isAgreementValid) {
      const registrationData = {
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        group: groupInput.value.trim(),
        event: selectedEventHidden.value,
        date: new Date().toLocaleTimeString()
      };

      registrations.push(registrationData);
      addRegistrationToUI(registrationData);
      confirmationBanner.textContent = `Успешно! ${registrationData.name}, вы зарегистрированы на "${registrationData.event}".`;
      confirmationBanner.classList.remove("hidden");

 
      form.reset();
      charCounter.textContent = "0";
      eventCards.forEach((c) => c.classList.remove("selected-event"));
      selectedEventHidden.value = "";
    }
  });


  function addRegistrationToUI(data) {
    const li = document.createElement("li");
    li.textContent = `${data.date} — ${data.name} (Группа: ${data.group}) записался на "${data.event}"`;
    registrationsList.appendChild(li);
  }
});