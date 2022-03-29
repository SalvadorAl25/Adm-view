function editarUsuario () {
    // ------imagen de perfil
      const img = imgUp.files[0]
      const imgName = img.name
      const nameFile = img.name.split('.')
      const ext = nameFile[1]
  
  
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
  
    /*const dataForm = {
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
    }*/
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
  