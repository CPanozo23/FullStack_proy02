const routes = []
const people = []

//----------------- ONLOAD --------------------------------
function readDataLSroutes(){
    if(localStorage.getItem('routes')!==null){        
        const routesRead=JSON.parse(localStorage.getItem('routes'))
        const sectionRoute= document.getElementById('routeSelect')
        routesRead.forEach((element) => {
            routes.push(element)           
            sectionRoute.innerHTML += `
                <option value="${element.id}">${element.name}</option>
                `
        })
    } 
}

function readDataLSstaff(){
    if(localStorage.getItem('people')!==null){    
        const peopleRead=JSON.parse(localStorage.getItem('people'))
        const sectionPeople= document.getElementById('staffSelect')
        peopleRead.forEach((element) => {
            people.push(element)           
            sectionPeople.innerHTML += `
                <option value="${element.id}">${element.fName} ${element.lastName} ${element.sLastName}</option>
                `
        })
    }
}

readDataLSroutes()
readDataLSstaff()

//Disabled/Enabled Children Quantity
document.getElementById('childrenS').addEventListener('click', () => document.getElementById('childrenQ').disabled=false)

document.getElementById('childrenN').addEventListener('click', () => document.getElementById('childrenQ').disabled=true)


//------------------------------- ADD -------------------------------
const routePeople = []
let idAux=0
const addRPBtn = document.getElementById('addRP')

addRPBtn.addEventListener('click', createRP)

function createRP(event){
    event.preventDefault()
    const routeStaff = readFormRP()
    if(routeStaff!=undefined){
        createRowRP(routeStaff)
        cleanFormRP()
        saveDataLocalStorage()
    }
}

function readFormRP(event){
    
    const inputStaff= document.getElementById('staffSelect')
    let inputChildren=''
    let inputChildrenQ=0

    if(document.getElementById('childrenS').checked===true){
        inputChildren=true
        inputChildrenQ= parseInt(document.getElementById('childrenQ').value)
    }else{
        inputChildren=false
    }

    const inputRoute= document.getElementById('routeSelect')

    if(parseInt(inputStaff.value)===0 || parseInt(inputRoute.value)===0){
        document.getElementById('information').innerHTML=`* Faltan datos`
    }else{
        document.getElementById('information').innerHTML=`aa`
        idAux++
        //search staff by id
        const staff = people.find((element)=>element.id===parseInt(inputStaff.value))
        
        //search route by id
        const route = routes.find((element)=>element.id===parseInt(inputRoute.value))

        const routeStaff = {
            id:idAux,
            staff: staff,
            children: inputChildren,
            childrenQ: inputChildrenQ,
            route: route
        }

        routePeople.push(routeStaff)
        console.log(routeStaff)
        return routeStaff
    }
}


function createRowRP(routeStaff){
    const sectionRP= document.getElementById('rpData')
    sectionRP.innerHTML += `
    <article class="rpSpecific">
            <div class="rpInfo">
                <p>${routeStaff.staff.run} - ${routeStaff.staff.fName} ${routeStaff.staff.sName} ${routeStaff.staff.lastName} ${routeStaff.staff.sLastName}</p>
                <p>Alumnos: ${routeStaff.childrenQ} | Recorrido: ${routeStaff.route.name}</p>
            </div>
            <div class="rpAction">
                <p>ID: ${routeStaff.id}
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </div>
        </article>
        `
}

function cleanFormRP(){
    const form = document.getElementById('formSelectRoute')
    form.reset()
}

function saveDataLocalStorage(){
    localStorage.setItem('routePeople', JSON.stringify(routePeople))
}

function readDataLocalStorage(){
    
    if(localStorage.getItem('routePeople')!==null){
        
        const rpRead=JSON.parse(localStorage.getItem('routePeople'))
        rpRead.forEach((element) => {
            createRowRP(element)
            routePeople.push(element)
            idAux=element.id
        })
    
    }    
}

readDataLocalStorage()

