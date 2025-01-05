import { f } from "~/plugins/fetch";

export default defineI18nLocale(async (locale) => {
  const loc = await f(`/lang?lang_code=${locale}`);
  return loc.lang;
});
