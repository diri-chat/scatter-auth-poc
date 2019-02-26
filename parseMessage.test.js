const parseMessage = require("./parseMessage");

const arg =
  "thekellygang would like to login using the active permission. Block ID: 44738933 A1B6A6B74882";
const expectation = {
  accountName: "thekellygang",
  permissionName: "active",
  blockNumber: "44738933",
  blockId: "A1B6A6B74882"
};

const result = parseMessage(arg);
if (JSON.stringify(result) === JSON.stringify(expectation)) {
  console.log("Test passed.");
} else {
  throw "Parse message test failed.";
}
