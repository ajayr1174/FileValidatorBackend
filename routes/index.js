const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const fileValidatorController = require('../controllers/FileValidator');

router.post('/upload', upload.array("files",2),fileValidatorController.validateFile);

router.get("/getSummaryData", fileValidatorController.getSummaryData);

router.get("/getValidData", fileValidatorController.getValidData);

router.get("/getInValidData", fileValidatorController.getInValidData);

router.get("/getSummaryDataById/:fileId", fileValidatorController.getSummaryDataByFileId);

router.get("/getValidDataByFileId/:fileBelong", fileValidatorController.getValidDataByFileId);

router.get("/getInValidDataByFileId/:fileBelong", fileValidatorController.getInValidDataByFileId);

module.exports = router ;