const firstName = document.getElementById("nombre");
const lastName = document.getElementById("apellido");
const email = document.getElementById("correo");
const address = document.getElementById("direccion");
const btnRegister = document.getElementById("botonRegistrar");
const tableBody = document.getElementById("cuerpoTabla");
const btnPrintUsers = document.getElementById("botonImprimir");
const table = document.getElementById("tabla");
const btnClearUsers = document.getElementById("botonBorrar");


btnRegister.addEventListener("click", saveUser);
btnPrintUsers.addEventListener("click", printTable);
btnClearUsers.addEventListener("click", clearUsers);


function saveUser() {
    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value
    }
    if (localStorage.getItem("userList")) {
        let users = JSON.parse(localStorage.getItem("userList"));
        users.push(user);
        localStorage.setItem("userList", JSON.stringify(users));
      } else {
        const users = JSON.stringify([user]);
        localStorage.setItem("userList", users);
      }
}


function printTable() {
    let users = JSON.parse(localStorage.getItem("userList"));
    tableBody.innerHTML = "";
    users.forEach(person => {
        tableBody.innerHTML += `<tr><td>${person.firstName}</td><td>${person.lastName}</td><td>${person.email}</td><td>${person.address}</td></tr>`;
    });
    table.style.display = "block";
}


function clearUsers() {
    localStorage.removeItem("userList");
    table.style.display = "none";
}