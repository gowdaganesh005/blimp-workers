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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = Follow;
const db_1 = require("./db");
function Follow(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data.followeeId);
        try {
            const exists = yield db_1.client.following.findFirst({
                where: {
                    followerId: data.followerId,
                    followeeId: data.followeeId
                }
            });
            if (exists) {
                yield db_1.client.following.delete({
                    where: {
                        followId: exists.followId
                    }
                });
                yield db_1.client.user.update({
                    where: {
                        userId: data.followeeId
                    },
                    data: {
                        followerCount: {
                            decrement: 1
                        }
                    }
                });
                yield db_1.client.user.update({
                    where: {
                        userId: data.followerId
                    },
                    data: {
                        followingCount: {
                            decrement: 1
                        }
                    }
                });
                return;
            }
            else {
                yield db_1.client.following.create({
                    data: {
                        followeeId: data.followeeId,
                        followerId: data.followerId
                    }
                });
                yield db_1.client.user.update({
                    where: {
                        userId: data.followeeId,
                    },
                    data: {
                        followerCount: {
                            increment: 1
                        }
                    }
                });
                yield db_1.client.user.update({
                    where: {
                        userId: data.followerId
                    },
                    data: {
                        followingCount: {
                            increment: 1
                        }
                    }
                });
                console.log("follow");
                return;
            }
        }
        catch (error) {
            console.log(error);
            return;
        }
    });
}
