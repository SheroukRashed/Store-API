"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dashboardHandler_1 = __importDefault(require("./handlers/dashboardHandler"));
var usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
var productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
var ordersHandler_1 = __importDefault(require("./handlers/ordersHandler"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
(0, dashboardHandler_1["default"])(app);
(0, usersHandler_1["default"])(app);
(0, productsHandler_1["default"])(app);
(0, ordersHandler_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
