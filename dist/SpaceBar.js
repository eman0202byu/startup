let socket = null;
configureWebSocket();

const user = localStorage.getItem('userName') ?? 404;
if((user == 404)){
    window.location.href = "index.html";
}


let userObj = null; 
///////////////////////////////////////////////////////
let accountStatus = 0;
async function susChk(){
    if(userObj == null){
        const dbResponse = await fetch('/api/dbs');
        userObj = await dbResponse.json();
    }
    accountStatus = userObj.status;
    if(accountStatus == 1){
        cheating();
    }
}
susChk();

////////////////////////////////////////////////////////////////////

let currency = 0;
let currencychk = currency;
async function getCurrency(){
    if(userObj == null){
        const dbResponse = await fetch('/api/dbs');
        userObj = await dbResponse.json();
    }
    currency = userObj.val;
    currencychk = currency;
    
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
}
getCurrency();

function Bpress(){
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
    saveCurrency(currency);
    localStorage.setItem("§", currency);
}

async function saveCurrency(currency) {
        if(userObj == null){
            const dbResponse = await fetch('/api/dbs');
            userObj = await dbResponse.json();
        }
        userObj.val = currency;
        try {
          const response = await fetch('/api/db', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(userObj),
          });
          const thisJSON = await response.json();
          localStorage.setItem('Everything-JSON', JSON.stringify(thisJSON));
        } catch {
        }
  }
Bpress();
currency--;

function pullImage(){
    const imgDOM = document.querySelector("#picture");
    imgDOM.innerHTML =
    '<div id="picture" class="picture-box"><img width="100px" src="SpaceCore.png" alt="random" /></div>';
}
pullImage();

function cheating(){
    broadcastEvent(userObj.name, 'message', (JSON.stringify(userObj)));
    document.body.innerHTML =
    `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
}

async function saveSus(sus) {
    if(userObj == null){
        const dbResponse = await fetch('/api/dbs');
        userObj = await dbResponse.json();
    }
    userObj.status = sus;

    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(userObj),
      });
      const thisJSON = await response.json();
      localStorage.setItem('Everything-JSON', JSON.stringify(thisJSON));
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

let cheatChecker = cheatCheck;

let intervalID = setInterval(cheatChecker, 5000);

/////////////////////////////////////////////////////

async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
      console.log('SpaceBar WS connected');
    };
    socket.onclose = (event) => {
      console.log('SpaceBar WS disconnected');
    };
    socket.onmessage = async (event) => {
        try {
            const msg = JSON.parse(await event.data.text());
            if (msg.name != null) {
                alert(`${msg.name} has been caught by the Space Cops! (They were cheating)`);
          } else {
                alert("A player has been caught by the Space Cops! (They were cheating)");
          }
        } catch (e){
            alert(`${msg}`);
        }
    };
  }

  async function broadcastEvent(from, type, value) {
    if(socket == null){
        await configureWebSocket();
    }
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
  }
