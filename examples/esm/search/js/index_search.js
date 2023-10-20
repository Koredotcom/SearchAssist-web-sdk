import {
  KRSearch,
  KRSearchConfig,
} from "../../../../../dist/kore-web-sdk.esm.browser.js";

// window.appConfig = {
//   "production": true,
//   "tag": "qa",
//   "API_SERVER_URL": "https://searchassist-qa.kore.ai",
//   "USE_SESSION_STORE": false,
//   "MIXPANEL_KEY": "5c3bf404d138a0e9ca816fb8421d6665",
//   "INLINE_MANUAL_SITE_KEY": "1ec224ee46620656a9b18a17c80587a3",
//   "deployment_type": "",
//   "APPCUES": {
//       "ENABLE": true,
//       "APPCUES_KEY": "112004"
//   },
//   "topicGuideBaseUrl": "https://koredotcom.github.io/koredotai-docs/searchassist/topic-guide/"
// };
let findlyConfig = KRSearchConfig;
// findlyConfig.botOptions = {
//     "queryPipelineId": "fqp-9b63ffd3-3ed6-59e7-95ca-05af11fdd906",
//   "logLevel": "debug",
//   "userIdentity": "vaishali.addala@kore.com",
//   "client": "botbuilder",
//   "botInfo": {
//       "chatBot": "SA demo",
//       "taskBotId": "st-aec7ef8c-c05c-5111-8658-9ed903e2ec34"
//   },
//   "clientId": "cs-cc7a0cbc-03fe-5d25-b4e2-3f9802d5c46c",
//   "searchIndexID": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc",
//   "koreAPIUrl": "https://searchassist-qa.kore.ai/searchassistapi",
//   "reWriteSocketURL": {
//       "protocol": "wss",
//       "hostname": "searchassist-qa.kore.ai"
//   },
//   JWTUrl : "https://searchassist-qa.kore.ai/searchassistapi/users/sts?rnd=fle73l",
//   accessToken:"4pqWQ1SXHM7eE8Jo8TYoMknmCcTTo6u2hshBHkPewG1pWAEkXMfH6PIEFKHC9EuY"
// };
// findlyConfig.pickersConfig ={
//   "showDatePickerIcon": false,
//   "showDateRangePickerIcon": false,
//   "showClockPickerIcon": false,
//   "showTaskMenuPickerIcon": true,
//   "showradioOptionMenuPickerIcon": false
// };
// findlyConfig.viaSocket = true;
// findlyConfig.isDev = true;
// findlyConfig.searchInterfaceConfig = {"_id":"fsin-de74ac00-0a66-5e69-aa6f-315213da42fa","experienceConfig":{"searchBarPosition":"bottom"},"widgetConfig":{"searchBarFillColor":"#FFFFFF","searchBarBorderColor":"#E4E5E7","searchBarPlaceholderText":"Search","searchBarPlaceholderTextColor":"#BDC1C6","searchButtonEnabled":false,"buttonText":"Button","buttonTextColor":"#BDC1C6","buttonFillColor":"#EFF0F1","buttonBorderColor":"#EFF0F1","userSelectedColors":[],"buttonPlacementPosition":"inside","searchBarIcon":"https://searchassist-qa.kore.ai:443/searchassistapi/getMediaStream/findly/f-84055fd3-fa7b-5f3c-80b8-060ce0b85dbd.png?n=2675452435&s=InFOanAwSC9GRHEva0pxb055Y3Y1ZUtBSXljdjRpWjZneU1tYkEyZmw0cVU9Ig$$"},"interactionsConfig":{"welcomeMsg":"Hi, How can I help you","welcomeMsgColor":"#000080","showSearchesEnabled":false,"showSearches":"frequent","autocompleteOpt":true,"feedbackExperience":{"queryLevel":false,"lmod":"2023-01-30T11:01:30.831Z"},"querySuggestionsLimit":3,"liveSearchResultsLimit":0,"defaultStatus":"searchBar","welcomeMsgFillColor":"#EFF0F1"},"streamId":"st-aec7ef8c-c05c-5111-8658-9ed903e2ec34","searchIndexId":"sidx-5e988156-845c-529a-8ad4-d01a86d50cdc","indexPipelineId":"fip-847103c9-9cee-5fda-84ef-48ea2529ca2c","createdBy":"u-4e0c8e48-0126-51bb-bb74-ad7bd6d9b53c","lModifiedBy":"u-4e0c8e48-0126-51bb-bb74-ad7bd6d9b53c","createdOn":"2022-08-05T17:07:05.805Z","lModifiedOn":"2023-02-07T10:18:29.260Z","__v":0,"queryPipelineId":"fqp-9b63ffd3-3ed6-59e7-95ca-05af11fdd906","config":{"botActionTemplate":"carousel","botActionResultsExperience":"top"}}
findlyConfig.API_KEY_CONFIG.KEY="aa80ee12ba15434b835344264c233ddf5f7f7da5b4a644c5a03be95257b7ebd0std4";       
var fSdk = new KRSearch(findlyConfig);
           
            // fSdk.initializeTopDown(findlyConfig,'top-down-search-background-div',searchConfig)
//window.fsdk = fSdk;
fSdk.show(findlyConfig);

// $(".openSearchSDK").click(function () {
//   fsdk.initKoreSDK();
// });
