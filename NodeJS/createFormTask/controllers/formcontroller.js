const path = require("path");
const csv = require("csv-writer").createObjectCsvWriter;
const csvParser = require("csv-parser");
const fs = require("fs");
const mime = require("mime");
const multer = require("multer");

const displayFormPath = path.join(__dirname, "../views/displayForm.ejs");
const file_path = path.join(__dirname, "public/uploads/data.csv");

let uploadFileName;

exports.form = (req, res, next) => {
  res.render("form");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
exports.upload = multer({ storage });

exports.getDetails = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const uploadFileName = req.file.filename;
  const csvWriter = csv({
    path: file_path,
    header: [
      { id: "firstName", title: "firstName" },
      { id: "lastName", title: "lastName" },
      { id: "dob", title: "dateOfBirth" },
      { id: "uploadFileName", title: "imagePath" },
    ],
    append: true,
  });

  csvWriter
    .writeRecords([{ firstName, lastName, dob, uploadFileName }])
    .then(() => {
      console.log("Data written to CSV file");
    });
  res.redirect("/display");
};

exports.displayDetails = (req, res, next) => {
  const results = [];
  fs.createReadStream(file_path, "utf-8")
    .pipe(csvParser())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      console.log("Finished reading the CSV file");
      res.render(displayFormPath, { results: results });
    });
};

exports.downloadFile = (req, res, next) => {
  const filename = req.params.id;
  const mimetype = mime.getType(`public/uploads/${filename}`);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  const filestream = fs.createReadStream(`public/uploads/${filename}`);
  filestream.pipe(res);
};

exports.viewFile = (req, res, next) => {
  const filename = req.params.id;
  const mimetype = mime.getType(`public/uploads/${filename}`);

  res.setHeader("Content-disposition", "inline; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  const filestream = fs.createReadStream(`public/uploads/${filename}`);
  filestream.pipe(res);
};