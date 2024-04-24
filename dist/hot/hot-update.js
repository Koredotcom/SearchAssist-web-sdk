self["webpackHotUpdatesearch_assist_web_sdk"]("esm",{

/***/ "./src/components/search/config/findly-config.ts":
/*!*******************************************************!*\
  !*** ./src/components/search/config/findly-config.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _a;
var findlyConfig = {};
var botOptionsFindly = {};
botOptionsFindly.logLevel = "debug";
var serverUrl = window.location.href;
var paramUrl = "searchassist.kore.ai";
var httpStart = 'https://';
var wssUrl = "wss";
if (serverUrl && (serverUrl.includes("https://") || serverUrl.includes("http://"))) {
    paramUrl = serverUrl.split('/')[2];
    if (serverUrl.includes("https://")) {
        httpStart = "https://";
        wssUrl = "wss";
    }
    else {
        httpStart = "http://";
        wssUrl = "ws";
    }
}
if ((window === null || window === void 0 ? void 0 : window.JWT_OBJ) && ((_a = window === null || window === void 0 ? void 0 : window.JWT_OBJ) === null || _a === void 0 ? void 0 : _a.koreAPIUrl)) {
    paramUrl = window.JWT_OBJ.koreAPIUrl.split("/")[2].split(':')[0];
    if (window.JWT_OBJ.koreAPIUrl.includes("https://")) {
        httpStart = "https://";
        wssUrl = "wss";
    }
    else {
        httpStart = "http://";
        wssUrl = "ws";
    }
}
botOptionsFindly.logLevel = 'debug';
botOptionsFindly.koreAPIUrl = "https://" + paramUrl + "/searchassistapi/";
botOptionsFindly.baseAPIServer = "https://" + paramUrl;
function koreGenerateUUID() {
    console.info("generating UUID");
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + generateRandomNum() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
function generateRandomNum() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var seconds = dateObj.getSeconds();
    var minutes = dateObj.getMinutes();
    var hour = dateObj.getHours();
    var generatedNum = year * month * day * (hour + minutes * seconds);
    return generatedNum;
}
botOptionsFindly.JWTUrl =
    "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptionsFindly.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID'; // Provide users email id here
botOptionsFindly.botInfo = {
    chatBot: "PLEASE_ENTER_APP_NAME",
    taskBotId: "PLEASE_ENTER_APP_ID",
};
botOptionsFindly.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptionsFindly.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
botOptionsFindly.searchIndexID = "PLEASE_ENTER_SEARCHINDEX_ID";
// To modify the web socket url use the following option
// For Socket Connection
botOptionsFindly.reWriteSocketURL = {
    protocol: wssUrl,
    hostname: paramUrl
};
var favicon = document.getElementById("favicon");
botOptionsFindly.interface = "top-down";
findlyConfig = {
    botOptions: botOptionsFindly,
    viaSocket: true,
    pickersConfig: {
        showDatePickerIcon: false,
        showDateRangePickerIcon: false,
        showClockPickerIcon: false,
        showTaskMenuPickerIcon: true,
        showradioOptionMenuPickerIcon: false, //set true to show Radio Option Template icon
    },
    API_KEY_CONFIG: { 'KEY': "YOUR_API_KEY" }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findlyConfig);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f49b61965b56587d55a6")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map