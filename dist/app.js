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
const parseMessage_1 = require("./parseMessage");
const verifyBlockInfo_1 = require("./verifyBlockInfo");
const verifySignature_1 = require("./verifySignature");
const eosjs_1 = require("eosjs");
const node_fetch_1 = require("node-fetch");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
// Bind the app to a specified port
var port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
const expireMinutes = 600000;
app.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { message, signature } = req.body;
    const { accountName, permissionName, blockNumber, blockId } = parseMessage_1.default(message);
    try {
        const timeStampIsValid = yield verifyBlockInfo_1.default(blockNumber, blockId, expireMinutes);
        const signatureIsValid = yield verifySignature_1.default(message, signature, accountName, permissionName);
        return res.send({
            authenticated: timeStampIsValid && signatureIsValid
        });
    }
    catch (e) {
        res.status(500).send(`An error occured with your request ${e}`);
    }
}));
exports.rpc = new eosjs_1.JsonRpc("http://eos.greymass.com", { fetch: node_fetch_1.default });
