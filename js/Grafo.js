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
        this.visitadosCp = []
        // adyacente de los estados iniciales
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

    // Elimina una arista
    eliminarArista(arista) {
        this.listaAristas = this.listaAristas.filter(aristaF => {
            return aristaF.Origen.GetDato() !== arista.Origen.GetDato() && aristaF.Destino.GetDato() !== arista.Destino.GetDato() && aristaF.Peso !== arista.Peso
        }
        )
    }

    union(automata1, automata2) {
        // Crear un nuevo autómata para la unión
        const resultado = new Grafo();
    
        // Crear estados combinados
        const estadosCombinados = [];
        automata1.getListaVertices().forEach(estado1 => {
            automata2.getListaVertices().forEach(estado2 => {
                const nuevoEstado = estado1.GetDato() + estado2.GetDato(); // Combinación de nombres de estados
                estadosCombinados.push(nuevoEstado);
            });
        });
    
        // Ingresar estados combinados al nuevo autómata
        estadosCombinados.forEach(estado => {
            resultado.ingresarVertices(estado);
        });
    
        // Obtener estados iniciales y finales de cada autómata
        const estadosIniciales1 = automata1.getEstadosIniciales();
        const estadosIniciales2 = automata2.getEstadosIniciales();
        const estadosFinales1 = automata1.getEstadosFinales();
        const estadosFinales2 = automata2.getEstadosFinales();
    
        // Crear estado inicial de la intersección
        const estadoInicialInterseccion = estadosIniciales1[0] + estadosIniciales2[0];
        resultado.ingresarVertices(estadoInicialInterseccion);
        resultado.getVertice(estadoInicialInterseccion).SetEstadoInicial(true);
        
        let estadosFinales = []
        // Crear estados de aceptación de la intersección
        estadosCombinados.forEach(estado => {
            estadosFinales1.forEach(estadoF1 => {
                estadosFinales2.forEach(estadoF2 => {
                    if (estado.includes(estadoF1) || estado.includes(estadoF2)) {
                        estadosFinales.push(estado)
                        estadosFinales = [...new Set(estadosFinales)] // sin repetir
                    }                
            });

            estadosFinales.forEach(estadoF => {
                resultado.ingresarVertices(estadoF);
                resultado.getVertice(estadoF).SetEstadoFinal(true);
            })

        });
    })
        // Crear transiciones para la intersección
        const alfabeto1 = resultado.obtenerAlfabeto(automata1);
        const alfabeto2 = resultado.obtenerAlfabeto(automata2);
    
        estadosCombinados.forEach(estado => {
            alfabeto1.forEach(simbolo => {
                const transiciones1 = resultado.obtenerTransiciones(automata1, estado.substr(0, 1), simbolo);
                const transiciones2 = resultado.obtenerTransiciones(automata2, estado.substr(1, 1), simbolo);
                if (transiciones1.length > 0 && transiciones2.length > 0) { // si hay transiciones
                    const destino = transiciones1[0] + transiciones2[0]; // 
                    resultado.ingresarArista(estado, destino, simbolo);
                }
            });
        });
    
        return resultado;
    
  }

    interseccion(automata1, automata2) {
        // Crear un nuevo autómata para la intersección
        const resultado = new Grafo();
    
        // Crear estados combinados
        const estadosCombinados = [];
        automata1.getListaVertices().forEach(estado1 => {
            automata2.getListaVertices().forEach(estado2 => {
                const nuevoEstado = estado1.GetDato() + estado2.GetDato(); // Combinación de nombres de estados
                estadosCombinados.push(nuevoEstado);
            });
        });
    
        // Ingresar estados combinados al nuevo autómata
        estadosCombinados.forEach(estado => {
            resultado.ingresarVertices(estado);
        });
    
        // Obtener estados iniciales y finales de cada autómata
        const estadosIniciales1 = automata1.getEstadosIniciales();
        const estadosIniciales2 = automata2.getEstadosIniciales();
        const estadosFinales1 = automata1.getEstadosFinales();
        const estadosFinales2 = automata2.getEstadosFinales();
    
        // Crear estado inicial de la intersección
        const estadoInicialInterseccion = estadosIniciales1[0] + estadosIniciales2[0];
        resultado.ingresarVertices(estadoInicialInterseccion);
        resultado.getVertice(estadoInicialInterseccion).SetEstadoInicial(true);
    
        // Crear estados de aceptación de la intersección
        estadosFinales1.forEach(estado1 => {
            estadosFinales2.forEach(estado2 => {
                const estadoFinal = estado1 + estado2;
                resultado.ingresarVertices(estadoFinal);
                resultado.getVertice(estadoFinal).SetEstadoFinal(true);
            });
        });
    
        // Crear transiciones para la intersección
        const alfabeto1 = resultado.obtenerAlfabeto(automata1);
        const alfabeto2 = resultado.obtenerAlfabeto(automata2);
    
        estadosCombinados.forEach(estado => {
            alfabeto1.forEach(simbolo => {
                const transiciones1 = resultado.obtenerTransiciones(automata1, estado.substr(0, 1), simbolo);
                const transiciones2 = resultado.obtenerTransiciones(automata2, estado.substr(1, 1), simbolo);
                if (transiciones1.length > 0 && transiciones2.length > 0) { // si hay transiciones
                    const destino = transiciones1[0] + transiciones2[0]; // 
                    resultado.ingresarArista(estado, destino, simbolo);
                }
            });
        });
    
        return resultado;
    }

    // Función para obtener el alfabeto de un autómata: funciona así: recorre las aristas y va agregando los pesos a un set, 
    //luego lo convierte a array

    obtenerAlfabeto(automata) {
        const alfabeto = new Set();
        automata.getAristas().forEach(arista => {
            alfabeto.add(arista.Peso);
        });
        return Array.from(alfabeto);
    }
    
    // Función para obtener las transiciones desde un estado con un símbolo en un autómata
    obtenerTransiciones(automata, estado, simbolo) {
        const transiciones = [];
        automata.getAristas().forEach(arista => {
            if (arista.Origen.GetDato() === estado && arista.Peso === simbolo) {
                transiciones.push(arista.Destino.GetDato());
            }
        });
        return transiciones;
    }

}

export default Grafo