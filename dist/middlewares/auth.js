"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateToken(req, res, next) {
    var _a, _b, _c;
    try {
        var token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.token) || ((_c = req.header('Authorization')) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", ""));
        console.log(token, req.cookies);
        if (!token) {
            return res.status(403).json({
                message: "No token found in request"
            });
        }
        var validate = jsonwebtoken_1["default"].verify(token, String(process.env.API_SECRET));
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Unauthorized or invalid token"
        });
    }
}
exports.validateToken = validateToken;
