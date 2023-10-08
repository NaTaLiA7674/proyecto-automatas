class Vertice {
    constructor(dato) {
        this.dato = dato
        this.ListaAdyacentes = []
        this.estadoFinal = false
        this.estadoInicial = false
    }

    GetEstadoFinal() {
        return this.estadoFinal
    }

    SetEstadoFinal(estadoFinal) {
        this.estadoFinal = estadoFinal
    }

    GetDato() {
        return this.dato
    }

    SetDato(dato) {
        this.dato = dato
    }

    GetAdyacentes() {
        return this.ListaAdyacentes
    }

    SetAdyacentes(adyacentes) {
        this.ListaAdyacentes = adyacentes
    }

    GetEstadoInicial() {
        return this.estadoInicial
    }

    SetEstadoInicial(estadoInicial) {
        this.estadoInicial = estadoInicial
    }

}

export default Vertice