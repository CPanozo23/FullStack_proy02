const routes = []
const people = []
const routePeople = []
let idAux=0
const sectionRP = document.getElementById('rpData')
/*****************[1] FORM BUTTON ******************/
btnRP.addEventListener('click', optionRP)

function optionRP(event) {
    event.preventDefault()
    
    //console.log(people)
    //OPTION TO ADD OR UPDATE DEPENDS ON ID
    let id = parseInt(document.getElementById("id").value)
    if (event.target.innerHTML === "Agregar" && id === 0) {
        //console.log("Agregar")
        addRP()
    } else if (event.target.innerHTML === "Actualizar") {
        //updateRP()
    } else {
        alert("ERROR")
    }
}
/*****************[1.1] FORM BUTTON: ADD ******************/
function addRP() {
    //ADD RP IF NOT EXIST
    const rp = readFormRP()
    //alert(rp)
    if (rp != undefined) {
        routePeople.push(rp)
        createRowRP(rp)
        
        saveDataLS()
        readDataLS()
        //readDataLSpeople()
        cleanFormRP()
        //readDataLSpeople()
        /******************************* */
        
    }
}
/*****************[1.2] FORM BUTTON: UPDATE ******************/
/*****************[1.3] FORM BUTTON: GENERAL FUNCTION ******************/
function dataForms() { //GET ELEMENT BY FORM
    const dataInputForms = [document.getElementById('staffSelect'),
    document.getElementById('childrenS'),
    document.getElementById('childrenQ'),
    document.getElementById('routeSelect'),
    document.getElementById('id')]
    
    return dataInputForms
}

function readFormRP(event) {

    let noEmpty = isNotEmpty()
    
    if (noEmpty === true) {
        idAux++
        return createRP(dataForms(), idAux)
    }
}

function isNotEmpty(){
    let empty=true
    document.getElementById('rpInformation').innerHTML=""

    dataForms()[0].value==='' ? empty=false : ''
    dataForms()[3].value==='' ? empty=false : ''

    if(dataForms()[1].checked){
        dataForms()[2].value==='' ? empty=false : ''
        dataForms()[2].value<= 0 ? empty=false : ''
    } 
        
    empty===false ? document.getElementById('rpInformation').innerHTML="*Faltan datos" : ''


    //FREE SEAT
    let freeSeat = showFreeSeat()
    let dataF=dataForms()
    let seatCount = freeSeat-(1+parseInt(dataF[2].value))
    if(seatCount<0){
        document.getElementById('rpInformation').innerHTML+=' *No alcanzan los asientos'
        empty=false
    }

    return empty    
}

function searchUpStaff(id){
    const staff = people.find((element)=>element.id===parseInt(id))
    const position = people.findIndex((element)=>element.id===parseInt(id))

    staff.hasRoute === true ? staff.hasRoute=false : staff.hasRoute=true
    people[parseInt(position)] = staff
    //UPDATE PEOPLE
    localStorage.removeItem('people')
    localStorage.setItem('people', JSON.stringify(people))
    return staff
}

function upFreeSeat(id, seat, operation){
    const route = routes.find((element)=>element.id===id)
    const position = routes.findIndex((element)=>element.id===id)
    //alert(seat)
    //alert(route.freeSeat)
    
    operation='add' ? route.freeSeat-=seat :''
    operation='delete' ? route.freeSeat+=seat :''
    //alert(route.freeSeat)

    routes[parseInt(position)] = route
    //UPDATE ROUTES
    localStorage.removeItem('routes')
    localStorage.setItem('routes', JSON.stringify(routes))
    return route
}

function createRP(inputsForm, id) {//CREATE OBJECT
    const staff= searchUpStaff(inputsForm[0].value)
    dataForms()[1].checked===false ? dataForms()[2].value=0 : ''

    //people.shift()
    //update Free Seat
    let seatCount = 1+parseInt(dataForms()[2].value)

    upFreeSeat(parseInt(inputsForm[3].value), seatCount, 'add')
    const route = routes.find((element)=>element.id===parseInt(inputsForm[3].value))
    //alert(route.freeSeat)

    const rp = {
        id: id,
        staff: staff,
        children: inputsForm[1].value,
        childrenQ: inputsForm[2].value,
        route: route
    }

    //update freeSeat of bus


    readDataLS()
    return rp
}

function createRowRP(rp){
    const sectionRP= document.getElementById('rpData')
    sectionRP.innerHTML += `
    <article class="rpSpecific">
            <div class="rpInfo">
                <p><span>RUN: ${rp.staff.run} </span>Nombre: ${rp.staff.fName} ${rp.staff.sName} ${rp.staff.lastName} ${rp.staff.sLastName}</p>
                <p>ID: ${rp.id} | Alumnos: ${rp.childrenQ === ''? 0: rp.childrenQ} | Recorrido: ${rp.route.name}</p>
            </div>
            <div class="rpAction">
                <button class='edit' value='${rp.id}'>Editar</button>
                <button class='delete' value='${rp.id}'>Eliminar</button>
            </div>
        </article>`
}

function cleanFormRP() {
    const form = document.getElementById('formSelectRP')
    document.getElementById('rpInformation').innerHTML=''
    document.getElementById('freeSeat').innerHTML=''
    document.getElementById('btnRP').innerHTML="Agregar"
    form.reset()
}

//ENABLED/DISABLED CHILDREN QUANTITY
document.getElementById('childrenS').addEventListener('click', () => document.getElementById('childrenQ').disabled=false)

document.getElementById('childrenN').addEventListener('click', () => document.getElementById('childrenQ').disabled=true)

//SHOW FREE SEAT
/*routeSelect.addEventListener('click', ()=>{
    if(document.getElementById('routeSelect').value!=''){
        let idSearch= parseInt(document.getElementById('routeSelect').value)
        const route = routes.find((element) => element.id === idSearch)
        document.getElementById('freeSeat').innerHTML=route.seat
    }
})*/

routeSelect.addEventListener('click', showFreeSeat)

function showFreeSeat(event) {
    document.getElementById('freeSeat').innerHTML=''
    if(document.getElementById('routeSelect').value!=''){
        let idSearch= parseInt(document.getElementById('routeSelect').value)
        const route = routes.find((element) => element.id === idSearch)
        document.getElementById('freeSeat').innerHTML=route.freeSeat
        return route.seat
    }
    return 0
}


/*****************[2] LIST ACTION ******************/
sectionRP.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.innerHTML === "Eliminar") {

        deleteRP(event.target.value) //ID
    } else if (event.target.innerHTML === "Editar") {
        //editRP(event.target.value)
    } else { console.log('ERROR: BOTONES') }

})
/*****************[2.1] LIST ACTION: DELETE ******************/
function deleteRP(idSearch) { 
    /*SEARCH OBJECT AND POSITION*/
    const positionRP = routePeople.findIndex((element) => element.id === parseInt(idSearch))
    const rp = routePeople.find((element) => element.id === parseInt(idSearch))
    
    /*change free seat */
    //let seatCount = 1+rp.staff.childrenQ
    //upFreeSeat(parseInt(rp.route.id), seatCount, 'delete')
    /*change hasRoute People*/
    //searchUpStaff(rp.staff.id)
    

    const staff = people.find((element)=>element.id===parseInt(rp.staff.id))
    const positionS = people.findIndex((element)=>element.id===parseInt(rp.staff.id))

    staff.hasRoute === true ? staff.hasRoute=false : staff.hasRoute=true

    people[parseInt(positionS)] = staff
    people.splice(positionS, 1)
    people.push(staff)

    //UPDATE PEOPLE
    localStorage.removeItem('people')
    localStorage.setItem('people', JSON.stringify(people))


    //delete object RP
    routePeople.splice(positionRP, 1)

    const sectionRP = document.getElementById('rpData')
    sectionRP.innerHTML = ''
    localStorage.removeItem('routePeople')
    saveDataLS()
    readDataLS()
    cleanFormRP()
}



/*****************[2.2] LIST ACTION: UPDATE ******************/
/*****************[3.1] LOADED ******************/
document.addEventListener('DOMContentLoaded', readDataLS())

function saveDataLSpeople() {
    localStorage.setItem('people', JSON.stringify(people))
}
function saveDataLS() {
    localStorage.setItem('routePeople', JSON.stringify(routePeople))
}



function readDataLS(){
    //LOAD ROUTES AND PEOPLE
    readDataLSroutes()
    readDataLSpeople()
    //LOAD ROUTES-PEOPLE
    const rpRead = JSON.parse(localStorage.getItem('routePeople'))
    if (rpRead !== null) {
        document.getElementById('rpData').innerHTML=''
        routePeople.shift() //clean rp array
        rpRead.sort((a, b) => a.id - b.id) //sort by ID
        rpRead.forEach((element) => {
            if (routePeople.find((el) => el.id === element.id)) {

            } else {
                routePeople.push(element)
                //console.log('Cantidad: ' + routePeople.length)
                //console.log(element)
            }
            createRowRP(element)
            idAux = element.id
        })

    }
}

function readDataLSroutes(){
    const routesRead = JSON.parse(localStorage.getItem('routes'))
    if (routesRead !== null) {
        routes.length=0 //clean route array
        routesRead.sort((a, b) => a.id - b.id) //sort by ID
        const sectionRoute= document.getElementById('routeSelect')
        sectionRoute.innerHTML = '<option value="">Seleccione</option>'

        routesRead.forEach((element) => {//CICLO           

            if (routes.find((el) => el.id === element.id)) {

            } else {
                routes.push(element)
                //console.log('Cantidad: ' + routes.length)
                //console.log(element)
                //cargar en selection
                sectionRoute.innerHTML += `<option value="${element.id}">${element.id}- ${element.name}</option>`
            }
            //createRowRoute(element)
        })
    }
}

function readDataLSpeople(){
    const peopleRead = JSON.parse(localStorage.getItem('people'))   
    if (peopleRead !== null) {  
        people.length=0    
        peopleRead.sort((a, b) => a.id - b.id) //sort by ID
        const sectionPeople= document.getElementById('staffSelect')
        sectionPeople.innerHTML = `<option value=''>Seleccione</option>`
        peopleRead.forEach((element) => {//CICLO           
            if (people.find((el) => el.id === element.id)) {

            } else {
                people.push(element)
                //console.log('Cantidad: ' + people.length)
                //console.log(element)
                //cargar en selection
                if(element.hasRoute === false){
                    sectionPeople.innerHTML += `<option value="${element.id}">${element.id}- ${element.fName} ${element.lastName} | ${element.hasRoute}</option>`
                }
            }
            //createRowRoute(element)
        })
    }
}