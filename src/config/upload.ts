import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const s3 = new S3Client({ region: "us-east-1" })

const storgeTypes = {
  local: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
  s3: multerS3({
    s3,
    bucket: "uzeh-testes",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      const rota = `images/${req.user.id}/`;
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${rota}${fileHash}-${file.originalname}`;
      return cb(null, fileName);
    },
  }),
};

export default {
  directory: tmpFolder,

  storage: storgeTypes.s3,
  limits: {
    fileSize: 12 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
