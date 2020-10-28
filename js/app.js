const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarFormulario);
})

function validarFormulario(e){
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;

    if(busqueda.length < 3){
        mostrarMensaje('Need to enter more data');
        return;
    }
    consultarAPI(busqueda);
}

function consultarAPI(busqueda) {
    spinner();
    const githubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent(githubUrl) }`;

    axios.get(url)
        .then(respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents)));
}

function mostrarMensaje(m) {
    const alertaPrevia = document.querySelector('.alerta');
    if(!alertaPrevia){
        limpiarHTML();
        const alerta = document.createElement('div');
        alerta.classList.add('bg-gray-100','p-3', 'text-center', 'mt-3', 'alerta','font-bold', 'text-teal-400');
        alerta.textContent = m;

        formulario.appendChild(alerta);

        setTimeout( () => {
            alerta.remove();
        }, 2345);
    }
}

function mostrarVacantes(vacantes){
    limpiarHTML();
    if(vacantes.length > 0){
        resultado.classList.add('grid');
        vacantes.forEach(vacante => {
            const {company, title, type, url, descripcion} = vacante
            resultado.innerHTML += `
                <div class="shadow bg-white p-6 rounded">
                    <h2 class="text-2xl font-light mb-4">${title}</h2>
                    <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                    <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                    <p class="font-bold uppercase">Descripción:   <span class="font-light normal-case">${descripcion} </span></p>
                    <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
                </div>
            `
        })
    }else{
        const noResultado = document.createElement('p');
        noResultado.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full');
        
        noResultado.textContent = 'No vacancy, try another term.'
        resultado.appendChild(noResultado);
    }
}

function limpiarHTML(){
    formulario.reset();
    while( resultado.firstChild ){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner(){
    limpiarHTML();
    const spinner = document.createElement('div');
    resultado.classList.remove('grid');
    spinner.classList.add('spinner')
    spinner.innerHTML = `
        <div class="cube1"></div>
        <div class="cube2"></div>
    `;
    resultado.appendChild(spinner);
}