import go from 'gojs'
import Grafo from './Grafo'

let g = new Grafo()
g.ingresarVertices("A")
g.ingresarVertices("B")
g.ingresarVertices("C")
g.ingresarVertices("D")
g.getVertice("A").SetEstadoFinal(true)
g.getVertice("B").SetEstadoFinal(true)
g.getVertice("D").SetEstadoFinal(true)
g.getVertice("A").SetEstadoInicial(true)

g.ingresarArista("A", "B", 0)
g.ingresarArista("B", "C", 0)
g.ingresarArista("C", "C", 0)
g.ingresarArista("C", "C", 1)
g.ingresarArista("A", "D", 1)
g.ingresarArista("B", "D", 1)



let grafoOpcionUno = new Grafo()
grafoOpcionUno.ingresarVertices("D")
grafoOpcionUno.ingresarVertices("E")
grafoOpcionUno.ingresarVertices("F")
grafoOpcionUno.getVertice("D").SetEstadoFinal(true)
grafoOpcionUno.getVertice("E").SetEstadoInicial(true)

grafoOpcionUno.ingresarArista("D", "E", 1)
grafoOpcionUno.ingresarArista("F", "E", 0)

let grafoOpcionDos = new Grafo()
grafoOpcionDos.ingresarVertices("G")
grafoOpcionDos.ingresarVertices("H")
grafoOpcionDos.ingresarVertices("I")
grafoOpcionDos.getVertice("I").SetEstadoFinal(true)
grafoOpcionDos.getVertice("G").SetEstadoInicial(true)

grafoOpcionDos.ingresarArista("G", "H", 1)
grafoOpcionDos.ingresarArista("H", "I", 0)
grafoOpcionDos.ingresarArista("I", "I", 0)

let grafoOpcionTres = new Grafo()
grafoOpcionTres.ingresarVertices("J")
grafoOpcionTres.ingresarVertices("K")
grafoOpcionTres.ingresarVertices("L")
grafoOpcionTres.getVertice("J").SetEstadoFinal(true)
grafoOpcionTres.getVertice("L").SetEstadoInicial(true)

grafoOpcionTres.ingresarArista("J", "J", 0)
grafoOpcionTres.ingresarArista("K", "L", 0)
grafoOpcionTres.ingresarArista("L", "J", 1)

const opcionesGrafos = [grafoOpcionUno, grafoOpcionDos, grafoOpcionTres]

let $ = go.GraphObject.make
let diagram = null

document.addEventListener("DOMContentLoaded", function () {

    diagram = $(go.Diagram, "diagram")
    mostrar()

    document.querySelector("#a1").addEventListener("click", function () {
        g.reiniciarGrafo()
        g.ingresarVertices("A")
        g.ingresarVertices("B")
        g.ingresarVertices("C")
        g.getVertice("A").SetEstadoInicial(true)
        g.getVertice("C").SetEstadoFinal(true)
        g.ingresarArista("A", "A", 1)
        g.ingresarArista("A", "A", 0)
        g.ingresarArista("A", "B", 0)
        g.ingresarArista("B", "C", 0)

        mostrar()

    })

    document.querySelector("#a2").addEventListener("click", function () {
        g.reiniciarGrafo()
        g.ingresarVertices("A")
        g.ingresarVertices("B")
        g.ingresarVertices("C")
        g.ingresarVertices("D")
        g.ingresarVertices("E")
        g.ingresarVertices("F")
        g.ingresarVertices("G")
        g.ingresarVertices("H")
        g.ingresarVertices("I")
        g.ingresarVertices("J")
        g.getVertice("J").SetEstadoFinal(true)
        g.getVertice("A").SetEstadoInicial(true)

        g.ingresarArista("A", "B", 0)
        g.ingresarArista("B", "C", "")
        g.ingresarArista("C", "D", "")
        g.ingresarArista("C", "D", 0)
        g.ingresarArista("D", "E", "")
        g.ingresarArista("E", "F", "")
        g.ingresarArista("E", "H", "")
        g.ingresarArista("F", "G", 0)
        g.ingresarArista("H", "I", 1)
        g.ingresarArista("G", "J", "")
        g.ingresarArista("I", "J", "")

        mostrar()

    })

    document.querySelector("#a3").addEventListener("click", function () {
        g.reiniciarGrafo()
        g.ingresarVertices("A")
        g.ingresarVertices("B")
        g.ingresarVertices("C")
        g.ingresarVertices("D")
        g.ingresarVertices("E")
        g.getVertice("A").SetEstadoInicial(true)
        g.getVertice("E").SetEstadoFinal(true)

        g.ingresarArista("A", "B", 0)
        g.ingresarArista("B", "C", 1)
        g.ingresarArista("C", "D", 0)
        g.ingresarArista("D", "E", 1)
        g.obtenerComplemento()
        mostrar()

    })

    document.querySelector("#complemento").addEventListener("click", function () {
        complemento()
    })

    document.querySelector("#reverso").addEventListener("click", function () {
        reverso()
    })

    document.querySelector("#union").addEventListener("click", function () {
        union()
    })

    document.querySelector("#inter").addEventListener("click", function () {
        interseccion()
    })



})

function obtenerGrafoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * opcionesGrafos.length)
    return opcionesGrafos[indiceAleatorio]
}

function complemento() {
    g.obtenerComplemento()
    mostrar()
}

function reverso() {
    g.obtenerReverso()
    mostrar()
}

function union() {
    let grafoSeleccionado = obtenerGrafoAleatorio()
    //!EJECUTAR MÉTODO QUE ME HACE LA UNIÓN Y LE PASO EL GRAFO SELECCIONADO
    mostrar()
}

function interseccion() {
    let grafoSeleccionado = obtenerGrafoAleatorio()
    //!EJECUTAR MÉTODO QUE ME HACE LA INTERSECCIÓN Y LE PASO EL GRAFO SELECCIONADO
    mostrar()
}

function createArrayOfNodesGrafo() {

    const nodes = g.getNombreVertices()

    const nodeDataArray = []
    nodes.forEach(node => {
        nodeDataArray.push({ key: node, name: node })
    })

    return nodeDataArray
}

function createArrayOfLinksGrafo() {

    const links = g.getAristas()

    const linkDataArray = []

    links.forEach(link => {
        linkDataArray.push({ from: link.Origen.dato, to: link.Destino.dato, text: `${link.GetPeso()}` })
    })

    return linkDataArray

}

function mostrar() {

    diagram.model = $(go.GraphLinksModel, {
        nodeDataArray: createArrayOfNodesGrafo(),
        linkDataArray: createArrayOfLinksGrafo()
    })

    diagram.layout = $(go.LayeredDigraphLayout, {
        direction: 0,
        layerSpacing: 50,
        columnSpacing: 50
    })


    diagram.nodeTemplate = $(go.Node, "Auto",
        $(go.Shape, "Circle", { fill: "#00FFB5", strokeWidth: 2, stroke: "black" }),
        $(go.TextBlock, { margin: 8, font: "bold 12 px sans-serif" }, new go.Binding("text", "name"))
    )
    diagram.linkTemplate =
        go.GraphObject.make(go.Link,
            {
                curve: go.Link.Bezier,
                routing: go.Link.AvoidsNodes,
            },
            go.GraphObject.make(go.Shape, { stroke: "white" }),
            go.GraphObject.make(go.Shape, { toArrow: "OpenTriangle", stroke: "white", fill: "white" }),
            go.GraphObject.make(go.TextBlock, { stroke: "white", font: "bold 12px sans-serif" }, new go.Binding("text", "text"))
        )

    const estadosIniciales = g.getEstadosIniciales()
    let textIni = ""
    //se recorre el array de estados finales y se agrega al texto
    estadosIniciales.forEach(estado => {
        textIni += `${estado} ` //  
    })
    const textoIni = document.querySelector("#estadosIniciales")
    textoIni.innerHTML = `<span class="fw-bold">Estados iniciales del autómata:</span> ${textIni}`

    const estadosNormales = g.getEstadosNoFinales()
    let textNor = ""

    estadosNormales.forEach(estado => {
        textNor += `${estado} `
    })
    const textoNor = document.querySelector("#estadosNormales")
    textoNor.innerHTML = `<span class="fw-bold">Estados normales del autómata:</span> ${textNor}`


    const estadosFinales = g.getEstadosFinales()
    let textFin = ""
    //se recorre el array de estados finales y se agrega al texto
    estadosFinales.forEach(estado => {
        textFin += `${estado} ` //  
    })
    const textoFin = document.querySelector("#estadosFinales")
    textoFin.innerHTML = `<span class="fw-bold">Estados finales del autómata:</span> ${textFin}`
}





