

document.getElementById("registrationform").addEventListener("submit", AddtoDashborad)
let submitButton = document.querySelector("button[type=submit]")

let registrationArray = JSON.parse(localStorage.getItem('registrationformData')) || [];


function AddtoDashborad () {
    event.preventDefault()

    if(submitButton.disabled){
        return
    }

    let uniqueId = document.getElementById("uniqueId").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let fromStation = document.getElementById("fromStation").value;
    let toStation = document.getElementById("toStation").value;
    let journeyDate = document.getElementById("journeyDate").value;
    let seatType = document.getElementById("seatType").value

    if(fromStation == toStation) {
    
        alert("current station and destination station should not be same")
    }

    if(age <= 18 || age>= 40){
      
        alert("Please enter a  age between 18 and 40")
        return
    }

    // if(!flag){
    //     document.querySelector("button").disabled
    // }
    let registrationFormData = {
        uniqueId,
        name,
        age,
        fromStation,
        toStation,
        journeyDate,
        seatType
    };

    registrationArray.push(registrationFormData);
    console.log(registrationFormData)
    localStorage.setItem("registrationformData", JSON.stringify(registrationArray))
    window.location.href = "dashboard.html"
    submitButton.disabled= true
}