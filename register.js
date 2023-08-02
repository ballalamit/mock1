document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const uniqueIdInput = document.getElementById('uniqueId');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const designationInputs = document.getElementsByName('designation');
    const priorityInput = document.getElementById('priority');
    const vaccineInput = document.getElementById('vaccine');

    const uniqueId = uniqueIdInput.value.trim();
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const designation = getSelectedRadioValue(designationInputs);
    const priority = priorityInput.value;
    const vaccine = vaccineInput.value;

    if (!isValidUniqueId(uniqueId)) {
      alert('Please enter a unique ID.');
      return;
    }

    if (!isValidName(name)) {
      alert('Please enter a valid name (at least 4 characters).');
      return;
    }

    if (!isValidAge(age)) {
      alert('Please enter a valid age (between 18 and 40).');
      return;
    }

    // Save the registration data to localStorage
    const userData = {
      uniqueId,
      name,
      age,
      designation,
      priority,
      vaccine
    };
    saveUserData(userData);

    registrationForm.reset();
    alert('Registration successful!');
    window.location.href = 'dashboard.html'; // Redirect to dashboard.html
  });

  function getSelectedRadioValue(radioInputs) {
    for (const radioInput of radioInputs) {
      if (radioInput.checked) {
        return radioInput.value;
      }
    }
    return null;
  }

  function isValidUniqueId(uniqueId) {
    // Check if the unique ID is unique (e.g., check against existing data)
    // Implement your own validation logic here
    return true;
  }

  function isValidName(name) {
    return name.length >= 4;
  }

  function isValidAge(age) {
    return age >= 18 && age <= 40;
  }

  function saveUserData(userData) {
    const existingData = localStorage.getItem('users');
    let users = [];
    if (existingData) {
      users = JSON.parse(existingData);
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  }
});
