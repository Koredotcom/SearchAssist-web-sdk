let findlyConfig:any = {};
interface JWT_OBJ {
  koreAPIUrl: string;
}

declare global {
  interface Window {
      JWT_OBJ: JWT_OBJ;
  }
}
let botOptionsFindly: any = {};
botOptionsFindly.logLevel = "debug";
var serverUrl = window.location.href;
var paramUrl="searchassist.kore.ai";
var httpStart = 'https://';
var wssUrl = "wss";
// if(serverUrl && (serverUrl.includes("https://") || serverUrl.includes("http://"))){
// paramUrl=serverUrl.split('/')[2];
// if(serverUrl.includes("https://")){
// httpStart = "https://";
// wssUrl = "wss";
// }else{
// httpStart = "http://";
// wssUrl = "ws";
// }
// }  
if(window?.JWT_OBJ && window?.JWT_OBJ?.koreAPIUrl){
  paramUrl=window.JWT_OBJ.koreAPIUrl.split("/")[2].split(':')[0];
    if(window.JWT_OBJ.koreAPIUrl.includes("https://")){
      httpStart = "https://";
      wssUrl = "wss";
    }else{
      httpStart = "http://";
      wssUrl = "ws";
    }
}
botOptionsFindly.logLevel = 'debug';
botOptionsFindly.koreAPIUrl = "https://"+paramUrl+"/searchassistapi/";
botOptionsFindly.baseAPIServer = "https://"+paramUrl;
function koreGenerateUUID() {
  console.info("generating UUID");
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + generateRandomNum() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
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
botOptionsFindly.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID' // Provide users email id here
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
  protocol:  wssUrl,
  hostname:paramUrl
};

let favicon: any = document.getElementById("favicon");
 
botOptionsFindly.interface = "top-down";
findlyConfig = {
  botOptions: botOptionsFindly,
  viaSocket: true,
  pickersConfig: {
    showDatePickerIcon: false, //set true to show datePicker icon
    showDateRangePickerIcon: false, //set true to show dateRangePicker icon
    showClockPickerIcon: false, //set true to show clockPicker icon
    showTaskMenuPickerIcon: true, //set true to show TaskMenu Template icon
    showradioOptionMenuPickerIcon: false, //set true to show Radio Option Template icon
  },
  API_KEY_CONFIG:{'KEY':"b86d5ef947a04d1a833321fe8ded4a612a8d8eed27a549929bc64978c7fb72e8st1d"}
};

export default findlyConfig;
