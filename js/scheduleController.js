const url = 'http://localhost:8018/api/'
d = document
// let users = []

d.addEventListener('DOMContentLoaded', (e) => {
  searchTable('.searchGlo', '.datos')
  daysFilter('.selectDay', '.schedule', 'lun', 'mar', 'mie', 'jue', 'vie')
})

fetch(url + 'schedules', {
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
    body += `<tr class="schedule datos">
                    <td class="emp" scope="col">${oneUser.userName+' '+oneUser.userLastName}</td>
                    <td class="lun">${data[i].monIn}</td>
                    <td class="lun">${data[i].monBreak}</td>
                    <td class="lun">${data[i].monExit}</td>
                    <td class="mar">${data[i].tueIn}</td>
                    <td class="mar">${data[i].tueBreak}</td>
                    <td class="mar">${data[i].tueExit}</td>
                    <td class="mie">${data[i].wedIn}</td>
                    <td class="mie">${data[i].wedBreak}</td>
                    <td class="mie">${data[i].wedExit}</td>
                    <td class="jue">${data[i].thuIn}</td>
                    <td class="jue">${data[i].thuBreak}</td>
                    <td class="jue">${data[i].thuExit}</td>
                    <td class="vie">${data[i].friIn}</td>
                    <td class="vie">${data[i].friBreak}</td>
                    <td class="vie">${data[i].friExit}</td>
                    <td>
                        <button type="button" onClick="" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
                        <button type="button" onClick="" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i></button>
                    </td>
                </tr>`
  }
  // console.log(users)
  document.getElementById('data').innerHTML = body
}

function daysFilter (input, selector, lunes, martes, miercoles, jueves, viernes) {
  d.addEventListener('change', e => {
    console.log(e.target.value)
    console.log(d.querySelectorAll(selector))
    if (e.target.matches(input)) {
      d.querySelectorAll(selector).forEach(el => {
        for (i = 0; i < el.cells.length; i++) {
          switch (e.target.value) {
            case 'lunes':
              if (el.cells[i].className.includes(lunes) || el.cells[i].className.includes('emp'))
                el.cells[i].classList.remove('filter')
              else el.cells[i].classList.add('filter')
              break
            case 'martes':
              if (el.cells[i].className.includes(martes) || el.cells[i].className.includes('emp'))
                el.cells[i].classList.remove('filter')
              else el.cells[i].classList.add('filter')
              break
            case 'miercoles':
              if (el.cells[i].className.includes(miercoles) || el.cells[i].className.includes('emp'))
                el.cells[i].classList.remove('filter')
              else el.cells[i].classList.add('filter')
              break
            case 'jueves':
              if (el.cells[i].className.includes(jueves) || el.cells[i].className.includes('emp'))
                el.cells[i].classList.remove('filter')
              else el.cells[i].classList.add('filter')
              break
            case 'viernes':
              if (el.cells[i].className.includes(viernes) || el.cells[i].className.includes('emp'))
                el.cells[i].classList.remove('filter')
              else el.cells[i].classList.add('filter')
              break
            case 'Dia':
              el.cells[i].classList.remove('filter')
              break
          }
        }
      // console.log(el.cells.classList.value)
      // if (el.className.includes(lunes))
      // el.classList.remove("filter")
      // else el.classList.add("filter"); 
      }
      )
    }
  })
}

function searchTable (input, selector) {
  d.addEventListener('keyup', e => {
    if (e.target.matches(input)) {
      d.querySelectorAll(selector).forEach(el => (el.textContent.toLowerCase().includes(e.target.value)) ?
        el.classList.remove('filter') :
        el.classList.add('filter'))
    }
  })
}
