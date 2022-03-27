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
  let name = data.userName
  let lastName = data.userLastName
  let email = data.userEmail
  let status = data.status
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
  let role = data.role[0]
  let roleId = role.roleId

  document.getElementById('nom').value = name
  document.getElementById('lastNam').value = lastName
  document.getElementById('mail').value = email
  document.getElementById('selRole').value = roleId
  document.getElementById('status').value = sta
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
  // ------imagen de perfil
  if (ban == true) {
    const img = imgUp.files[0]
    const imgName = img.name
    const nameFile = img.name.split('.')
    const ext = nameFile[1]
  }
  else{
    var imgUser = document.getElementById('imgUser').src
    console.log(imgUser)
  }


  // ------datos del usuario
  const usuario = document.forms['usuario']
  const nom = usuario['nom'].value
  const lastName = usuario['lastNam'].value
  const mail = usuario['mail'].value
  const statusInt = usuario['status'].value
  const status = false
  const rolIdSt = usuario['selRole'].value
  const rolId = parseInt(rolIdSt)
  var combo = document.getElementById('selRole')
  var rolName = combo.options[combo.selectedIndex].text

  const imgData = new FormData()
  imgData.append('files', img); // , 'profile-image-id_' + 1 + '.' + ext

  switch (statusInt) {
    case 1:
      status = true
      break
    case 0:
      status = false
  }

  const dataForm = {
    userName: nom,
    userLastName: lastName,
    userEmail: mail,
    status: status,
    imgProfile: imgName,
    role: [
      {
        roleId: rolId,
        roleName: rolName
      }
    ]
  }

  console.log(dataForm)
  console.log(imgUpFile)

/*fetch(url + 'user', {
  method: 'POST',
  body: JSON.stringify(dataForm),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(res => console.log('Success:', res))*/
}
