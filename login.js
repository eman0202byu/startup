function username() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
}

function password() {
    const nameEl = document.querySelector("#pass");
    localStorage.setItem("userPass", nameEl.value);
}