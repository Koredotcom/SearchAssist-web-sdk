
import helpers from '../../../utils/helpers';
import './snippetListTemplate.scss';
import FeedBackFormTemplate from '../../templates/feedBackFormTemplate/feedBackFormTemplate';
class SnippetListTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "list_element_snippet" || msgData?.message?.[0]?.component?.payload?.template_type === "headings_snippet") {
            me.messageHtml = $(SnippetListTemplate.prototype.getTemplateString()).tmpl({
                'snippetData': msgData?.message?.[0]?.component?.payload?.snippetData,
                'helpers': helpersObj.helpers,
                'displayFeedback':msgData?.message?.[0]?.component?.payload?.feedbackDisplay
            });
            me.feedBackTemplateObj = new FeedBackFormTemplate();
            setTimeout(()=>{
              SnippetListTemplate.prototype.bindSnippetEvents(me,me.messageHtml,msgData?.message?.[0]?.component?.payload?.snippetData,msgData);
            },500)
            return me.messageHtml;
        }
    }
    getTemplateString() {
        var snippetListTemplate = '<script type="text/x-jqury-tmpl">\
        <div class="search-temp-one list-snippet-temp">\
        <div class="top-header">\
          <!--<div class="top-header-with-img">\
              <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
              <div class="btn-chip sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</div>\
              </div>-->\
              {{if snippetData && snippetData.snippet_type === "generative_model"}}\
          <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
          {{/if}}\
      </div>\
        <div class="list-temp-block">\
            <div class="list-temp-header sa-sdk-title" data-title="${snippetData?.title}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
                <ol type="1" class="list-temp-ul">\
                {{each(key, answer) snippetData.answer}}\
                    <li class="list-temp-li">{{html answer}}</li>\
                    {{/each}}\
                </ol>\
                {{if snippetData.answer.length > 4}}\
                <span class="desc-read-more display-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Read more</span> <span class="desc-read-less  display-none"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Show Less</span>\
                {{/if}}\
        </div>\
        {{if snippetData && snippetData.source}}\
          <div class="snippet-source-block">\
            <div class="snippet-source-file-name sa-sdk-title  {{if !snippetData.source}} display-none {{/if}}" data-title="${snippetData?.source}">{{html snippetData?.source}}</div>\
            <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none {{/if}}"><span class="snippet-source-url-name">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/> </div></a>\
          </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type !== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
                {{if displayFeedback}}\
                <div class="temp-right">\
                <div class="is-it-usefull sdk-i18n-lang"  sdk-i18n-key="sa_sdk_is_useful">{{html langTranslator("sa_sdk_is_useful")}}</div>\                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img  class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
                <div id="snippet-feedback-template"></div>\
                {{/if}}\
            </div>\
        </div>\
    </div>\
          </script>';
        return snippetListTemplate;
    }
    bindSnippetEvents(me:any,messageHtml:any, snippetData:any,msgData:any){
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
        SnippetListTemplate.prototype.appendFeedBaackData(me,messageHtml,snippetData,msgData)
        $(messageHtml).find('.snippet-feedback').removeClass('active');
        $(event.currentTarget).addClass('active');
      }
      });
         if(messageHtml &&  $(messageHtml).find('.list-temp-ul').length){
          $(messageHtml).off('click', '.desc-read-more').on('click', '.desc-read-more', function (event:any) {
            $(messageHtml).find('.list-temp-ul').addClass('show-all-list');
            $(messageHtml).find('.desc-read-more').removeClass('display-block').addClass('display-none');
            $(messageHtml).find('.desc-read-less').removeClass('display-none').addClass('display-block');
          });
          $(messageHtml).off('click', '.desc-read-less').on('click', '.desc-read-less', function (event:any) {
            $(messageHtml).find('.list-temp-ul').removeClass('show-all-list');
            $(messageHtml).find('.desc-read-less').removeClass('display-block').addClass('display-none');
            $(messageHtml).find('.desc-read-more').removeClass('display-none').addClass('display-block');
          });
        }
        SnippetListTemplate.prototype.tooltipBindEvent(me);
      }

      
    appendFeedBaackData(me: any, messageHtml: any,snippetData:any,msgData:any){
      let $ = me.hostInstance.$;
      let feedbackMsgData = {
      message: [{
        component: {
          type: 'template',
          payload: {
            template_type: "feedbackFormTemplate",
            query: snippetData.searchQuery,
            feedBackType:'smartAnswer',
            langTranslator:msgData?.message?.[0]?.component?.payload?.langTranslator
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

export default SnippetListTemplate;