
  



document.addEventListener('DOMContentLoaded', () => {
    const usersTableBody = document.getElementById('usersTableBody');
    const ageSortButton = document.getElementById('ageSortButton');
    const vaccineFilter = document.getElementById('vaccineFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    let usersData = getUsers();
  
    renderUsers();
  
    ageSortButton.addEventListener('click', () => {
      sortUsersByAge();
      renderUsers();
    });
  
    vaccineFilter.addEventListener('change', () => {
      filterUsers();
    });
  
    priorityFilter.addEventListener('change', () => {
      filterUsers();
    });
  
    function renderUsers() {
      usersTableBody.innerHTML = '';
  
      for (const user of usersData) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.uniqueId}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.designation}</td>
          <td>${user.priority}</td>
          <td>${user.vaccine}</td>
          <td>${generateOTP()}</td>
          <td><button class="delete-button">Delete</button></td>
          <td><button class="vaccinate-button">Vaccinate</button></td>
        `;
  
        const deleteButton = row.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
          deleteUser(user.uniqueId);
          row.remove();
        });
  
        const vaccinateButton = row.querySelector('.vaccinate-button');
        vaccinateButton.addEventListener('click', () => {
            window.location.replace('vaccinated.html');
          showOTPComponent(user.otp, () => {
         
            showAlert(`${user.name} Added to Queue`);
            setTimeout(() => {
              showAlert(`Vaccinating ${user.vaccine}`);
              setTimeout(() => {
                showAlert(`${user.name} Vaccinated`);
                deleteUser(user.uniqueId);
                saveVaccinatedUser(user);
                row.remove();
                window.location.replace('vaccinated.html'); // Redirect to vaccinated.html
              }, 1000);
            }, 5000);
          });
        });
        usersTableBody.appendChild(row);
      }
    }
  
    function getUsers() {
      const existingData = localStorage.getItem('users');
      return existingData ? JSON.parse(existingData) : [];
    }
  
    function generateOTP() {
      return Math.floor(1000 + Math.random() * 9000);
    }
  
    function deleteUser(uniqueId) {
      usersData = usersData.filter((user) => user.uniqueId !== uniqueId);
      localStorage.setItem('users', JSON.stringify(usersData));
    }
  
    function saveVaccinatedUser(user) {
      const vaccinatedUsers = getVaccinatedUsers();
      vaccinatedUsers.push(user);
      localStorage.setItem('vaccinated', JSON.stringify(vaccinatedUsers));
    }
  
    function getVaccinatedUsers() {
      const existingData = localStorage.getItem('vaccinated');
      return existingData ? JSON.parse(existingData) : [];
    }
  
    function showOTPComponent(otp, callback) {
      const enteredOTP = prompt('Enter OTP:');
      if (enteredOTP && enteredOTP === otp.toString()) {
        callback();
      } else {
        alert('Invalid OTP. Please try again.');
      }
    }
  
    function showAlert(message) {
      alert(message);
    }
  
    function sortUsersByAge() {
      usersData.sort((a, b) => a.age - b.age);
    }
  
    function filterUsers() {
      const selectedVaccine = vaccineFilter.value;
      const selectedPriority = priorityFilter.value;
  
      usersData = getUsers();
  
      if (selectedVaccine !== 'All') {
        usersData = usersData.filter((user) => user.vaccine === selectedVaccine);
      }
  
      if (selectedPriority !== 'All') {
        usersData = usersData.filter((user) => user.priority === selectedPriority);
      }
  
      renderUsers();
    }
  });
  
  //dsjhdjd