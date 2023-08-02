
    const userList = document.getElementById('userList');
    const users = JSON.parse(localStorage.getItem('registrationformData')) || [];
    let otp ;
    function updateUserList(users) {
        userList.innerHTML ="";

        users.map((user) => {
             otp = Math.floor(Math.random() * 9000 ) + 1000;

            const tablerow= document.createElement('tr');

            tablerow.innerHTML = `
                <td>${user.uniqueId}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.fromStation}</td>
                <td>${user.toStation}</td>
                <td>${user.journeyDate}</td>
                <td>${user.seatType}</td>
                <td>${otp}</td>
                <td>
                    <button class="rejectButton"> Reject</button>

                 <button class="confirmButton"> Confirm </button></td>
            `

            userList.append(tablerow)
            user.otp = otp
        })
    }

    updateUserList(users)


    userList.addEventListener('click', (event) => {
        if(event.target.classList.contains('rejectButton')){
            const row = event.target.closest('tr');
            const uniqueId = row.querySelector('td:first-child').textContent;
            row.remove();

           const Updatedusers=users.filter((user)=>{
                return user.uniqueId !== uniqueId;
            })

            
            // let users;
            users.length =0;
            users.push(...Updatedusers);
            // users.splice(0, users.length, ...Updatedusers)
            console.log(users)

            localStorage.setItem('registrationformData', JSON.stringify(users))
            UpdateduserList(users)

        }
        else if(event.target.classList.contains('confirmButton')){
            const row = event.target.closest('tr');
            const uniqueId = row.querySelector('td:first-child').textContent;

            const user=users.find((u)=>{
                return u.uniqueId == uniqueId;
            })
            console.log("amit",user)

            handleConfirmButton(user)
        }
    })

    function displayAlert(msg, delay){
        return new Promise((resolve, reject) =>{
            setTimeout(()=>{
                alert(msg);
                resolve();
            },delay)
        })
    }

    function handleConfirmButton (user) {
        const otp = parseInt(prompt('Enter the OTP'));
        console.log(user.otp )
        console.log("entered", otp)

        if(otp == user.otp){
            displayAlert(`${user.name} added to waiting list`, 0).
            then(()=>{
                displayAlert(`Booking ticket from ${user.fromStation} to ${user.toStation} - after 5 seconds`, 5000)

            }).then(() =>{
                displayAlert(`Ticket booked for ${user.journeyDate}`, 10000)
            }).then(() =>{
                const bookedUsers = JSON.parse(localStorage.getItem('booked')) || [];
                bookedUsers.push(user);
                localStorage.setItem('booked', JSON.stringify(bookedUsers));
                console.log(user.uniqueId)

                // const row = userList.querySelector(`tr td:first-child:contains(${user.uniqueId})`).closest('tr')
                
                const row = Array.from(userList.querySelectorAll('tr')).find((row) =>{
                    const firstC = row.querySelector('td:first-child');
                    return firstC.textContent == user.uniqueId;
                })
                if(row){
                    row.remove();
                }
               
                users= users.filter(u => u.uniqueId != user.uniqueId)
                localStorage.setItem('registrationformData', JSON.stringify(users))
            })
        }
        else{
            alert('Incorrect OTP')
        }
    }

    let filterSeatType = document.getElementById("filterSeatType")
    const applyFilterButton = document.getElementById("applyFilter")

function filterAndSortUsers() {
    const selectedSeatType = filterSeatType.value
    let filteredUsers = users;

    if(selectedSeatType){
        filteredUsers = users.filter((user) => user.seatType == selectedSeatType)
    }
    return filteredUsers
}

function applyFilterAndSOrt(){
    const filteredUsers = filterAndSortUsers();
    updateUserList(filteredUsers)
}

applyFilterButton.addEventListener('click', applyFilterAndSOrt);
updateUserList(filterAndSortUsers())