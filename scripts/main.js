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
    generateShops();
    setInterval(function () {
        for (var _i = 0, _a = props.biscuitValues; _i < _a.length; _i++) {
            var x = _a[_i];
            props.biscuitCount += x.value * x.count;
        }
        display();
    }, 1000);
}
function biscuitClick() {
    props.biscuitCount += props.clickValue;
    display();
}
function display() {
    biscuitCountDiv.innerText = props.biscuitCount.toString();
    var shopContainer = document.getElementById('shopsContainer');
    if (shopContainer) {
        var i = 0;
        for (var i_1 = 0; i_1 < props.biscuitValues.length; i_1++) {
            var shopBtn = shopContainer.children[i_1];
            shopBtn.children[1].children[0].children[0].innerText = props.biscuitValues[i_1].cost;
            shopBtn.children[1].children[1].children[0].innerText = props.biscuitValues[i_1].count.toString();
        }
    }
    dataStorage.set(props);
}
function formatName(s) {
    return s.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
        .replace(/ /g, '');
}
function handleShopClick(e, id) {
    var currentEl = props.biscuitValues.filter(function (el) { return el.name === id; })[0];
    if (props.biscuitCount >= currentEl.cost) {
        currentEl.count++;
        props.biscuitCount -= currentEl.cost;
    }
    display();
}
function generateShops() {
    var htmlCode = "\n    <div class=\"shopBtn\">\n        <div class=\"icon\"></div>\n        <div>Clicker</div>\n    </div>\n    <div>\n        <div>Cost: <span></span></div>\n        <div>Total: <span></span></div>\n    </div>\n";
    var containerDiv = document.createElement("div");
    containerDiv.id = "shopsContainer";
    var _loop_1 = function (x) {
        var shopBtn = document.createElement("div");
        shopBtn.className = "shopContent";
        shopBtn.id = formatName(x.name);
        shopBtn.innerHTML = htmlCode;
        shopBtn.children[0].addEventListener('click', function (e) { handleShopClick(e, shopBtn.id); });
        shopBtn.children[1].children[0].children[0].innerText = x.cost;
        shopBtn.children[1].children[1].children[0].innerText = x.count;
        containerDiv.appendChild(shopBtn);
    };
    for (var _i = 0, _a = props.biscuitValues; _i < _a.length; _i++) {
        var x = _a[_i];
        _loop_1(x);
    }
    document.body.append(containerDiv);
}
init();
