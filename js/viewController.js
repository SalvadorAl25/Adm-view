// ---------------------url's de API's---------------------
const url = 'http://localhost:8018/api/'
const APIFILEUPDATE_URL = 'http://localhost:8018/file/'
var URLsearch = window.location.search
let id = URLsearch.slice(4)

fetch(url + 'schedule/user/' + id, {
  method: 'GET',
  mode: 'cors'
})
  .then(res => res.json())
  .then(data => {
    mostrarData(data); mostrarImg(data)})
  .catch(e => console.log(e))

const mostrarData = (data) => {
  let monin = data.monIn
  let monbreak = data.monBreak
  let monexit = data.monExit
  let tuein = data.tueIn
  let tuebreak = data.tueBreak
  let tueexit = data.tueExit
  let wedin = data.wedIn
  let wedbreak = data.wedBreak
  let wedexit = data.wedExit
  let thuin = data.thuIn
  let thubreak = data.thuBreak
  let thuexit = data.thuExit
  let friin = data.friIn
  let fribreak = data.friBreak
  let friexit = data.friExit
  console.log(data)
  user = data.user
  let name = user.userName
  let lastName = user.userLastName
  let email = user.userEmail
  let status = user.status
  let dateBirthday = user.dateBirthday
  let country = user.country
  let state = user.state
  let city = user.city
  let address = user.address
  let rfc = user.rfc
  let sta = ''

  switch (status) {
    case true:
      sta = 'Activo'
      break
    case false:
      sta = 'Inactivo'
      break
  }

  let imgName = user.imgProfile
  let roleName = user.role.roleName

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
  document.getElementById('monin').value = monin
  document.getElementById('monbreak').value = monbreak
  document.getElementById('monexit').value = monexit
  document.getElementById('tuein').value = tuein
  document.getElementById('tuebreak').value = tuebreak
  document.getElementById('tueexit').value = tueexit
  document.getElementById('wedin').value = wedin
  document.getElementById('wedbreak').value = wedbreak
  document.getElementById('wedexit').value = wedexit
  document.getElementById('thuin').value = thuin
  document.getElementById('thubreak').value = thubreak
  document.getElementById('thuexit').value = thuexit
  document.getElementById('friin').value = friin
  document.getElementById('fribreak').value = fribreak
  document.getElementById('friexit').value = friexit
}

const mostrarImg = (data) => {
  let user = data.user
  let imgName = user.imgProfile
  let imgUser = document.querySelector('#imgUser')
  if (user.imgProfile == null) 
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
