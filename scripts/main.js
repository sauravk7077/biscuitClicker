// Required constants and variable
const dataStorage = new DataStorage("props");
let props;

// All required DOM elements
const biscuitBtn = document.getElementById('biscuit');
const biscuitCountDiv = document.getElementById('biscuitCount');

//Event Listeners
biscuitBtn?.addEventListener('click', biscuitClick);


//Functions
async function init() {
    if(dataStorage.get()){
        props = dataStorage.get();
    }else {
        const d = await fetch('../data/settings.json', {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });
        const data = await d.json();
        props = data;
        dataStorage.set(props);
    }
    generateShops();
    setInterval(()=> {
        for(let x of props.biscuitValues) {
            props.biscuitCount += x.value * x.count;
        }
        display();
    },1000);
}


function biscuitClick() {
    props.biscuitCount += props.clickValue;
    display();
}

function display() {
    biscuitCountDiv.innerText = Math.round(props.biscuitCount).toString();
    const shopContainer = document.getElementById('shopsContainer');
    if(shopContainer){
        let i = 0;
        for(let i = 0;i< props.biscuitValues.length;i++){
            const shopBtn = shopContainer.children[i];
            
            if(props.biscuitValues[i].cost > props.biscuitCount && !shopBtn.children[0].className.endsWith('disabled'))
                shopBtn.children[0].className += " disabled";
            else if(props.biscuitValues[i].cost <= props.biscuitCount)
                shopBtn.children[0].className = shopBtn.children[0].className.replace(' disabled', '');

            const cost = shopBtn.children[1].children[0].children[0];
            const amount = shopBtn.children[1].children[1].children[0];
            cost.innerText = props.biscuitValues[i].cost;
            amount.innerText = props.biscuitValues[i].count.toString();
        }
    }
    

    dataStorage.set(props);
}

function formatName(s) {
    return s.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      )
      .replace(/ /g,'');
    
}
function handleShopClick(e, id) {
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
        <div class="icon"><img></i></div>
        <div></div>
    </div>
    <div class="details">
        <div>Cost: <span></span></div>
        <div>Total: <span></span></div>
        <div></div>
    </div>
`;
    const containerDiv = document.createElement("div");
    containerDiv.id = "shopsContainer";
    for(let i = 0; i < props.biscuitValues.length;i++){
        const x = props.biscuitValues[i];
        const shopBtn = document.createElement("div");
        shopBtn.className = "shopContent";
        shopBtn.id =  formatName(x.name);
        shopBtn.innerHTML = htmlCode;
        shopBtn.children[0].children[0].children[0].src = `../images/${i}.svg`;
        shopBtn.children[0].children[1].innerText = x.name;
        shopBtn.children[0].addEventListener('click', e => {handleShopClick(e, shopBtn.id)});
        shopBtn.children[1].children[2].innerText = x.desc;
        shopBtn.children[1].children[0].children[0].innerText = x.cost;
        shopBtn.children[1].children[1].children[0].innerText = x.count;
        containerDiv.appendChild(shopBtn);
    }
    document.body.append(containerDiv);

}


init();