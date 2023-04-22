const fs = require("fs");
const path = require("path");

function treeFn(dirPath) {
    if(dirPath == undefined) {
        // console.log("Path not provided");
        treeHelper(process.cwd(), "");
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist == true) {
            treeHelper(dirPath, "");
        }
        else {
            console.log("Directory not exist.");
        }
    }
}
function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "|-- " + fileName);
    }
    else {
        let dirName = path.basename(dirPath);
        console.log(indent + "|__ "+ dirName);
        let children = fs.readdirSync(dirPath);
        for(let i=0; i<children.length; i++) {
            let childAddress = path.join(dirPath, children[i]);
            treeHelper(childAddress, indent + "\t");
        }
    }
}

module.exports = {
    treekey: treeFn
}