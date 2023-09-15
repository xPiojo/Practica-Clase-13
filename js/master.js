const firstName = document.getElementById("nombre"); // Campo de entrada del nombre.
const lastName = document.getElementById("apellido"); // Campo de entrada del apellido.
const email = document.getElementById("correo"); // Campo de entrada del correo electrónico.
const address = document.getElementById("direccion"); // Campo de entrada de la dirección.
const btnRegister = document.getElementById("botonRegistrar"); // Botón de registro de usuario.
const tableBody = document.getElementById("cuerpoTabla"); // Cuerpo de la tabla de usuarios.
const btnPrintUsers = document.getElementById("botonImprimir"); // Botón para imprimir la tabla de usuarios.
const table = document.getElementById("tabla"); // Tabla que muestra los usuarios.
const btnClearUsers = document.getElementById("botonBorrar"); // Botón para borrar usuarios.

// Agrego un evento "click" a los botones.
btnRegister.addEventListener("click", saveUser);
btnPrintUsers.addEventListener("click", printTable);
btnClearUsers.addEventListener("click", clearUsers);

// Guarda un nuevo usuario en el almacenamiento local.
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

// Actualiza la tabla HTML con la lista de usuarios almacenados en el local storage.
function printTable() {
    if (localStorage.getItem("userList")) {
        let users = JSON.parse(localStorage.getItem("userList"));
        tableBody.innerHTML = "";
        users.forEach(person => {
            tableBody.innerHTML += `<tr><td>${person.firstName}</td><td>${person.lastName}</td><td>${person.email}</td><td>${person.address}</td></tr>`;
        });
        table.style.display = "block";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay usuarios registrados',
        });
        }
}

// Elimina todos los usuarios almacenados en el local storage, si el usuario confirma.
function clearUsers() {
    Swal.fire({
        title: '¿Deseas eliminar los usuarios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        //.then - Es un metodo de Js que se utiliza para manejar las promesas. Las promesas son objetos que representan un valor que puede estar disponible ahora, en el futuro o nunca.
        if (result.isConfirmed) {
            if (localStorage.getItem("userList")) {
                localStorage.removeItem("userList");
                table.style.display = "none";
                Swal.fire({
                    title: '¡Listo!',
                    text: 'Los usuarios han sido eliminados con éxito',
                    icon: 'success',
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay usuarios registrados',
            });
        }}})
}



// Función sin cuadro de confirmación
/*
function clearUsers() {
    if (localStorage.getItem("userList")) {
        localStorage.removeItem("userList");
        table.style.display = "none";
        Swal.fire({
            title: '¡Listo!',
            text: 'Los usuarios han sido eliminados con éxito',
            icon: 'success',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay usuarios registrados',
        });
    }
};
*/