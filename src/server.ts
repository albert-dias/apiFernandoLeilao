import "reflect-metadata";
import "./database";

import {httpServer} from './httpServer';
import './websocket/socket';

httpServer.listen(3030); 
console.log("Server only");

