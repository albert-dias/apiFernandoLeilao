import { Router } from "express";
import adminAuthenticate from "../middlewares/adminAuthenticated";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

import { admRouter } from "./admin.routes";
import { auctionRouter } from "./auctions.routes";
import { sessionsRouter } from "./session.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/admin", ensureAuthenticate, adminAuthenticate, admRouter);
routes.use("/auctions", auctionRouter);


export default routes;