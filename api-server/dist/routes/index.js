"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviation_1 = __importDefault(require("./deviation"));
const stats_1 = __importDefault(require("./stats"));
const router = (0, express_1.Router)();
router.use('/deviation', deviation_1.default);
router.use('/stats', stats_1.default);
exports.default = router;
