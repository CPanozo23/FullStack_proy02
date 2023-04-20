const routes = []
const people = []
const routePeople = []
let idAux=0
const sectionRP = document.getElementById('rpData')
/*****************[1] FORM BUTTON ******************/
btnRP.addEventListener('click', optionRP)

function optionRP(event) {
    event.preventDefault()
    
    //OPTION TO ADD OR UPDATE DEPENDS ON ID
    let id = parseInt(document.getElementById("id").value)
    if (event.target.innerHTML === "Agregar" && id === 0) {
        addRP()
    } else if (event.target.innerHTML === "Actualizar") {
        updateRP()
    } else {
        alert("ERROR")
    }
}
/*****************[1.1] FORM BUTTON: ADD ******************/
function addRP() {
    //ADD RP IF NOT EXIST
    const rp = readFormRP()
    if (rp != undefined) {
        routePeople.push(rp)
        createRowRP(rp)
        
        saveDataLS()
        readDataLS()
        cleanFormRP()
        /******************************* */
        
    }
}
/*****************[1.2] FORM BUTTON: UPDATE ******************/
//SÓLO PUEDA CAMBIAR ASIGNACION DE RECORRIDO Y LOS HIJOS
function updateRP(){
    let noEmpty = isNotEmpty()
    if (noEmpty === true) {
        let rp = createRP(dataForms(), parseInt(dataForms()[4].value), "read")
        
        const positionRP = routePeople.findIndex((element) => element.id === rp.id)
        
        routePeople[positionRP] = rp
        const sectionRP = document.getElementById('rpData')
        sectionRP.innerHTML = ''
        localStorage.removeItem('routePeople')
        saveDataLS()
        readDataLS()
        cleanFormRP()
        document.getElementById('staffSelect').disabled=false
    } 
}
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
        return createRP(dataForms(), idAux, "updateHasRoute")//ADD
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

    return empty    
}

function searchUpStaff(id, option){
    const staff = people.find((element)=>element.id===parseInt(id))
    const position = people.findIndex((element)=>element.id===parseInt(id))
    switch (option) {
        case "updateHasRoute":
            staff.hasRoute === true ? staff.hasRoute=false : staff.hasRoute=true
            people[parseInt(position)] = staff
            //UPDATE PEOPLE
            localStorage.removeItem('people')
            localStorage.setItem('people', JSON.stringify(people))
            return staff
            break
        case "read":
            return staff
            break
        default:
            break
    }
    
    
}

function createRP(inputsForm, id, optionStaff) {//CREATE OBJECT
    const staff = searchUpStaff(inputsForm[0].value, optionStaff)
    dataForms()[1].checked===false ? dataForms()[2].value=0 : ''

    const route = routes.find((element)=>element.id===parseInt(inputsForm[3].value))

    const rp = {
        id: id,
        staff: staff,
        children: inputsForm[1].checked,
        childrenQ: inputsForm[2].value,
        route: route
    }

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
/*****************[2] LIST ACTION ******************/
sectionRP.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.innerHTML === "Eliminar") {

        deleteRP(event.target.value) //ID
    } else if (event.target.innerHTML === "Editar") {
        editRP(event.target.value)
    }

})
/*****************[2.1] LIST ACTION: DELETE ******************/
function deleteRP(idSearch) {
    /*SEARCH OBJECT AND POSITION*/
    console.log(idSearch)
    const positionRP = routePeople.findIndex((element) => element.id === parseInt(idSearch))
    console.log(positionRP)
    const rp = routePeople.find((element) => element.id === parseInt(idSearch))
    console.log(rp)
    //VERIFICAR DESDE ACÁ
    //readDataLS()

    //UPDATE PEOPLE
    console.log(people)
    const staff = searchUpStaff(rp.staff.id, "updateHasRoute")
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
function editRP(idSearch) { 
    const rp = routePeople.find((element) => element.id === parseInt(idSearch))

    const sectionPeople= document.getElementById('staffSelect')
    sectionPeople.innerHTML= `<option value="${rp.staff.id}">${rp.staff.run}  ${rp.staff.fName} ${rp.staff.lastName}</option>`
    document.getElementById('staffSelect').disabled=true
    
    inputForms=dataForms()
    if(parseInt(rp.childrenQ)>0){
        inputForms[1].checked=true
        inputForms[2].disabled=false
        
    }else{
        //inputForms[1].checked=false
        document.getElementById("childrenN").checked=true
        inputForms[2].disabled=true
    }
 
    inputForms[2].value=rp.childrenQ //('childrenQ'),
    inputForms[3].value=rp.route.id //('routeSelect'),
    inputForms[4].value=rp.id //('childrenS')
    document.getElementById('btnRP').innerHTML="Actualizar"
    
}
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

        routesRead.forEach((element) => {        

            if (routes.find((el) => el.id === element.id)) {

            } else {
                routes.push(element)
                sectionRoute.innerHTML += `<option value="${element.id}">${element.id}- ${element.name}</option>`
            }
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
        peopleRead.forEach((element) => {        
            if (people.find((el) => el.id === element.id)) {
            } else {
                people.push(element)
                if(element.hasRoute === false){
                    sectionPeople.innerHTML += `<option value="${element.id}">${element.run}  ${element.fName} ${element.lastName}</option>`
                }
            }
        })
    }
}
