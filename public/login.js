async function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("userPass", passEl.value);
//    addUser(nameEl, passEl);
}

async function register(){
  const nameEl = document.querySelector("#username");
  const passEl = document.querySelector("#password");
  
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