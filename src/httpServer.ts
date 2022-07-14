import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import { createServer } from 'http';
import routes from './routes';
import ShowBidItemService from './services/ShowBidItemService';
const app = express();
const httpServer = createServer(app);
const io = new socketio.Server(httpServer,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

app.use(cors());
app.use(express.json());
app.use(routes);

interface Props{
  id: string;
}


io.sockets.on('connection', function (socket) {
    console.log("new connect. socket"+ (socket.id));

    socket.on("get_item_bid", async function(data: Props){
      const bidService = new ShowBidItemService();
      const bid = await bidService.execute({id: data.id})
      console.log(bid)
      io.sockets.emit("item_bid", bid)
    })

    socket.on("get_lot_bid", async function(data: Props){
      const bidService = new ShowBidItemService();
      const bid = await bidService.execute({id:data.id})
      io.sockets.emit("lot_bid", bid)
    })

    socket.on("get_item_visible", async function(data: Props){
      const visibleService = new ShowBidItemService();
      const visible = await visibleService.execute({id: data.id})
      console.log(visible)
      io.sockets.emit("item_visible", visible)
    })

    socket.on("get_lot_visible", async function(data: Props){
      const visibleService = new ShowBidItemService();
      const visible = await visibleService.execute({id:data.id})
      io.sockets.emit("lot_visible", visible)
    })

});




export {io, httpServer}