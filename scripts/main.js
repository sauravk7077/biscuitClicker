"use strict";
// Required constants and variable
var dataStorage = new DataStorage("props");
// All required DOM elements
var biscuitBtn = document.getElementById('biscuit');
var biscuitCountDiv = document.getElementById('biscuitCount');
//Event Listeners
biscuitBtn === null || biscuitBtn === void 0 ? void 0 : biscuitBtn.addEventListener('click', biscuitClick);
//Functions
function init() {
    if (dataStorage.get()) {
        props = dataStorage.get();
    }
    else {
        dataStorage.set(props);
    }
    setInterval(function () {
        for (var _i = 0, _a = props.biscuitValues; _i < _a.length; _i++) {
            var x = _a[_i];
            props.biscuitCount += x.value * x.count;
        }
        display();
    }, 1);
}
function biscuitClick() {
    props.biscuitCount += props.clickValue;
    display();
}
function display() {
    biscuitCountDiv.innerText = props.biscuitCount.toString();
    dataStorage.set(props);
}
init();
