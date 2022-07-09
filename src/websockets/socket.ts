import {io} from '../httpServer';

interface DataMessage {

}


io.on("connect", (socket) => {
    // const connectionsService =  new ConnectionsService();
    

    socket.on('create_bid_item', async data => {
        io.emit('created_bid_item', data)
    });

    socket.on('create_bid_lot', async data => {
      io.emit('created_bid_lot', data)
  });

  
});