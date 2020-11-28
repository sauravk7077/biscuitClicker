function main(){// Required constants and variable
    const dataStorage = new DataStorage("props");
    let props;

    // All required DOM elements
    const biscuitBtn = document.getElementById('biscuit');
    const biscuitCountDiv = document.getElementById('biscuitCount');
    const settingInput = document.getElementById('settingInput');
    const inputSubmitBtn = document.getElementById('InputSubmitBtn');
    const settingOutput = document.getElementById('settingOutput');
    const outputSubmitBtn = document.getElementById('OutputSubmitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const hideShowBtn = document.getElementById('hideShowSettingBtn');

    //Event Listeners
    biscuitBtn?.addEventListener('click', biscuitClick);
    inputSubmitBtn.addEventListener('click', handleImport);
    outputSubmitBtn.addEventListener('click', handleExport);
    resetBtn.addEventListener('click', reset);
    hideShowBtn.addEventListener('click', handleHideShowSettingBtn);

    //Functions
    async function init() {
        if(dataStorage.get()){
            props = dataStorage.get();
        }else {
            await reset();
        }
        //biscuitBtn.firstElementChild.setAttribute('draggable', false);
        generateShops();
        setInterval(()=> {
            for(let x of props.biscuitValues) {
                props.biscuitCount += x.value * x.count;
            }
            display();
        },1000);
    }

    async function reset() {
        const d = await fetch('../data/settings.json', {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });
        settingInput.value = "";
        settingOutput.value = "";
        const data = await d.json();
        props = data;
        dataStorage.set(props);
    }

    function handleHideShowSettingBtn(e) {
        const el = document.getElementById('settingsBox');
        if(el.className.endsWith(' hidden'))
            el.className = el.className.replace(' hidden', '');
        else
            el.className += " hidden";
    }

    function biscuitClick(e) {
        props.biscuitCount += props.clickValue;
        const point = document.createElement('div');
        point.innerText = "+" + props.clickValue;
        point.className = "point";
        point.style.top = (e.clientY - biscuitBtn.offsetTop) + "px";
        point.style.left = (e.clientX - biscuitBtn.offsetLeft) + "px";
        biscuitBtn.append(point);
        setTimeout(()=> {
            point.remove();
        },1000);
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
        const currentEl = props.biscuitValues.filter(el=> formatName(el.name) === id)[0];
        if(props.biscuitCount >= currentEl.cost){
            currentEl.count++;
            props.biscuitCount -= currentEl.cost;
        }
        display();
    }

    function handleImport(e) {
        saveData(settingInput.value);
    }

    function handleExport(e) {
        settingOutput.value = exportData();
        settingOutput.focus();
        settingOutput.setSelectionRange(0, settingOutput.value.length);
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
            <div class="disc"></div>
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
        document.body.firstElementChild.append(containerDiv);

    }

    function saveData(data) {
        try {
            const ob = JSON.parse(atob(data));
            props = ob;
            dataStorage.set(props);
        } catch (error) {
            alert("Enter valid data!");
        }

        display();
    }

    function exportData() {
        return btoa(JSON.stringify(props));
    }


    init();
};

main();
