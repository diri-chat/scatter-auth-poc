import { verify } from "eosjs-ecc";
import { rpc } from "./app";

export default async (
  message,
  signature,
  accountName,
  permissionName
): Promise<boolean> => {
  const accountInformation = await rpc.get_account(accountName);
  const claimedPermission = accountInformation.permissions.find(
    permission => permission.perm_name === permissionName
  );
  const pubkey = claimedPermission.required_auth.keys[0].key;

  return verify(signature, message, pubkey);
};
