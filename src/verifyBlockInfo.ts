import { rpc } from "./app";

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

  const realBlocktime = new Date(blockData.timestamp);
  const timeNow = new Date();
  const minutesDifference = (timeNow - realBlocktime) / 60000;
  if (minutesDifference > expireMinutes)
    throw `Sign time is greater than expired time of ${expireMinutes} minutes.`;

  return true;
};
