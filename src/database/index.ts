import { DataSource } from "typeorm";
import { Auction } from "../entities/Auction";
import { BidItem } from "../entities/BidItem";
import { BidLot } from "../entities/BidLot";
import { Category } from "../entities/Category";
import { Doc } from "../entities/Doc";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";
import { Image } from "../entities/Image";
import { Item } from "../entities/Item";
import { Lot } from "../entities/Lot";
import { Subcategory } from "../entities/Subcategory";
import { User } from "../entities/User";
import { VisibleItem } from "../entities/VisibleItem";
import { VisibleLot } from "../entities/VisibleLot";
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
import { CreateVisibleLot1657761989037 } from "./migrations/1657761989037-CreateVisibleLot";
import { CreateVisibleItem1657762036013 } from "./migrations/1657762036013-CreateVisibleItem";
import UpdateItem1658279440016 from "./migrations/1658279440016-UpdateItem";

const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "leilaodb",
    entities: [
        Auction,
        BidItem,
        BidLot,
        Category,
        Doc,
        EnableInItem,
        EnableInLot,
        Image,
        Item,
        Lot,
        Subcategory,
        User,
        VisibleLot,
        VisibleItem
    ],
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
        CreateVisibleLot1657761989037,
        CreateVisibleItem1657762036013,
        UpdateItem1658279440016,
    ],
});

dataSource.initialize();

export default dataSource;