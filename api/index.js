const express = require("express");

const PDFDocument = require("pdfkit");
const fs = require("fs");

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

app.get("/api/filee", (req, res) => {
    const {
        query: { title, filename },
    } = req;

    const doc = new PDFDocument();

    //use the tmp serverless function folder to create the write stream for the pdf
    let writeStream = fs.createWriteStream(`/tmp/${filename}.pdf`);
    doc.pipe(writeStream);
    doc.text(title);
    doc.end();

    writeStream.on('finish', function() {
        res.json({
            status: 200,
            message: "File created sucessfuly!"
        })
    })
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log("App running on port ", PORT);
});
