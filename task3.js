const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');

const directoryNameToReadFrom = 'csvdirectory';
const fileNameToReadFrom = 'task3-data.csv';
const fileNameToWriteTo = 'task3-generated-data.txt';

const filePathToReadFrom = path.join(__dirname, directoryNameToReadFrom, fileNameToReadFrom);
const filePathToWriteTo = path.join(__dirname, fileNameToWriteTo);

pipeline(
    fs.createReadStream(filePathToReadFrom),
    csvtojson(),
    fs.createWriteStream(filePathToWriteTo),
    (error) => {
        if (error) {
            console.log(error);
        }
    }
);