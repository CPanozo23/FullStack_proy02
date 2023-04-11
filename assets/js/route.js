//[1] FORM BUTTON
//[1.1]....


const routes = []
let idAux = 0
const sectionRoutes = document.getElementById('routeData')
/*****************[1] FORM BUTTON ******************/
btnRoute.addEventListener('click', optionRoute)

function optionRoute(event) {
    event.preventDefault()
    //OPTION TO ADD OR UPDATE DEPENDS ON ID
    let id = parseInt(document.getElementById("id").value)

    if (event.target.innerHTML === "Agregar" && id === 0) {
        addRoute()
    } else if (event.target.innerHTML === "Actualizar") {
        updateRoute()
    } else {
        console.log("ERROR")
    }
}
/*****************[1.1] FORM BUTTON: ADD ******************/
function addRoute() {
    //ADD ROUTE IF NOT EXIST
    const route = readFormRoute()

    if (route != undefined) {
        routes.push(route)
        console.log(routes)
        createRowRoute(route)
        cleanFormRoute()
        saveDataLocalStorage()
    }
}
/*****************[1.2] FORM BUTTON: UPDATE ******************/
function updateRoute() {
    //UPDATE IF ID OF ROUTE EXIST
    let noEmpty = isNotEmpty()
    if (noEmpty === true) {
        let route = createRoute(dataForms(),parseInt(dataForms()[12].value))
        const position = routes.findIndex((element) => element.id === route.id)
        routes[position] = route
        const sectionRoute = document.getElementById('routeData')
        sectionRoute.innerHTML = ''
        localStorage.removeItem('routes')
        saveDataLocalStorage()
        readDataLocalStorage()
        cleanFormRoute()
    }  
}
/*****************[1.3] FORM BUTTON: GENERAL FUNCTION ******************/
function dataForms() { //GET ELEMENT BY FORM
    const dataInputForms = [document.getElementById('routeName'),
    document.getElementById('seat'),
    document.getElementById('busStop1'),
    document.getElementById('busStop2'),
    document.getElementById('busStop3'),
    document.getElementById('busStop4'),
    document.getElementById('busStop5'),
    document.getElementById('busStop6'),
    document.getElementById('busStop7'),
    document.getElementById('busStop8'),
    document.getElementById('busStop9'),
    document.getElementById('busStop10'),
    document.getElementById('id')]
    return dataInputForms
}

function readFormRoute(event) {

    let noEmpty = isNotEmpty()
    //alert(noEmpty)
    if (noEmpty === true) {
        idAux++
        return createRoute(dataForms(), idAux)
    }
}

function isNotEmpty() {
    //ALMOST 1 BUS STOP
    let empty = true
    document.getElementById('routeInformation').innerHTML = ""

    if (dataForms()[1].value === '' || dataForms()[2].value === '' || dataForms()[12].value === '') {
        document.getElementById('routeInformation').innerHTML = "*Faltan datos"
        empty = false
    }
    return empty
}

function createRoute(inputsForm, id) {//CREATE OBJECT

    const route = {
        id: id,
        name: inputsForm[0].value,
        seat: parseInt(inputsForm[1].value),
        freeSeat: parseInt(inputsForm[1].value),
        busStop: []
    }

    for (let i = 2; i < inputsForm.length - 1; i++) {
        if (inputsForm[i].value != '') { route.busStop.push(inputsForm[i].value) }
    }
    return route
}

function createRowRoute(route) {
    const sectionRoutes = document.getElementById('routeData')
    sectionRoutes.innerHTML += `
        <article class="routeSpecific">
            <div class="routeInfo">
                <p><span>${route.name}</span> | Asientos: ${route.seat}| Asientos disponibles: ${route.freeSeat} | ${route.id}</p>
                <h4>Paradas</h4>
                <p>${route.busStop.join(' | ')}</p>
                
            </div>
            <div class="routeAction">
                <button class='edit' value='${route.id}'>Editar</button>
                <button class='delete' value='${route.id}'>Eliminar</button>
            </div>
        </article>`
}


function cleanFormRoute() {
    const form = document.getElementById('formRoute')
    document.getElementById('routeInformation').innerHTML = ""
    document.getElementById('btnRoute').innerHTML = "Agregar"
    form.reset()
}

function saveDataLocalStorage() {
    localStorage.setItem('routes', JSON.stringify(routes))
}

const readDataLocalStorage = () => {
    const routesRead = JSON.parse(localStorage.getItem('routes'))
    if (routesRead !== null) {
        routes.shift() //clean route array
        routesRead.sort((a, b) => a.id - b.id) //sort by ID
        routesRead.forEach((element) => {
            if (routes.find((el) => el.id === element.id)) {

            } else {
                routes.push(element)
                console.log('Cantidad: ' + routes.length)
                console.log(element)
            }

            createRowRoute(element)
            idAux = element.id
        })
    }
}

/*****************[2] LIST ACTION ******************/
sectionRoutes.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.innerHTML === "Eliminar") {
        deleteRoute(event.target.value)
    } else if (event.target.innerHTML === "Editar") {
        editRoute(event.target.value)
    } else { console.log('ERROR: BOTONES') }

})
/*****************[2-1] LIST ACTION: DELETE ******************/
function deleteRoute(idSearch) {
    /*SEARCH OBJECT AND POSITION*/
    const route = routes.find((element) => element.id === parseInt(idSearch))
    const position = routes.findIndex((element) => element.id === parseInt(idSearch))

    routes.splice(position, 1) //eliminar

    const sectionRoute = document.getElementById('routeData')
    sectionRoute.innerHTML = ''
    localStorage.removeItem('routes')
    saveDataLocalStorage()
    readDataLocalStorage()
    cleanFormRoute()
}
/*****************[2-2] LIST ACTION: LOAD DATA IN FORM ******************/
function editRoute(idSearch) {
    let ids=parseInt(idSearch)

    const position = routes.findIndex((element) => element.id === parseInt(idSearch))
    const route=routes.find((element) => element.id === parseInt(idSearch))

    const inputForms = dataForms()
    inputForms[0].value=route.name
    //es decir: document.getElementByID("name").value=route.name
    inputForms[1].value=route.seat
    route.busStop[0] !== undefined ? inputForms[2].value=route.busStop[0]: ''
    route.busStop[1] !== undefined ? inputForms[3].value=route.busStop[1]:''
    route.busStop[2] !== undefined ? inputForms[4].value=route.busStop[2]:''
    route.busStop[3] !== undefined ? inputForms[5].value=route.busStop[3]:''
    route.busStop[4] !== undefined ? inputForms[6].value=route.busStop[4]:''
    route.busStop[5] !== undefined ? inputForms[7].value=route.busStop[5]:''
    route.busStop[6] !== undefined ? inputForms[8].value=route.busStop[6]:''
    route.busStop[7] !== undefined ? inputForms[9].value=route.busStop[7]:''
    route.busStop[8] !== undefined ? inputForms[10].value=route.busStop[8]:''
    route.busStop[9] !== undefined ? inputForms[11].value=route.busStop[9]:''
    inputForms[12].value=route.id 

    document.getElementById('btnRoute').innerHTML="Actualizar"
}
/*****************[3-1] LOADED ******************/
document.addEventListener('DOMContentLoaded', readDataLocalStorage())


