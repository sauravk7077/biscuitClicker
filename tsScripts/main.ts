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
    },100);
}


function biscuitClick() {
    props.biscuitCount += props.clickValue;
    display();
}

function display() {
    biscuitCountDiv.innerText = props.biscuitCount.toString();
    const shopContainer = document.getElementById('shopsContainer');
    if(shopContainer){
        const shopBtn = shopContainer.children[0];
        for(let x of props.biscuitValues){
            shopBtn.children[1].children[0].children[0].innerText = x.cost;
            shopBtn.children[1].children[1].children[0].innerText = x.count;
        }
    }
    

    dataStorage.set(props);
}

function formatName(s: string) {
    return s.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      )
      .replace(/ /g,'');
    
}
function handleShopClick(e:Event, id:string) {
    const currentEl = props.biscuitValues.filter(el=> el.name === id)[0];
    if(props.biscuitCount >= currentEl.cost){
        currentEl.count++;
        props.biscuitCount -= currentEl.cost;
    }
    display();
}

function generateShops() {
    const htmlCode = `
    <div class="shopBtn">
        <div class="icon"></div>
        <div>Clicker</div>
    </div>
    <div>
        <div>Cost: <span></span></div>
        <div>Total: <span></span></div>
    </div>
`;
    const containerDiv = document.createElement("div");
    containerDiv.id = "shopsContainer";
    for(let x of props.biscuitValues){
        const shopBtn = document.createElement("div");
        shopBtn.className = "shopContent";
        shopBtn.id =  formatName(x.name);
        shopBtn.innerHTML = htmlCode;
        shopBtn.children[0].addEventListener('click', e => {handleShopClick(e, shopBtn.id)});
        shopBtn.children[1].children[0].children[0].innerText = x.cost;
        shopBtn.children[1].children[1].children[0].innerText = x.count;
        containerDiv.appendChild(shopBtn);
    }
    document.body.append(containerDiv);

}


init();