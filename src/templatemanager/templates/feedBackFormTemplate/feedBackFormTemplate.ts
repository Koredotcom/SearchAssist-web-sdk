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
            'helpers': helpersObj.helpers
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
              <div class="temp-feed-back-header-samll">Feedback for</div>\
              <div class="temp-feed-back-header-large" title="${feedbackData}">“${feedbackData}”</div>\
          </div>\
          <div class="close-feedback"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/feedback-close.png"/></div>\
          <div class="temp-right-indicator-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/feedback-right-pointer.png"/></div>\
      </div>\
      <div class="temp-break-line"></div>\
      <div class="temp-feed-back-qns">What seems to be the issue?</div>\
      <div class="temp-feed-back-ans-tags">\
          <button class="temp-feed-back-ans-tag-btn" value="incorrect">Incorrect</button>\
          <button class="temp-feed-back-ans-tag-btn" value="outdated">Outdated</button>\
          <button class="temp-feed-back-ans-tag-btn" value="few_results">Few Results</button>\
          <button class="temp-feed-back-ans-tag-btn" value="other">Other</button>\
      </div>\
      <div class="temp-feed-back-opt-qns">Please help us with more details (Optional)</div>\
      <div class="temp-feed-back-opt-ans">\
          <textarea id="feedback-input-text" placeholder="Start typing here..."></textarea>\
      </div>\
      <div class="temp-feed-back-footer-block">\
          <button class="temp-feed-back-footer-btn-secondary close-feedback">Close</button>\
          <button class="temp-feed-back-footer-btn-primary submit-feedback">Submit</button>\
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
