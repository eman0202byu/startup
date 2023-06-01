function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("userPass", passEl.value);
//    addUser(nameEl, passEl);
}

function ThisIsRequieredForAGrade(){
    const url = "https://api.chucknorris.io/jokes/random?category=dev";
    fetch(url)
      .then((x) => x.json())
      .then((response) => {
        document.getElementById("ThisIsRequieredForAGrade").textContent = 'Obligatory "Frontend call to third party service endpoints": ' + JSON.stringify(response.value);
      });
}
ThisIsRequieredForAGrade();

// TODO: Implement when DB exists
// async function addUser(user, pass) {
//     const userName = user;
//     const password = pass;
//     const newUser = {name: userName, pass: password};
//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {'content-type': 'application/json'},
//         body: JSON.stringify(newUser),
//       });
//       const userJSON = await response.json();
//       localStorage.setItem('User-JSON', JSON.stringify(userJSON));
//     } catch {
//     }
//   }