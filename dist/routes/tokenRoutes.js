"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    var token = jsonwebtoken_1["default"].sign({
        access: true
    }, String(process.env.API_SECRET), {
        expiresIn: "30m"
    });
    var options = {
        expires: new Date(Date.now() + 1 * 4 * 60 * 60 * 1000),
        httpsOnly: true
    };
    res.cookie('token', token, options);
    return res.json({
        token: token,
        expiresIn: "30m"
    });
});
exports["default"] = router;
