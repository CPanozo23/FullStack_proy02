
const people = []
let idAux = 0

const addStaffBtn = document.getElementById('addStaff')
const sectionStaff = document.getElementById('staffData')

/*****************[1] FORM BUTTON ******************/
btnStaff.addEventListener('click', optionStaff)

function optionStaff(event) {
    event.preventDefault()
    //OPTION TO ADD OR UPDATE DEPENDS ON ID
    let id = parseInt(document.getElementById("id").value)
    //console.log(event.target.value)
    console.log(id)
    console.log(typeof (id))
    if (event.target.innerHTML === "Agregar" && id === 0) {
        console.log("Agregar")
        addStaff()
    } else if (event.target.innerHTML === "Actualizar") {
        updateStaff()
    } else {
        alert("ERROR")
    }
}

/*****************[1.1] FORM BUTTON: ADD ******************/
function addStaff() {
    //ADD STAFF IF NOT EXIST
    const staff = readFormStaff()

    if (staff != undefined) {
        people.push(staff)
        createRowStaff(staff)
        cleanFormStaff()
        saveDataLocalStorage()
    }
}

/*****************[1.2] FORM BUTTON: UPDATE ******************/
function updateStaff() {
    //UPDATE IF ID OF STAFF EXIST
    let noEmpty = isNotEmpty()
    if (noEmpty === true) {
        let staff = createStaff(dataForms(),parseInt(dataForms()[9].value))
        const position = people.findIndex((element) => element.id === staff.id)
        people[position] = staff
        cleanFormStaff()
        const sectionStaff = document.getElementById('staffData')
        sectionStaff.innerHTML = ''
        localStorage.removeItem('people')
        saveDataLocalStorage()
        readDataLocalStorage()
    }
}

/*****************[1.3] FORM BUTTON: GENERAL FUNCTION ******************/
function dataForms() { //GET ELEMENT BY FORM
    const dataInputForms = [document.getElementById('run'),
    document.getElementById('fName'),
    document.getElementById('sName'),
    document.getElementById('fLastName'),
    document.getElementById('mLastName'),
    document.getElementById('phone'),
    document.getElementById('email'),
    document.getElementById('street'),
    document.getElementById('number'),
    document.getElementById('id')]
    return dataInputForms
}

function readFormStaff(event) {

    let noEmpty = isNotEmpty()
    if (noEmpty === true) {
        idAux++
        return createStaff(dataForms(), idAux)
    }
}

function isNotEmpty(){
    dataForms().forEach((element) => {
        if (element.value === '') { return false }
    })   
    return true    
}

function createStaff(inputsForm, id) {//CREATE OBJECT
    console.log(inputsForm)
    const staff = {
        id: id,
        run: inputsForm[0].value,
        fName: inputsForm[1].value,
        sName: inputsForm[2].value,
        lastName: inputsForm[3].value,
        sLastName: inputsForm[4].value,
        whatsapp: inputsForm[5].value,
        email: inputsForm[6].value,
        address: address = {
            street: inputsForm[7].value,
            number: inputsForm[8].value
        },
        state: true,
        hasRoute: false
    }
    return staff
}

function createRowStaff(staff) { //CREATE ROW
    const sectionStaff = document.getElementById('staffData')
    let stateText = ''
    let disabledBtn = ''
    if (staff.state === true) {
        stateText = 'Bloquear'
        disabledBtn = ''
    } else {
        stateText = 'Desbloquear'
        disabledBtn = 'disabled'
    }
    sectionStaff.innerHTML += `
    <article class='staffSpecific ${stateText}'>
    <div class="staffInfo">
        <p>${staff.run} - ${staff.fName} ${staff.sName} ${staff.lastName} ${staff.sLastName} | ${staff.state} - ${staff.id}</p>
        <p>WhatsApp: ${staff.whatsapp} - Email: ${staff.email}</p>
        <p>Dirección: ${staff.address.street} n°${staff.address.number}</p>
    </div>
    <div class="staffAction">
        <button class='edit${disabledBtn}' value='${staff.id}' ${disabledBtn}>Editar</button>
        <button class='block${disabledBtn}' value='${staff.id}'>${stateText}</button>
    </div>
    </article>`
}

function cleanFormStaff() {
    const form = document.getElementById('formStaff')
    form.reset()
}

function saveDataLocalStorage() {
    localStorage.setItem('people', JSON.stringify(people))
}

const readDataLocalStorage = () => {
    const peopleRead = JSON.parse(localStorage.getItem('people'))
    if (peopleRead !== null) {
        people.shift() //clean people array
        peopleRead.sort((a, b) => a.id - b.id) //sort by ID
        peopleRead.forEach((element) => {
            if (people.find((el) => el.id === element.id)) {

            } else {
                people.push(element)
                console.log('Cantidad: ' + people.length)
                console.log(element)
            }

            createRowStaff(element)
            idAux = element.id
        })

    }
}
/*****************[2] LIST ACTION ******************/
sectionStaff.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.innerHTML === "Desbloquear" || event.target.innerHTML === "Bloquear") {
        blockStaff(event.target.value)
    } else if (event.target.innerHTML === "Editar") {
        editStaff(event.target.value)
    } else { console.log('ERROR: BLOCK/UNBLOCK') }

})
/*****************[2-1] LIST ACTION: BLOCK/UNBLOCK ******************/
function blockStaff(idSearch) {
    /*SEARCH OBJECT AND POSITION*/
    const staff = people.find((element) => element.id === parseInt(idSearch))
    const position = people.findIndex((element) => element.id === parseInt(idSearch))

    //ternary IF
    staff.state === true ? staff.state = false : staff.state = true
    people[position] = staff //REPLACE OBJECT IN ARRAY

    const sectionStaff = document.getElementById('staffData')
    sectionStaff.innerHTML = ''
    localStorage.removeItem('people')
    saveDataLocalStorage()
    readDataLocalStorage()
}

/*****************[2-1] LIST ACTION: LOAD DATA IN FORM ******************/
function editStaff(idSearch){

    const staff = people.find((element) => element.id === parseInt(idSearch))
    const position = people.findIndex((element) => element.id === parseInt(idSearch))
    
    const inputForms = dataForms()

    inputForms[0].value=staff.run
    inputForms[1].value=staff.fName
    inputForms[2].value=staff.sName
    inputForms[3].value=staff.lastName
    inputForms[4].value=staff.sLastName
    inputForms[5].value=staff.whatsapp
    inputForms[6].value=staff.email
    inputForms[7].value=staff.address.street
    inputForms[8].value=staff.address.number
    inputForms[9].value=staff.id 

    document.getElementById('btnStaff').innerHTML="Actualizar"
}

/*****************[3-1] LOADED ******************/
document.addEventListener('DOMContentLoaded', readDataLocalStorage())
