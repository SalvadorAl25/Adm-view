
//--------------urls de API's-------------------
const APIFILEUPDATE_URL = "http://localhost:8018/file/";
const url = "http://localhost:8018/api/";

//-------------peticion para roles--------------
fetch(url + "roles", {
    mode: "cors"
})
.then(res => res.json())
.then(datarole => mostrarRoles(datarole))
.catch(e => console.log(e));

//------------------Mostrar roles------------------------
const mostrarRoles = (data) => {
let selComplete = ''
let sel = ''
for (let i = 0; i < data.length; i++) {
    sel += `<option value=${data[i].roleId}>${data[i].roleName}</option>`
}
selComplete = `<option selected>Area</option>` +sel;
document.getElementById('selRole').innerHTML = selComplete
}

//---------------Enviar datos al servidor--------------------
let imgPrev = document.getElementById('img-preview')
let img_up = document.getElementById('img-uploader');
img_up.addEventListener('change', function(e) {

    const img = e.target.files[0];
    const imgName = img.name;
    const nameFile = img.name.split('.');
    const ext = nameFile[1];

    const imgData = new FormData();
    imgData.append('files', img); //, 'profile-image-id_' + 1 + '.' + ext
    
    let save_botton = document.getElementById('save-btn');

    save_botton.addEventListener('click', async (e) => {
        const usuario = document.forms['usuario'];
        const nom = usuario['nom'].value;
        const lastName = usuario['lastNam'].value;
        const mail = usuario['mail'].value;
        const statusInt = usuario['status'].value;
        const status = false;
        const rolIdSt = usuario['selRole'].value;
        const rolId = parseInt(rolIdSt);
        var combo = document.getElementById('selRole');
        var rolName = combo.options[combo.selectedIndex].text;

        switch (statusInt) {
            case 1:
                status = true;
                break;
            case 0:
                status = false;
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
        
        fetch(url+'user', {
            method: 'POST',
            body: JSON.stringify(dataForm),
            headers:{
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(res => console.log('Success:',res));

        fetch(APIFILEUPDATE_URL + 'upload', {
            method: 'POST',
            body: imgData
        })
        .then(res => {
            res.json()
            alert('Usuario Agregado con exito')})
        .then(res => console.log(res));
        location.href = "index.html"
    });
    
});
