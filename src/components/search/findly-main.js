(function ($) {

    $(document).ready(function () {
        function getJWT(options, callback) {
            var jsonData = {
                "clientId": options.clientId,
                "clientSecret": options.clientSecret,
                "identity": options.userIdentity,
                "aud": "",
                "isAnonymous": false
            };
            return $.ajax({
                url: options.JWTUrl,
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (data) {
                    options.assertion = data.jwt;
                        fsdk.initSearchAssistSDK(findlyConfig);
                    if (callback) {
                        callback(null, options);
                    }
                },
                error: function (err) {
                }
            });
        }

//Get Assertion Token api call//
function getAssertionToken(options, callback) {
    var apiKey='';
    if (options.apiKey) {
        apiKey = options.apiKey;
    } else {
        apiKey = window.location.href.split('/')[window.location.href.split('/').length - 1];
    }
    var jsonData = {};
    return $.ajax({
        url: options.koreAPIUrl+'websdk/'+apiKey,
        type: 'post',
        data: jsonData,
        dataType: 'json',
        success: function (data) {
            findlyConfig.botOptions.botInfo={
                chatBot:data.botInfo.name,
                "taskBotId":data.botInfo._id
            };
            findlyConfig.botOptions.searchIndexID = data.botInfo.searchIndexID;

            options.assertion = data.jwt;
            fsdk.initSearchAssistSDK(findlyConfig);
            if (callback) {
                callback(null, options);
            }
        },
        error: function (err) {
        }
    });
}


        var findlyConfig = window.KoreSDK.findlyConfig;
        // findlyConfig.botOptions.assertionFn = getJWT;
        findlyConfig.botOptions.assertionFn = getAssertionToken;

        var fSdk = new FindlySDK(findlyConfig);
        window.fsdk = fSdk;
        // fsdk.initKoreSDK();
       
        $('.openSearchSDK').click(function () {
            fsdk.show(apiKey);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));