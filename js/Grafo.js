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

    //Código para obtener el reverso de un autómata
    obtenerReverso() {
        // 1. Verificar si hay más de un estado inicial en el autómata original.
        let cantidadEstadosIniciales = 0;
        let estadoInicialOriginal = null;

        for (let i = 0; i < this.listaVertices.length; i++) {
            const vertice = this.listaVertices[i];
            if (vertice.GetEstadoInicial()) {
                cantidadEstadosIniciales++;
                estadoInicialOriginal = vertice;
            }
        }

        // 2. Si hay más de un estado inicial, crea un nuevo estado que será el estado inicial del autómata reverso.
        if (cantidadEstadosIniciales > 1) {
            const nuevoEstadoInicial = new Vertice("NuevoEstadoInicial", [], true, false, 0, 0);

            // Agregar el nuevo estado inicial a la lista de vértices.
            this.listaVertices.push(nuevoEstadoInicial);

            // 3. Cambiar los estados de aceptación a no aceptación, excepto el nuevo estado.
            this.listaVertices.forEach(vertice => {
                if (vertice.GetEstadoFinal() && vertice !== nuevoEstadoInicial) {
                    vertice.SetEstadoFinal(false);
                }
            });

            // 4. Crear transiciones lambda hacia el nuevo estado desde los estados originales de aceptación.
            this.listaVertices.forEach(vertice => {
                if (vertice.GetEstadoFinal() && vertice !== nuevoEstadoInicial) {
                    const nuevaArista = new Arista(vertice, nuevoEstadoInicial, "lambda");
                    this.listaAristas.push(nuevaArista);
                }
            });

            // 5. Realizar la reversión de las aristas (invertir direcciones).
            for (let i = 0; i < this.listaAristas.length; i++) {
                const arista = this.listaAristas[i];
                const origenOriginal = arista.Origen;
                const destinoOriginal = arista.Destino;

                // Cambiar la dirección de la arista.
                arista.Origen = destinoOriginal;
                arista.Destino = origenOriginal;
            };

        } else {
            // Si solo hay un estado inicial, simplemente invierte las aristas existentes.
            for (let i = 0; i < this.listaAristas.length; i++) {
                const arista = this.listaAristas[i];
                const origenOriginal = arista.Origen;
                const destinoOriginal = arista.Destino;

                // Cambiar la dirección de la arista.
                arista.Origen = destinoOriginal;
                arista.Destino = origenOriginal;
            }

            // Actualizar el estado inicial original como estado de aceptación.
            estadoInicialOriginal.SetEstadoFinal(true);
        }
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