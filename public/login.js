async function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    const response = await logPost(nameEl.value, passEl.value);
    if(response){
      window.location.href = "SpaceBar.html";
    }else{
      window.location.href = "index.html";
    }
}

async function register(){
  const nameEl = document.querySelector("#username");
  const passEl = document.querySelector("#password");
  let result = await regPost(nameEl.value, passEl.value);
  if(result == true){
    window.location.href = "SpaceBar.html";
  }else{
    window.location.href = "index.html";
  }
}

async function logPost(userN, passW){
  const newObj = {name: userN, pass: passW};
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {'content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(newObj),
    });
    const userJSON = await response.json();
    if(userJSON.msg == "Unauthorized"){
      alert("Login not valid");
      return false;
    }
    localStorage.setItem('Everything-JSON', JSON.stringify(userJSON));
    localStorage.setItem('userName', userJSON.name);
    return true;
  } catch {
    alert("Login not valid");
    return false;
  }
}

async function regPost(userN, passW) {
  const newObj = {name: userN, pass: passW};
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {'content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(newObj),
    });
    const userJSON = await response.json();
    localStorage.setItem('Everything-JSON', JSON.stringify(userJSON));
    localStorage.setItem('userName', userJSON.name);
    return true;
  } catch {
    alert("User already exists");
    return false;
  }
}












///////////////////////////////////////////////////////////////////////////////

function ThisIsRequieredForAGrade(){
    const url = "https://api.chucknorris.io/jokes/random?category=dev";
    fetch(url)
      .then((x) => x.json())
      .then((response) => {
        document.getElementById("ThisIsRequieredForAGrade").textContent = 'Obligatory "Frontend call to third party service endpoints": ' + JSON.stringify(response.value);
      });
}
ThisIsRequieredForAGrade();