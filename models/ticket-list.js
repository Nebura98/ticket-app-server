const Ticket = require('./ticket')

class TicketList {
    constructor() {
        this.ultimoNumero = 0
        this.pendientes = []
        this.asignados = []
    }


    get siguienteNumero() {
        this.ultimoNumero++
        return this.ultimoNumero
    }

    get ultimos13() {
        return this.asignados.slice(0, 13)
    }

    crearTiquete() {
        const nuevoTiquete = new Ticket(this.siguienteNumero)
        this.pendientes.push(nuevoTiquete)
        return nuevoTiquete
    }

    asignarTiquete(agente, escritorio) {
        if (this.pendientes.length === 0) return null

        const siguienteTiquete = this.pendientes.shift()
        siguienteTiquete.agente = agente
        siguienteTiquete.escritorio = escritorio

        this.asignados.unshift(siguienteTiquete)
        return siguienteTiquete
    }

}

module.exports = TicketList