import {
  KRSearch,
  KRSearchConfig,
} from "../../../../../dist/kore-web-sdk.esm.browser.js";

let findlyConfig = KRSearchConfig;
var fSdk = new KRSearch(findlyConfig);
fSdk.show(findlyConfig);
