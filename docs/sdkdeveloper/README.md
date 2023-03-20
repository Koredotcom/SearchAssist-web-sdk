## 💡 Getting Started

Clone the repo and install dependencies

```bash
git clone REPO_URL
npm install
```

Configure bot details in examples/esm/search/js/index_search.js

```js
    botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
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

Run

```bash
npm run serve
```

Open chat -modern(ESM) example

```bash
http://localhost:9000/examples/esm/search/
```



## 💡 Build

```bash
npm run build (default)
npm run build-umd (for umd build)
```

## 💡 ESLint

```bash
npm run eslint
npm run eslint-fix

npm run prettier
npm run prettier-fix
npm run prettier-v (verbose for detailed errors) 

```

