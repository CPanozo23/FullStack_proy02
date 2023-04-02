const routes = []

function readDataLocalStorage(){
    
    if(localStorage.getItem('routes')!==null){
        
        const routesRead=JSON.parse(localStorage.getItem('routes'))
        const sectionRoute= document.getElementById('routeSelect')

        routesRead.forEach((element) => {
            //createRowRoute(element)
            routes.push(element)
            
            sectionRoute.innerHTML += `
                <option value="${routes.indexOf(element)}">${element.name}</option>
                `
        })
        console.log(routes)
    }    
}

readDataLocalStorage()