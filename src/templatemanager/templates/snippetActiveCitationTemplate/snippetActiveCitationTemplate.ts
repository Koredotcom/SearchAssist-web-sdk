
import helpers from '../../../utils/helpers';
import './snippetActiveCitationTemplate.scss';
import FeedBackFormTemplate from '../../templates/feedBackFormTemplate/feedBackFormTemplate';
class SnippetActiveCitationTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "active_citation_snippet") {
            me.messageHtml = $(SnippetActiveCitationTemplate.prototype.getTemplateString()).tmpl({
                'snippetData': msgData?.message?.[0]?.component?.payload?.snippetData,
                'helpers': helpersObj.helpers,
                'displayFeedback':msgData?.message?.[0]?.component?.payload?.feedbackDisplay,
                langTranslator:msgData?.message?.[0]?.component?.payload?.langTranslator
            });
            me.feedBackTemplateObj = new FeedBackFormTemplate();
            setTimeout(()=>{
              SnippetActiveCitationTemplate.prototype.bindSnippetEvents(me, me.messageHtml,msgData?.message?.[0]?.component?.payload?.snippetData);
            },500)
            return me.messageHtml;
        }
    }
    getTemplateString() {
        var snipppetActiveCitationTemplate  = '<script type="text/x-jqury-tmpl">\
        <div class="search-temp-one active-citation-snippet">\
        <div class="top-header">\
          <!--<div class="top-header-with-img">\
              <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
              <div class="btn-chip sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</div>\
              </div>-->\
              {{if snippetData && snippetData.snippet_type === "generative_model"}}\
          <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
          {{/if}}\
      </div>\
        {{if snippetData && snippetData.title}}\
        <div class="img-temp-title sa-sdk-title" data-title="{{html helpers.convertMDtoHTML(snippetData?.title)}}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
        {{/if}}\
        <div class="citation-data-desc {{if snippetData.title==""}}snippet_padding_top_0{{/if}}">\
        {{each(key, data) snippetData.answer}}\
        <span class="snippet-answer-fragment-block fragment-hover-event {{each(itemKey, item) data.sources}} fragment-${item._id} {{/each}}"\
          fragment="{{each(itemKey, item) data.sources}} .fragment-${item._id}, {{/each}}"><span class="sub-fragment"><span class="snippet-answer-fragment">{{html data.answer_fragment}}</span>{{each(sourceKey, source) data.sources}}<span class="snippet-citation"><a class="{{if !source.url}}pointer-events-none {{/if}}" href="${source.url}" target="_blank"><span class="reference-no">${source._id}</span></a></span>{{/each}}</span></span></span>\
        {{/each}}\
        </div>\
        <div class="active-snippet-referene-block">\
          <div class="active-reference-block-header">Sources </div>\
          <div class="active-reference-list-temp-block">\
                  {{each(key, item) snippetData.reference}}\
                      <div class="active-reference-list-temp fragment-hover-event fragment-${key+1}"  title="{{html item.title}}" fragment=".fragment-${key+1},"><a class="{{if !item.url}}pointer-events-none {{/if}}" href="${item.url}" target="_blank"><span class="reference-no">${key+1}</span><span class="reference-title">{{html helpers.convertMDtoHTML(item.title)}}</span></a></div>\
                      {{/each}}\
                  </div>\
        </div>\
        {{if snippetData && snippetData.source}}\
        <div class="snippet-source-block">\
          <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
          <a class="{{if !snippetData.page_url}}pointer-events-none {{/if}}" href="${snippetData?.page_url}" target="_blank" ><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
        </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type !== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
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
        return snipppetActiveCitationTemplate;
    }
    bindSnippetEvents(me:any,messageHtml:any,snippetData:any){
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
          SnippetActiveCitationTemplate.prototype.appendFeedBaackData(me,messageHtml,snippetData)
        $(messageHtml).find('.snippet-feedback').removeClass('active');
        $(event.currentTarget).addClass('active');
      }
      });
        SnippetActiveCitationTemplate.prototype.tooltipBindEvent(me,messageHtml);
        SnippetActiveCitationTemplate.prototype.bindFragmentHoverEvent(me,messageHtml);
      }
      bindFragmentHoverEvent(me:any,messageHtml:any){
        let $ = me.hostInstance.$;
        $(messageHtml).off('mouseover', '.fragment-hover-event').on('mouseover', '.fragment-hover-event', function (event:any) {
          let fragmentClasses= $(event.currentTarget).attr('fragment').split(',').slice(0, -1);
          fragmentClasses.forEach((itemClass:any)=>{
            if($(event.currentTarget).hasClass('snippet-answer-fragment-block')){
              $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find('.active-snippet-referene-block').find(itemClass).addClass('active');
            }else{
              $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find(itemClass).addClass('active');
            }
          })
        });
        $(messageHtml).off('mouseout', '.fragment-hover-event').on('mouseout', '.fragment-hover-event', function (event:any) {
          let fragmentClasses= $(event.currentTarget).attr('fragment').split(',').slice(0, -1);
          fragmentClasses.forEach((itemClass:any)=>{
            $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find(itemClass).removeClass('active');
          })
        });
      }
      tooltipBindEvent(me:any,messageHtml:any){
        let $ = me.hostInstance.$;
      $(messageHtml).find('.sa-sdk-title').off('mouseover').on('mouseover',function(e:any){
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.currentTarget).before('<div class="sdk-tooltip-container">'+$(e.currentTarget).attr('data-title')+'<span class="sa-tooltip-arrow"></span></div>');
        $(e.currentTarget).parent().find('.sdk-tooltip-container').css('top',($(e.currentTarget).position().top-($(e.currentTarget).parent().find('.sdk-tooltip-container').height()+25))+'px');
      })
      $(messageHtml).find('.sa-sdk-title').off('mouseout').on('mouseout',function(e:any){
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.currentTarget).parent().find('.sdk-tooltip-container').remove();
        })
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
                feedBackType:{type:'smartAnswer',snippet_data:snippetData?.snippet_feedback_data}
              }
            }
          }]
        };
          $(messageHtml).find('#snippet-feedback-template').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
       }
}


export default SnippetActiveCitationTemplate;