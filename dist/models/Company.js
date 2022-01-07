"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1["default"].Schema({
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    company_name: String,
    company_ceo: String,
    company_address: String,
    inception_date: String
});
exports["default"] = mongoose_1["default"].model("Company", schema);
