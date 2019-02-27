import { rpc } from "./app";
import * as moment from "moment";

export default async (
  blockNumber,
  blockId,
  expireMinutes
): Promise<boolean> => {
  const blockData = await rpc.get_block(blockNumber);

  const realBlockId = blockData.id.slice(-12).toUpperCase();
  const claimedBlockId = blockId.toUpperCase();

  const blocksMatch = claimedBlockId === realBlockId;
  if (!blocksMatch) throw "Blocks claimed in signature dont match";

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
};
