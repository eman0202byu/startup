const user = localStorage.getItem('userName') ?? 404;
const pass = localStorage.getItem('userPass') ?? 404;

if((user == 404) || (pass == 404)){
    window.location.href = "index.html";
}

let currency = localStorage.getItem('§') ?? 0; //Update with database fetch



let spaceCore = null;

const fetchCore = new Promise((resolve,reject) => {

    let outsidespaceCore = localStorage.getItem('Core') ?? 'NONE'; //Update with database fetch
    fetchSuccess = true;
    ////IMPORTANT:: THIS WILL BE UPDATED WHEN DATABASE IS IMPLEMENTED

    if(fetchSuccess === true){
        if(outsidespaceCore == 'NONE'){
        spaceCore = {
           hat: 0,
           necklace: 0,
           lHand: 0,
           rHand: 0,
        }
        // Each image will be assigned a letter and number
        // h === hat; n === necklace; l === lHand; r === rHand;
        // The numbers will be in the order the image is added to the database
        // 0 === NONE;
        // EX: partyhat.jpg === h1;
        // This will be packaged in to a .json and send to the DB and then the DB will push back the corrosponding .png updating the user's SpaceCore.png reference.
        localStorage.setItem('Core', JSON.stringify(spaceCore)); //Update with database push
        } else {
            spaceCore = JSON.parse(outsidespaceCore);
        }
        resolve('COREINFORMATION');
    } else {
        reject('COREERRORCODEHERE');
    }
});

fetchCore
    .then((RESULT) => console.log(`Success: ${RESULT}`))
    .catch((ERRORCODE) => console.error(`Error: ${ERRORCODE}`))
    .finally(() => console.log('Log: fetchCore finished'));






let Store = null;

const fetchStore = new Promise((resolve,reject) => {

    let outsideStore = localStorage.getItem('Store') ?? 'NONE'; //Update with database fetch
    fetchSuccess = true;
    ////IMPORTANT:: THIS WILL BE UPDATED WHEN DATABASE IS IMPLEMENTED

    if(fetchSuccess === true){
        if(outsideStore == 'NONE'){
        Store = {
           item1: ['imgID1', '100'],
           item2: ['imgID2', '100'],
           item3: ['imgID3', '100'],
           item4: ['imgID4', '100'],
           item5: ['imgID5', '100'],
           item6: ['imgID6', '100'],
           item7: ['imgID7', '100'],
           item8: ['imgID8', '100'],
           item9: ['imgID9', '100'],
        }
        // Each image will be assigned a letter and number
        // h === hat; n === necklace; l === lHand; r === rHand;
        // The numbers will be in the order the image is added to the database
        // 0 === NONE;
        // EX: partyhat.jpg === h1;
        // This will be packaged in to a .json and send to the DB and then the DB will the user's SpaceCore.png reference.
        localStorage.setItem('Store', JSON.stringify(Store)); //Update with database push
        } else {
            Store = JSON.parse(outsideStore);
        }
        resolve('STOREINFORMATION');
    } else {
        reject('STOREERRORCODEHERE');
    }
});

fetchStore
    .then((RESULT) => console.log(`Success: ${RESULT}`))
    .catch((ERRORCODE) => console.error(`Error: ${ERRORCODE}`))
    .finally(() => console.log('Log: fetchStore finished'));


function Bpress(buttonNumber){
    const buttonID = '#item' + buttonNumber;
    const buttonDOM = document.querySelector(buttonID);
    const key = 'item' + buttonNumber;
    let item = Store[key];
    let itemImage, itemValue = null;
    [itemImage, itemValue] = item;

    if(itemValue > currency){
        alert("You can't afford this item");
        buttonDOM.innerHTML = `<td id="item${buttonNumber}"><div>${itemImage}</div><div>§${itemValue}</div><button type="" onclick="Bpress(${buttonNumber})">Buy</button></td>`;
    } else{
        currency = (currency - itemValue);
        buttonDOM.innerHTML = `<td id="item${buttonNumber}"><div>Sold</div><div>§${itemValue}</div></td>`
    }
    localStorage.setItem("§", currency); //Update with database push
    let cur = localStorage.getItem('items') ?? ''; //Update with database fetch
    localStorage.setItem('items', itemImage + ' ' + cur); //Update with database push
}



function inventoryUp(){

    const hatID = document.querySelector('#hat');
    const necklaceID = document.querySelector('#necklace');
    const lHandID = document.querySelector('#lHand');
    const rHandID = document.querySelector('#rHand');

    spaceCore.hat = hatID.value;
    spaceCore.necklace = necklaceID.value;
    spaceCore.lHand = lHandID.value;
    spaceCore.rHand = rHandID.value;

    localStorage.setItem('Core', JSON.stringify(spaceCore)); // Update with database push

    alert('Inventory Saved');

}