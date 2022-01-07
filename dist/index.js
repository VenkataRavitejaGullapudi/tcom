"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./config/database"));
var Company_1 = __importDefault(require("./models/Company"));
var Team_1 = __importDefault(require("./models/Team"));
var companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
var teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
(0, database_1["default"])();
var API_PORT = process.env.API_PORT || 8000;
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send("Welcome to our apis");
});
app.use('/api/v1/company', companyRoutes_1["default"]);
app.use('/api/v1/team', teamRoutes_1["default"]);
app.get('/api/v1/allteams', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companies, i, teams, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, Company_1["default"].find({})];
            case 1:
                companies = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < companies.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, Team_1["default"].find({
                        company_id: companies[i].uuid
                    })];
            case 3:
                teams = _a.sent();
                companies[i].teams = "klk";
                console.log(companies);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                if (companies.length > 0)
                    return [2 /*return*/, res.status(200).json(companies)];
                res.status(200).json({
                    companies: companies,
                    message: "No Companies exists"
                });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(400).json({
                    "message": "Something went wrong"
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.listen(API_PORT, function () {
    console.log("Server Running at Port ".concat(API_PORT));
});