// Required constants and variable
const dataStorage = new DataStorage("props");

// All required DOM elements
const biscuitBtn = document.getElementById('biscuit');
const biscuitCountDiv = document.getElementById('biscuitCount');

//Event Listeners
biscuitBtn?.addEventListener('click', biscuitClick);


//Functions
function init() {
    if(dataStorage.get()){
        props = dataStorage.get();
    }else {
        dataStorage.set(props);
    }
    setInterval(()=> {
        for(let x of props.biscuitValues) {
            props.biscuitCount += x.value * x.count;
        }
        display();
    },1);
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