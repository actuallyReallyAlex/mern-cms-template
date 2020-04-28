"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var beer_1 = __importDefault(require("./controllers/beer"));
var app = new app_1.default([new beer_1.default()], process.env.PORT);
app.listen();
