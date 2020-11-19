"use strict";
// Required constants and variable
const dataStorage = new DataStorage("props");
let props = {
    biscuitCount: 0,
    biscuitValues: [1, 5]
};
// All required DOM elements
const biscuitBtn = document.getElementById('biscuit');
const biscuitCountDiv = document.getElementById('biscuitCount');
//Event Listeners
biscuitBtn === null || biscuitBtn === void 0 ? void 0 : biscuitBtn.addEventListener('click', display);
//Functions
function init() {
    if (dataStorage.get()) {
        props = dataStorage.get();
    }
    else {
        console.log("Entered");
        dataStorage.set(props);
    }
    display();
}
function update() {
    dataStorage.set(props);
}
function display() {
    update();
    props.biscuitCount += props.biscuitValues[0];
    biscuitCountDiv.innerText = props.biscuitCount.toString();
}
init();
