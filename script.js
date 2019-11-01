// Write your JavaScript code here!
window.addEventListener("load", function () {
   let form = document.querySelector("form");

   let faultyDiv = document.getElementById("faultyItems");
   let fuel = document.getElementById("fuelStatus");
   let cargo = document.getElementById("cargoStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         let missionData = document.getElementById('missionTarget');
         missionData.innerHTML = 
         `<h2>Mission Destination</h2>
   <ol>
      <li>Name: ${json[1].name}</li>
      <li>Diameter: ${json[1].diameter}</li>
      <li>Star: ${json[1].star}</li>
      <li>Distance from Earth: ${json[1].distance}</li>
      <li>Number of Moons: ${json[1].moons}</li>
   </ol>
   <img src="${json[1].image}"></img>`;
      });
   });


   form.addEventListener("submit", function (event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      console.log(pilotNameInput.value);
      let coPilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      if (pilotNameInput.value === "" || coPilotInput.value === "" || fuelInput.value === "" || cargoMassInput.value === ""){
         alert("All fields are required!");
         event.preventDefault()
      };

      console.log(typeof pilotNameInput.value);
      console.log(typeof coPilotInput.value);
      console.log(isNaN(pilotNameInput.value));
      console.log(isNaN(coPilotInput.value)); 

      if (isNaN(pilotNameInput.value) === false || (isNaN(coPilotInput.value) === false)) {
         alert("Invalid Input.");
         event.preventDefault()
      };

      if (isNaN(fuelInput.value) === true || (isNaN(cargoMassInput.value) === true)){
         alert("Please enter a number.");
         event.preventDefault()
      };


   faultyDiv.style.visibility = "visible";
   pilotStatus.innerHTML =`${pilotNameInput.value} Ready`;
   copilotStatus.innerHTML = `${coPilotInput.value} Ready`;
   

     let fuelCheck = Number(fuelInput.value);
     let cargoCheck = Number(cargoMassInput.value);

    function failedStatus() {
       document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch.";
       document.getElementById("launchStatus").style.color = "red";
    }
    function passedStatus() {
       document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch.";
       document.getElementById("launchStatus").style.color = "green"
    }

    if(fuelCheck < 10000 && cargoCheck < 10000 ){
      fuel.innerHTML = "Not enough fuel for takeoff.";
      failedStatus();
   }
   else if(fuelCheck > 10000 && cargoCheck > 10000){
      cargo.innerHTML = "Cargo too heavy for takeoff.";
      failedStatus();
   }
   else if(fuelCheck < 10000 && cargoCheck > 10000){
      fuel.innerHTML = "Not enough fuel for takeoff.";
      cargo.innerHTML = "Cargo too heavy for takeoff.";
      failedStatus();
   }
   else (passedStatus());

    });
            });

// /*This block of code shows how to format the HTML once you fetch some planetary JSON!
// <h2>Mission Destination</h2>
// <ol>
//    <li>Name: ${}</li>
//    <li>Diameter: ${}</li>
//    <li>Star: ${}</li>
//    <li>Distance from Earth: ${}</li>
//    <li>Number of Moons: ${}</li>
// </ol>
// <img src="${}">/*
