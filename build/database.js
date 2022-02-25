"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
var _b = process.env, POSTGRES_HOST_TEST = _b.POSTGRES_HOST_TEST, POSTGRES_DB_TEST = _b.POSTGRES_DB_TEST, POSTGRES_USER_TEST = _b.POSTGRES_USER_TEST, POSTGRES_PASSWORD_TEST = _b.POSTGRES_PASSWORD_TEST;
var client = new pg_1.Pool({
    host: process.env.ENV === 'test' ? POSTGRES_HOST_TEST : POSTGRES_HOST,
    database: process.env.ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: process.env.ENV === 'test' ? POSTGRES_USER_TEST : POSTGRES_USER,
    password: process.env.ENV === 'test' ? POSTGRES_PASSWORD_TEST : POSTGRES_PASSWORD
});
exports.default = client;
//# sourceMappingURL=database.js.map