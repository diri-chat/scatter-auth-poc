"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const moment = require("moment");
exports.default = (blockNumber, blockId, expireMinutes) => __awaiter(this, void 0, void 0, function* () {
    const blockData = yield app_1.rpc.get_block(blockNumber);
    const realBlockId = blockData.id.slice(-12).toUpperCase();
    const claimedBlockId = blockId.toUpperCase();
    const blocksMatch = claimedBlockId === realBlockId;
    if (!blocksMatch)
        throw "Blocks claimed in signature dont match";
    const irreversibleBlockGraceMinutes = 2.5;
    const signatureTime = moment.utc(blockData.timestamp);
    const timeCutOff = moment
        .utc()
        .subtract(expireMinutes, "minutes")
        .subtract(irreversibleBlockGraceMinutes, "minutes");
    const secondsSpare = signatureTime.diff(timeCutOff, "seconds");
    console.log(`Signature timestamp difference is ${secondsSpare} seconds.`);
    if (moment(signatureTime).isBefore(timeCutOff))
        throw `Signature is signed with Block ID too old from now.`;
    return true;
});
