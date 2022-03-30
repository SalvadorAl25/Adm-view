// --------------urls de API's-------------------
const APIFILEUPDATE_URL = 'https://api-users-jsaa.herokuapp.com/file/'
const url = 'https://api-users-jsaa.herokuapp.com/api/'
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
  let statusInt = usuario['status'].value
  var statusbol = false
  const rolIdSt = usuario['selRole'].value
  const rolId = parseInt(rolIdSt)
  var combo = document.getElementById('selRole')
  var rolName = combo.options[combo.selectedIndex].text
  var newNameImg ='profile-image-id_' + mail+'_'+rolName + '.' + ext;

  const imgData = new FormData()
  imgData.append('files', img, newNameImg);

  if (statusInt == 1)
    statusbol = true
  else
    statusbol = false

  const dataForm = {
    userName: nom,
    userLastName: lastName,
    userEmail: mail,
    status: statusbol,
    imgProfile: newNameImg,
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
