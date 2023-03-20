
import helpers from '../../../utils/helpers';
import './snippetParagraphTemplate.scss';
import FeedBackFormTemplate from '../../templates/feedBackFormTemplate/feedBackFormTemplate';
class SnippetParagraphTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "paragraph_snippet" || msgData?.message?.[0]?.component?.payload?.template_type === "answer_snippet") {
            me.messageHtml = $(SnippetParagraphTemplate.prototype.getTemplateString()).tmpl({
                'snippetData': msgData?.message?.[0]?.component?.payload?.snippetData,
                'helpers': helpersObj.helpers,
                'displayFeedback':msgData?.message?.[0]?.component?.payload?.feedbackDisplay
            });
            me.feedBackTemplateObj = new FeedBackFormTemplate();
            setTimeout(()=>{
              SnippetParagraphTemplate.prototype.bindSnippetEvents(me, me.messageHtml,msgData?.message?.[0]?.component?.payload?.snippetData);
            },500)
            return me.messageHtml;
        }
    }
    getTemplateString() {
        var snipppetParagaraphTemplate  = '<script type="text/x-jqury-tmpl">\
      <div class="search-temp-one">\
      <div class="top-header">\
          <div class="top-header-with-img">\
              <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
              <div class="btn-chip">SUGGESTED ANSWER</div>\
          </div>\
          {{if snippetData && snippetData.source === "Answered by AI"}}\
          <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
          {{/if}}\
      </div>\
      {{if snippetData && snippetData.title}}<div class="paragraph-temp-header sa-sdk-title" data-title="${snippetData?.title}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>{{/if}}\
      <div class="temp-data-desc">\
      {{html snippetData?.answer}}\
      </div>\
      <div class="temp-read-link">\
      <span class="desc-read-more">Read more</span> <span class="desc-read-less">Show Less</span>\
      </div>\
      {{if snippetData && snippetData.source !== "Answered by AI"}}\
      <div class="snippet-source-block">\
        <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
        <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name sa-sdk-title" data-title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
      </div>\
      {{/if}}\
      <div class="temp-footer-block">\
          <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
              {{if snippetData && snippetData.source === "Answered by AI"}}\
              <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
              {{/if}}\
              {{if displayFeedback}}\
              <div class="temp-right">\
                  <div class="is-it-usefull">Is it useful?</div>\
                  <div class="temp-fotter-actions">\
                      <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                      <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                  </div>\
              </div>\
              <div id="snippet-feedback-template"></div>\
              {{/if}}\
          </div>\
      </div>\
  </div>\
      </script>';
        return snipppetParagaraphTemplate;
    }
    bindSnippetEvents(me:any,messageHtml:any, snippetData:any){
      let $ = me.hostInstance.$;
      let hostInstance= me.hostInstance;
          $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-like-img').on('click', '.snippet-like-img', function (event:any) {
            if(!$(event.currentTarget).closest('.snippet-like-img').hasClass('active')){
            hostInstance.updateFeedBackResult('thumbsUp',snippetData.searchQuery,'smartAnswer')
            $(messageHtml).find('.snippet-feedback').removeClass('active');
            $(event.currentTarget).addClass('active');
          }
          });

          $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-dislike-img').on('click', '.snippet-dislike-img', function (event:any) {
            if(!$(event.currentTarget).closest('.snippet-dislike-img').hasClass('active')){
            SnippetParagraphTemplate.prototype.appendFeedBaackData(me,messageHtml,snippetData)
            $(messageHtml).find('.snippet-feedback').removeClass('active');
            $(event.currentTarget).addClass('active');
          }
          });
        if(messageHtml &&  $(messageHtml).find('.temp-data-desc').length){
          setTimeout(()=>{
            if($(messageHtml).find('.temp-data-desc').length && $(messageHtml).find('.temp-data-desc')[0].scrollHeight>160){
              $(messageHtml).find('.desc-read-more').show();
              $(messageHtml).find('.desc-read-less').hide();
            }else{
              $(messageHtml).find('.desc-read-more').hide();
              $(messageHtml).find('.desc-read-less').hide();
            }
            $(messageHtml).off('click', '.desc-read-more').on('click', '.desc-read-more', function (event:any) {
              $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp','initial');
              $(event.currentTarget).hide();
              $(event.currentTarget).parent().find('.desc-read-less').show();
            });
            $(messageHtml).off('click', '.desc-read-less').on('click', '.desc-read-less', function (event:any) {
              $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp','8');
              $(event.currentTarget).parent().find('.desc-read-more').show();
              $(event.currentTarget).hide();
            });
          },300)
        }
        SnippetParagraphTemplate.prototype.tooltipBindEvent(me);
    }

    appendFeedBaackData(me: any, messageHtml: any,snippetData:any){
      let $ = me.hostInstance.$;
      let feedbackMsgData = {
        message: [{
          component: {
            type: 'template',
            payload: {
              template_type: "feedbackFormTemplate",
              query: snippetData.searchQuery,
              feedBackType:'smartAnswer'
            }
          }
        }]
      };
        $(messageHtml).find('#snippet-feedback-template').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
     } 
     tooltipBindEvent(me:any){
      let $ = me.hostInstance.$;
    $('.sa-sdk-title').off('mouseover').on('mouseover',function(e:any){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $(e.currentTarget).before('<div class="sdk-tooltip-container">'+$(e.currentTarget).attr('data-title')+'<span class="sa-tooltip-arrow"></span></div>');
      $(e.currentTarget).parent().find('.sdk-tooltip-container').css('top',($(e.currentTarget).position().top-($(e.currentTarget).parent().find('.sdk-tooltip-container').height()+25))+'px');
    })
    $('.sa-sdk-title').off('mouseout').on('mouseout',function(e:any){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $(e.currentTarget).parent().find('.sdk-tooltip-container').remove();
      })
    }
}


export default SnippetParagraphTemplate;