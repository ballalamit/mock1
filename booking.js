document.addEventListener("DOMContentLoaded", function () {
    const filterSeatType = document.getElementById("filterSeatType");
    const applyFilterButton = document.getElementById("applyFilter");
    const sortByAgeButton = document.getElementById("sortByAge");
    const sortByDateButton = document.getElementById("sortByDate");
    const userListTable = document.getElementById("usert");
  
    let bookedUsers = JSON.parse(localStorage.getItem('booked')) || [];
  
   
    function populateUserList(users) {
      const tbody = userListTable.querySelector("tbody");
      tbody.innerHTML = "";
      
      users.map((user, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.fromStation}</td>
          <td>${user.toStation}</td>
          <td>${user.journeyDate}</td>
          <td>${user.seatType}</td>
          <td>${user.otp}</td>
          <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
        `;
      });
    }
  
  
    function applySeatTypeFilter(seatType) {
      if (seatType === "") {
        populateUserList(bookedUsers);
      } else {
        const filteredUsers = bookedUsers.filter(user => user.seatType === seatType);
        populateUserList(filteredUsers);
      }
    }
  
    applyFilterButton.addEventListener("click", function () {
      const selectedSeatType = filterSeatType.value;
      applySeatTypeFilter(selectedSeatType);
    });
  

    sortByAgeButton.addEventListener("click", function () {
      const sortedUsers = bookedUsers.slice().sort((a, b) => a.age - b.age);
      populateUserList(sortedUsers);
    });
  
    
    sortByDateButton.addEventListener("click", function () {
      const sortedUsers = bookedUsers.slice().sort((a, b) => new Date(a.journeyDate) - new Date(b.journeyDate));
      populateUserList(sortedUsers);
    });
  
  
    userListTable.addEventListener("click", function (event) {
      if (event.target.classList.contains("deleteBtn")) {
        const index = event.target.getAttribute("data-index");
        if (index !== null) {
          bookedUsers.splice(index, 1);
          localStorage.setItem('booked', JSON.stringify(bookedUsers));
          populateUserList(bookedUsers);
        }
      }
    });
  
    populateUserList(bookedUsers);
  });
  