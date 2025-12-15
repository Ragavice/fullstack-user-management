// const { default: mongoose, Schema } = require("mongoose");

const API_URL = "http://localhost:5000/users";

// Load users on page load
window.onload = loadUsers;

// Fetch users
function loadUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("userList");
            list.innerHTML = "";

            data.forEach(user => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${user.name}</span>

                    <div>
                        <button onclick="editUser('${user._id}', '${user.name}')">Edit</button>
                        <button onclick="deleteUser('${user._id}')">Delete</button>
                    </div>
                `;
                list.appendChild(li);
            });
        });
}

// Add user
function addUser() {
    const name = document.getElementById("username").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })
    .then(() => {
        document.getElementById("username").value = "";
        loadUsers();
    });
}

// Delete user
function deleteUser(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadUsers());
}

function editUser(id, oldName) {

    const newName = prompt("Enter new name:", oldName);

    if (!newName) return;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
    })
    .then(() => loadUsers());
}






