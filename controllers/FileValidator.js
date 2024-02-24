const ExcelJS = require("exceljs");
const validator = require("../validators/validaton");
const utils = require("../utils/util");
const ValidData = require("../models/ValidData");
const InValidData = require("../models/InvalidData");
const File = require("../models/Files");
const invalidData = require("../models/InvalidData");

async function convertExcelToJson(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  const parsedData = [];

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const rowData = [];
    for (let j = 1; j <= worksheet.columnCount; j++) {
      var data = worksheet.getCell(i, j).value;
      if (data == null) {
        rowData.push("NA");
      } else {
        rowData.push(worksheet.getCell(i, j).value);
      }
    }
    parsedData.push(rowData);
  }
  return parsedData;
}

async function AddFileToDB(dataFile, validRecords, inValidRecords) {
  try {
    let totalRecords = validRecords.length + inValidRecords.length;
    let response = await File.create({
      validatedFile: dataFile.originalname,
      totalEntries: totalRecords,
      validEntries: validRecords.length,
      inValidEntries: inValidRecords.length,
    });
    console.log(response);
    return response._id;
  } catch (error) {
    console.log(error);
  }
}

function PerformValidation(layoutMapper, dataFileParseData) {
  let validRecords = [];
  let inValidRecords = [];
  if (layoutMapper == null || dataFileParseData == null) {
    console.log("layoutMapper or dataFile cannot be null");
    return;
  }
  dataFileParseData?.map((data) => {
    let isrecordValid = true;
    let errorList = [];
    let isAllNA = true;
    data?.map((record) => {
      if (record != "NA") {
        isAllNA = false;
      }
    });
    data?.map((record, index) => {
      if (record != null && record != "NA") {
        if (index == 0) {
          let firstNameValidator = layoutMapper.get("first_name");
          let firstNameResonse = validator.isFirstNameValid(
            record,
            firstNameValidator
          );
          if (!firstNameResonse.isValid) {
            isrecordValid = false;
            errorList.push(firstNameResonse?.message);
          }
        } else if (index == 1) {
          let lastNameValidator = layoutMapper.get("last_name");
          let lastNameResponse = validator.isLastNameValid(
            record,
            lastNameValidator
          );
          if (!lastNameResponse.isValid) {
            isrecordValid = false;
            errorList.push(lastNameResponse?.message);
          }
        } else if (index == 2) {
          let dobValidator = layoutMapper.get("dob");
          let dobResponse = validator.isDateValid(record, dobValidator);
          if (!dobResponse.isValid) {
            isrecordValid = false;
            errorList.push(dobResponse?.message);
          }
        } else if (index == 3) {
          let maritalStatusValidator = layoutMapper.get("marital_status");
          let maritalStatusResponse = validator.isMaritalStatusCorrect(
            record,
            maritalStatusValidator
          );
          if (!maritalStatusResponse.isValid) {
            isrecordValid = false;
            errorList.push(maritalStatusResponse?.message);
          }
        } else if (index == 4) {
          let genderStatusValidator = layoutMapper.get("gender");
          let genderResponse = validator.isGenderStatusCorrect(
            record,
            genderStatusValidator
          );
          if (!genderResponse.isValid) {
            isrecordValid = false;
            errorList.push(genderResponse?.message);
          }
        } else if (index == 5) {
          let contactNoValidator = layoutMapper.get("contact_number");
          let contactNoResponse = validator.isContactNoNValid(
            record,
            contactNoValidator
          );
          if (!contactNoResponse.isValid) {
            isrecordValid = false;
            errorList.push(contactNoResponse?.message);
          }
        } else if (index == 6) {
          let jobTitleValidator = layoutMapper.get("job_title");
          let jobTitleResponse = validator.isJobTitleValid(
            record,
            jobTitleValidator
          );
          if (!jobTitleResponse.isValid) {
            isrecordValid = false;
            errorList.push(jobTitleResponse?.message);
          }
        }
      }
    });
    if (!isAllNA) {
      if (isrecordValid) {
        validRecords.push(data);
      } else {
        let errorMessage = "";
        errorList.forEach((message) => {
          errorMessage += message;
          errorMessage += ",";
        });
        data.push(errorList);
        inValidRecords.push(data);
      }
    }
  });

  return {
    validRecords,
    inValidRecords,
  };
}

async function AddInValidDataToDB(inValidRecords, fileId) {
  try {
    if (inValidRecords == null) {
      console.log("validRecords can't br null");
      return;
    }
    inValidRecords?.forEach(async (inValidRecord) => {
      let inValidRecordData = await InValidData.create({
        firstName: inValidRecord[0] == null ? "" : inValidRecord[0],
        lastName: inValidRecord[1] == null ? "" : inValidRecord[1],
        dob: inValidRecord[2] == null ? "" : inValidRecord[2],
        maritalStatus: inValidRecord[3] == null ? "" : inValidRecord[3],
        gender: inValidRecord[4] == null ? "" : inValidRecord[4],
        contactNo: inValidRecord[5] == null ? "" : inValidRecord[5],
        jobTitle: inValidRecord[6] == null ? "" : inValidRecord[6],
        fileBelong: fileId,
      });
    });
  } catch (e) {
    console.log(e);
  }
}

async function AddValidDataToDB(validRecords, fileId) {
  try {
    if (validRecords == null) {
      console.log("validRecords can't br null");
      return;
    }
    validRecords?.forEach(async (validRecord) => {
      let validRecordData = await ValidData.create({
        firstName: validRecord[0] == null ? "" : validRecord[0],
        lastName: validRecord[1] == null ? "" : validRecord[1],
        dob: validRecord[2] == null ? "" : validRecord[2],
        maritalStatus: validRecord[3] == null ? "" : validRecord[3],
        gender: validRecord[4] == null ? "" : validRecord[4],
        contactNo: validRecord[5] == null ? "" : validRecord[5],
        jobTitle: validRecord[6] == null ? "" : validRecord[6],
        fileBelong: fileId,
      });
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports.validateFile = async function (req, res) {
  try {
    const files = req.files;
    const layoutFile = files.find((f) => f.originalname == "Layout.xlsx");
    const dataFile = files.find((f) => f.originalname != "Layout.xlsx");

    console.log("layoutFile: ", layoutFile);
    let layoutParseData = await convertExcelToJson(layoutFile.path);
    let dataFileParseData = await convertExcelToJson(dataFile.path);

    console.log("layoutFile File:", layoutParseData);
    console.log("dataFileParseData File:", dataFileParseData);

    let layoutMapper = utils.getLayoutMapper(layoutParseData);

    console.log("layoutMapper: ", layoutMapper);

    let result = PerformValidation(layoutMapper, dataFileParseData);

    let fildID = await AddFileToDB(
      dataFile,
      result.validRecords,
      result.inValidRecords
    );
    await AddValidDataToDB(result.validRecords, fildID);
    await AddInValidDataToDB(result.inValidRecords, fildID);

    res
      .status(200)
      .json({ message: "Parsed successfully", data: result, fileId: fildID });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getSummaryData = async function (req, res) {
  try {
    // const id = req?.params?.id;
    //  const fileData = await File.findById(id);
    const fileData = await File.find();
    if (fileData === null) {
      res.status(200).json({ message: "File Not Found", data: fileData });
    }
    res.status(200).json({ message: "fetched summary data", data: fileData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getSummaryDataByFileId = async function (req, res) {
  try {
    // const validData = await ValidData.findById(req.params.id).populate('files');
    const { fileId } = req.params;
    const summaryData = await File.findById(fileId);
    if (!summaryData.length) {
      return res.status(404).json({ message: "No data found for this fileId" });
    }
    res.status(200).json({ message: "fetched valid data", data: summaryData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getValidData = async function (req, res) {
  try {
    // const validData = await ValidData.findById(req.params.id).populate('files');
    const validData = await ValidData.find();
    res.status(200).json({ message: "fetched valid data", data: validData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getValidDataByFileId = async function (req, res) {
  try {
    // const validData = await ValidData.findById(req.params.id).populate('files');
    const { fileBelong } = req.params;
    const validData = await ValidData.find({ fileBelong });
    if (!validData.length) {
      return res.status(404).json({ message: "No data found for this fileId" });
    }
    res.status(200).json({ message: "fetched valid data", data: validData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getInValidData = async function (req, res) {
  try {
    // const inValidData = await invalidData.findById(req.params.id).populate('files');
    const inValidData = await InValidData.find();
    if (!inValidData.length) {
      return res.status(404).json({ message: "No data found for this fileId" });
    }
    res
      .status(200)
      .json({ message: "fetched invalid data", data: inValidData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getInValidDataByFileId = async function (req, res) {
  try {
    // const validData = await ValidData.findById(req.params.id).populate('files');
    const { fileBelong } = req.params;
    const validData = await InValidData.find({ fileBelong });
    res.status(200).json({ message: "fetched valid data", data: validData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};

module.exports.getInValidData = async function (req, res) {
  try {
    // const inValidData = await invalidData.findById(req.params.id).populate('files');
    const inValidData = await InValidData.find();
    res
      .status(200)
      .json({ message: "fetched invalid data", data: inValidData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error parsing File", error: error.message });
  }
};
