import React, { useEffect } from "react";
let bucks = "§-------";
export function SpaceBar() {
  const [bucks, setDisplayText] = React.useState(0);

  async function getData() {
    const dbResponse = await fetch("/api/dbs");
    const j = await dbResponse.json();
    setDisplayText(j.val);
  }

  async function updateData(newCount) {
    const dbResponse = await fetch("/api/dbs");
    const j = await dbResponse.json();
    j.val = newCount

          await fetch('/api/db', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(j),
          });
          setDisplayText(newCount);
        }

  React.useEffect(() => {
    getData();
  }, []);

  function ButtonPusher() {
    updateData(bucks+1)
  }

  let display = <div>loading...</div>;
  if (bucks) {
    display = (
      <div>
        <section>
          <div>${bucks}</div>
        </section>

        <picture>
          <div id="picture" className="picture-box">
            <img width="100px" src="SpaceCore.png" alt="random" />
          </div>
        </picture>
      </div>
    );
  }

  return (
    <main>
      <header>
        <h1>Space Bar</h1>
      </header>
      {display}
      <section>
        <br />
        <button type="" onClick={() => ButtonPusher()}>
          Space
        </button>
      </section>
    </main>
  );
}

// let currency = 0;
// let userObj = null;

// function ButtonPusher(){
//     [currency, Setcount] = useState(currency);

//     function iterate(){
//         Bpress();
//         saveCurrency(currency);
//     }

//     useEffect( ()=>{
//         getCurrency();
//         Setcount(currency);
//     },[])
// }

// async function getCurrency(){
//     if(userObj == null){
//         const dbResponse = await fetch('/api/dbs');
//         userObj = await dbResponse.json();
//     }
//     currency = userObj.val;

//     const formattedNumber = currency.toLocaleString("en-US");

//     if(currency < 10){
//         setDisplayText =
//         `§------${formattedNumber}`;
//     } else if(currency < 100){
//         bucks =
//         `§-----${formattedNumber}`;
//     } else if(currency < 1000){
//         bucks =
//         `§----${formattedNumber}`;
//     } else if(currency < 10000){
//         bucks =
//         `§---${formattedNumber}`;
//     } else if(currency < 100000){
//         bucks =
//         `§--${formattedNumber}`;
//     } else if(currency < 1000000){
//         bucks =
//         `§-${formattedNumber}`;
//     }  else if(currency < 10000000){
//         bucks =
//         `§${formattedNumber}`;
//     } else {
//         bucks =
//         `§${formattedNumber}`;
//     }
// }
// getCurrency();

// function Bpress(){
//     currency++;
//     const formattedNumber = currency.toLocaleString("en-US");

//     if(currency < 10){
//         bucks =
//         `§------${formattedNumber}`;
//     } else if(currency < 100){
//         bucks =
//         `§-----${formattedNumber}`;
//     } else if(currency < 1000){
//         bucks =
//         `§----${formattedNumber}`;
//     } else if(currency < 10000){
//         bucks =
//         `§---${formattedNumber}`;
//     } else if(currency < 100000){
//         bucks =
//         `§--${formattedNumber}`;
//     } else if(currency < 1000000){
//         bucks =
//         `§-${formattedNumber}`;
//     }  else if(currency < 10000000){
//         bucks =
//         `§${formattedNumber}`;
//     } else {
//         bucks =
//         `§${formattedNumber}`;
//     }
//     saveCurrency(currency);
//     localStorage.setItem("§", currency);
// }

// async function saveCurrency(currency) {
//         if(userObj == null){
//             const dbResponse = await fetch('/api/dbs');
//             userObj = await dbResponse.json();
//         }
//         userObj.val = currency;
//         try {
//           const response = await fetch('/api/db', {
//             method: 'POST',
//             headers: {'content-type': 'application/json'},
//             body: JSON.stringify(userObj),
//           });
//           const thisJSON = await response.json();
//           localStorage.setItem('Everything-JSON', JSON.stringify(thisJSON));
//         } catch {
//         }
//   }
