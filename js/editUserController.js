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
  let id = data.userId
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
  let sta = 0

  switch (status) {
    case true:
      sta = 1
      break
    case false:
      sta = 0
      break
  }

  let imgName = data.imgProfile
  let role = data.role
  let roleId = role.roleId

  document.getElementById('userId').value = id
  document.getElementById('nom').value = name
  document.getElementById('lastNam').value = lastName
  document.getElementById('mail').value = email
  document.getElementById('selRole').value = roleId
  document.getElementById('status').value = sta
  document.getElementById('dateBirthday').value = dateBirthday
  document.getElementById('country').value = country
  document.getElementById('state').value = state
  document.getElementById('city').value = city
  document.getElementById('address').value = address
  document.getElementById('rfc').value = rfc
}

const mostrarImg = (data) => {
  if (data.imgProfile == null) {
    imgUser.src = './Source/profile.webp'
  }else {
    let imgName = data.imgProfile
    let imgUser = document.querySelector('#imgUser')
    fetch(APIFILEUPDATE_URL + 'download/' + imgName, {
      method: 'GET'
    })
      .then(response => response.blob())
      .then(data => imgUser.src = URL.createObjectURL(data))
      .catch(e => console.log(e))
  }
}

let imgUp = document.getElementById('imgUploader')
let imgPrev = document.querySelector('#imgUser')
let ban = false
imgUp.addEventListener('change', () => {
  const imagen = imgUp.files[0]
  imgPrev.src = URL.createObjectURL(imagen)
  ban = true
})

function editarUsuario () {
  fetch(url + 'user/' + id, {
    method: 'GET',
    mode: 'cors'
  })
    .then(res => res.json())
    .then(data => {
      if (ban === true)
        imgChange(data)
      else
        imgNotChange(data)
    })
    .catch(e => console.log(e))
}

const imgChange = (data) => {
  // -----elimina la imagen actual
  if (data.imgProfile !== null) {
    fetch(APIFILEUPDATE_URL + 'delete/' + data.imgProfile, {
      method: 'DELETE'
    })
      .then(response => response.blob())
      .then(data => console.log(data))
      .catch(e => console.log(e))
    

  }

  // ------imagen de perfil
  const img = imgUp.files[0]
  const imgName = img.name
  const nameFile = imgName.split('.')
  const ext = nameFile[1]

  // ------datos del usuario
  const usuario = document.forms['usuario']
  const id = usuario['userId'].value
  const nom = usuario['nom'].value
  const lastName = usuario['lastNam'].value
  const mail = usuario['mail'].value
  let statusInt = usuario['status'].value
  var statusbol = false
  const birthday = usuario['dateBirthday'].value
  const country = usuario['country'].value
  const state = usuario['state'].value
  const city = usuario['city'].value
  const rfc = usuario['rfc'].value
  const address = usuario['address'].value
  const rolIdSt = usuario['selRole'].value
  const rolId = parseInt(rolIdSt)
  var combo = document.getElementById('selRole')
  var rolName = combo.options[combo.selectedIndex].text
  var newNameImg = 'profile-image-id_' + id + '_' + rolName + '.' + ext

  const imgData = new FormData()
  imgData.append('files', img, newNameImg)

  if (statusInt == 1)
    statusbol = true
  else
    statusbol = false

  const dataForm = {
    userId: id,
    userName: nom,
    userLastName: lastName,
    userEmail: mail,
    status: statusbol,
    imgProfile: newNameImg,
    dateBirthday:birthday,
    country:country,
    state:state,
    city:city,
    address:address,
    rfc:rfc,
    role: 
      {
        roleId: rolId,
        roleName: rolName
      }
    
  }
  // --------modifica los datos en el servidor
  fetch(url + 'user', {
    method: 'POST',
    body: JSON.stringify(dataForm),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => console.log('Success:', res))
  // ---------envio de imagen al servidor-------
  fetch(APIFILEUPDATE_URL + 'upload', {
    method: 'POST',
    body: imgData
  })
    .then(res => {
      res.json()
      alert('Usuario Modificado con exito')})
    .then(res => console.log(res))
  location.href = 'users.html'
}

const imgNotChange = (data) => {
  // ------imagen de perfil
  const imgName = data.imgProfile

  // ------datos del usuario
  const usuario = document.forms['usuario']
  const id = usuario['userId'].value
  const nom = usuario['nom'].value
  const lastName = usuario['lastNam'].value
  const mail = usuario['mail'].value
  let statusInt = usuario['status'].value
  var statusbol = false
  const birthday = usuario['dateBirthday'].value
  const country = usuario['country'].value
  const state = usuario['state'].value
  const city = usuario['city'].value
  const rfc = usuario['rfc'].value
  const address = usuario['address'].value
  const rolIdSt = usuario['selRole'].value
  const rolId = parseInt(rolIdSt)
  var combo = document.getElementById('selRole')
  var rolName = combo.options[combo.selectedIndex].text

  if (statusInt == 1)
    statusbol = true
  else
    statusbol = false

  const dataForm = {
    userId: id,
    userName: nom,
    userLastName: lastName,
    userEmail: mail,
    status: statusbol,
    imgProfile: imgName,
    dateBirthday:birthday,
    country:country,
    state:state,
    city:city,
    address:address,
    rfc:rfc,
    role: 
      {
        roleId: rolId,
        roleName: rolName
      }
    
  }
  // --------modifica los datos en el servidor
  fetch(url + 'user', {
    method: 'POST',
    body: JSON.stringify(dataForm),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      console.log('Success:', res)
      alert('Usuario Modificado con exito')
    })
  location.href = './users.html'
}

function cancelButton () {
  location.href = 'viewUser.html?id=' + id
}