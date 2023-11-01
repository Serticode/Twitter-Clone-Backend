"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionType = exports.PostType = void 0;
var PostType;
(function (PostType) {
    PostType["post"] = "post";
    PostType["repost"] = "repost";
    PostType["reply"] = "reply";
})(PostType || (exports.PostType = PostType = {}));
var ReactionType;
(function (ReactionType) {
    ReactionType["like"] = "like";
})(ReactionType || (exports.ReactionType = ReactionType = {}));
