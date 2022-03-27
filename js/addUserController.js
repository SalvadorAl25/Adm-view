// --------------urls de API's-------------------
const APIFILEUPDATE_URL = 'http://localhost:8018/file/'
const url = 'http://localhost:8018/api/'
// ----Obtener imagen del DOM
let imgUp = document.getElementById('imgUploader')
let imgPrev = document.querySelector('#img-preView')

imgUp.addEventListener('change', () => {
  const imagen = imgUp.files[0]
  imgPrev.src = URL.createObjectURL(imagen)
})

function saveNewUser () {
  // imagen de perfil
  const img = imgUp.files[0]
  const imgName = img.name;
  const nameFile = img.name.split('.')
  const ext = nameFile[1]

  // datos del usuario
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
  // ------Envio de datos----
  fetch(url + 'user', {
    method: 'POST',
    body: JSON.stringify(dataForm),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => console.log('Success:', res))

//---------envio de imagen al servidor-------
  fetch(APIFILEUPDATE_URL + 'upload', {
    method: 'POST',
    body: imgData
  })
    .then(res => {
      res.json()
      alert('Usuario Agregado con exito')})
    .then(res => console.log(res))
  location.href = 'index.html'
}
