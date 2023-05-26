import Cookies from "js-cookie";

export const authHeaders = () => ({
  authorization: `Bearer ${Cookies.get("token")}`,
});
