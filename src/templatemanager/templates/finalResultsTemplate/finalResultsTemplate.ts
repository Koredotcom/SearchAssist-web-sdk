import helpers from '../../../utils/helpers';
import './finalResultsTemplate.scss';
import customTemplate from '../../templateManager';
import searchListViewTemplate from '../../templates/searchListViewTemplate/searchListViewTemplate';
import searchGridViewTemplate from '../../templates/searchGridViewTemplate/searchGridViewTemplate';
import searchCarouselViewTemplate from '../../templates/searchCarouselViewTemplate/searchCarouselViewTemplate';
import FullSearchResultsTemplate from '../../templates/fullsearchResultsTemplate/fullsearchResultsTemplate';
import FeedBackFormTemplate from '../../templates/feedBackFormTemplate/feedBackFormTemplate';
import korejquery from "../../../libs/korejquery";
const $ = korejquery;

class FinalResultsTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers?.helpers;
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'finalResultsTemplate') {
      if (msgData?.message[0].component?.payload?.helpers) {
        me.helpersObj = msgData.message[0].component.payload.helpers
      }
      if (msgData?.message[0].component?.payload?.langTranslator) {
        me.langTranslator = msgData.message[0].component.payload.langTranslator
      }
      else {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      me.messageResultHtml = $(FinalResultsTemplate.prototype.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
      me.customTemplateObj = new customTemplate(me);
      me.listTemplateObj = new searchListViewTemplate();
      me.gridTemplateObj = new searchGridViewTemplate();
      me.carouselTemplateObj = new searchCarouselViewTemplate();
      me.fullSearchTemplateObj = new FullSearchResultsTemplate();
      me.feedBackTemplateObj = new FeedBackFormTemplate();
      FinalResultsTemplate.prototype.bindEvents(me, me.messageResultHtml, msgData);
      return me.messageResultHtml;
    }
  }
  bindEvents(me: any, messageHtml: any, msgData: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me?.hostInstance?.$;
    // if(msgData.message[0].component.payload.searchConfigurationCopy){
    //   me.searchConfigurationCopy = msgData.message[0].component.payload.searchConfigurationCopy;
    // }
    me.groupData = msgData.message[0].component.payload.groupData;
    let container = '.search-data-container';
    if (msgData.message[0].component.payload.searchType == 'isSearch') {
      container = '.search-data-container'
    } else if (msgData.message[0].component.payload.searchType == 'isLiveSearch') {
      container = '.live-search-data-container'
    }
    if (me.groupData && me.groupData.length) {
      me.groupData.forEach((d: any) => {
        d.message[0].component.payload.langTranslator = me.langTranslator
        var showAllHTML;
        if (d.message[0].component.payload.template_type == 'searchListTemplate') {
          showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
        } else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
          showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
        } else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
          showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
        }
        // var showAllHTML = me.customTemplateObj.renderMessage.bind(me.hostInstance,d);
        $(messageHtml).find(container).append(showAllHTML);

      })
    }
    $(messageHtml).off("click", ".show-all-results").on("click", ".show-all-results", function (e: any) {
      const isSearchSDK = document.body.className.match('sdk-body');
      if (isSearchSDK !== null) {
        hostWindowInstance.seeAllBtnClickEvent(e);
      }
      else {
        let modifyGroupData = msgData.message[0].component.payload.groupData;
        modifyGroupData.forEach((d: any) => {
          d.message[0].component.payload.isSearch = false;
          d.message[0].component.payload.isFullResults = true;
          d.message[0].component.payload.isSearchSDK = true;
          d.message[0].component.payload.maxSearchResultsAllowed = 10;
        })
        let fullSearchMsgData = {
          message: [{
            component: {
              type: 'template',
              payload: {
                template_type: "fullSearchResultsTemplate",
                facets: [],
                count: msgData.message[0].component.payload.totalSearchResults,
                view: "preview",
                isDev: msgData.message[0].component.payload.isDev,
                isFilterEnabled: false,
                devMode: msgData.message[0].component.payload.devMode,
                viewType: msgData.message[0].component.payload.viewType,
                facetPosition: 'left',
                filterFacetData: [],
                groupData: modifyGroupData,
                displayFeedback:msgData.message[0].component.payload.displayFeedback,
                feedbackData: null,
                langTranslator:msgData.message[0].component.payload?.langTranslator
              }
            }
          }]
        };
        // let fullSearchHtml = me.fullSearchTemplateObj.renderMessage.bind(me, fullSearchMsgData);
        // setTimeout(fullSearchHtml, 500)
        setTimeout(() => {
          $('body').find('.full-search-results-container').remove();
          $('body').append(`<div class="full-search-results-container"></div>`);
          $('.full-search-results-container').append(me.fullSearchTemplateObj.renderMessage.bind(me, fullSearchMsgData));
        }, 1000);


      }
    });
    $(messageHtml).off("click", ".know-more-snippet").on("click", ".know-more-snippet", function (e: any) {
      var url = $(e.target).attr("snippetURL");
      window.open(url, '_blank','noopener');
    })
    FinalResultsTemplate.prototype.bindSnippetEvents(me,messageHtml);
    FinalResultsTemplate.prototype.tooltipBindEvent(me);
  }
  getTemplateString(type: any) {
    var finalResultsTemplate = '<script type="text/x-jqury-tmpl">\
    <div class="final-results-container">\
        {{if infoText && infoText.length}}\
          <div class="messageBubble  show-info-text-snippet">\
            <div class="messageBubble-content">\
                <div class="botMessage">\
                <span class="bot_Img">\
                    <img class="default-bot-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/bubble_icon.svg">\
                </span>\
                <span class="bot_info_text">{{html helpers.convertMDtoHTML(infoText)}}</span>\
                </div>\
          </div>\
            <div class="sdk-results-customize-icon"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/rangeslider.svg"><span class="tooltiptext-top sdk-i18n-lang" sdk-i18n-key="sa_sdk_customize_results">{{html langTranslator("sa_sdk_customize_results")}}</span></div>\
          </div>\
        {{/if}}\
        {{if snippetData && snippetData?.template_type}}\
        {{if snippetData.template_type =="paragraph_snippet" || snippetData.template_type =="answer_snippet"}}\
          <div class="search-temp-one snippet-margin"  data-query = "${snippetData?.searchQuery}">\
            <div class="top-header">\
                <div class="top-header-with-img">\
                    <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                    <div class="btn-chip sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</div>\
                </div>\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
            </div>\
            {{if snippetData && snippetData.title}}\
              <div class="paragraph-temp-title">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
            {{/if}}\
            <div class="temp-data-desc">\
            {{html snippetData?.answer}}\
            <span class="read-more-less desc-read-more">...Read More</span>\
            <span class="desc-read-less">Show Less</span>\
            </div>\
            <!--<div class="temp-read-link">\
            <span class="desc-read-more">Read more</span> <span class="desc-read-less">Show Less</span>\
            </div>\-->\
            {{if snippetData && snippetData.source}}\
            <div class="snippet-source-block">\
              <div class="snippet-source-file-name sa-sdk-title {{if !snippetData.source}} display-none{{/if}}" data-title="${snippetData.source}">{{html snippetData.source}}</div>\
              <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name sa-sdk-title" data-title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
            </div>\
            {{/if}}\
            <div class="temp-footer-block">\
                <div class="temp-footer {{if snippetData && snippetData.snippet_type!== "generative_model"}} justify-content-end {{/if}}">\
                    {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                    <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                    {{/if}}\
                    {{if snippetData.displayFeedback == true}}\
                    <div class="temp-right">\
                        <div class="is-it-usefull sdk-i18n-lang"  sdk-i18n-key="sa_sdk_is_useful">{{html langTranslator("sa_sdk_is_useful")}}</div>\
                        <div class="temp-fotter-actions">\
                            <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                            <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                        </div>\
                    </div>\
                    {{/if}}\
                </div>\
            </div>\
            <!--<div id="snippet-feedback-template" class="sinnpet-feedback-template-assiatance-temp"></div>-->\
        </div>\
        {{/if}}\
        {{if snippetData.template_type =="list_element_snippet" || snippetData.template_type =="headings_snippet"}}\
    <div class="search-temp-one list-snippet-temp snippet-margin"  data-query = "${snippetData?.searchQuery}">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</div>\
                </div>\
            {{if snippetData && snippetData.source === "Answered by AI"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
            {{/if}}\
        </div>\
        <div class="list-temp-block">\
            <div class="list-temp-header sa-sdk-title" data-title="${snippetData.title}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
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
            <div class="snippet-source-file-name sa-sdk-title  {{if !snippetData.source}} display-none {{/if}}" data-title="${snippetData.source}">{{html snippetData?.source}}</div>\
            <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none {{/if}}"><span class="snippet-source-url-name">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/> </div></a>\
          </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type!== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
                {{if snippetData.displayFeedback == true}}\
                <div class="temp-right">\
                   <div class="is-it-usefull sdk-i18n-lang"  sdk-i18n-key="sa_sdk_is_useful">{{html langTranslator("sa_sdk_is_useful")}}</div>\                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img  class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
                {{/if}}\
            </div>\
        </div>\
        <!--<div id="snippet-feedback-template" class="sinnpet-feedback-template-assiatance-temp"></div>-->\
    </div>\
    {{/if}}\
    {{if snippetData.template_type =="image_snippet"}}\
          <div class="search-temp-one snippet-margin"  data-query = "${snippetData?.searchQuery}">\
            <div class="top-header">\
                <div class="top-header-with-img">\
                    <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                    <div class="btn-chip"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</span>\</div>\
                </div>\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
            </div>\
            {{if snippetData && snippetData.title}}\
              <div class="img-temp-title">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
              {{/if}}\
              {{if snippetData.answer}}\
                <div class="img-temp-data-desc">\
                {{html snippetData?.answer}}\
                </div>\
              {{/if}}\
              {{if snippetData && snippetData.image_url}}\
              <div class="snippet-image-block {{if snippetData.answer=="" && snippetData.title==""}}snippet_margin_top_0{{/if}}"><img src="${snippetData.image_url}"/></div>\
              {{/if}}\
            {{if snippetData && snippetData.source}}\
            <div class="snippet-source-block">\
              <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
              <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
            </div>\
            {{/if}}\
            <div class="temp-footer-block">\
                <div class="temp-footer {{if snippetData && snippetData.snippet_type!== "generative_model"}} justify-content-end {{/if}}">\
                    {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                    <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                    {{/if}}\
                    {{if snippetData.displayFeedback == true}}\
                    <div class="temp-right">\
                        <div class="is-it-usefull">Is it useful?</div>\
                        <div class="temp-fotter-actions">\
                            <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                            <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                        </div>\
                    </div>\
                    {{/if}}\
                </div>\
            </div>\
        </div>\
        {{/if}}\
        {{if snippetData.template_type =="citation_snippet"}}\
        <div class="search-temp-one snippet-margin"  data-query = "${snippetData?.searchQuery}">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</span>\</div>\
            </div>\
            {{if snippetData && snippetData.snippet_type === "generative_model"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
            {{/if}}\
        </div>\
        {{if snippetData && snippetData.title}}\
        <div class="img-temp-title sa-sdk-title" data-title="{{html helpers.convertMDtoHTML(snippetData?.title)}}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
        {{/if}}\
        <div class="citation-data-desc {{if snippetData.title==""}}snippet_padding_top_0{{/if}}">\
        {{each(key, data) snippetData.answer}}\
        <span class="snippet-answer-fragment">{{html helpers.convertMDtoHTML(data.answer_fragment)}}</span>{{each(sourceKey, source) data.sources}}<sup class="snippet-citation"><a href="${source.url}" target="_blank">[${source._id}]</a></sup>{{/each}}. </span>\
        {{/each}}\
        </div>\
        <div class="snippet-referene-block">\
          <div class="reference-block-header">References: </div>\
          <ol type="1" class="reference-list-temp-ul">\
                  {{each(key, item) snippetData.reference}}\
                      <li class="reference-list-temp-li" title="{{html helpers.convertMDtoHTML(item.title)}}"><a  href="${item.url}" target="_blank"><span>{{html helpers.convertMDtoHTML(item.title)}}</span></a></li>\
                      {{/each}}\
                  </ol>\
        </div>\
        {{if snippetData && snippetData.source}}\
        <div class="snippet-source-block">\
          <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
          <a href="${snippetData?.page_url}" target="_blank" ><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
        </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type!== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
                {{if snippetData.displayFeedback == true}}\
                <div class="temp-right">\
                    <div class="is-it-usefull">Is it useful?</div>\
                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
                {{/if}}\
            </div>\
        </div>\
    </div>\
    {{/if}}\
    {{if snippetData.template_type =="active_citation_snippet"}}\
        <div class="search-temp-one active-citation-snippet snippet-margin"  data-query = "${snippetData?.searchQuery}">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</span>\</div>\
            </div>\
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
          fragment="{{each(itemKey, item) data.sources}} .fragment-${item._id}, {{/each}}"><span class="sub-fragment"><span class="snippet-answer-fragment">{{html  helpers.convertMDtoHTML(data.answer_fragment)}}</span>{{each(sourceKey, source) data.sources}}<span class="snippet-citation"><a href="${source.url}" target="_blank"><span class="reference-no">${source._id}</span></a></span>{{/each}}</span></span></span>\
        {{/each}}\
        </div>\
        <div class="active-snippet-referene-block">\
          <div class="active-reference-block-header">Sources </div>\
          <div class="active-reference-list-temp-block">\
                  {{each(key, item) snippetData.reference}}\
                      <div class="active-reference-list-temp fragment-hover-event fragment-${key+1}"  title="{{html item.title}}" fragment=".fragment-${key+1},"><a href="${item.url}" target="_blank"><span class="reference-no">${key+1}</span><span class="reference-title">{{html helpers.convertMDtoHTML(item.title)}}</span></a></div>\
                      {{/each}}\
                  </div>\
        </div>\
        {{if snippetData && snippetData.source}}\
        <div class="snippet-source-block">\
          <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
          <a href="${snippetData?.page_url}" target="_blank" ><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
        </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type!== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
                {{if snippetData.displayFeedback == true}}\
                    <div class="temp-right">\
                        <div class="is-it-usefull">Is it useful?</div>\
                        <div class="temp-fotter-actions">\
                            <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                            <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                        </div>\
                    </div>\
                    {{/if}}\
            </div>\
        </div>\
    </div>\
    {{/if}}\
    {{/if}}\
    {{if snippetData && snippetData?.template_type && totalSearchResults}}\
    <div class="show-more-results-block" ><span class="show-more-results-btn" id="sa-sdk-show-more-results-btn"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_show_more_results">{{html langTranslator("sa_sdk_show_more_results")}}</span> </span></div>\
    {{/if}}\
      <div class="finalResults snippet-margin {{if snippetData && snippetData?.template_type}}  display-none{{/if}}">\
        {{if taskPrefix === "SUGGESTED"}}\
        <span class="live-search-close-icon sdk-i18n-lang" sdk-i18n-key="sa_sdk_see_all_results">{{html langTranslator("sa_sdk_see_all_results")}}</span>\
        {{/if}}\
        <div class="resultsOfSearch">\
            {{if taskPrefix !== "SUGGESTED"}}\
                <div class="search-data-container"></div>\
            {{/if}}\
            {{if taskPrefix === "SUGGESTED"}}\
                <div class="live-search-data-container"></div>\
            {{/if}}\
            <!--{{if noResults}} <span class="text-center">No results found</span> {{/if}}-->\
            {{if showAllResults && !customSearchResult}}\
                {{if taskPrefix !== "SUGGESTED"}}\
                    <div class="bottom-search-show-all-results {{if totalSearchResults === 0}}d-none{{/if}}">\
                    <span data-query = "${query}" class="pointer show-all-results" ><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_see_all">{{html langTranslator("sa_sdk_see_all")}}</span> <span class="search-results-count">(${totalSearchResults} <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_results">{{html langTranslator("sa_sdk_results")}}</span>)</span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACHSURBVHgBlZDBDYUwDEOdin/+sEGkMhBMACOwCSuwASMwAwMglQ3YICTAAQ6lwpdUkV9lB4iImXPmsrd537sYEELYAClA2XiHosAJLS1EVrhfjy9i9gN739ibNGenM09SJA3E1RqJNqT1t7+1U0Up51GYskm7zNaJvpht595zP83JKNdBHtoBNXcrtgi1OOQAAAAASUVORK5CYII="></span>\
                    </div>\
                {{/if}}\
            {{/if}}\
        </div>\
        </div>\
    </div>\
</script>';
    if (type === 'finalResultsTemplate') {
      return finalResultsTemplate;
    }

  }
  botActionTrigger(event: any) {
    let me: any = this;
    me.hostInstance.botActionTrigger(event);
  };
  bindSnippetEvents(me:any,messageHtml:any){
    let $ = me.hostInstance.$;
    let hostInstance= me.hostInstance;
    $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-like-img').on('click', '.snippet-like-img', function (event:any) {
      if(!$(event.currentTarget).closest('.snippet-like-img').hasClass('active')){
      const searchQuery = event?.currentTarget?.closest('[data-query]')?.getAttribute('data-query');
      hostInstance.updateFeedBackResult('thumbsUp',searchQuery,'smartAnswer')
      $(messageHtml).find('.snippet-feedback').removeClass('active');
      $(event.currentTarget).addClass('active');
      }
    });
    $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-dislike-img').on('click', '.snippet-dislike-img', function (event:any) {
      if(!$(event.currentTarget).closest('.snippet-dislike-img').hasClass('active')){
      const searchQuery = event?.currentTarget?.closest('[data-query]')?.getAttribute('data-query');
      FinalResultsTemplate.prototype.appendFeedBaackData(me,messageHtml,'smartAnswer',searchQuery)
      $(messageHtml).find('.snippet-feedback').removeClass('active');
      $(event.currentTarget).addClass('active');
      }
    });
    if(messageHtml &&  $(messageHtml).find('.search-temp-one').find('.temp-data-desc').length){
      setTimeout(()=>{
        if($(messageHtml).find('.search-temp-one').last().find('.temp-data-desc').length && $(messageHtml).find('.search-temp-one').last().find('.temp-data-desc')[0].scrollHeight>160){
          $(messageHtml).find('.search-temp-one').last().find('.desc-read-more').show();
          $(messageHtml).find('.search-temp-one').last().find('.desc-read-less').hide();
        }else{
          $(messageHtml).find('.search-temp-one').last().find('.desc-read-more').hide();
          $(messageHtml).find('.search-temp-one').last().find('.desc-read-less').hide();
        }
        $(messageHtml).find('.search-temp-one').off('click', '.desc-read-more').on('click', '.desc-read-more', function (event:any) {
          $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp','initial');
          $(event.currentTarget).hide();
          $(event.currentTarget).parent().find('.desc-read-less').show();
        });
        $(messageHtml).find('.search-temp-one').off('click', '.desc-read-less').on('click', '.desc-read-less', function (event:any) {
          $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp','8');
          $(event.currentTarget).parent().find('.desc-read-more').show();
          $(event.currentTarget).hide();
        });
      },300)
    }else if(messageHtml &&  $(messageHtml).find('.search-temp-one').find('.list-temp-ul').length){
      $(messageHtml).find('.search-temp-one').off('click', '.desc-read-more').on('click', '.desc-read-more', function (event:any) {
        $(messageHtml).find('.list-temp-ul').addClass('show-all-list');
        $(messageHtml).find('.desc-read-more').removeClass('display-block').addClass('display-none');
        $(messageHtml).find('.desc-read-less').removeClass('display-none').addClass('display-block');
      });
      $(messageHtml).find('.search-temp-one').off('click', '.desc-read-less').on('click', '.desc-read-less', function (event:any) {
        $(messageHtml).find('.list-temp-ul').removeClass('show-all-list');
        $(messageHtml).find('.desc-read-less').removeClass('display-block').addClass('display-none');
        $(messageHtml).find('.desc-read-more').removeClass('display-none').addClass('display-block');
      });
    }
    FinalResultsTemplate.prototype.bindFragmentHoverEvent(me,messageHtml)
    $(messageHtml).off('click', '#sa-sdk-show-more-results-btn').on('click', '#sa-sdk-show-more-results-btn', function (event:any) {
      $(event.currentTarget).parent().next().closest('.finalResults').removeClass('display-none');
      $(event.currentTarget).parent().remove();
    });
  }

  appendFeedBaackData(me: any, messageHtml: any,feedBackType:any,searchQuery:any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    let feedbackMsgData = {
      message: [{
        component: {
          type: 'template',
          payload: {
            template_type: "feedbackFormTemplate",
            query: searchQuery?searchQuery:hostWindowInstance?.vars?.searchObject.searchText || '',
            feedBackType:feedBackType,
            langTranslator: me?.langTranslator
          }
        }
      }]
    };
      $('#snippet-feedback-template').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
   }

  bindFragmentHoverEvent(me:any,messageHtml:any){
    let $ = me.hostInstance.$;
    $(messageHtml).find('.active-citation-snippet').off('mouseover', '.fragment-hover-event').on('mouseover', '.fragment-hover-event', function (event:any) {
      let fragmentClasses= $(event.currentTarget).attr('fragment').split(',').slice(0, -1);
      fragmentClasses.forEach((itemClass:any)=>{
        if($(event.currentTarget).hasClass('snippet-answer-fragment-block')){
          $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find('.active-snippet-referene-block').find(itemClass).addClass('active');
        }else{
          $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find(itemClass).addClass('active');
        }
      })
    });
    $(messageHtml).find('.active-citation-snippet').off('mouseout', '.fragment-hover-event').on('mouseout', '.fragment-hover-event', function (event:any) {
      let fragmentClasses= $(event.currentTarget).attr('fragment').split(',').slice(0, -1);
      fragmentClasses.forEach((itemClass:any)=>{
        $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find(itemClass).removeClass('active');
      })
    });
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
  $ = $;
 
}
FinalResultsTemplate.prototype.$ = $;
export default FinalResultsTemplate;