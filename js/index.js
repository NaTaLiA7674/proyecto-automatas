import go from 'gojs'
import Grafo from './Grafo'



let g = new Grafo()
g.ingresarVertices("A")
g.ingresarVertices("B")
g.ingresarVertices("C")
g.getVertice("C").SetEstadoFinal(true) 

g.ingresarArista("A", "A", 1)
g.ingresarArista("A", "A", 0)
g.ingresarArista("A", "B", 0)
g.ingresarArista("B", "C", 0)

let g2= new Grafo()


let $ = go.GraphObject.make
let diagram = null

document.addEventListener("DOMContentLoaded", function () {

    diagram = $(go.Diagram, "diagram")

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
      
       mostrar(g)

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

        mostrar(g)
    })

    document.querySelector("#a3").addEventListener("click", function () {
        g2.reiniciarGrafo()
        g2.ingresarVertices("A")
        g2.ingresarVertices("B")
        g2.ingresarVertices("C")
        g2.ingresarVertices("D")
        g2.ingresarVertices("E")
        g2.getVertice("A").SetEstadoInicial(true)
        g2.getVertice("E").SetEstadoFinal(true)

        g2.ingresarArista("A", "B", 0)
        g2.ingresarArista("B", "C", 1)
        g2.ingresarArista("C", "D", 0)
        g2.ingresarArista("D", "E", 1)
       
        mostrar(g2)
    })

 })

function createArrayOfNodesGrafo(gr) {

    const nodes = gr.getNombreVertices()

    const nodeDataArray = []
    nodes.forEach(node => {
        nodeDataArray.push({ key: node, name: node })
    })

    return nodeDataArray
}

function createArrayOfLinksGrafo(gr) {

    const links = gr.getAristas()

    const linkDataArray = []

    links.forEach(link => {
        linkDataArray.push({ from: link.Origen.dato, to: link.Destino.dato, text: `${link.GetPeso()}` })
    })

    return linkDataArray

}

function mostrar(gr) {
   
    diagram.model = $(go.GraphLinksModel, {
        nodeDataArray: createArrayOfNodesGrafo(gr),
        linkDataArray: createArrayOfLinksGrafo(gr)
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
    );
  
    
    
    const estadosIniciales= gr.getEstadosIniciales()
    let textIni = ""
    //se recorre el array de estados finales y se agrega al texto
    estadosIniciales.forEach(estado => {
        textIni += `${estado} ` //  
    })
    const textoIni = document.querySelector("#estadosIniciales")
    textoIni.innerHTML = `<span class="fw-bold">Estados iniciales del autómata:</span> ${textIni}`

    const estadosFinales = gr.getEstadosFinales()
    let textFin = ""
    //se recorre el array de estados finales y se agrega al texto
    estadosFinales.forEach(estado => {
        textFin += `${estado} ` //  
    })
    const textoFin = document.querySelector("#estadosFinales")
    textoFin.innerHTML = `<span class="fw-bold">Estados finales del autómata:</span> ${textFin}`
}





