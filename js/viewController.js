// ---------------------url's de API's---------------------
const url = 'https://api-users-jsaa.herokuapp.com/api/'
const APIFILEUPDATE_URL = 'https://api-users-jsaa.herokuapp.com/file/'
var URLsearch = window.location.search
let id = URLsearch.slice(4)

fetch(url + 'user/' + id, {
  method: 'GET',
  mode: 'cors'
})
  .then(res => res.json())
  .then(data => {
    mostrarData(data); mostrarImg(data)})
  .catch(e => console.log(e))

const mostrarData = (data) => {
  let name = data.userName
  let lastName = data.userLastName
  let email = data.userEmail
  let status = data.status
  let sta = ''

  switch (status) {
    case true:
      sta = 'Activo'
      break
    case false:
      sta = 'Inactivo'
      break
  }

  let imgName = data.imgProfile
  let roleName = data.role[0].roleName

  document.getElementById('name').value = name
  document.getElementById('lastName').value = lastName
  document.getElementById('email').value = email
  document.getElementById('roleName').value = roleName
  document.getElementById('status').value = sta
}

const mostrarImg = (data) => {
  let imgName = data.imgProfile
  let imgUser = document.querySelector('#imgUser')
  if (data.imgProfile == null) 
    imgUser.src = './Source/profile.webp'
  else {
    fetch(APIFILEUPDATE_URL + 'download/' + imgName, {
      method: 'GET'
    })
      .then(response => response.blob())
      .then(data => imgUser.src = URL.createObjectURL(data))
      .catch(e => console.log(e))
  }
}

function editUser () {
  location.href = 'editUser.html?id=' + id
}
