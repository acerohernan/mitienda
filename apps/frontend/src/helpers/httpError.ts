export function getHttpError(error: any): string {
  let message = "An error has ocurred in the server";
  let errMsg = error?.response?.data?.message;

  if (errMsg) {
    /* If the error is a string */
    if (typeof errMsg === "string") {
      message = errMsg;
    }

    /* If the errors are in array */
    if (Array.isArray(errMsg)) {
      message = errMsg[0];
    }
  }

  return message;
}

export function getHttpCode(err: any): number {
  let code = 500;

  if (err.response && err.response.status) code = err.response.status;

  return code;
}
