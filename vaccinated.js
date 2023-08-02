

document.addEventListener('DOMContentLoaded', () => {
    const vaccinatedTableBody = document.getElementById('vaccinatedTableBody');
  
    renderVaccinatedUsers();
  
    function renderVaccinatedUsers() {
      const vaccinatedUsers = getVaccinatedUsers();
      vaccinatedTableBody.innerHTML = '';
  
      for (const user of vaccinatedUsers) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.uniqueId}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.designation}</td>
          <td>${user.priority}</td>
          <td>${user.vaccine}</td>
          <td>${user.otp}</td>
          <td><button class="remove-button">Remove</button></td>
        `;
  
        const removeButton = row.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
          removeVaccinatedUser(user.uniqueId);
          row.remove();
        });
  
        vaccinatedTableBody.appendChild(row);
      }
    }
  
    function getVaccinatedUsers() {
      const existingData = localStorage.getItem('users');
      return existingData ? JSON.parse(existingData) : [];
    }
  
    function removeVaccinatedUser(uniqueId) {
      const vaccinatedUsers = getVaccinatedUsers();
      const updatedUsers = vaccinatedUsers.filter(user => user.uniqueId !== uniqueId);
      localStorage.setItem('vaccinated', JSON.stringify(updatedUsers));
    }
  });
  