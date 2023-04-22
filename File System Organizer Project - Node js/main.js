#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

let treeObj = require("./commands/tree");
let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");

let inputArr = process.argv.slice(2);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help "directoryPath"

let command = inputArr[0];
switch(command) {
    case "tree":
        treeObj.treekey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizekey(inputArr[1]);
        break;
    case "help":
        helpObj.helpkey();
        break;
    default:
        console.log("Command not found");
        break;
}