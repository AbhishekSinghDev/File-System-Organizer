const fs = require("fs");
const path = require("path");
const utility = require("../utility");

function organizeFn(dirPath) {
    // 1. input -> input the directory address.
    let dirName;
    if(dirPath == undefined) {
        // console.log("Please provide a path");
        dirPath = process.cwd();
        let doesExist = path.join(dirPath, "organized_files");
        if(doesExist) {
            dirName = path.join(dirPath, "organized_files");
            if(fs.existsSync(dirName) == false) {
                fs.mkdirSync(dirName);
            }
        }
    }
    else {
        // 2. create -> organized_files directory.
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            dirName = path.join(dirPath, "organized_files");
            if(fs.existsSync(dirName) == false) {
                fs.mkdirSync(dirName);
            }
        }
        else {
            console.log("Please provide correct path");
            return;
        }
    }
    organizeHelper(dirPath, dirName);
}
function organizeHelper(source, destination) {
    // 3. identify the category of files.
    let childNames = fs.readdirSync(source);
    // console.log(childNames);
    for(let i=0; i<childNames.length; i++) {
        let childAddress = path.join(source, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile == true) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            // console.log(childNames[i] + " ==> ", category);
            sendFiles(childAddress, destination, category);
        }
    }
}
function getCategory(fileName) {
    let extension = path.extname(fileName);
    // console.log(extension);
    extension = extension.slice(1);
    for(let key in utility.types) {
        let type = utility.types[key];
        for(let i=0; i<type.length; i++) {
            if(extension == type[i]) {
                return key;
            }
        }
    }
    return "others";
}
function sendFiles(srcFileAddress, destination, category) {
    // 4. copy / cut into the organized_files directory.
    let categoryPath = path.join(destination, category);
    let doesExist = fs.existsSync(categoryPath);
    if(doesExist == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFileAddress);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFileAddress, destFilePath);
    fs.unlinkSync(srcFileAddress);                  // remove file after copying will result in cut
    console.log(fileName + " is copied.");
}

module.exports = {
    organizekey: organizeFn
}