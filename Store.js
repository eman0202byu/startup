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
           item1: ['imgID', 'value'],
           item2: ['imgID', 'value'],
           item3: ['imgID', 'value'],
           item4: ['imgID', 'value'],
           item5: ['imgID', 'value'],
           item6: ['imgID', 'value'],
           item7: ['imgID', 'value'],
           item8: ['imgID', 'value'],
           item9: ['imgID', 'value'],
        }
        // Each image will be assigned a letter and number
        // h === hat; n === necklace; l === lHand; r === rHand;
        // The numbers will be in the order the image is added to the database
        // 0 === NONE;
        // EX: partyhat.jpg === h1;
        // This will be packaged in to a .json and send to the DB and then the DB will push back the corrosponding .png updating the user's SpaceCore.png reference.
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

    buttonDOM.innerHTML = `<td id="item${buttonNumber}"><div>${itemImage}</div><div>§${itemValue}</div><button type="" onclick="Bpress(${buttonNumber})">Buy</button></td>`;
}



