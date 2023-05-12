import dataJson from "./data.json";

export type InvitationType = (typeof dataJson)[number] & {
  attending?: boolean;
};
