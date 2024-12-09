import { fetchUserData } from './api.js';

const tableBody = document.querySelector("#userTable tbody");
const loading = document.getElementById("loading");
const tableContainer = document.getElementById("tableContainer");

let currentPage = 1;
let isLoading = false;
const recordsPerPage = 15;

function renderUserData(users) {
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.address.city}, ${user.address.state}</td>
            <td>${user.phone}</td>
            <td>${user.address.postalCode}</td>
        `;
        tableBody.appendChild(row);
    });
}

async function handleVerticalScroll() {
    if (isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = tableContainer;

    if (scrollTop + clientHeight >= scrollHeight - 100) { 
        isLoading = true;
        loading.style.display = "block"; 

        const users = await fetchUserData(currentPage, recordsPerPage);
        if (users.length > 0) {
            renderUserData(users);
            currentPage++;
        }
        
        loading.style.display = "none"; 
        isLoading = false;
    }
}

async function init() {
    const users = await fetchUserData(currentPage, recordsPerPage); 
    renderUserData(users);
    currentPage++;
}

tableContainer.addEventListener("scroll", handleVerticalScroll);

init();
