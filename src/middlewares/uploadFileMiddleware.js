import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FILE_DIR } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    // originalname - Name of the file on the user's computer
    const [fileName, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

//multer upload middleware
export const upload = multer({ storage });
