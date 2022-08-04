import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import { createServer } from 'http';
import routes from './routes';
import ShowBidItemService from './services/ShowBidItemService';
import CreateVisibleItemService from './services/CreateVisibleItemService';
import CreateVisibleLotService from './services/CreateVisibleLotService';
import ShowVisibleItemService from './services/ShowVisibleItemService';
import ShowBidLotService from './services/ShowBidLotService';
import ShowVisibleLotService from './services/ShowVisibleLotService';
import UpdateItemCloseService from './services/UpdateItemCloseService';
const app = express();
const httpServer = createServer(app);
const io = new socketio.Server(httpServer,{
  cors: {
    origin: "*",
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
      io.sockets.emit("item_bid", bid)
    })

    socket.on("get_lot_bid", async function(data: Props){
      const bidService = new ShowBidLotService();
      const bid = await bidService.execute({id:data.id})
      io.sockets.emit("lot_bid", bid)
    })

    socket.on("set_item_visible", async function(data: Props){
      const setVisibleService = new CreateVisibleItemService();
      await setVisibleService.execute({item_id: data.id})
      const visibleService = new ShowVisibleItemService();
      const visible = await visibleService.execute({id: data.id})
      io.sockets.emit("item_visible", visible)
    })

    socket.on("set_lot_visible", async function(data: Props){
      const setVisibleService = new CreateVisibleLotService();
      await setVisibleService.execute({lot_id: data.id})
      const visibleService = new ShowVisibleLotService();
      const visible = await visibleService.execute({id:data.id})
      io.sockets.emit("lot_visible", visible)
    })

    socket.on("get_item_visible", async function(data: Props){
      const visibleService = new ShowVisibleItemService();
      const visible = await visibleService.execute({id: data.id})
      io.sockets.emit("item_visible", visible)
    })

    socket.on("get_lot_visible", async function(data: Props){
      const visibleService = new ShowVisibleLotService();
      const visible = await visibleService.execute({id:data.id})
      io.sockets.emit("lot_visible", visible)
    })

    socket.on("start_count", function(data: Props){
      io.sockets.emit("start_count")
    })

    socket.on("stop_count", async function(data: Props){
      const updateClose = new UpdateItemCloseService();
      await updateClose.execute({id:data.id})
      io.sockets.emit("stop_count")
    })
});




export {io, httpServer}