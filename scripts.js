let resultadoPrevio = null;
let calculoCompletado = false;

const agregarAlHistorial = (expresion, resultado) => {
    const historialLista = document.querySelector('#historial');
    const nuevoCalculo = document.createElement('li');

    nuevoCalculo.innerText = `${expresion} = ${resultado}`;
    historialLista.appendChild(nuevoCalculo);
};

const clickMe = (e) => {
    const contenidoBoton = e.target.textContent;
    let valor = document.querySelector('.actual');
    let valorAcumulado = document.querySelector('.acumulador');

    if (calculoCompletado) {
        if (contenidoBoton !== 'CE') {
            if (contenidoBoton === '+' || contenidoBoton === '-' || contenidoBoton === 'x' || contenidoBoton === '%') {
                valor.innerText = resultadoPrevio;
                calculoCompletado = false;
            } else if (contenidoBoton === '=') {
                valor.innerText = resultadoPrevio;
                calculoCompletado = false;
            } else {
                valor.innerText = '';
                calculoCompletado = true
            }
            calculoCompletado = false
        }
    }

    if (contenidoBoton === 'CE') {
        valor.innerText = '';
        valorAcumulado.innerText = '';
        resultadoPrevio = '';
    } else if (contenidoBoton === '%') {
        valor.innerText += '/';
    } else if (contenidoBoton === 'x') {
        valor.innerText += '*';
    } else if (contenidoBoton !== '=') {
        valor.innerText += contenidoBoton;
    } else if (contenidoBoton === '=') {
        const resolverExpresion = (expresion) => {
            try {
                const resultado = new Function('return ' + expresion)();
                if (isNaN(resultado) || !isFinite(resultado)) {
                    return 'ERROR!'
                } else {
                    return resultado;
                }
            } catch {
                return 'ERROR!'
            }
        }

        const expresion = valor.innerText;
        const resultado = resolverExpresion(expresion);
        valor.innerText = resultado;
        valorAcumulado.innerText = expresion;
        resultadoPrevio = resultado;
        calculoCompletado = true;
        agregarAlHistorial(expresion, resultado);
    }
}
const onChangeHistorial = () => {


    borrarHistorial.classList.remove('borrar')

    if (option === 'classic') {
        themeContenedor.classList.add('contenedorCalculadora');
        historialCalculadora.classList.add('historialCalculadora')
    } else if (option === 'red') {
        themeContenedor.classList.add('opcion2');
        historialCalculadora.classList.add('histRed')
    } else if (option === 'green') {
        themeContenedor.classList.add('opcion3');
        historialCalculadora.classList.add('histGreen')
    } else if (option === 'gold-silver') {
        themeContenedor.classList.add('opcion4');
        historialCalculadora.classList.add('histGyS')
    } else if (option === 'image') {
        themeContenedor.classList.add('opcion5');
        historialCalculadora.classList.add('histImg')
    } else if (option === 'cool') {
        themeContenedor.classList.add('opcion6');
        historialCalculadora.classList.add('histCool')
    }

}
const onChange = (option) => {
    const themeContenedor = document.querySelector('.contenedorCalculadora');
    const historialCalculadora = document.querySelector('.historialCalculadora')
    const borrarHistorial = document.querySelector('.borrar');

    themeContenedor.classList.remove('opcion2', 'opcion3', 'opcion4', 'opcion5', 'opcion6');
    historialCalculadora.classList.remove('histRed', 'histGreen', 'histGyS', 'histImg', 'histCool');
    borrarHistorial.classList.remove('borrarRed', 'borrarGreen', 'borrarGyS', 'borrarImg', 'borrarCool')

    if (option === 'classic') {
        themeContenedor.classList.add('contenedorCalculadora');
        historialCalculadora.classList.add('historialCalculadora')
        borrarHistorial.classList.add('borrar')
    } else if (option === 'red') {
        themeContenedor.classList.add('opcion2');
        historialCalculadora.classList.add('histRed')
        borrarHistorial.classList.add('borrarRed')
    } else if (option === 'green') {
        themeContenedor.classList.add('opcion3');
        historialCalculadora.classList.add('histGreen')
        borrarHistorial.classList.add('borrarGreen')
    } else if (option === 'gold-silver') {
        themeContenedor.classList.add('opcion4');
        historialCalculadora.classList.add('histGyS')
        borrarHistorial.classList.add('borrarGyS')
    } else if (option === 'image') {
        themeContenedor.classList.add('opcion5');
        historialCalculadora.classList.add('histImg')
        borrarHistorial.classList.add('borrarImg')
    } else if (option === 'cool') {
        themeContenedor.classList.add('opcion6');
        historialCalculadora.classList.add('histCool')
        borrarHistorial.classList.add('borrarCool')
    }
}

const borrarHistorial = () => {
    const historialLista = document.querySelector('#historial');
    historialLista.innerHTML = '';
}

const onLoad = () => {
    const numeroClickeado = document.querySelectorAll('.numeros');
    numeroClickeado.forEach((boton) => {
        boton.addEventListener('click', clickMe);
    });

    const themes = document.querySelectorAll('.boton');
    themes.forEach((estilos) => {
        estilos.addEventListener('click', (event) => {
            const option = event.target.id;
            onChange(option);
        });
    });

    const borrar = document.querySelector('.borrar');
    borrar.addEventListener('click', borrarHistorial);

    const CambiarBorrarHistorial = document.querySelector('.borrar');
    CambiarBorrarHistorial.addEventListener('click', onChangeHistorial);
}

