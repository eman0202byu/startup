const user = localStorage.getItem('userName') ?? 404;
const pass = localStorage.getItem('userPass') ?? 404;

if((user == 404) || (pass == 404)){
    window.location.href = "index.html";
}

let currency = localStorage.getItem('§') ?? 0;
currency--;
Bpress();

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
    localStorage.setItem("§", currency);
}