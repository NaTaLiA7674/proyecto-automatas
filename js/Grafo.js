import Vertice from "./Vertice.js"
import Arista from "./Arista.js"
import _ from 'lodash'

class Grafo {

    constructor() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.visitadosCKruskal = []
        this.repetidos = 0
        this.obstruidos = []
        this.aristasAmplitud = []
        this.estadosAuxiliar = []
    }

    getListaVertices() {
        return this.listaVertices
    }

    getAristas() {
        return this.listaAristas
    }

    getVisitadosp() {
        return this.visitadosCp
    }

    getVisitadosa() {
        return this.visitadosCa
    }

    ingresarVertices(dato) {
        if (!this.verificarExisteVertice(dato, this.listaVertices)) {
            this.listaVertices.push(new Vertice(dato))
        }
    }

    verificarExisteVertice(dato, lista) {
        for (let i = 0;i < lista.length;i++) {
            if (dato === lista[i].dato) {
                return true
            }
        }
        return false
    }

    //Consultar bien
    mostrarVertices() {
        for (let i = 0;i < this.listaVertices.length;i++) {
            console.log(`>>> Vertice: ${this.listaVertices[i].dato}`)
            console.log("Adyacentes: ")
            for (let j = 0;j < this.listaVertices[i].ListaAdyacentes.length;j++) {
                console.log(this.listaVertices[i].ListaAdyacentes[j].dato)
            }
            console.log("---------------------------------")
            if (this.listaVertices[i].ListaAdyacentes.length === 0) {
                console.log("No hay")
            }
        }
    }
    //Devuelve el vértice que tenga el dato que se le pase como parámetro
    getVertice(dato) {
        for (let i = 0;i < this.listaVertices.length;i++) {
            if (dato === this.listaVertices[i].dato) {
                return this.listaVertices[i]
            }
        }
        return null
    }

    getArista(Origen, Destino, Peso) {
        for (let i = 0;i < g.listaAristas.length;i++) {
            if (Origen == g.listaAristas[i].Origen.GetDato() && Destino == g.listaAristas[i].Destino.GetDato() && Peso == g.listaAristas[i].Peso) {
                return g.listaAristas[i]
            }
        }
        return null
    }

    verificarExisteArista(arista) {
        for (let i = 0;i < g.listaAristas.length;i++) {
            if (arista.Origen.GetDato() == g.listaAristas[i].Origen.GetDato() && arista.Destino.GetDato() == g.listaAristas[i].Destino.GetDato()) {
                // console.log("Ya existe la arista");
                // console.log("Origen: " + arista.Origen.GetDato() + " Destino: " + arista.Destino.GetDato());
                return true
            }
        }
        return false
    }

    reiniciarGrafo() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.visitadosCKruskal = []
        this.repetidos = 0
        this.obstruidos = []
        this.aristasAmplitud = []
        this.estadosAuxiliar = []
    }

    getNombreVertices() {
        let vertices = []

        for (let i = 0;i < this.listaVertices.length;i++) {
            vertices.push(this.listaVertices[i].dato)
        }

        return vertices
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

    getAristasDeVertice(vertice) {
        let aristas = []

        for (let i = 0;i < this.listaAristas.length;i++) {
            if (this.listaAristas[i].Origen.dato == vertice) {
                aristas.push(this.listaAristas[i])
            }
        }

        return aristas
    }

    mostrarAristas() {
        for (let i = 0;i < this.listaAristas.length;i++) {
            console.log(`Origen: ${this.listaAristas[i].Origen.GetDato()} Destino: ${this.listaAristas[i].Destino.GetDato()} Peso: ${this.listaAristas[i].Peso}`)
        }
    }

    // Recorrido en profundidad
    recorridoProfundidad(dato) {

        const listaVisitados = this.getVisitadosp()
        //si el dato está en la lista de visitados
        if (dato in listaVisitados) {
            return
        }
        else {
            // obtiene el vertice
            let vertice = this.getVertice(dato)

            if (vertice != null) {

                // agrega el vertice a la lista de visitados con profundidad
                this.visitadosCp.push(vertice)

                // recorre la lista de adyacentes del vertice y hace llamada recursiva
                for (let i = 0;i < vertice.ListaAdyacentes.length;i++) {
                    this.recorridoProfundidad(vertice.ListaAdyacentes[i].dato)
                }
            }
        }
        this.cantidadVerticesVisitadosProfundidad()
    }

    // Método que me cuente la cantidad de vértices visitados por recorrido de profundidad
    cantidadVerticesVisitadosProfundidad() {
        let total = this.visitadosCp.length
        console.log("Cantidad de vértices visitados en profundidad:", total)
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

    getEstadosIniciales() {
        let estadosIniciales = []

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
        const estadosAceptacion = this.getEstadosFinales()
        if (estadosAceptacion.length > 1) {
            // Crear un nuevo estado de aceptación
            this.ingresarVertices("NEW")
            const nuevoEstado = this.listaVertices[this.listaVertices.length - 1].GetDato()

            // Convertir todos los estados de aceptación en estados no aceptación
            estadosAceptacion.forEach(estado => {
                this.getVertice(estado).SetEstadoFinal(false)
                // Crear transiciones lambda hacia el nuevo estado
                this.ingresarArista(this.getVertice(estado).GetDato(), this.getVertice(nuevoEstado).GetDato(), "λ")
            })

            // Establecer el nuevo estado como único estado de aceptación
            this.getVertice(nuevoEstado).SetEstadoFinal(true)
        }

        // Invertir todas las transiciones
        const aristasInvertidas = []
        this.listaAristas.forEach(arista => {
            const nuevaArista = new Arista(arista.Destino, arista.Origen, arista.Peso)
            // agregar la arista invertida a la lista de adyacencias del destino
            aristasInvertidas.push(nuevaArista)
        })


        // Limpiar el grafo antes de agregar las aristas invertidas
        this.listaAristas = []

        // Organizar las adyacencias de cada vértice en el grafo
        this.listaVertices.forEach(vertice => {
            vertice.ListaAdyacentes = []
        })

        // Recorro cada arista invertida y para cada origen el destino sera su adyacente
        aristasInvertidas.forEach(arista => {
            this.listaAristas.push(arista)
            const destino = this.getVertice(arista.Destino.dato)
            const origen = this.getVertice(arista.Origen.dato)
            origen.ListaAdyacentes.push(destino)
        })

        // Cambiar el estado inicial por el estado de aceptación y viceversa
        const estadosIniciales = this.getEstadosIniciales()
        const estadosAceptacionNuevos = this.getEstadosFinales()
        this.visitadosCp = [] // Reiniciar los visitados
        this.visitadosCa = []

        estadosIniciales.forEach(estado => {

            this.getVertice(estado).SetEstadoInicial(false)
            this.getVertice(estado).SetEstadoFinal(true)
        })

        estadosAceptacionNuevos.forEach(estado => {
            this.getVertice(estado).SetEstadoInicial(true)
            this.getVertice(estado).SetEstadoFinal(false)
        })

        // Eliminar estados inalcanzables
        this.eliminarEstadosInalcanzables()
    }

    /**Un estado es alcanzable si se puede llegar a él desde el estado inicial.
         * Se recorre el grafo en profundidad desde el estado inicial y se guardan los estados visitados.
         * Luego se comparan los estados visitados con los estados del grafo y se eliminan los estados no visitados.
         * */

    eliminarEstadosInalcanzables() {

        this.recorridoProfundidad(this.getEstadosIniciales()[0]) // prevenir por si llegan varios -que no debería pasar

        const estadosAlcanzables = this.getVisitadosp()

        // recorrer los estados alcanzables y guardarlos en una lista sin repetir
        let listaEstadosAlcanzables = []
        estadosAlcanzables.forEach(estado => {
            listaEstadosAlcanzables.push(estado.GetDato())
        })

        let estadosASinRepeticiones = [...new Set(listaEstadosAlcanzables)]

        // recorrer los estados del grafo y guardarlos en una lista sin repetir
        let listaEstadosGrafo = []
        this.listaVertices.forEach(vertice => {
            listaEstadosGrafo.push(vertice.GetDato())
        })

        let estadosGSinRepeticiones = [...new Set(listaEstadosGrafo)]


        // Filtrar los estados del grafo que no están en la lista de estados alcanzables
        let estadosNoAlcanzables = []
        estadosNoAlcanzables = estadosGSinRepeticiones.filter(estado => {
            return !estadosASinRepeticiones.includes(estado)
        })

        // Eliminar los estados no alcanzables
        estadosNoAlcanzables.forEach(estado => {
            this.eliminarVertice(estado)
        })

    }

    /** Elimina el vértice que es inalcanzable */
    eliminarVertice(vertice) {
        // eliminar aristas que tengan como origen el vértice a eliminar
        this.listaAristas = this.listaAristas.filter(arista => {
            return arista.Origen.dato !== vertice
        })

        // eliminar vértice
        this.listaVertices = this.listaVertices.filter(verticeF => {
            return verticeF.GetDato() !== vertice
        })
    }

}

export default Grafo