import React from 'react';

export function Login() {
  return (
        <main>
          <header>
            <h1>Space Salary</h1>
            <h3>Please enter your Username and Password</h3>
          </header>

          <div>
          <label>Username: </label>
          <input type="text" id="username" name="varUsername" placeholder="Username" required/>
          </div>
          <h6>Username: Alphanumeric and at least 4 characters</h6>

          <div>
          <label>Password: </label>
          <input type="password" id="password" name="varPassword" placeholder="********" required/>
          </div>
          <h6>Password, Minimum of: 8 characters, 1 Uppercase letter, 1 Lowercase letter, 1 number, 1 special character </h6>
            
          <button type="" onClick={() => login()}>Login</button>
          <button type="" onClick={() => register()}>Register</button>
        </main>
  );
}

async function login() {
  const nameEl = document.querySelector("#username");
  const passEl = document.querySelector("#password");
  localStorage.setItem("userName", nameEl.value);
  const response = await logPost(nameEl.value, passEl.value);
  if(response){
    window.location.href = "/spacebar";
  }else{
    window.location.href = "/";
  }
}

async function register(){
const nameEl = document.querySelector("#username");
const passEl = document.querySelector("#password");
let result = await regPost(nameEl.value, passEl.value);
if(result == true){
  window.location.href = "/spacebar";
}else{
  window.location.href = "/";
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