"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
function connectToDB() {
    mongoose_1["default"].connect('mongodb://localhost:27017/techwondoe')
        .then(function (conn) { return console.log("Connected to DB..."); })["catch"](function (err) {
        console.log("Db not connected");
        console.log(err);
        process.exit(1);
    });
}
exports["default"] = connectToDB;
