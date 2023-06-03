// ---------------------url's de API's---------------------
const url = 'http://localhost:8018/api/'
const APIFILEUPDATE_URL = 'http://localhost:8018/file/'
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
  console.log(data)
  let name = data.userName
  let lastName = data.userLastName
  let email = data.userEmail
  let status = data.status
  let dateBirthday = data.dateBirthday
  let country = data.country
  let state = data.state
  let city = data.city
  let address = data.address
  let rfc = data.rfc
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
  let roleName = data.role.roleName

  document.getElementById('name').value = name
  document.getElementById('lastName').value = lastName
  document.getElementById('email').value = email
  document.getElementById('roleName').value = roleName
  document.getElementById('status').value = sta
  document.getElementById('dateBirthday').value = dateBirthday
  document.getElementById('country').value = country
  document.getElementById('state').value = state
  document.getElementById('city').value = city
  document.getElementById('address').value = address
  document.getElementById('rfc').value = rfc
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
