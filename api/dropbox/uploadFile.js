require("dotenv").config();

const { Dropbox } = require("dropbox");
const fs = require("fs");

const file_path = `/tmp/test-truly.pdf`;

const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const dbx = new Dropbox({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    });

    fs.readFile(file_path, (err, contents) => {
      if (err) {
        reject({ message: "Error reading file", error: err });
      } else {
        dbx
          .filesUpload({ path: `/test-truly.pdf`, contents })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject({ message: "Error uploading file", error: err });
          });
      }
    });
  });
};

module.exports = { uploadFile };
