const express = require("express");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const path = require("path");

const app = express();

app.get("/file", (req, res) => {
  res.json({
    status: 200,
    message: "This is the home route!",
  });
});

app.get("/api", (req, res) => {
  res.json({
    status: 200,
    message: "Testing /api ",
  });
});

// app.get("/api/filee", (req, res) => {
//   const {
//     query: { title, filename },
//   } = req;

//   const doc = new PDFDocument();

//   const tmpDir = "/tmp";
//   if (!fs.existsSync(tmpDir)) {
//     fs.mkdirSync(tmpDir);
//   }


//   //use the tmp serverless function folder to create the write stream for the pdf
//   let writeStream = fs.createWriteStream(path.join("/tmp", `${filename}.pdf`));
//   doc.pipe(writeStream);
//   doc.text(title);
//   doc.end();

//   writeStream.on("finish", function () {
//     res.json({
//       status: 200,
//       message: "File created sucessfuly!",
//     });
//   });
// });


// app.get("/api/filee", (req, res) => {
//     const {
//         query: { title, filename },
//     } = req;

//     const doc = new PDFDocument();

//     // Path to the main-folder
//     const mainFolderPath = path.join(__dirname, '..');
//     const tmpDir = path.join(mainFolderPath, 'tmp');
//     if (!fs.existsSync(tmpDir)) {
//         fs.mkdirSync(tmpDir);
//     }

//     // Use the tmp folder in the main-folder to create the write stream for the pdf
//     let writeStream = fs.createWriteStream(path.join(tmpDir, `${filename}.pdf`));
//     doc.pipe(writeStream);
//     doc.text(title);
//     doc.end();

//     writeStream.on("finish", function () {
//         res.json({
//             status: 200,
//             message: "File created successfully!",
//             path: tmpDir
//         });
//     });
// });

app.get("/api/filee", (req, res) => {
    const {
        query: { title, filename },
    } = req;

    const doc = new PDFDocument();

    // Use the /tmp directory provided by Vercel
    const tmpDir = '/tmp';
    
    // Create the write stream for the pdf in the /tmp directory
    let writeStream = fs.createWriteStream(path.join(tmpDir, `${filename}.pdf`));
    doc.pipe(writeStream);
    doc.text(title);
    doc.end();

    writeStream.on("finish", function () {
        res.json({
            status: 200,
            message: "File created successfully!",
        });
    });
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log("App running on port ", PORT);
});
