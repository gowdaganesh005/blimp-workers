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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const Like_1 = require("./Like");
const ioredis_1 = require("ioredis");
const Follow_1 = require("./Follow");
const Comment_1 = require("./Comment");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = new ioredis_1.Redis();
const worker = new bullmq_1.Worker('WorkerQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const queue = job.name;
    switch (queue) {
        case "likesQueue":
            console.log("running");
            yield (0, Like_1.Like)(job.data);
            return;
        case "followQueue":
            console.log("got the follow request");
            yield (0, Follow_1.Follow)(job.data);
            return;
        case "commentQueue":
            console.log("got the comment reques");
            yield (0, Comment_1.Comment)(job.data);
            return;
    }
}), { connection: {
        port: 6379
    } });
