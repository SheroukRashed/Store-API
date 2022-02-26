"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtAuth = function (req, res, next) {
    console.log("url ".concat(req.url, " was visited for jwt Auth"));
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid jwt token');
    }
};
exports["default"] = jwtAuth;
