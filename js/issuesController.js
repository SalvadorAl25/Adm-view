const url = 'http://localhost:8018/api/'
d = document
// let users = []

d.addEventListener('DOMContentLoaded', (e) => {
  // searchTable('.searchGlo', '.datos')
  // daysFilter('.selectDay', '.schedule', 'lun', 'mar', 'mie', 'jue', 'vie')
})

fetch(url + 'issues', {
  mode: 'cors'
})
  .then(response => response.json())
  .then(data => mostrarData(data))
  .catch(error => console.log(error))

const mostrarData = (data) => {

  // console.log(data)
  let body = ''
  let oneUser = {}
  for (let i = 0; i < data.length; i++) {
    // users.push(data[i].user)
    oneUser = data[i].user
    body += `<tr class="issues datos">
                    <td class="empl" scope="col">${oneUser.userName+' '+oneUser.userLastName}</td>
                    <td class="titl">${data[i].tittle}</td>
                    <td class="desc">${data[i].description}</td>
                    <td class="crea">${data[i].dateCreate}</td>
                    <td class="fini">${data[i].dateFinish}</td>
                    <td>
                        <button type="button" onClick="" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
                        <button type="button" onClick="" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i></button>
                    </td>
                </tr>`
  }
  // console.log(users)
  document.getElementById('data').innerHTML = body
}