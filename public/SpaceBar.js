const user = localStorage.getItem('userName') ?? 404;
const pass = localStorage.getItem('userPass') ?? 404;
if((user == 404) || (pass == 404)){
    window.location.href = "index.html";
}


let userObj = null; 
const dbResponse = await fetch('/api/dbs');
userObj = await dbResponse.json();
///////////////////////////////////////////////////////

async function susChk(){
    if(userObj == null){
        const dbResponse = await fetch('/api/dbs');
        userObj = await dbResponse.json();
    }
    let accountStatus = userObj.status;
    if(accountStatus == 1){
        cheating();
    }
}
susChk();

////////////////////////////////////////////////////////////////////

let currency = localStorage.getItem('§') ?? 0;

let currencychk = currency;
currency--;
function Bpress(){
    if(accountStatus != 1){
    currency++;
    const formattedNumber = currency.toLocaleString("en-US");
    const bucks = document.querySelector('#bucks');
    if(currency < 10){
        bucks.innerHTML =
        `<div id="bucks">§------${formattedNumber}</div>`;
    } else if(currency < 100){
        bucks.innerHTML =
        `<div id="bucks">§-----${formattedNumber}</div>`;
    } else if(currency < 1000){
        bucks.innerHTML =
        `<div id="bucks">§----${formattedNumber}</div>`;
    } else if(currency < 10000){
        bucks.innerHTML =
        `<div id="bucks">§---${formattedNumber}</div>`;
    } else if(currency < 100000){
        bucks.innerHTML =
        `<div id="bucks">§--${formattedNumber}</div>`;
    } else if(currency < 1000000){
        bucks.innerHTML =
        `<div id="bucks">§-${formattedNumber}</div>`;
    }  else if(currency < 10000000){
        bucks.innerHTML =
        `<div id="bucks">§${formattedNumber}</div>`;
    } else {
        bucks.innerHTML =
        `<div id="bucks">§${formattedNumber}</div>`;
    }
    saveCurrency(currency, userJSON);
    localStorage.setItem("§", currency);
    }
}
async function saveCurrency(currency, userJSON) {
    const userName = user;
    const newCurrency = {name: userName, val: currency};
    try {
      const response = await fetch('/api/buck', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newCurrency),
      });
      const currencyJSON = await response.json();
      localStorage.setItem('§-JSON', JSON.stringify(currencyJSON));
    } catch {
    }
  }
Bpress();

function pullImage(){
    const imgDOM = document.querySelector("#picture");
    imgDOM.innerHTML =
    '<div id="picture" class="picture-box"><img width="100px" src="SpaceCore.png" alt="random" /></div>';
}
pullImage();

function cheating(){
    document.body.innerHTML =
    `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
}

async function saveSus(sus) {
    const userName = user;
    const newSus = {name: userName, status: sus};
    try {
      const response = await fetch('/api/suspended', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newSus),
      });
      const susJSON = await response.json();
      localStorage.setItem('Suspention-JSON', JSON.stringify(susJSON));
    } catch {
    }
  }

function cheatCheck(){
    if(currency > (currencychk + 100)){
        document.body.innerHTML =
        `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
        saveSus(1);
        localStorage.setItem("Suspention", 1);
    }else if(accountStatus != 1){
        saveSus(0);
        currencychk = currency;
    }
}
cheatCheck();

let cheatChecker = cheatCheck;

let intervalID = setInterval(cheatChecker, 5000);