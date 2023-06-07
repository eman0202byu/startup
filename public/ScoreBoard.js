const user = localStorage.getItem('userName') ?? 404;

if((user == 404)){
    window.location.href = "index.html";
}
////////////////////////////////////////////////////////////////////

let userObj = null;
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

function cheating(){
    document.body.innerHTML =
    `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
}

let SB = null;

// let SBFinished = false;
// async function loadSB() {
//     SBFinished = false;
//     let SBJSON = [];
//     try {
//       const response = await fetch('/api/scoreboards');
//       SBJSON = await response.json();
  
//       localStorage.setItem('SB-JSON', JSON.stringify(SBJSON));

//       const SBText = JSON.stringify(SBJSON);
//       if (SBText) {
//         SB = JSON.parse(SBText);
//       }
//     } catch {
//       const SBText = localStorage.getItem('SB-JSON');
//       if (SBText) {
//         SB = JSON.parse(SBText);
//       }else{
//         console.log('ERROR: Failed to fetch ScoreBoard, and no fall back ScoreBoard in Local Storage');
//         SBFUBAR = true;
//       }
//     }
//     SBFinished = true;
// }
// loadSB();



function pullImage(){
    const imgDOM = document.querySelector("#picture");
    imgDOM.innerHTML =
    '<div id="picture" class="picture-box"><img width="150px" src="SpaceCoreOfDay.png" alt="random" /></div>';
}
pullImage();




async function updateSB(playerNum){
    const playerID = '#user' + playerNum;
    const userDOM = document.querySelector(playerID);
//    const key = 'user' + playerNum;
//    let userX = SB[key];
    let innerSB = SB[playerNum];
    if(innerSB == undefined){
      return;
    }
    let userName = innerSB.name;
    let userScore = innerSB.val;
    // [userScore, userName] = userX;
    const formattedNumber = userScore.toLocaleString("en-US");
    playerNum++;
    userDOM.innerHTML = `<td id="user${playerNum}"><div>${playerNum}.</div><div>§${formattedNumber}</div><div>${userName}</div></td>`
}

async function runUpdateSB(){
for (let i = 0; i < 10; i++) {
    await updateSB(i)
}
}


async function primarySBUpdate(){
  if(SB == null){
    const dbResponse = await fetch('/api/scoreboards');
    SB = await dbResponse.json();
}
    runUpdateSB();

}
primarySBUpdate();

async function reUpSB(){
  const dbResponse = await fetch('/api/scoreboards');
  SB = await dbResponse.json();
  runUpdateSB();
  console.log('Log: ScoreBoard Updated');
}

let reUp = reUpSB;
let intervalID = setInterval(reUp, 120000);