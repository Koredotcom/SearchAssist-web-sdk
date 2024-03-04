self["webpackHotUpdatesearch_assist_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts":
/*!************************************************************************************!*\
  !*** ./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _feedBackFormTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feedBackFormTemplate.scss */ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.scss");


var FeedBackFormTemplate = /** @class */ (function () {
    function FeedBackFormTemplate() {
    }
    FeedBackFormTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "feedbackFormTemplate") {
            me.messageHtml = $(FeedBackFormTemplate.prototype.getTemplateString()).tmpl({
                'feedbackData': (_h = (_g = (_f = (_e = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.component) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.query,
                'feedBackType': (_m = (_l = (_k = (_j = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.feedBackType,
                'helpers': helpersObj.helpers,
                langTranslator: msgData.message[0].component.payload.langTranslator
            });
            setTimeout(function () {
                FeedBackFormTemplate.prototype.bindFeedbackEvents(me, me.messageHtml, msgData.message[0].component.payload);
            }, 500);
            return me.messageHtml;
        }
    };
    FeedBackFormTemplate.prototype.getTemplateString = function () {
        var feedBackFormTemplate = '<script type="text/x-jqury-tmpl">\
      <div class="snippet-bg-blur"></div>\
      <div class="temp-feed-back-form">\
      <div class="temp-feed-back-header-block">\
          <div class="temp-feed-back-header">\
              <div class="temp-feed-back-header-samll"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_feedback_for">{{html langTranslator("sa_sdk_feedback_for")}}</span></div>\
              <div class="temp-feed-back-header-large" title="${feedbackData}">“${feedbackData}”</div>\
          </div>\
          <div class="close-feedback"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/feedback-close.png"/></div>\
          <div class="temp-right-indicator-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/feedback-right-pointer.png"/></div>\
      </div>\
      <div class="temp-break-line"></div>\
      <div class="temp-feed-back-qns"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_what_seems_to_be_the_issue">{{html langTranslator("sa_sdk_what_seems_to_be_the_issue")}}</span></div>\
      <div class="temp-feed-back-ans-tags">\
          <button class="temp-feed-back-ans-tag-btn" value="incorrect"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_incorrect">{{html langTranslator("sa_sdk_incorrect")}}</span></button>\
          <button class="temp-feed-back-ans-tag-btn" value="outdated"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_outdated">{{html langTranslator("sa_sdk_outdated")}}</span></button>\
          <button class="temp-feed-back-ans-tag-btn" value="few_results"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_few_results">{{html langTranslator("sa_sdk_few_results")}}</span></button>\
          <button class="temp-feed-back-ans-tag-btn" value="other"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_other">{{html langTranslator("sa_sdk_other")}}</span></button>\
      </div>\
      <div class="temp-feed-back-opt-qns"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_please_help_with_more_details">{{html langTranslator("sa_sdk_please_help_with_more_details")}}</span></div>\
      <div class="temp-feed-back-opt-ans">\
      <textarea id="feedback-input-text" class="feed-back-placeholder-i18" placeholder="{{html langTranslator("sa_sdk_start_typing_here")}}"></textarea>\
      </div>\
      <div class="temp-feed-back-footer-block">\
          <button class="temp-feed-back-footer-btn-secondary close-feedback"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_close">{{html langTranslator("sa_sdk_close")}}</span></button>\
          <button class="temp-feed-back-footer-btn-primary submit-feedback"><span class="sdk-i18n-lang"  sdk-i18n-key="sa_sdk_submit">{{html langTranslator("sa_sdk_submit")}}</span></button>\
      </div>\
  </div>\
      </script>';
        return feedBackFormTemplate;
    };
    FeedBackFormTemplate.prototype.bindFeedbackEvents = function (me, messageHtml, payload) {
        var hostWindowInstance = me.hostInstance;
        var $ = me.hostInstance.$;
        $(messageHtml).off('click', '.close-feedback').on('click', '.close-feedback', function (event) {
            event.stopPropagation();
            $(messageHtml).parent().empty();
            hostWindowInstance.updateFeedBackResult('thumbsDown', payload === null || payload === void 0 ? void 0 : payload.query, payload === null || payload === void 0 ? void 0 : payload.feedBackType);
        });
        $(messageHtml).off('click', '.temp-feed-back-ans-tag-btn').on('click', '.temp-feed-back-ans-tag-btn', function (event) {
            event.stopPropagation();
            $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        $(messageHtml).off('click', '.submit-feedback').on('click', '.submit-feedback', function (event) {
            var feedbackInputText = $(messageHtml).find('#feedback-input-text').val() || '';
            var feedbackButton = $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').attr('value') || '';
            event.stopPropagation();
            hostWindowInstance.updateFeedBackResult('thumbsDown', payload === null || payload === void 0 ? void 0 : payload.query, payload === null || payload === void 0 ? void 0 : payload.feedBackType, feedbackButton, feedbackInputText);
            $('#snippet-feedback-template').empty();
            $('#query-feedback').empty();
        });
    };
    return FeedBackFormTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedBackFormTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b9adb9892a74344907f2")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map