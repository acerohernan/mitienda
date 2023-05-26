export const getPrefixFromPhoneNumber = (phone: string): string => {
  if (phone.startsWith("1")) return "1";

  if (phone.startsWith("51") || phone.startsWith("54"))
    return phone.slice(0, 2);

  return "1";
};
