import Vertice from "./Vertice.js"
import Arista from "./Arista.js"
import _ from 'lodash'

class Grafo {

    constructor() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.adyacencias = {}
        this.visitadosCKruskal = []
        this.repetidos = 0
        this.obstruidos = []
        this.aristasAmplitud = []
        this.estadosAuxiliar = []
    }

    getListaVertices() {
        return this.listaVertices
    }

    getListaAristas() {
        return this.listaAristas
    }

    ingresarVertices(dato) {
        if (!this.verificarExisteVertice(dato, this.listaVertices)) {
            this.listaVertices.push(new Vertice(dato, [], false, 0, 0))
        }
    }

    verificarExisteVertice(dato, lista) {
        for (let i = 0; i < lista.length; i++) {
            if (dato === lista[i].dato) {
                return true
            }
        }
        return false
    }

    //Consultar bien
    mostrarVertices() {
        for (let i = 0; i < this.listaVertices.length; i++) {
            console.log(`>>> Vertice: ${this.listaVertices[i].dato}`)
            console.log("Adyacentes: ")
            for (let j = 0; j < this.listaVertices[i].ListaAdyacentes.length; j++) {
                console.log(this.listaVertices[i].ListaAdyacentes[j].dato)
            }
            console.log("---------------------------------")
            if (this.listaVertices[i].ListaAdyacentes.length === 0) {
                console.log("No hay")
            }
        }
    }

    reiniciarGrafo() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.adyacencias = {}
        this.visitadosCKruskal = []
        this.repetidos = 0
        this.obstruidos = []
        this.aristasAmplitud = []
        this.estadosAuxiliar = []
    }

    getAristas() {
        return this.listaAristas
    }

    //! REPETIDO
    GetNombreVertices() {
        const vertices = []
        for (let i = 0; i < this.listaVertices.length; i++) {
            vertices.push(this.listaVertices[i].dato)
        }
        return vertices
    }

    getNombreVertices() {
        let vertices = []

        for (let i = 0; i < this.listaVertices.length; i++) {
            vertices.push(this.listaVertices[i].dato)
        }

        return vertices
    }

    //! REPETIDO
    IngresarArista(Origen, Destino, Peso) {
        // for (let i = 0;i < this.listaAristas.length;i++) {
        //     // verificar si ya existe una arista con ese peso
        //     if (this.listaAristas[i].Origen.dato == Origen && this.listaAristas[i].Peso == Peso) {
        //         console.log("Ya existe una arista con ese peso")
        //         return
        //     }
        // }

        this.listaAristas.push(new Arista(this.getVertice(Origen), this.getVertice(Destino), Peso))
        // aqui se agrega la arista a la lista de adyacencias
        this.getVertice(this.getVertice(Origen).GetDato()).ListaAdyacentes.push(this.getVertice(Destino))
    }

    ingresarArista(Origen, Destino, Peso) {
        //* no se verifica por que es un AFND
        // for (var i = 0;i < this.listaAristas.length;i++) {
        //     // verificar si ya existe una arista con ese peso
        //     if (this.listaAristas[i].Origen.dato === Origen && this.listaAristas[i].Peso === Peso) {
        //         console.log("Ya existe una arista con ese peso")
        //         return
        //     }
        // }

        this.listaAristas.push(new Arista(this.getVertice(Origen), this.getVertice(Destino), Peso))

        this.getVertice(this.getVertice(Origen).GetDato()).ListaAdyacentes.push(this.getVertice(Destino))
    }

    //! REPETIDO
    // obtener aristas de un vertice
    getAristasDeVertice(vertice) {
        const aristas = []
        for (let i = 0; i < this.listaAristas.length; i++) {
            if (this.listaAristas[i].Origen.dato === vertice) { 
                aristas.push(this.listaAristas[i])
            }
        }
        return aristas
    }
    getAristasDeVertice(vertice) {
        let aristas = []

        for (let i = 0; i < this.listaAristas.length; i++) {
            if (this.listaAristas[i].Origen.dato == vertice) {
                aristas.push(this.listaAristas[i])
            }
        }

        return aristas
    }

    //! REPETIDO
    mostrarAristas() {
        for (let i = 0; i < this.listaAristas.length; i++) {
            console.log(`Origen: ${this.listaAristas[i].Origen.GetDato()} Destino: ${this.listaAristas[i].Destino.GetDato()} Peso: ${this.listaAristas[i].Peso}`)
        }
    }

    mostrarAristas() {
        for (let i = 0; i < this.listaAristas.length; i++) {
            console.log(`Origen: ${this.listaAristas[i].Origen.GetDato()} Destino: ${this.listaAristas[i].Destino.GetDato()} Peso: ${this.listaAristas[i].Peso}`)
        }
    }
    
    //Devuelve el vértice que tenga el dato que se le pase como parámetro
    getVertice(dato) {
        for (let i = 0; i < this.listaVertices.length; i++) {
            if (dato === this.listaVertices[i].dato) {
                return this.listaVertices[i]
            }
        }
        return null
    }

    getEstadosFinales() {
        let estadosFinales = []

        this.listaVertices.forEach(vertice => {
            if (vertice.GetEstadoFinal()) { 
                estadosFinales.push(vertice.GetDato())
            }
        })

        return estadosFinales
    }

    getEstadosNoFinales() {
        let estadosNoFinales = []

        this.listaVertices.forEach(vertice => {
            if (!vertice.GetEstadoFinal()) { 
                estadosNoFinales.push(vertice.GetDato())
            }
        })

        return estadosNoFinales
    }

    getEstadosIniciales(){
        let estadosIniciales= []

        this.listaVertices.forEach(vertice => {
            if (vertice.GetEstadoInicial()) { 
                estadosIniciales.push(vertice.GetDato())
            }
        })

        return estadosIniciales
    } 

    obtenerComplemento() {
        let estadosFinales = this.getEstadosFinales() //Estados finales del autómata
        let estadosNoFinales = this.getEstadosNoFinales() //Estados no finales del autómata

        // los estados no finales o iniciales pasan a ser finales
        estadosNoFinales.forEach(estado => {
            this.getVertice(estado).SetEstadoFinal(true)
        })

        // los estados finales pasan a ser no finales
        estadosFinales.forEach(estado => {
            this.getVertice(estado).SetEstadoFinal(false)
        })
    }  
    
    obtenerReverso() {
        // Verificar si hay varios estados de aceptación
        const estadosAceptacion = this.getEstadosFinales();
        if (estadosAceptacion.length > 1) {
            // Crear un nuevo estado de aceptación
            const nuevoEstado = new Vertice("NuevoEstado", [], true, false, 0, 0);

            // Convertir todos los estados de aceptación en estados no aceptación
            estadosAceptacion.forEach(estado => {
                estado.SetEstadoFinal(false);
                // Crear transiciones lambda hacia el nuevo estado
                this.ingresarArista(estado.GetDato(), nuevoEstado.GetDato(), 'λ');
            });

            // Establecer el nuevo estado como único estado de aceptación
            nuevoEstado.SetEstadoFinal(true);
            this.ingresarVertices(nuevoEstado.GetDato());
        }

        // Invertir todas las transiciones
        const aristasInvertidas = [];
        this.listaAristas.forEach(arista => {
            const nuevaArista = new Arista(arista.Destino, arista.Origen, arista.Peso);
            aristasInvertidas.push(nuevaArista);
        });

        // Limpiar el grafo antes de agregar las aristas invertidas
        this.listaAristas = [];
        this.adyacencias = {};

        // Agregar las aristas invertidas al grafo
        aristasInvertidas.forEach(arista => {
            this.listaAristas.push(arista);
            const origen = arista.Origen.GetDato();
            const destino = arista.Destino.GetDato();

            if (!this.adyacencias.hasOwnProperty(origen)) {
                this.adyacencias[origen] = [];
            }
            this.adyacencias[origen].push(destino);
        });

        // Cambiar el estado inicial por el estado de aceptación y viceversa
        const estadosIniciales = this.getEstadosIniciales();
        const estadosAceptacionNuevos = this.getEstadosFinales();
        this.visitadosCp = [];
        this.visitadosCa = [];

        estadosIniciales.forEach(estado => {
            estado.SetEstadoInicial(false);
            estado.SetEstadoFinal(true);
        });

        estadosAceptacionNuevos.forEach(estado => {
            estado.SetEstadoInicial(true);
            estado.SetEstadoFinal(false);
        });

        // Eliminar estados inalcanzables
        this.eliminarEstadosInalcanzables();
    }

    //Método para eliminar estados inalcanzables
    eliminarEstadosInalcanzables() {
        // Obtener los estados alcanzables desde el estado inicial
        const estadosAlcanzables = this.obtenerEstadosAlcanzables(this.getEstadosIniciales());

        // Obtener los estados no alcanzables
        const estadosNoAlcanzables = this.getNombreVertices().filter(estado => {
            return !estadosAlcanzables.includes(estado);
        });

        // Eliminar los estados no alcanzables
        estadosNoAlcanzables.forEach(estado => {
            this.eliminarEstado(estado);
        });
    }

    //* MÉTODO QUE ME RECORRE EL AUTÓMATA (GRAFO) VIENDO SI LA CADENA CUMPLE O NO *//
    recorrerAutomata(cadena) {
        console.log("Recorriendo el autómata con la cadena: " + cadena)

        //* PASAMOS LA CADENA A UN ARREGLO DE CARACTERES *//
        let cadenaArr = cadena.split('')

        //* OBTENEMOS EL ESTADO INICIAL (EL PRIMER VERTICE)*//
        let estadoInicial = this.listaVertices[0]

        //* LLAMAMOS AL MÉTODO RECURSIVO ENCARGADO DE VERIFICAR SI LA CADENA CUMPLE O NO *//
        //* PASAMOS EL ESTADO ACTUAL, LA POSICIÓN ACTUAL DE LA CADENA, EL ARREGLO DE CARACTERES *//
        //* Y LA VENTANA PARA MOSTRAR EL RESULTADO *//
        this.cambiarEstado(estadoInicial, 0, cadenaArr)
    }

    //* MÉTODO RECURSIVO ENCARGADO DE VERIFICAR SI LA CADENA CUMPLE O NO *//
    cambiarEstado(estadoActual, posicionActual, cadenaArr,) {
        //* VERIFICAMOS SI HEMOS LLEGADO AL FINAL DE LA CADENA *//
        console.log(estadoActual.GetDato() + " " + posicionActual + " " + cadenaArr.length)
        if (posicionActual == cadenaArr.length) {
            if (estadoActual.estadoFinal) {
                console.log('cadena válida')
                alert('cadena válida')
            } else {
                console.log('cadena inválida')
                alert('cadena inválida')
            }
            return
        } else {
            //* si el estado actual no tiene aristas
            if (estadoActual.ListaAdyacentes.length == 0) {
                console.log('cadena inválida')
                alert('cadena inválida')
                return
            }
        }

        //* OBTENEMOS EL SIGUIENTE ESTADO A TRAVÉS DE LA TRANSICIÓN CORRESPONDIENTE *//
        let siguienteEstado = null
        this.listaAristas.forEach(arista => {
            if (arista.Origen.GetDato() == estadoActual.GetDato() && arista.Peso == cadenaArr[posicionActual]) {
                siguienteEstado = arista.Destino
                //* LLAMAMOS RECURSIVAMENTE AL MÉTODO CON EL SIGUIENTE ESTADO Y LA SIGUIENTE POSICIÓN DE LA CADENA *//
                this.cambiarEstado(siguienteEstado, posicionActual + 1, cadenaArr)
            }
        })
    }

    getArista(Origen, Destino, Peso) {
        for (let i = 0; i < g.listaAristas.length; i++) {
            if (Origen == g.listaAristas[i].Origen.GetDato() && Destino == g.listaAristas[i].Destino.GetDato() && Peso == g.listaAristas[i].Peso) {
                return g.listaAristas[i]
            }
        }
        return null
    }

    verificarExisteArista(arista) {
        for (let i = 0; i < g.listaAristas.length; i++) {
            if (arista.Origen.GetDato() == g.listaAristas[i].Origen.GetDato() && arista.Destino.GetDato() == g.listaAristas[i].Destino.GetDato()) {
                // console.log("Ya existe la arista");
                // console.log("Origen: " + arista.Origen.GetDato() + " Destino: " + arista.Destino.GetDato());
                return true
            }
        }
        return false
    }

    
}

export default Grafo