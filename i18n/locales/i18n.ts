import { f } from "~/plugins/fetch";

export default defineI18nLocale(async (locale) => {
  const { isError } = storeToRefs(useLoaderStore());

  const loc = await f(`/lang?lang_code=${locale}`);

  if (loc) return loc.lang;
  else {
    isError.value = true;
    return null;
  }
});
