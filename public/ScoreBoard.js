const user = localStorage.getItem('userName') ?? 404;
const pass = localStorage.getItem('userPass') ?? 404;

if((user == 404) || (pass == 404)){
    window.location.href = "index.html";
}

let accountStatus = 0;

async function loadSus() {
    let sus = 0;
    try {
      const response = await fetch('/api/suspensions');
      sus = await response.json();
  
      localStorage.setItem('Suspension-JSON', JSON.stringify(sus));

      const susText = JSON.stringify(sus);
      if (susText) {
        accountStatus = JSON.parse(susText).val;
      }
    } catch {
      const susText = localStorage.getItem('Suspension-JSON');
      if (susText) {
        accountStatus = JSON.parse(susText).val;
      }else{
        accountStatus = 0;
      }
    }
}
loadSus();

//const accountStatus = localStorage.getItem('Suspention') ?? 0;

if(accountStatus == 1){
    cheating();
}

function cheating(){
    document.body.innerHTML =
    `<body id="caught"><header><h1>You Clicked too fast</h1><li><span class="text-reset">Your account has been suspended by the spacecops contact the admin to review your case.</span><br /><a href="https://github.com/eman0202byu/startup">GitHub</a></li></header></body>`;
}

if(accountStatus != 1){

let SB = null;
let SBFUBAR = false;
let SBFinished = false;

async function loadSB() {
    finished = false;
    let SBJSON = [];
    try {
      const response = await fetch('/api/scoreboards');
      SBJSON = await response.json();
  
      localStorage.setItem('SB-JSON', JSON.stringify(SBJSON));

      const SBText = JSON.stringify(SBJSON);
      if (SBText) {
        SB = JSON.parse(SBText);
      }
    } catch {
      const SBText = localStorage.getItem('SB-JSON');
      if (SBText) {
        SB = JSON.parse(SBText);
      }else{
        console.log('ERROR: Failed to fetch ScoreBoard, and no fall back ScoreBoard in Local Storage');
        SBFUBAR = true;
      }
    }
    SBFinished = true;
}
loadSB();

// const fetchSB = new Promise((resolve,reject) => {

//     let outsideSB = localStorage.getItem('ScoreBoard') ?? 'NONE'; //Update with database fetch
//     fetchSuccess = true;
//     ////IMPORTANT:: THIS WILL BE UPDATED WHEN DATABASE IS IMPLEMENTED

//     if(fetchSuccess === true){
//         if(outsideSB == 'NONE'){
//         SB = {
//            user1: [99999, "Alpha"],
//            user2: [99998, "Beta"],
//            user3: [99997, "Gamma"],
//            user4: [99996, "Delta"],
//            user5: [99995, "Epsilon"],
//            user6: [99994, "Zeta"],
//            user7: [99993, "Eta"],
//            user8: [99992, "Theta"],
//            user9: [99991, "Iota"],
//            user0: [99990, "Kappa"],
//         }
//         // This will be packaged in to a .json. user0 == 10th place
//         localStorage.setItem('ScoreBoard', JSON.stringify(SB)); //Update with database push
//         } else {
//             SB = JSON.parse(outsideSB);
//         }
//         resolve('SBINFORMATION');
//     } else {
//         reject('SBERRORCODEHERE');
//     }
// });

// fetchSB
//     .then((RESULT) => console.log(`Success: ${RESULT}`))
//     .catch((ERRORCODE) => console.error(`Error: ${ERRORCODE}`))
//     .finally(() => console.log('Log: fetchSB finished'));


function pullImage(){
    const imgDOM = document.querySelector("#picture");
    imgDOM.innerHTML =
    '<div id="picture" class="picture-box"><img width="150px" src="SpaceCoreOfDay.png" alt="random" /></div>';
} // Will update when DB exists
pullImage();


function updateSB(playerNum){
    if(SBFUBAR == false){
    const playerID = '#user' + playerNum;
    const userDOM = document.querySelector(playerID);
    const key = 'user' + playerNum;
    let userX = SB[key];
    let userScore, userName = null;
    [userScore, userName] = userX;
    const formattedNumber = userScore.toLocaleString("en-US");

    if(playerNum != 0){
        userDOM.innerHTML = `<td id="user${playerNum}"><div>${playerNum}.</div><div>§${formattedNumber}</div><div>${userName}</div></td>`
    }else{
        userDOM.innerHTML = `<td id="user${playerNum}"><div>1${playerNum}.</div><div>§${formattedNumber}</div><div>${userName}</div></td>`
    }
}
}

function runUpdateSB(){
for (let i = 1; i < 10; i++) {
    updateSB(i)
}
updateSB(0);
}


function primarySBUpdate(){
if(SBFinished){
    runUpdateSB();
}else{
    if(SBFinished == false){
        setTimeout(() => {primarySBUpdate();}, 500);
    }else{
        primarySBUpdate();
    }
}
}
primarySBUpdate();

function reUpSB(){
    loadSB();
    setTimeout(function(){
        runUpdateSB();
        console.log('Log: ScoreBoard Updated');
    }, 15000);
}

let reUp = reUpSB;

let intervalID = setInterval(reUp, 120000);



}