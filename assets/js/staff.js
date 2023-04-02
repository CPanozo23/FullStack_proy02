//STAFF
const people = []
let idAux=0
const addStaffBtn = document.getElementById('addStaff')

addStaffBtn.addEventListener('click', createStaff)

function createStaff(event){
    event.preventDefault()
    const staff = readFormStaff()
    
    if(staff!=undefined){
        createRowStaff(staff)
        cleanFormStaff()
        saveDataLocalStorage()
    }
}

function readFormStaff(event){
    

    /*const inputRun= document.getElementById('run')
    const inputFname= document.getElementById('fName')
    const inputSname= document.getElementById('sName')
    const inputFlastName= document.getElementById('fLastName')
    const inputSlastName= document.getElementById('mLastName')
    const inputPhone= document.getElementById('phone')
    const inputEmail= document.getElementById('email')
    const inputStreet= document.getElementById('street')
    const inputNumber= document.getElementById('number')*/

    const inputsForm= [document.getElementById('run'),
                        document.getElementById('fName'),
                        document.getElementById('sName'),
                        document.getElementById('fLastName'),
                        document.getElementById('mLastName'),
                        document.getElementById('phone'),
                        document.getElementById('email'),
                        document.getElementById('street'),
                        document.getElementById('number')]
    console.log(inputsForm)
    let noEmpty=true
    inputsForm.forEach((element) => {
        if(element.value===''){noEmpty=false}
    })

    if (noEmpty===false){
        document.getElementById('staffInformation').innerHTML=`* Faltan datos`
    }else{
        document.getElementById('staffInformation').innerHTML=``
        idAux++
        const staff = {
            id:idAux,
            run: inputsForm[0].value,
            fName: inputsForm[1].value,
            sName: inputsForm[2].value,
            lastName: inputsForm[3].value,
            sLastName: inputsForm[4].value,   
            whatsapp: inputsForm[5].value,
            email: inputsForm[6].value,        
            address: address={
                        street: inputsForm[7].value,
                        number: inputsForm[8].value
            }
        }

        people.push(staff)
        console.log(staff)
        return staff
    }
}


function createRowStaff(staff){
    const sectionStaff= document.getElementById('staffData')
    sectionStaff.innerHTML += `
    <article class="staffSpecific">
            <div class="staffInfo">
                <p>${staff.run} - ${staff.fName} ${staff.sName} ${staff.lastName} ${staff.sLastName}</p>
                <p>WhatsApp: ${staff.whatsapp} - Email: ${staff.email}</p>
                <p>Dirección: ${staff.address.street} n°${staff.address.number}</p>
            </div>
            <div class="staffAction">
                <p>ID: ${staff.id}
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </div>
        </article>
        `
}

function cleanFormStaff(){
    const form = document.getElementById('formStaff')
    form.reset()
}

function saveDataLocalStorage(){
    localStorage.setItem('people', JSON.stringify(people))
}

function readDataLocalStorage(){
    
    if(localStorage.getItem('people')!==null){
        
        const peopleRead=JSON.parse(localStorage.getItem('people'))
        peopleRead.forEach((element) => {
            createRowStaff(element)
            people.push(element)
            idAux=element.id
        })
    
    }    
}

readDataLocalStorage()

