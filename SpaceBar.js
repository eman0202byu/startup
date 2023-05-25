const user = localStorage.getItem('userName') ?? 404; //Update with database fetch
const pass = localStorage.getItem('userPass') ?? 404; //Update with database fetch

if((user == 404) || (pass == 404)){
    window.location.href = "index.html";
}

const accountStatus = localStorage.getItem('Suspention') ?? 0; //Update with database fetch

if(accountStatus == 1){
    cheating();
}

let currency = localStorage.getItem('§') ?? 0; //Update with database fetch
let currencychk = currency;
currency--;
Bpress();

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
    localStorage.setItem("§", currency); //Update with Database push
    }
}

function cheating(){
    document.body.innerHTML =
    `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
}

function cheatCheck(){
    if(currency > (currencychk + 10)){
        document.body.innerHTML =
        `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
        localStorage.setItem("Suspention", 1); //Update with Database push
    }else{
        currencychk = currency;
    }
}

let cheatChecker = cheatCheck;

let intervalID = setInterval(cheatChecker, 5000);