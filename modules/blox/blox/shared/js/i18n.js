// Interface text for Preact blocks. preact-wrapper.html passes the block's
// i18n keys (listed in its manifest.json) translated, as the `t` prop; the
// block root wraps its tree in <Strings.Provider value={t}>, and any
// component below reads them with useT(). English and Hebrew live in the
// theme's i18n/*.yaml; a site overrides a key in its own i18n/<lang>.yaml.
import {createContext} from "preact";
import {useContext} from "preact/hooks";

export const Strings = createContext({});

// tr("block_gallery_go_to_slide", {n: 2}) fills {n}. A missing key shows
// the key itself, so it is noticed.
export function useT() {
  const t = useContext(Strings);
  return (key, vars = {}) => (t[key] || key).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");
}
