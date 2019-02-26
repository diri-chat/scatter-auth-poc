"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(message) {
    const messageList = message.split(" ");
    if (messageList.length !== 13)
        throw "Message is not inline.";
    const accountName = messageList[0];
    const permissionName = messageList[7];
    const blockNumber = messageList[11];
    const blockId = messageList[12];
    return {
        accountName,
        permissionName,
        blockNumber,
        blockId
    };
}
exports.default = default_1;
