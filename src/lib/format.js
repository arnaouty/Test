import { site } from "@/config/site";

export function money(amount) {
  return `LE ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${site.currency}`;
}
