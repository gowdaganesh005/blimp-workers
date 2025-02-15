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
exports.Like = Like;
const db_1 = require("./db");
function Like(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        try {
            const exists = yield db_1.client.likes.findFirst({
                where: {
                    userId: data.userId,
                    postId: data.postId
                }
            });
            if (exists) {
                yield db_1.client.likes.delete({
                    where: {
                        likeId: exists.likeId
                    }
                });
                yield db_1.client.post.update({
                    where: {
                        postId: data.postId
                    },
                    data: {
                        Num_Likes: {
                            decrement: 1
                        }
                    }
                });
                console.log("Liked the comment");
                return;
            }
            else {
                yield db_1.client.likes.create({
                    data: {
                        userId: data.userId,
                        postId: data.postId
                    }
                });
                yield db_1.client.post.update({
                    where: {
                        postId: data.postId,
                    },
                    data: {
                        Num_Likes: {
                            increment: 1
                        }
                    }
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            return;
        }
    });
}
