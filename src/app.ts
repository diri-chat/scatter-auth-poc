import parseMessage from "./parseMessage";
import verifyBlockInfo from "./verifyBlockInfo";
import verifySignature from "./verifySignature";
import { JsonRpc } from "eosjs";
import fetch from "node-fetch";
const cors = require("cors");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Bind the app to a specified port
var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const expireMinutes = 2;

app.post("/login", async (req, res) => {
  try {
    const { message, signature } = req.body;
    const { accountName, permissionName, blockNumber, blockId } = parseMessage(
      message
    );

    const timeStampIsValid = await verifyBlockInfo(
      blockNumber,
      blockId,
      expireMinutes
    );

    const signatureIsValid = await verifySignature(
      message,
      signature,
      accountName,
      permissionName
    );

    return res.send({
      authenticated: timeStampIsValid && signatureIsValid
    });
  } catch (e) {
    res.status(500).send(`An error occured with your request ${e}`);
  }
});

export const rpc = new JsonRpc("http://eos.greymass.com", { fetch });
