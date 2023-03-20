# SearchAssist SDK
The SearchAssist web SDK is a tool for developers to add the capabilities of the SearchAssist application to their web applications. It is a client-side library that makes it easy for third-party web applications to access and use the features of SearchAssist..

With just few lines of code, you can embed our SearchAssist SDK into your applications to enable end-users to interact with your applications using Natural Language. For more information, refer to

[SearchAssist SDK](https://docs.kore.ai/searchassist/administration/web-sdk-integration/)


## 💡 Getting Started

First, install searchassist SDK via the [npm](https://www.npmjs.com/get-npm) package manager:

```bash
npm install --save git+ssh://github.com/Koredotcom/SearchAssist-web-sdk#1.0.0
```

Get KRSearch and KRSearchConfig

```js
import { KRSearch, KRSearchConfig } from 'kore-web-sdk';

```
Configure KRSearchConfig



```js

let botOptions=KRSearchConfig.botOptions;
	
 botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
 botOptions.botInfo = { chatBot: "PLEASE_ENTER_APP_NAME", "taskBotId": "PLEASE_ENTER_APP_ID" }; // APP name is case sensitive
 botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
 botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
botOptionsFindly.searchIndexID = "PLEASE_ENTER_SEARCHINDEX_ID";

 /* 
 Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
 Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
 https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
 **/

```


Create searchassist chat window instance and trigger show method
```js

KRSearchConfig.API_KEY_CONFIG.KEY="PLEASE_ENTER_API_KEY_HERE";
var KRSearchInstance = new KRSearch(KRSearchConfig);
KRSearchInstance.show(KRSearchConfig);

```

## 💡 Custom Templates

In addition to the kore message templates, new custom templates can be intstalled into kore chat window with *installTemplate* method

```bash
class customTemplateComponent{
  renderMessage(msgData){
      if(msgData?.message[0]?.component?.payload?.template_type==='custom_stock_template'){
          return '<h2>My Template HTML</h2>';      
      }else{
          return false;
      }
  } 
}

KRSearchInstance.templateManager.installTemplate(new customTemplateComponent());
```
Other framework UI components like angular and react can also be injected with this

## 💡 Plugins

Kore's chatwindow functionlity can be extended with the help of plugins.Newly created plugins can be installed with *installPlugin* method

```bash
class KoreCustomPlugin{
  
}

KRSearchInstance.installPlugin(new KoreCustomPlugin());
```
Kore offered plugins are listed [here](./docs/plugins)


