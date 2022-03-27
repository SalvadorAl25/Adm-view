const url = "http://localhost:8018/api/"
d = document

d.addEventListener("DOMContentLoaded", (e) => {
    searchTable(".searchGlo", ".datos");
    statusFilter(".selectStat", ".datos")
    roleFilter(".selectRole", ".datos")
});


fetch(url + "users", {
        mode: "cors"
    })
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error));



const mostrarData = (data) => {
    let body = ''
    let role = [];
    for (let i = 0; i < data.length; i++) {
        role = data[i].role;
        let stat
        switch (data[i].status) {
            case true:
                stat = "Activo";
                break;
            case false:
                stat = "Inactivo";
                break;
        }
        body += `<tr class="datos">
                <td scope="col">${data[i].userName}</td>
                <td>${data[i].userLastName}</td>
                <td>${data[i].userEmail}</td>
                <td>${role[0].roleName}</td>
                <td>${stat}</td>
                <td>
                <button type="button" onClick="deleteUser(${data[i].userId})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
                <button type="button" onClick="editUser(${data[i].userId})" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i></button>
                <button type="button" onClick="viewUser(${data[i].userId})" class="btn btn-outline-secondary"><i class="fa-solid fa-eye"></i></button>
                </td>
            </tr>`
    }
    document.getElementById('data').innerHTML = body
}

function statusFilter(input, selector) {
    d.addEventListener("change", e => {
        if (e.target.matches(input)) {
            d.querySelectorAll(selector).forEach(el =>
                (el.textContent.includes(e.target.value)) ?
                el.classList.remove("filter") :
                el.classList.add("filter")
            )
        }
        if (e.target.value === "Estatus") {
            d.querySelectorAll(selector).forEach(
                el => el.classList.remove("filter")
            )
        }
    });
}

function deleteFilters() {
    location.reload()
}

function roleFilter(input, selector) {
    d.addEventListener("change", e => {
        if (e.target.matches(input)) {
            d.querySelectorAll(selector).forEach(el =>
                (el.textContent.includes(e.target.value)) ?
                el.classList.remove("filter") :
                el.classList.add("filter")
            )
        }
        if (e.target.value === "Area") {
            d.querySelectorAll(selector).forEach(
                el => el.classList.remove("filter")
            )
        }
    });
}

function searchTable(input, selector) {

    d.addEventListener("keyup", e => {
        if (e.target.matches(input)) {
            d.querySelectorAll(selector).forEach(el =>
                (el.textContent.toLowerCase().includes(e.target.value)) ?
                el.classList.remove("filter") :
                el.classList.add("filter"))
        }
    })
}

function editUser(id) {
    location.href = "editUser.html?id=" + id;

}

function viewUser(id){
    location.href = "viewUser.html?id=" + id;
}

function deleteUser(id) {
    fetch(url + 'user', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": id
            })
        })
        .then(res => res.json())
        .then(dat => console.log(dat))
        .catch(err => console.log(err));
    location.reload();
}