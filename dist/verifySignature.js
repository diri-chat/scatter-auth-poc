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
const eosjs_ecc_1 = require("eosjs-ecc");
const app_1 = require("./app");
exports.default = (message, signature, accountName, permissionName) => __awaiter(this, void 0, void 0, function* () {
    const accountInformation = yield app_1.rpc.get_account(accountName);
    const claimedPermission = accountInformation.permissions.find(permission => permission.perm_name === permissionName);
    const pubkey = claimedPermission.required_auth.keys[0].key;
    return eosjs_ecc_1.verify(signature, message, pubkey);
});
