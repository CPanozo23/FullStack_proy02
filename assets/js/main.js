//RUTAS
const routes = []
const id=0
const addRoutesBtn = document.getElementById('addRoute')

addRoutesBtn.addEventListener('click', createRoute)

function createRoute(event){
    event.preventDefault()
    const ruta = readFormRoute()
    if(ruta!=undefined){
        createRowRoute(ruta)
        cleanFormRoute()
        saveDataLocalStorage()
    }
}

function readFormRoute(event){
    
    const inputRouteName= document.getElementById('routeName')
    const inputRouteSeat= document.getElementById('seat')
    const inputBusStop = [document.getElementById('busStop1'), document.getElementById('busStop2'), document.getElementById('busStop3'), document.getElementById('busStop4'), document.getElementById('busStop5'), document.getElementById('busStop6'), document.getElementById('busStop7'), document.getElementById('busStop8'), document.getElementById('busStop9'), document.getElementById('busStop10')]

    if(inputRouteName.value === '' || inputRouteSeat.value === '' || inputBusStop[0].value===''){
        document.getElementById('routeInformation').innerHTML=`* Faltan datos`
    }else{
        document.getElementById('routeInformation').innerHTML=``
        //id++
        const route = {
            //id:id,
            name: inputRouteName.value,
            seat: inputRouteSeat.value,
            busStop: []
        }

        inputBusStop.forEach((el) => {
            if(el.value != ''){route.busStop.push(el.value)}
        })
        routes.push(route)
        console.log(route)
        return route
    }
}

function createRowRoute(ruta){
    const sectionRoute= document.getElementById('routeData')
    sectionRoute.innerHTML += `
        <article class="routeSpecific">
            <div class="routeInfo">
                <p><span>${ruta.name}</span> | Asientos: ${ruta.seat}</p>
                <h4>Paradas</h4>
                <p>${ruta.busStop}</p>
                
            </div>
            <div class="routeAction">
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </div>
        </article>`
}

function cleanFormRoute(){
    const form = document.getElementById('formRoute')
    form.reset()
}

function saveDataLocalStorage(){
    //deja en localStorage el array tareas como string
    localStorage.setItem('routes', JSON.stringify(routes))
}

function readDataLocalStorage(){
    
    if(localStorage.getItem('routes')!==null){
        
        const routesRead=JSON.parse(localStorage.getItem('routes'))
        routesRead.forEach((element) => {
            createRowRoute(element)
            routes.push(element)
            
        })
    
    }    
}

readDataLocalStorage()

