import express from 'express';
import { FILE_DIR } from '../constants/constants.js';
import uploadController from '../controllers/filesController.js';
import { asyncWrapper } from '../helpers/apiHelpers.js';
import { upload } from '../middlewares/uploadFileMiddleware.js';

const router = new express.Router();

// api/files/upload
router.post('/upload', upload.single('avatar'), asyncWrapper(uploadController));
router.use('/download', express.static(FILE_DIR));

export default router;
