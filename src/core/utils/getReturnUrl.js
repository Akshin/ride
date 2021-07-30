import { SSO_URL } from "../../../.env";

export default () => {
  return `${SSO_URL}/external?return=${location.origin}/external`;
};
