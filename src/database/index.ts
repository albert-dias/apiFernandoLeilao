import { DataSource } from "typeorm";
import { CreateUser1654995449661 } from "./migrations/1654995449661-CreateUser";
import { CreateCategory1654995606760 } from "./migrations/1654995606760-CreateCategory";
import { CreateSubcategory1654995615800 } from "./migrations/1654995615800-CreateSubcategory";
import { CreateAuction1654995631400 } from "./migrations/1654995631400-CreateAuction";
import { CreateLotInAuction1654995671824 } from "./migrations/1654995671824-CreateLotInAuction";
import { CreateItemInLot1654995685929 } from "./migrations/1654995685929-CreateItemInLot";
import { CreateDocUser1654995719076 } from "./migrations/1654995719076-CreateDocUser";
import { CreateImagesItem1654995814720 } from "./migrations/1654995814720-CreateImagesItem";
import { CreateBidInLot1654995828414 } from "./migrations/1654995828414-CreateBidInLot";
import { CreateBidInItem1654995837105 } from "./migrations/1654995837105-CreateBidInItem";
import { CreateEnableUserInLot1654996060559 } from "./migrations/1654996060559-CreateEnableUserInLot";
import { CreateEnableUserInItem1654996074738 } from "./migrations/1654996074738-CreateEnableUserInItem";

const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "leilaodb",
    entities: [],
    migrations: [
        CreateUser1654995449661,
        CreateCategory1654995606760,
        CreateSubcategory1654995615800,
        CreateAuction1654995631400,
        CreateLotInAuction1654995671824,
        CreateItemInLot1654995685929,
        CreateDocUser1654995719076,
        CreateImagesItem1654995814720,
        CreateBidInLot1654995828414,
        CreateBidInItem1654995837105,
        CreateEnableUserInLot1654996060559,
        CreateEnableUserInItem1654996074738,
    ],
});

dataSource.initialize();

export default dataSource;