const TicketList = require('./ticket-list')


class Sockets {

  constructor(io) {

    this.io = io

    this.ticketList = new TicketList()

    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {

      console.log('Cliente conectado')

      socket.on('solicitar-tiquete', (_, callback) => {
        const nuevoTiquete = this.ticketList.crearTiquete()
        callback(nuevoTiquete)
      })

      socket.on('siguiete-tiquete-trabajar', ({ agente, escritorio }, callback) => {
        const suTiquete = this.ticketList.asignarTiquete(agente, escritorio)
        callback(suTiquete)

        this.io.emit('tiquete-asignado', this.ticketList.ultimos13)
      })
    })
  }


}


module.exports = Sockets