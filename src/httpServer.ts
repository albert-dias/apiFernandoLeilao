import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import { createServer } from 'http';
import routes from './routes';
const app = express();
const httpServer = createServer(app);
const io = new socketio.Server(httpServer);

app.use(cors());
app.use(express.json());
app.use(routes);


io.sockets.on('connection', function (socket) {
    //
    console.log("new connect. socket"+ (socket.id));

    socket.on("disconnect", () => {
        console.log("new disconnect. socket"+ socket.id);
      });
});



export {io, httpServer}