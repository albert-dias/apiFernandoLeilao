import "reflect-metadata";
import 'dotenv/config';
import "./database";

import {httpServer} from './httpServer';
//import './websocket/socket';

httpServer.listen(3333); 
console.log("Server only, port 3333");

