function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("userPass", passEl.value);
//    addUser(nameEl, passEl);
}


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