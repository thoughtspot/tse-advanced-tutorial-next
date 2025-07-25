import { constants } from "./constants";

/**
 * Gets a token for the given user.
 * @returns A promise that resolves to the token (of any type).
 */
export const getAuthToken = async (): Promise<any> => {
  let endpoint: string = `${constants.tokenServer}/token?username=${constants.username}&passcode=${constants.passcode}`;
  console.log("token endpoint: " + endpoint);

  const response = await fetch(endpoint);
  const token = await response.json();
  console.log("token == ", token);

  return token;
};
