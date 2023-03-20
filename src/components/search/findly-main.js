(function ($) {

    $(document).ready(function () {

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
        findlyConfig.botOptions.assertionFn = getAssertionToken;

        var fSdk = new FindlySDK(findlyConfig);
        window.fsdk = fSdk;
       
        $('.openSearchSDK').click(function () {
            fsdk.show(apiKey);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));