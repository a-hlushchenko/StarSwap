export function shortAddress(address: string | null) {
  if (!address) return "";

  return `${address.slice(0, 3)}...${address.slice(-3)}`;
}
