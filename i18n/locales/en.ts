import { f } from "~/plugins/fetch";

export default defineI18nLocale(async (locale) => {
  const loc = await f("/lang");
  return loc.lang;
});
