import helpers from '../../../utils/helpers';
import './feedBackFormTemplate.scss';

class FeedBackFormTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if(msgData?.message?.[0]?.component?.payload?.template_type === "feedbackFormTemplate"){
          me.messageHtml = $(FeedBackFormTemplate.prototype.getTemplateString()).tmpl({
            'feedbackData': msgData?.message?.[0]?.component?.payload?.query,
            'feedBackType':msgData?.message?.[0]?.component?.payload?.feedBackType,
            'helpers': helpersObj.helpers,
             langTranslator: msgData.message[0].component.payload.langTranslator
        });
        setTimeout(()=>{
          FeedBackFormTemplate.prototype.bindFeedbackEvents(me,me.messageHtml,msgData.message[0].component.payload);
        },500)
            return me.messageHtml;
          }
    }
    getTemplateString() {
      var feedBackFormTemplate  = '<script type="text/x-jqury-tmpl">\
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
    }

    bindFeedbackEvents(me:any,messageHtml:any,payload:any){
      let hostWindowInstance = me.hostInstance;
      let $ = me.hostInstance.$;
      $(messageHtml).off('click', '.close-feedback').on('click', '.close-feedback', function (event:any) {
        event.stopPropagation();
        $(messageHtml).parent().empty();
        hostWindowInstance.updateFeedBackResult('thumbsDown', payload?.query,payload?.feedBackType)

      });
      $(messageHtml).off('click', '.temp-feed-back-ans-tag-btn').on('click', '.temp-feed-back-ans-tag-btn', function (event:any) {
        event.stopPropagation();
        $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').removeClass('active');
        $(event.currentTarget).addClass('active');
      });
      $(messageHtml).off('click', '.submit-feedback').on('click', '.submit-feedback', function (event:any) {
        var feedbackInputText = $(messageHtml).find('#feedback-input-text').val() ||'';
        var feedbackButton = $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').attr('value') || '';
        event.stopPropagation();
          hostWindowInstance.updateFeedBackResult('thumbsDown', payload?.query,payload?.feedBackType,feedbackButton,feedbackInputText)
          $('#snippet-feedback-template').empty();
          $('#query-feedback').empty()
      });
    }
}

export default FeedBackFormTemplate;
