import "reflect-metadata";
import "./database";
import "dotenv/config"

import {httpServer} from './httpServer';

httpServer.listen(3333); 
console.log("Server only, port 3333");

