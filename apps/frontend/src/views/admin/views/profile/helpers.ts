import Cookies from "js-cookie";

export function onHttpError() {
  Cookies.remove("token");
}
