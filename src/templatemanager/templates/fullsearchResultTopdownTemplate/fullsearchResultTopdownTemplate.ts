import helpers from '../../../utils/helpers';
import './fullsearchResultTopdownTemplate.scss';
import searchListViewTemplate from '../../templates/searchListViewTemplate/searchListViewTemplate';
import searchGridViewTemplate from '../../templates/searchGridViewTemplate/searchGridViewTemplate';
import searchCarouselViewTemplate from '../../templates/searchCarouselViewTemplate/searchCarouselViewTemplate';
import SnippetListTemplate from '../../templates/snippetListTemplate/snippetListTemplate';
import SnippetParagraphTemplate from '../../templates/snippetParagraphTemplate/snippetParagraphTemplate';
import SnippetImageTemplate from '../../templates/snippetImageTemplate/snippetImageTemplate';
import SnippetCitationTemplate from '../../templates/snippetCitationTemplate/snippetCitationTemplate';
import SnippetImageAnswerTemplate from '../../templates/snippetImageAnswerTemplate/snippetImageAnswerTemplate';
import SnippetActiveCitationTemplate from '../../templates/snippetActiveCitationTemplate/snippetActiveCitationTemplate';
import korejquery from "../../../libs/korejquery";
import FeedBackFormTemplate from '../feedBackFormTemplate/feedBackFormTemplate';
const $ = korejquery;
class FullSearchResultTopdownTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers?.helpers;
    if (msgData?.message[0] && msgData.message[0].component && msgData.message[0].component?.payload && msgData.message[0].component?.payload?.template_type == 'fullSearchResultTopdownTemplate') {
      if (!msgData.message[0].component.payload.helpers) {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      me.messageFullResultHtml = $(FullSearchResultTopdownTemplate.prototype.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
      me.snippetListTemplateObj = new SnippetListTemplate();
      me.snippetParagraphTemplateObj = new SnippetParagraphTemplate();
      me.snippetImageAnswerTemplateObj = new SnippetImageAnswerTemplate();
      me.snippetImageTemplateObj = new SnippetImageTemplate();
      me.snippetCitationTemplateObj = new SnippetCitationTemplate();
      me.snippetActiveCitationTemplateObj = new SnippetActiveCitationTemplate();
      me.listTemplateObj = new searchListViewTemplate();
      me.gridTemplateObj = new searchGridViewTemplate();
      me.carouselTemplateObj = new searchCarouselViewTemplate();
      me.feedBackTemplateObj = new FeedBackFormTemplate();
      FullSearchResultTopdownTemplate.prototype.bindEvents(me, me.messageFullResultHtml, msgData);
     
      return me.messageFullResultHtml;
    }
  }
  bindEvents(me: any, messageHtml: any, msgData: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;

    me.searchConfigurationCopy = msgData.message[0].component.payload;
    let formatedTemplatesData: any = msgData.message[0].component.payload.groupData;
    // formatedTemplatesData.groupData.langTranslator = msgData.message[0].component.payload.langTranslator;
    setTimeout(() => {
      $(messageHtml).find('.full-search-data-container').empty();
      if (formatedTemplatesData && formatedTemplatesData.length) {
        formatedTemplatesData.forEach((d: any) => {
          d.message[0].component.payload.langTranslator =  msgData.message[0].component.payload.langTranslator
          var showAllHTML;
          if (d.message[0].component.payload.template_type == 'searchListTemplate') {
            showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
          } else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
            showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
          } else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
            showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
          }
          $(messageHtml).find('.full-search-data-container').append(showAllHTML);
        })
      }
      var resultsContainerHtml = $('.full-results-data-container');
      hostWindowInstance.bindPerfectScroll(
        resultsContainerHtml,
        ".all-product-details",
        null,
        "y",
        "resultsContainer"
      );
      if (!$(".full-search-data-container").children().length && !msgData.message[0].component.payload.totalSearchResults) {
        $(".empty-full-results-container").removeClass("hide");
      } else {
        if (!$(".empty-full-results-container").hasClass("hide")) {
          $(".empty-full-results-container").addClass("hide");
        }
      }
      $(messageHtml).find('.scroll-top-container').css('display', 'none');
      $(messageHtml).find(".all-product-details").off('scroll').on('scroll', function () {
          if ($(messageHtml).find('.all-product-details').scrollTop() > 50) {
            $(messageHtml).find('.scroll-top-container').css('display', 'flex');
          } else {
            $(messageHtml).find('.scroll-top-container').css('display', 'none');
          }
        });
        $(messageHtml).find(".title-scroll-top").off('click').on('click', function () {
          $(messageHtml).find(".all-product-details").scrollTop(0);
        });
      if(msgData.message[0].component.payload.displayFeedback.queryLevel){
        FullSearchResultTopdownTemplate.prototype.feedBackResultEvents(me, messageHtml,msgData);
        }
    }, 300);

    let tabsHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({
      facets: msgData.message[0].component.payload.tabsList,
      truncateText: truncateText
    });
    $(messageHtml).find('#top-down-tab-sec').empty().append(tabsHtml);
    FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabsHtml, msgData.message[0].component.payload.tabsList, 'all results');
    FullSearchResultTopdownTemplate.prototype.facetReset(me, messageHtml, msgData);
    FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, hostWindowInstance.vars.selectedFacetsList, msgData.message[0].component.payload.facetPosition);
    if(msgData.message[0].component.payload.sortableFacetList && msgData.message[0].component.payload.sortableFacetList.length){
      let sortableHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownSortableFacetsTabs()).tmpl({ sortablefacets: msgData.message[0].component.payload.sortableFacetList,
        displaySortable: msgData.message[0].component.payload.displaySortable});
      $(messageHtml).find('#sa-sdk-sortable-dropdown').empty().append(sortableHtml);
      FullSearchResultTopdownTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml,msgData.message[0].component.payload.sortableFacetList)
    }
    FullSearchResultTopdownTemplate.prototype.bindBackToSearchClickEvent(me,messageHtml);

    FullSearchResultTopdownTemplate.prototype.bindCustomizePreviewClickEvent(me,messageHtml);
    FullSearchResultTopdownTemplate.prototype.bindQueryAnalyticsClickEvent(me,messageHtml);
    
    if(msgData?.message[0].component?.payload?.snippetData?.searchQuery){
      FullSearchResultTopdownTemplate.prototype.appendSnippetData(me,messageHtml,msgData);
    }
  }
  getTemplateString(type: any) {

    var fullSearchResultTopdownTemplate = '<script type="text/x-jqury-tmpl">\
    <div class="all-result-container">\
                    <div class="full-results-data-container">\
                        <div class="back-search" style="cursor: pointer;position: absolute;right: 34px;z-index: 100000;">\
                            <img src="">\
                        </div>\
                        <div id="filters-left-sec"></div>\
                        {{if displayFeedback.queryLevel == true}}\
                          <div class="feedback-template-positions feedback-top-down-full">\
                          <span class="helpfull-title sdk-i18n-lang" sdk-i18n-key="sa_sdk_was_this_helpful">{{html langTranslator("sa_sdk_was_this_helpful")}}</span>\
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjgwNTcgNy41ODMzM0MxMy44MDU3IDcuMTMzIDEzLjYzMzQgNi43MjcgMTMuMzU3OCA2LjQxNjY3QzEzLjYzMzQgNi4xMDYzMyAxMy44MDU3IDUuNzAwMzMgMTMuODA1NyA1LjI1QzEzLjgwNTcgNC4yODUxNyAxMy4wMzI4IDMuNSAxMi4wODMxIDMuNUg3LjU0ODIxTDcuOTY5NjYgMi4yNEM4LjA5ODI4IDEuNzkwODMgOC4wNDc3NSAxLjMxODMzIDcuODI2MTEgMC45MDg4MzVDNy42MDQ0OCAwLjQ5OTMzNSA3LjIzOTMgMC4yMDA2NjggNi43OTgzMyAwLjA3MDAwMTFDNS45ODg3MyAtMC4xNjQ0OTkgNS4xNzEwOSAwLjE5MTMzNSA0LjU3ODU0IDEuMTJMMi40NTk4IDQuNjY2NjdIMFYxNEgyLjcyNzM3VjEzLjk3MDhDMi43NzMzIDEzLjk4MzcgMi44MTkyNCAxNCAyLjg3MDkxIDE0SDEwLjkzNDdDMTEuODg0NCAxNCAxMi42NTczIDEzLjIxNDggMTIuNjU3MyAxMi4yNUMxMi42NTczIDExLjk4NjMgMTIuNTk1MyAxMS43MzkgMTIuNDkxOSAxMS41MTM4QzEzLjA5NDggMTEuMjQwOCAxMy41MTg2IDEwLjYyOTUgMTMuNTE4NiA5LjkxNjY3QzEzLjUxODYgOS41Mzk4MyAxMy4zOTggOS4xOTIxNyAxMy4xOTgyIDguOTA2MzNDMTMuNTY2OCA4LjU4NTUgMTMuODA1NyA4LjExNDE3IDEzLjgwNTcgNy41ODMzM1pNMS4xNDgzNyA1LjgzMzMzSDIuMjk2NzNWMTIuODMzM0gxLjE0ODM3VjUuODMzMzNaTTEwLjkzNDcgMTIuODMzM0gzLjQ0NTFWNS4yNjc1TDUuNTUxMiAxLjc0MTgzQzUuOTE3NTMgMS4xNjY2NyA2LjIwNjkyIDEuMTY2NjcgNi4zMTYwMSAxLjE2NjY3QzYuMzY5OTkgMS4xNjY2NyA2LjQyNTExIDEuMTc0ODMgNi40Nzc5MyAxLjE5MTE3QzYuNzgxMSAxLjI3OTgzIDYuOTU2OCAxLjYwNDE3IDYuODc1MjcgMS44OUw2LjIwMzQ3IDMuODk2NjdDNi4xNDI2MSA0LjA3MjgzIDYuMTcxMzIgNC4yNyA2LjI3OTI3IDQuNDIyODNDNi4zODcyMSA0LjU3NTY3IDYuNTYwNjEgNC42NjY2NyA2Ljc0NjY1IDQuNjY2NjdIMTIuMDgzMUMxMi40MDAxIDQuNjY2NjcgMTIuNjU3MyA0LjkyOTE3IDEyLjY1NzMgNS4yNUMxMi42NTczIDUuNTcwODMgMTIuNDAwMSA1LjgzMzMzIDEyLjA4MzEgNS44MzMzM0gxMC4zNjA2VjdIMTIuMDgzMUMxMi40MDAxIDcgMTIuNjU3MyA3LjI2MjUgMTIuNjU3MyA3LjU4MzMzQzEyLjY1NzMgNy45MDQxNyAxMi40MDAxIDguMTY2NjcgMTIuMDgzMSA4LjE2NjY3SDEwLjM2MDZWOS4zMzMzM0gxMS43OTZDMTIuMTEzIDkuMzMzMzMgMTIuMzcwMiA5LjU5NTgzIDEyLjM3MDIgOS45MTY2N0MxMi4zNzAyIDEwLjIzNzUgMTIuMTEzIDEwLjUgMTEuNzk2IDEwLjVIMTAuMzYwNlYxMS42NjY3SDEwLjkzNDdDMTEuMjUxNyAxMS42NjY3IDExLjUwODkgMTEuOTI5MiAxMS41MDg5IDEyLjI1QzExLjUwODkgMTIuNTcwOCAxMS4yNTE3IDEyLjgzMzMgMTAuOTM0NyAxMi44MzMzWiIgZmlsbD0iIzlBQTBBNiIvPgo8L3N2Zz4K" class="thumb-up thumb-up-full-top thumbs-up-top-down-black" alt="thumb-up"/>\
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjgwNTcgNy41ODMzM0MxMy44MDU3IDcuMTMzIDEzLjYzMzQgNi43MjcgMTMuMzU3OCA2LjQxNjY3QzEzLjYzMzQgNi4xMDYzMyAxMy44MDU3IDUuNzAwMzMgMTMuODA1NyA1LjI1QzEzLjgwNTcgNC4yODUxNyAxMy4wMzI4IDMuNSAxMi4wODMxIDMuNUg3LjU0ODIxTDcuOTY5NjYgMi4yNEM4LjA5ODI4IDEuNzkwODMgOC4wNDc3NSAxLjMxODMzIDcuODI2MTEgMC45MDg4MzVDNy42MDQ0OCAwLjQ5OTMzNSA3LjIzOTMgMC4yMDA2NjggNi43OTgzMyAwLjA3MDAwMTFDNS45ODg3MyAtMC4xNjQ0OTkgNS4xNzEwOSAwLjE5MTMzNSA0LjU3ODU0IDEuMTJMMi40NTk4IDQuNjY2NjdIMFYxNEgyLjcyNzM3VjEzLjk3MDhDMi43NzMzIDEzLjk4MzcgMi44MTkyNCAxNCAyLjg3MDkxIDE0SDEwLjkzNDdDMTEuODg0NCAxNCAxMi42NTczIDEzLjIxNDggMTIuNjU3MyAxMi4yNUMxMi42NTczIDExLjk4NjMgMTIuNTk1MyAxMS43MzkgMTIuNDkxOSAxMS41MTM4QzEzLjA5NDggMTEuMjQwOCAxMy41MTg2IDEwLjYyOTUgMTMuNTE4NiA5LjkxNjY3QzEzLjUxODYgOS41Mzk4MyAxMy4zOTggOS4xOTIxNyAxMy4xOTgyIDguOTA2MzNDMTMuNTY2OCA4LjU4NTUgMTMuODA1NyA4LjExNDE3IDEzLjgwNTcgNy41ODMzM1pNMS4xNDgzNyA1LjgzMzMzSDIuMjk2NzNWMTIuODMzM0gxLjE0ODM3VjUuODMzMzNaTTEwLjkzNDcgMTIuODMzM0gzLjQ0NTFWNS4yNjc1TDUuNTUxMiAxLjc0MTgzQzUuOTE3NTMgMS4xNjY2NyA2LjIwNjkyIDEuMTY2NjcgNi4zMTYwMSAxLjE2NjY3QzYuMzY5OTkgMS4xNjY2NyA2LjQyNTExIDEuMTc0ODMgNi40Nzc5MyAxLjE5MTE3QzYuNzgxMSAxLjI3OTgzIDYuOTU2OCAxLjYwNDE3IDYuODc1MjcgMS44OUw2LjIwMzQ3IDMuODk2NjdDNi4xNDI2MSA0LjA3MjgzIDYuMTcxMzIgNC4yNyA2LjI3OTI2IDQuNDIyODNDNi4zODcyMSA0LjU3NTY3IDYuNTYwNjEgNC42NjY2NyA2Ljc0NjY1IDQuNjY2NjdIMTIuMDgzMUMxMi40MDAxIDQuNjY2NjcgMTIuNjU3MyA0LjkyOTE3IDEyLjY1NzMgNS4yNUMxMi42NTczIDUuNTcwODMgMTIuNDAwMSA1LjgzMzMzIDEyLjA4MzEgNS44MzMzM0gxMC4zNjA2VjdIMTIuMDgzMUMxMi40MDAxIDcgMTIuNjU3MyA3LjI2MjUgMTIuNjU3MyA3LjU4MzMzQzEyLjY1NzMgNy45MDQxNyAxMi40MDAxIDguMTY2NjcgMTIuMDgzMSA4LjE2NjY3SDEwLjM2MDZWOS4zMzMzM0gxMS43OTZDMTIuMTEzIDkuMzMzMzMgMTIuMzcwMiA5LjU5NTgzIDEyLjM3MDIgOS45MTY2N0MxMi4zNzAyIDEwLjIzNzUgMTIuMTEzIDEwLjUgMTEuNzk2IDEwLjVIMTAuMzYwNlYxMS42NjY3SDEwLjkzNDdDMTEuMjUxNyAxMS42NjY3IDExLjUwODkgMTEuOTI5MiAxMS41MDg5IDEyLjI1QzExLjUwODkgMTIuNTcwOCAxMS4yNTE3IDEyLjgzMzMgMTAuOTM0NyAxMi44MzMzWiIgZmlsbD0iIzBENkVGRCIvPgo8L3N2Zz4K" class="thumb-up thumb-up-full-top thumbs-up-top-down-blue" alt="thumb-up"/>\
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjkxNDcgMEMxMS45NjU2IDAgMTIuMDE1MSAwLjAwNjUzMzgxIDEyLjA2MjIgMC4wMTg4MDk0TDEyLjA2MDUgMEgxNC44MzEzVjkuMzMzMzNIMTIuMzMxMkwxMC4xNjk5IDEyLjg5NDJDOS43MDY2NiAxMy42MDgxIDkuMTI5NDMgMTQgOC40MTQ2NiAxNEM4LjI1MDcxIDE0IDguMDg1MiAxMy45NzY2IDcuOTI1MjMgMTMuOTMwMkM3LjA1MjE3IDEzLjY3NjUgNi41Mjg5NSAxMi44MDAzIDYuNzAxNzYgMTEuOTAzN0w2Ljc0MjQgMTEuNzM1NUw3LjE2MTY2IDEwLjVIMi41NTU2NkMxLjY0NjMzIDEwLjUgMC44OTg1MTEgOS44MDU2NyAwLjgxMzY3OCA4LjkxODQ4TDAuODA1NjY0IDguNzVDMC44MDU2NjQgOC4zMDEzNCAwLjk3NDY4NyA3Ljg5MjAxIDEuMjUyNSA3LjU4MjIyQzAuOTc0Mjc2IDcuMjczNjYgMC44MDU2NjQgNi44NjQ3OCAwLjgwNTY2NCA2LjQxNjY3QzAuODA1NjY0IDUuODg1NDkgMS4wNDI1OCA1LjQwOTQzIDEuNDE2NDYgNS4wODg0M0MxLjIxNTQxIDQuODA1ODYgMS4wOTczMyA0LjQ1ODMzIDEuMDk3MzMgNC4wODMzM0MxLjA5NzMzIDMuMzcwNjYgMS41MjM4MSAyLjc1NzIgMi4xMzUzNyAyLjQ4NDM0QzIuMDMwNCAyLjI2MjQzIDEuOTcyMzMgMi4wMTI5NyAxLjk3MjMzIDEuNzVDMS45NzIzMyAwLjg0MDY2NyAyLjY2NjY2IDAuMDkyODQ2NyAzLjU1Mzg1IDAuMDA4MDE0MjVMMy43MjIzMyAwSDExLjkxNDdaTTQuMzMxMzMgN1Y4LjE2NjY3SDIuNTU1NjZDMi4yMzM4MyA4LjE2NjY3IDEuOTcyMzMgOC40MjgxNyAxLjk3MjMzIDguNzVDMS45NzIzMyA5LjAzNjA3IDIuMTc4OTUgOS4yNzQ0OCAyLjQ1MDkgOS4zMjM5MkwyLjU1NTY2IDkuMzMzMzNINy45NzcxNkM4LjM0MzUxIDkuMzMzMzMgOC42MTA0MSA5LjY2MzM5IDguNTUzMjMgMTAuMDA5OEw4LjUyOTQzIDEwLjEwNDVMNy44NTQ4MyAxMi4wODYxQzcuNzY0ODMgMTIuMzk1OCA3Ljk0MjU4IDEyLjcyMDMgOC4yNTA2NCAxMi44MDk4QzguMzA0NDUgMTIuODI1NCA4LjM2MDQzIDEyLjgzMzMgOC40MTQ2NiAxMi44MzMzQzguNjUwMiAxMi44MzMzIDguODY0MDYgMTIuNzA4MSA5LjA4NjA5IDEyLjQxMTdMOS4xODE4MyAxMi4yNzRMMTEuMzMxMyA4LjczMTMzVjEuMTY2NjdIMy43MjIzM0MzLjQzNjI2IDEuMTY2NjcgMy4xOTc4NSAxLjM3MzI4IDMuMTQ4NDEgMS42NDUyM0wzLjEzOSAxLjc1QzMuMTM5IDIuMDM2MDcgMy4zNDU2MSAyLjI3NDQ4IDMuNjE3NTYgMi4zMjM5MkwzLjcyMjMzIDIuMzMzMzNINC4zMzEzM1YzLjVIMi44NDczM0MyLjUyNTUgMy41IDIuMjY0IDMuNzYxNSAyLjI2NCA0LjA4MzMzQzIuMjY0IDQuMzY5NDEgMi40NzA2MSA0LjYwNzgxIDIuNzQyNTYgNC42NTcyNkwyLjg0NzMzIDQuNjY2NjdINC4zMzEzM1Y1LjgzMzMzSDIuNTU1NjZDMi4yMzM4MyA1LjgzMzMzIDEuOTcyMzMgNi4wOTQ4MyAxLjk3MjMzIDYuNDE2NjdDMS45NzIzMyA2LjcwMjc0IDIuMTc4OTUgNi45NDExNCAyLjQ1MDkgNi45OTA1OUwyLjU1NTY2IDdINC4zMzEzM1pNMTIuNDk4IDguMTY2NjdIMTMuNjY0N1YxLjE2NjY3SDEyLjQ5OFY4LjE2NjY3WiIgZmlsbD0iIzlBQTBBNiIvPgo8L3N2Zz4K" class="thumb-down thumb-up-full-top thumbs-down-top-down-black" alt="thumb-down"/>\
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjkxNDcgMEMxMS45NjU2IDAgMTIuMDE1MSAwLjAwNjUzMzgxIDEyLjA2MjIgMC4wMTg4MDk0TDEyLjA2MDUgMEgxNC44MzEzVjkuMzMzMzNIMTIuMzMxMkwxMC4xNjk5IDEyLjg5NDJDOS43MDY2NiAxMy42MDgxIDkuMTI5NDMgMTQgOC40MTQ2NiAxNEM4LjI1MDcxIDE0IDguMDg1MiAxMy45NzY2IDcuOTI1MjMgMTMuOTMwMkM3LjA1MjE3IDEzLjY3NjUgNi41Mjg5NSAxMi44MDAzIDYuNzAxNzYgMTEuOTAzN0w2Ljc0MjQgMTEuNzM1NUw3LjE2MTY2IDEwLjVIMi41NTU2NkMxLjY0NjMzIDEwLjUgMC44OTg1MTEgOS44MDU2NyAwLjgxMzY3OCA4LjkxODQ4TDAuODA1NjY0IDguNzVDMC44MDU2NjQgOC4zMDEzNCAwLjk3NDY4NyA3Ljg5MjAxIDEuMjUyNSA3LjU4MjIyQzAuOTc0Mjc2IDcuMjczNjYgMC44MDU2NjQgNi44NjQ3OCAwLjgwNTY2NCA2LjQxNjY3QzAuODA1NjY0IDUuODg1NDkgMS4wNDI1OCA1LjQwOTQzIDEuNDE2NDYgNS4wODg0M0MxLjIxNTQxIDQuODA1ODYgMS4wOTczMyA0LjQ1ODMzIDEuMDk3MzMgNC4wODMzM0MxLjA5NzMzIDMuMzcwNjYgMS41MjM4MSAyLjc1NzIgMi4xMzUzNyAyLjQ4NDM0QzIuMDMwNCAyLjI2MjQzIDEuOTcyMzMgMi4wMTI5NyAxLjk3MjMzIDEuNzVDMS45NzIzMyAwLjg0MDY2NyAyLjY2NjY2IDAuMDkyODQ2NyAzLjU1Mzg1IDAuMDA4MDE0MjVMMy43MjIzMyAwSDExLjkxNDdaTTQuMzMxMzMgN1Y4LjE2NjY3SDIuNTU1NjZDMi4yMzM4MyA4LjE2NjY3IDEuOTcyMzMgOC40MjgxNyAxLjk3MjMzIDguNzVDMS45NzIzMyA5LjAzNjA3IDIuMTc4OTUgOS4yNzQ0OCAyLjQ1MDkgOS4zMjM5MkwyLjU1NTY2IDkuMzMzMzNINy45NzcxNkM4LjM0MzUxIDkuMzMzMzMgOC42MTA0MSA5LjY2MzM5IDguNTUzMjMgMTAuMDA5OEw4LjUyOTQzIDEwLjEwNDVMNy44NTQ4MyAxMi4wODYxQzcuNzY0ODMgMTIuMzk1OCA3Ljk0MjU4IDEyLjcyMDMgOC4yNTA2NCAxMi44MDk4QzguMzA0NDUgMTIuODI1NCA4LjM2MDQzIDEyLjgzMzMgOC40MTQ2NiAxMi44MzMzQzguNjUwMiAxMi44MzMzIDguODY0MDYgMTIuNzA4MSA5LjA4NjA5IDEyLjQxMTdMOS4xODE4MyAxMi4yNzRMMTEuMzMxMyA4LjczMTMzVjEuMTY2NjdIMy43MjIzM0MzLjQzNjI2IDEuMTY2NjcgMy4xOTc4NSAxLjM3MzI4IDMuMTQ4NDEgMS42NDUyM0wzLjEzOSAxLjc1QzMuMTM5IDIuMDM2MDcgMy4zNDU2MSAyLjI3NDQ4IDMuNjE3NTYgMi4zMjM5MkwzLjcyMjMzIDIuMzMzMzNINC4zMzEzM1YzLjVIMi44NDczM0MyLjUyNTUgMy41IDIuMjY0IDMuNzYxNSAyLjI2NCA0LjA4MzMzQzIuMjY0IDQuMzY5NDEgMi40NzA2MSA0LjYwNzgxIDIuNzQyNTYgNC42NTcyNkwyLjg0NzMzIDQuNjY2NjdINC4zMzEzM1Y1LjgzMzMzSDIuNTU1NjZDMi4yMzM4MyA1LjgzMzMzIDEuOTcyMzMgNi4wOTQ4MyAxLjk3MjMzIDYuNDE2NjdDMS45NzIzMyA2LjcwMjc0IDIuMTc4OTUgNi45NDExNCAyLjQ1MDkgNi45OTA1OUwyLjU1NTY2IDdINC4zMzEzM1pNMTIuNDk4IDguMTY2NjdIMTMuNjY0N1YxLjE2NjY3SDEyLjQ5OFY4LjE2NjY3WiIgZmlsbD0iI0REMzY0NiIvPgo8L3N2Zz4K" class="thumb-down thumb-up-full-top thumbs-up-top-down-red" alt="thumb-down"/>\
                          </div>\
                          <div id="query-feedback"></div>\
                          {{/if}}\
                        <div class="all-product-details ">\
                        <div id="snippet-demo-template"></div>\
                            <div class="total-search-results-block">\
                            <div class="tsrb-header-sec">\
                              <div class="tsrb-header-tabs"><div id="top-down-tab-sec"></div>\</div>\
                              <div class="tsrb-right-filters">\
                                  <div id="sa-sdk-sortable-dropdown"></div>\
                                  <div class="show_insights_top_down" data-displayInsights="true">\
                                <span class="query_analytics_top_down"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBlVDbTcNAEJzZjQSfoQOX4A6gA8QvEtgkgMwX7iDQQfgz4nVUEKUCTAd0QNIBfxFSfMsdERGgRIpXOq1uZ0Y7s8SGlednqakMuBosu7E7N/xYkkVH9M0BV5Gt8/kC7xMQtTd7FchlJDt39yaHQf1bYDp7Imz8/Hi7Q/KGlPSHHHEe9wsX1ux6w7WETsHU3VdXa6KACxtF4hWlRN8PVYm2lZ8We/H9nx/1zss/oWMeFU3DMPnOA0zUo3aumsR/1ivemfUvRmxmJ9bZGjRzjlWRmWG6uAASUTgD9zsmw7k1dbBt4UrbXRjTtR7NlpigZbUWfAEi/12gzLS2XQAAAABJRU5ErkJggg==">\
                                <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_query_analytics">{{html langTranslator("sa_sdk_query_analytics")}}</span>\
                                </span>\
                                </div>\
                                  <div class="custom-header-container-center top-down-customize-btns">\
                                  <ul class="custom-header-nav">\
                                  <li id="viewTypePreview" class="custom-header-nav-link-item sdk-customize-nav nav-link-item-active"><a class="custom-header-nav-link sdk-i18n-lang" sdk-i18n-key="sa_sdk_preview">{{html langTranslator("sa_sdk_preview")}}</a></li>\
                                  <li id="viewTypeCustomize" class="custom-header-nav-link-item sdk-customize-nav"><a class="custom-header-nav-link sdk-i18n-lang" sdk-i18n-key="sa_sdk_customize">{{html langTranslator("sa_sdk_customize")}}</a></li>\
                                   </ul>\
                                  </div>\
                              </div>\
                            </div>\
                            <div id="filters-center-sec" > </div>\
                            <div class="filters-added-data display-none" id="show-filters-added-data"></div>\
                            <div class="content-data-sec">\
                            <div class="scroll-top-container">\
                                <div class="title-scroll-top"><img><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_scroll_to_top">{{html langTranslator("sa_sdk_scroll_to_top")}}</span>\
                                </div>\
                            </div>\
                            <div class="no-templates-defined-full-results-container">\
                                <div class="img-block"><img class="no-data-mapped">\
                                    <div class="title">Result templates are not mapped with a proper field value</div>\
                                </div>\
                            </div>\
                            <div class="empty-full-results-container hide" id="top-down-all-tab-empty-state">\
                                <div class="img-block"><img src="data:image/png;base64,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"></div>\
                                <div class="title sdk-i18n-lang" sdk-i18n-key="sa_sdk_sorry_we_could_not_find_any_results">{{html langTranslator("sa_sdk_sorry_we_could_not_find_any_results")}}</div>\
                                <div class="title-info sdk-i18n-lang" sdk-i18n-key="sa_sdk_please_try_searching_with_another_term">{{html langTranslator("sa_sdk_please_try_searching_with_another_term")}}</div>\
                                </div>\
                            <div class="full-search-data-container"></div>\
                            <div class="custom-add-result-container1 display-none">\
                                <div class="custom-add-new-result-content">\
                                    <div class="bold-text">Not finding the result?</div>\
                                    <div class="link-text"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABrSURBVHgBzVHBCYAwEMuV/lRwBDdykoojuIoTiBs5Qt8KjVZfLdeHD8FAyJEQOO4ABZXbx0gts5opIi0KMHiJ7wvSuLBcmu4s7G6lbHnBgmGGZAWa/hnCmvrw0FAPxxSpZT+8kvppkr5UOAH/GRicle7qIwAAAABJRU5ErkJggg==">Add from repository</div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
            </div>\
    </script>';


    if (type === 'fullSearchResultTopdownTemplate') {
      return fullSearchResultTopdownTemplate;
    }

  }
  getTopDownFacetsTabs() {
    var topDownFacetsTabs =
      '<script id="top-down-tabs-template" type="text/x-jqury-tmpl">\
                                  <div class="tab-sec">\
                                    {{each(key, facet) facets }}\
                                     <div class="tab-name capital un-selected-type facet {{= facet.className}}" id="{{= facet.key}}" apperance="{{= facet.key}}" title="{{= facet.name}} ({{= facet.doc_count}})"><span class="tab-title one-line-height"> {{html truncateText(facet.name)}}</span> <span class="tab-count text-truncate one-line-height"> (<span class="count-text">{{= facet.doc_count}}</span></span><span class="tab-count-right-bracket">)</span></div>\
                                    {{/each}}\
                                    </div>\
                                </script>';
    return topDownFacetsTabs;
  };
  bindTabsClickEvent(me: any, messageHtml: any, tabsHtml: any, facets: any, facetSelected: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    var doc_count = 0;
    var isAction = false;
    $(tabsHtml).find(".active-tab .tab-count").show();
    $(tabsHtml).find(".active-tab .tab-count-right-bracket").show();
    facets.forEach(function (facet: any) {
      if (facet && facet.key) {
        if (facetSelected == facet.key) {
          doc_count = facet.doc_count;
        }
        if (facet.key == "task") {
          isAction = true;
        }
        $(tabsHtml).find("." + facet.key.replaceAll(" ", "-").split('?').join('_').split('.').join('__').split('|').join('___'))
          .removeClass('active-tab')
          .addClass("un-selected-type");
      }
    });
    if (facetSelected) {
      $(tabsHtml).find("." + facetSelected.replaceAll(" ", "-").split('?').join('_').split('.').join('__').split('|').join('___'))
        .removeClass("un-selected-type")
        .addClass('active-tab');
    }

    if (!facetSelected || facetSelected === "all results") {
      $(tabsHtml).find(".facet:first").removeClass("un-selected-type");
      $(tabsHtml).find(".facet:first").addClass('active-tab');
    }


    $(tabsHtml).off("click", ".facet").on("click", ".facet", function (e: any) {
      var selectedFacet = $(e.target).closest('.facet').attr("id");
      $(tabsHtml).find(".tab-name.capital.facet.active-tab")
        .removeClass("active-tab")
        .addClass('un-selected-type');
      $(tabsHtml).find("." + selectedFacet.replaceAll(" ", "-").split('?').join('_').split('.').join('__').split('|').join('___'))
        .removeClass("un-selected-type").addClass('active-tab');

      hostWindowInstance.tabFacetTrigger(e, selectedFacet).then((result: any) => {
        if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
          let index = result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
          if (index > -1) {
            result.splice(index, 1)
          }
        }
        let formatedTemplatesData: any = result;
        setTimeout(() => {
          $(messageHtml).find('.full-search-data-container').empty();
          if (formatedTemplatesData && formatedTemplatesData.length) {
            formatedTemplatesData.forEach((d: any) => {
              
              var showAllHTML;
              if (d.message[0].component.payload.template_type == 'searchListTemplate') {
                showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
              } else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
                showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
              } else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
                showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
              }
              $(messageHtml).find('.full-search-data-container').append(showAllHTML);
            })
          }

          if (!$(".full-search-data-container").children().length) {
            $(".empty-full-results-container").removeClass("hide");
          } else {
            if (!$(".empty-full-results-container").hasClass("hide")) {
              $(".empty-full-results-container").addClass("hide");
            }
          }
        }, 300);
      })
    });
  }
  facetReset(me: any, messageHtml: any, msgData: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    let facetObj: any = {};
    let facetData = msgData.message[0].component.payload.filterFacetData || [];
    facetObj['position'] = msgData.message[0].component.payload.facetPosition;
    facetObj['show'] = true;
    if (facetData.length && msgData.message[0].component.payload.isFilterEnabled) {
      FullSearchResultTopdownTemplate.prototype.facetsAlignTopdownClass(msgData.message[0].component.payload.facetPosition, messageHtml);
      if (facetObj.position == 'top') {
        facetData.forEach((f: any) => {
          if (!f['maxCount']) {
            f['maxCount'] = 5
          }
        });
        var dataHTML = $(FullSearchResultTopdownTemplate.prototype.getSearchFacetsTopDownTemplate('top')).tmpl({
          searchFacets: facetData,
          position: "top",
          langTranslator : msgData.message[0].component.payload.langTranslator
        });
        $(messageHtml).find("#filters-center-sec")
          .empty()
          .append(dataHTML);
          // setTimeout(function () {
          //   var facetsDataHTML = $(messageHtml).find("#filters-center-sec");
          //   hostWindowInstance.bindPerfectScroll(facetsDataHTML, ".filters-sec");
          // }, 500);
          $(dataHTML).off("click", ".more-data").on("click", ".more-data", function (e: any) {
            $(e.target).closest('.more-data').parent().removeClass('hide-more-facets');
            $(e.target).closest('.more-data').hide();
          });
        if (facetObj.show) {
          if (!$(".iffilteristop").hasClass("isTopAlignFilterAdded")) {
            $(".iffilteristop").addClass("isTopAlignFilterAdded");
          }
        } else {
          $(".iffilteristop").removeClass("isTopAlignFilterAdded");
        }
        if(!$(messageHtml).hasClass('center-align-filter')){
          $(messageHtml).addClass('center-align-filter');
        }
      } else {
        facetData.forEach((f: any) => {
          if (!f['maxCount']) {
            f['maxCount'] = 5
          }
        });
        var dataHTML = $(FullSearchResultTopdownTemplate.prototype.getSearchFacetsTopDownTemplate('left')).tmpl({
          searchFacets: facetData,
          position: "left",
          langTranslator : msgData.message[0].component.payload.langTranslator
        });
        $(messageHtml).find("#filters-left-sec")
          .empty()
          .append(dataHTML);
          setTimeout(function () {
            var facetsDataHTML = $(messageHtml).find("#filters-left-sec");
            hostWindowInstance.bindPerfectScroll(facetsDataHTML, ".filters-sec");
          }, 500);
          $(dataHTML).off("click", ".more-data").on("click", ".more-data", function (e: any) {
             $(e.target).closest('.more-data').parent().removeClass('hide-more-facets');
            $(e.target).closest('.more-data').hide();
          });
          if($(messageHtml).hasClass('center-align-filter')){
            $(messageHtml).removeClass('center-align-filter');
          }
      }
      FullSearchResultTopdownTemplate.prototype.bindFacetTriggerEvents(me, messageHtml, msgData);
      if (!hostWindowInstance.vars.isFilterModified) {
        hostWindowInstance.autoSelectFacetFilter();
      }
      hostWindowInstance.markSelectedFilters();
      
    }
    else{
      if(!$(messageHtml).hasClass('center-align-filter')){
        $(messageHtml).addClass('center-align-filter');
      }
    }

  };
  bindFacetTriggerEvents(me: any, messageHtml: any, msgData: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml)
      .off("click", ".sdk-facet-filter-data")
      .on("click", ".sdk-facet-filter-data", function (event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
      });
    // SDK checkbox
    $(messageHtml)
      .off("change", ".sdk-filter-checkbox-top-down")
      .on("change", ".sdk-filter-checkbox-top-down", function (event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        hostWindowInstance.topdownFacetCheckBoxClick(event).then((response: any) => {
          $(".all-product-details").scrollTop(0);
          if (!response.isFilterAlignedTop) {
            let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
            if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
              let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
              if (index > -1) {
                response.result.splice(index, 1)
              }
            }
            FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
            let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: response.facets,truncateText: truncateText });
            $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
            FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, response.facets, selectedFacet);
            FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, hostWindowInstance.vars.selectedFacetsList, response.isFilterAlignedTop);
            if(response.sortableFacetList && response.sortableFacetList.length){
              let sortableHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
                displaySortable: response.displaySortable});
              $(messageHtml).find('#sa-sdk-sortable-dropdown').empty().append(sortableHtml);
              FullSearchResultTopdownTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml,response.sortableFacetList)
            }
          }
        });
      });
    // SDK radio
    $(messageHtml)
      .off("change", ".sdk-filter-radio-top-down")
      .on("change", ".sdk-filter-radio-top-down", function (event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        hostWindowInstance.topdownFacetRadioClick(event).then((response: any) => {
          $(".all-product-details").scrollTop(0);
          if (response.isFilterAlignedTop) {
            FullSearchResultTopdownTemplate.prototype.applyFiltersFun(me, messageHtml);
          } else {
            let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
            if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
              let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
              if (index > -1) {
                response.result.splice(index, 1)
              }
            }
            FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
            let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: response.facets, truncateText: truncateText });
            $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
            FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, response.facets, selectedFacet);
            FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, hostWindowInstance.vars.selectedFacetsList, response.isFilterAlignedTop);
            if(response.sortableFacetList && response.sortableFacetList.length){
              let sortableHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
                displaySortable: response.displaySortable});
              $(messageHtml).find('#sa-sdk-sortable-dropdown').empty().append(sortableHtml);
              FullSearchResultTopdownTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml,response.sortableFacetList)
            }
          }
        });
      });

    //SDK Top Facet
    $(messageHtml)
      .off("click", ".filters-reset-anchor")
      .on("click", ".filters-reset-anchor", function (event: any) {
        if (!$(event.target).hasClass('enabled')) {
          return;
        }
        $(".all-product-details").scrollTop(0);
        $(".sdk-filter-checkbox-top-down").prop("checked", false);
        $(".sdk-filter-radio-top-down").prop("checked", false);
        if($('.filters-reset-anchor').hasClass('enabled')){
          $('.filters-reset-anchor').removeClass('enabled');
        }
        hostWindowInstance.clearAllFilterTopdownEvent(event).then((res: any) => {
          let tabsHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({
            facets: res.facets,
            truncateText: truncateText
          });
          $(messageHtml).find('#top-down-tab-sec').empty().append(tabsHtml);
          FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabsHtml, res.facets, 'all results');
          FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, res.result);
          if (res.isUnselectedFilter) {
            FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, res.selectedFacetsList, res.isFilterAlignedTop);
          }
          hostWindowInstance.displayDropdownFilterCount();
          if(res.sortableFacetList && res.sortableFacetList.length){
            let sortableHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownSortableFacetsTabs()).tmpl({ sortablefacets: res.sortableFacetList,
              displaySortable: res.displaySortable});
            $(messageHtml).find('#sa-sdk-sortable-dropdown').empty().append(sortableHtml);
            FullSearchResultTopdownTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml,res.sortableFacetList)
          }
          
        })
      });
    $(messageHtml)
      .off("click", ".openDropdownFacets")
      .on("click", ".openDropdownFacets", function (event: any) {
        hostWindowInstance.dropdownFilterClickEvent(event);
        $(messageHtml)
          .off("click", ".clear-btn")
          .on("click", ".clear-btn", function (event: any) {
            $(messageHtml).find(".filters-content-top-down").hide();
            hostWindowInstance.clearRadioSelectedFacets(event).then((res: any) => {
              if (res.isUnselectedFilter) {
                FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, res.selectedFacetsList, res.isFilterAlignedTop);
              }
              let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
              if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
                let index = res.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
                if (index > -1) {
                  res.result.splice(index, 1)
                }
              }
              FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, res.result);
              let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: res.facets,truncateText: truncateText });
              $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
              FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, res.facets, selectedFacet);
              if (res.isFilterAlignedTop) {
                hostWindowInstance.displayDropdownFilterCount();
              }
              let sortableHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownSortableFacetsTabs()).tmpl({ sortablefacets: res.sortableFacetList,
                displaySortable: res.displaySortable});
              $(messageHtml).find('#sa-sdk-sortable-dropdown').empty().append(sortableHtml);
              FullSearchResultTopdownTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml,res.sortableFacetList)
            });
          });
        $(messageHtml)
          .off("click", ".apply-btn")
          .on("click", ".apply-btn", function () {
            FullSearchResultTopdownTemplate.prototype.applyFiltersFun(me, messageHtml);
          });
      });
  }
  fullResultTemplateDataBind(me: any, messageHtml: any, result: any) {
    let formatedTemplatesData: any = result;
    setTimeout(() => {
      $(messageHtml).find('.full-search-data-container').empty();
      if (formatedTemplatesData && formatedTemplatesData.length) {
        formatedTemplatesData.forEach((d: any) => {
          var showAllHTML;
          if (d.message[0].component.payload.template_type == 'searchListTemplate') {
            showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
          } else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
            showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
          } else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
            showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
          }
          $(messageHtml).find('.full-search-data-container').append(showAllHTML);
        })
      }

      if (!$(".full-search-data-container").children().length) {
        $(".empty-full-results-container").removeClass("hide");
      } else {
        if (!$(".empty-full-results-container").hasClass("hide")) {
          $(".empty-full-results-container").addClass("hide");
        }
      }
      $(messageHtml).find(".content-data-sec").scrollTop(0);
    }, 300);
  }
  applyFiltersFun(me: any, messageHtml: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find(".filters-content-top-down").hide();
    hostWindowInstance.getSearchByFacetFilters().then((response: any) => {
      let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
      if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
        let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
        if (index > -1) {
          response.result.splice(index, 1)
        }
      }
      FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
      let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: response.facets, truncateText: truncateText });
      $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
      FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, response.facets, selectedFacet);
      FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, hostWindowInstance.vars.selectedFacetsList, response.isFilterAlignedTop);
      hostWindowInstance.displayDropdownFilterCount();
      if(response.sortableFacetList && response.sortableFacetList.length){
        let sortableHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
          displaySortable: response.displaySortable});
        $(messageHtml).find('#sa-sdk-sortable-dropdown').empty().append(sortableHtml);
        FullSearchResultTopdownTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml,response.sortableFacetList)
      }
      
    });
  }
  getSearchFacetsTopDownTemplate(type: any) {
    var leftSearchFacetsTemplate =
      '<script id="search_facets_tmpl" type="text/x-jqury-tmpl"> \
  <div class="filters-sec {{if position == "right"}} float-right{{/if}}">\
   {{if searchFacets.length}}\
    <div class="heading-sec">\
		<div class="title-main sdk-i18n-lang" sdk-i18n-key="sa_sdk_filters_caps">\{{html langTranslator("sa_sdk_filters_caps")}}</div>\
		<div class="clear-all filters-reset-anchor  sdk-i18n-lang" sdk-i18n-key="sa_sdk_clear_all" >\{{html langTranslator("sa_sdk_clear_all")}}</div>\
    </div>\
    {{each(i, searchFacet) searchFacets}}\
    <div class="category-wise-container">\
      <div class="group-checkbox filters-content-top-down {{if searchFacet.maxCount && searchFacet.buckets.length > searchFacet.maxCount}} hide-more-facets{{/if}}" data-facetType="${searchFacet.subtype}" data-facetName="${searchFacet.name}" data-fieldName="${searchFacet.fieldName}">\
        <div class="heading-title {{if searchFacet.showSearch == true}}display-none{{/if}}"">${searchFacet.name}<span class="float-right display-none  {{if searchFacet.maxCount && searchFacet.buckets.length > searchFacet.maxCount}}d-block{{/if}}"><img class="facet-search-icon display-none" facetFacetName="${searchFacet.name}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFYSURBVHgBrVNLUsJAEO2eiLoTbhBuQE6g3gC3UJSZhViUi8gJ9AaWCyuFLhqLApbiCcQbcAM5QtiJMmk7VsoKDPFT8jZdk+735r3MDMA/gXmNkMgF2HJ3YTHRWke/Fri97wfAcJm2E6IrQ+MFz3VL6+nqvFoid4cEjL7h+Kjp10tNv1Yu8LwUMz87uPPSoUE110FIfd9BvBCCt85ySL0DB50H6Zez/S8HCdmw0Xl5W7oxljJ+g+1zK0JIQ1dKMR3KhWF+ZFAVS8CB16KUCH5EPHWQ9yyBAsBUiktExe/oCrBiGGeWQJrbyrcKRBUoiEeWQIJ35jYiBjfUr6wj33UHV1Kipq53l0Sziw71qrILie6I5YfFYKLEtnw7TgZZYspGh2e6PrEcJDjVjZFh5QHzTCEEcu4k5H1ZX5/4NU9OoV1AfMq6zH0LeUgvHIkTL+vkjyKf92Yz+ADa8Y5Ak9HPCwAAAABJRU5ErkJggg=="><span></div>\
        <div class="input-div {{if searchFacet.showSearch !== true}}display-none{{/if}}"><input type="text" class="searchFacetInput" id="${searchFacet.name}"> <span class="float-right display-none" id="${searchFacet.name}-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACGSURBVHgB3ZK9DYAgEIURjY2RWVzFEWgtYBvXcBTcwClsFIg5osmZgEjoeNVxx/v4ySOkLDFpVTcdQ2gOMyaswj2KF+bUnDb14oNAD2ZGa06+BBt7YTYM8fUeVSEInGa1Gd0173qf2/UXAEOgDpkdnGQq+wlec8onRs1JEAhJNEjyHaQCdAGUc1yB6RityQAAAABJRU5ErkJggg=="></span></div>\
        {{each(j, bucket) searchFacet.buckets}}\
            {{if (searchFacet.subtype == "value" || searchFacet.subtype == "range") && searchFacet.multiselect }}\
            <div class="kr-sg-checkbox d-block">\
                <input {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="checkbox-custom sdk-filter-checkbox-top-down c-1" type="checkbox" name="${bucket.key}" value="${bucket.key}" fieldName="${searchFacet.fieldName}" fieldType="${searchFacet.subtype}" data-from="${bucket.from}" data-to="${bucket.to}">\
                <label for="checkbox-${i}${j}" class="checkbox-custom-label" title="${bucket.key}">${bucket.key}</label>\
                <span class="count">(${bucket.doc_count})</span>\
            </div>\
            {{/if}}\
            {{if searchFacet.subtype == "value" && !searchFacet.multiselect}}\
            <div class="kr-sg-radiobutton d-block">\
                <input {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="radio-custom sdk-filter-radio-top-down" type="radio" name="radio-top-facet-${i}"  value="${bucket.key}" fieldName="${searchFacet.fieldName}" fieldType="${searchFacet.subtype}" data-from="${bucket.from}" data-to="${bucket.to}">\
                <label for="checkbox-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key}</label>\
                <span class="count">(${bucket.doc_count})</span>\
            </div>\
            {{/if}}\
            {{if searchFacet.subtype == "range" &&  !searchFacet.multiselect}}\
            <div class="kr-sg-radiobutton d-block">\
                <input  {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="radio-custom sdk-filter-radio-top-down" type="radio" name="radio-top-facet-${i}" value="${bucket.key}" fieldName="${searchFacet.fieldName}" fieldType="${searchFacet.subtype}" data-from="${bucket.from}" data-to="${bucket.to}">\
                <label  id="checkbox-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key}</label>\
                <span class="count">(${bucket.doc_count})</span>\
            </div>\
            {{/if}}\
        {{/each}}\
        {{if searchFacet.maxCount && searchFacet.buckets.length > searchFacet.maxCount}}\
          <div class="more-data" name="${searchFacet.name}">+ ${searchFacet.buckets.length-searchFacet.maxCount} More</div> \
        {{/if}}\
        </div>\
      </div>\
    {{/each}}\
    {{/if}}\
    </div>\
  </script>';

    var topSearchFacetsTemplate =
      '<script id="top-search_facets_tmpl" type="text/x-jqury-tmpl"> \
        {{if searchFacets.length}}\
        <div class="horizantal-filter-sec">\
        {{each(i, searchFacet) searchFacets}}\
        <div class="dropdown_custom_filter">\
        <div  class="openDropdownFacets dropbtn">${searchFacet.name} <span class="count ${searchFacet.fieldName}" style="display:none">0</span>  <img class="down-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACHSURBVHgBbY6xDYMwEEX/yQuc5QUOmfRZIRskEyQjZJyU6VJmBGoqREcHJVT2AsiAhQRGvO7+vdM/JVleMevBe9fgBBF7Z21+itmUIPzZ6N47VyeStU+APgj0WK8uV8lsK5K/99Lc5pbdMtNWIQJSBYi+MQjhhTDeuplETOQobhLOn4/wMZ8As5kn7D+3/a0AAAAASUVORK5CYII="><img class="up-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACQSURBVHgBhY7BDYJQDIb/ggM8wgI14llXYBJ1A48e3YAVvHpyBHUC4gCYTmDeAGrpAw48LnxJk+bv16aEEczskKRV6OXdHMazJJJocccfFIqXRd1lAxRJqi+RZt9nqwuINtBvKSKeTGKTbiY9TTrGrxRnkO6gvzJ1WV5D6WrSCRO8/zycyzO7XNnWeosZgtMCupEtrTPwmiYAAAAASUVORK5CYII="></div>\
        <div id="myDropdown" class="dropdown-content filters-content-top-down myDropdown-${i}" data-facetType="${searchFacet.subtype}" data-facetName="${searchFacet.name}" data-fieldName="${searchFacet.fieldName}">\
        {{each(j, bucket) searchFacet.buckets}}\
        <div class="option-text">\
        {{if (searchFacet.subtype == "value" || searchFacet.subtype == "range" ) && searchFacet.multiselect }}\
        <div class="kr-sg-checkbox d-block">\
        <input {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="checkbox-custom sdk-filter-checkbox-top-down" type="checkbox" name="${bucket.key}" value="${bucket.key}" fieldName="${searchFacet.fieldName}" fieldType="${searchFacet.subtype}" data-from="${bucket.from}" data-to="${bucket.to}">\
        <label for="checkbox-${i}${j}" class="checkbox-custom-label" title="${bucket.key}">${bucket.key}</label>\
            <span class="count">(${bucket.doc_count})</span>\
          </div>\
          {{/if}}\
            {{if searchFacet.subtype == "value" && !searchFacet.multiselect}}\
            <div class="kr-sg-radiobutton d-block">\
              <input {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="radio-custom sdk-filter-radio-top-down" type="radio" name="radio-top-facet-${i}"  value="${bucket.key}" fieldName="${searchFacet.fieldName}" fieldType="${searchFacet.subtype}">\
                <label for="checkbox-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key}</label>\
                <span class="count">(${bucket.doc_count})</span>\
              </div>\
              {{/if}}\
              {{if searchFacet.subtype == "range" && !searchFacet.multiselect }}\
              <div class="kr-sg-radiobutton d-block">\
                <input {{if bucket.auto_select}}checked{{/if}}  id="checkbox-${i}${j}" class="radio-custom sdk-filter-radio-top-down" type="radio" name="radio-top-facet-${i}" value="${bucket.key}" fieldName="${searchFacet.fieldName}" fieldType="${searchFacet.subtype}">\
                  <label  id="checkbox-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key}</label>\
                  <span class="count">(${bucket.doc_count})</span>\
                </div>\
                {{/if}}\
        </div>\
        {{/each}}\
        <div class="action-bar">\
        {{if !searchFacet.multiselect}}<button class="btn clear-btn"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_clear">{{html langTranslator("sa_sdk_clear")}}</span>\</button>{{/if}}\
        {{if searchFacet.multiselect}} <button class="apply-btn sdk-i18n-lang" sdk-i18n-key="sa_sdk_apply">{{html langTranslator("sa_sdk_apply")}}</button>\{{/if}}\
      </div>\
        </div>\
        </div>\
        {{/each}}\
        {{if searchFacets.length>4}}\
        <div class="h-scroll-filter">\
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAYAAACulacQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB9SURBVHgBpZDBDUBAEEX/EvcVDQzLXQk6EBUoRTtuzk5qUAFHJ7YAybISEmvFwT9MJnl/MjMfdCjOYJEDeBwMDQlRmtCVcp44D9q9r3ngT3JZ+gvq8mZwT5fNwMw9REkKpjooFM7zRJUDSgLreJ+K4opCMejn/oI9HSv40gaMjzPqJ5ysbwAAAABJRU5ErkJggg==">\
        </div>\
        {{/if}}\
        </div>\
        {{/if}}\
               </script>';
    switch (type) {
      case "left":
        return leftSearchFacetsTemplate;
      case "top":
        return topSearchFacetsTemplate;
      case "right":
        return leftSearchFacetsTemplate;
    }
  };
  facetsAlignTopdownClass(type: any, messageHtml: any) {
    if (type === "top") {
      // center align facets top down//
      $(messageHtml).addClass("center-align-filter");
      $(messageHtml).removeClass("left-align-filter");
      $(messageHtml).removeClass("right-align-filter");
      //center align facets top down//
    } else {
      // left align facets top down//
      $(messageHtml).addClass("left-align-filter");
      $(messageHtml).removeClass("center-align-filter");
      $(messageHtml).removeClass("right-align-filter");
      //left align facets top down//
    }
  };
  searchFacetsList(me: any, messageHtml: any, selectedFacetsList: any, isTopFacet: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    var dataHTML = $(FullSearchResultTopdownTemplate.prototype.getSelectedFactedListTopDownTemplate()).tmplProxy({
      selectedFacets: selectedFacetsList,
      isTopFacets: isTopFacet
    });
    $(messageHtml).find("#show-filters-added-data").empty().append(dataHTML);
    if ((selectedFacetsList || []).length) {
      $(messageHtml).find("#show-filters-added-data").show();
      $(messageHtml).find("#show-filters-added-data").removeClass("display-none");
      $(messageHtml).find(".content-data-sec").addClass("filter-added");
    } else {
      hostWindowInstance.vars.selectedFiltersArr = [];
      hostWindowInstance.vars.filterObject = [];
      $(messageHtml).find("#show-filters-added-data").hide();
      $(messageHtml).find("#show-filters-added-data").addClass("display-none");
      $(messageHtml).find(".content-data-sec").removeClass("filter-added");
    }

    if ($(messageHtml).find("#show-filters-added-data").height() > 55) {
      $(messageHtml).find(".content-data-sec").addClass("facets-height-isMore");
    } else {
      $(messageHtml).find(".content-data-sec").removeClass("facets-height-isMore");
    }
    FullSearchResultTopdownTemplate.prototype.bindRemoveFilterClickEvent(me, messageHtml);
  };
  getSelectedFactedListTopDownTemplate() {
    var selectedFacetTemplate =
      '<script id="selected_facet_tmpl" type="text/x-jqury-tmpl"> \
      {{if selectedFacets.length}} \
        <div class="{{if isTopFacets}}top-down-top-facets-list {{/if}} {{if !isTopFacets}}facets-padding{{/if}}">\
        {{each(index, facet) selectedFacets}} \
        <div class="filter-tag-content filters-content-top-down" data-facetType="${facet.fieldType}" data-facetName="${facet.name}" data-fieldName="${facet.fieldName}">\
        <span class="filter-tag-name">${facet.name}</span>\
          <span class="close-filter-tag" id="${facet.id}" >\
              <img name="${facet.name}" value="${facet.name}" data-from="${facet.from}" data-to="${facet.to}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACdSURBVHgBbZHRDcIwDERju+zTSizSCWgl8sFM+Ug26AwsUDIGO9A05AChprV/osjPd2eZLtfbg2gZg3PRKDUMts3SeAaUV5kGa1sVYpkoLaPEeX525+4OGC/+FbSmPgQX6T9dFAETp968jNlC6FNl9YNNLo0NhOIqVFEC9Bk/1Xn5ELwowX6/oGjBtQVpD2mZ4cBZ2GsQCkf4xmj8GzsLeh0gnVcbAAAAAElFTkSuQmCC">\
                </span>\
                </div>\
        {{/each}} \
        </div>\
        {{if isTopFacets}}\
        <div class="filters-reset" style="padding: 4px 10px;">\
              <div class="filters-reset-anchor"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_clear_all">{{html langTranslator("sa_sdk_clear_all")}}</span>\</div>\
        </div>\
        {{/if}}\
      {{/if}} \
      </script>';
    return selectedFacetTemplate;
  }
  bindRemoveFilterClickEvent(me: any, messageHtml: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find("#show-filters-added-data")
      .off("click", ".close-filter-tag")
      .on("click", ".close-filter-tag", function (event: any) {
        hostWindowInstance.removeFilterClickEvent(event).then((res: any) => {
          if (res.isUnselectedFilter) {
            FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, res.selectedFacetsList, res.isFilterAlignedTop);
          }
          let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
          if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
            let index = res.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
            if (index > -1) {
              res.result.splice(index, 1)
            }
          }
          FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, res.result);
          let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: res.facets ,truncateText: truncateText});
          $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
          FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, res.facets, selectedFacet);
          if (res.isFilterAlignedTop) {
            hostWindowInstance.displayDropdownFilterCount();
          }
        })
      });
  }
   truncateText(val:any) {
    var textMsg = val;
    textMsg = textMsg.split(' ');
    var truncatedText = '';
    textMsg.every((text:any) => {
      if ((truncatedText + (truncatedText ? ' ' : '') + text).length > 20) {
        if (!truncatedText.length) {
          truncatedText = text.slice(0, 19) + ' ...';
        } else {
          truncatedText = truncatedText + ' ...';
        }
        return false;
      } else {
        if (truncatedText && truncatedText.length > 20) {
          truncatedText = truncatedText + ' ...';
          return false;
        } else {
          if ((truncatedText + (truncatedText ? ' ' : '') + text).length > 20) {
            truncatedText = truncatedText + ' ...';
            return false;
          } else {
            truncatedText = truncatedText + (truncatedText ? ' ' : '') + text;
          }
        }
      }
      return true;
    })
    return truncatedText;
  }
  getTopDownSortableFacetsTabs() {
    var sortableFacets = '<script id="top-down-sortable-tabs-template" type="text/x-jqury-tmpl">\
                              <div class="dropdown_sortable_filter">\
                              <div  class="sa-sortable-dropbtn"><span id="sa-select-sort-option">{{if displaySortable && displaySortable.name}} {{= displaySortable.name}}  {{else}} <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_sort_by">{{html langTranslator("sa_sdk_sort_by")}}</span> {{/if}}</span></div>\
                              <div id="myDropdown" class="sa-sortable-dropdown">\
                                {{each(key, facet) sortablefacets }}\
                                  <div class="option-text sa-sortable-facet-options text-truncate" value="{{= JSON.stringify(facet)}}" name="{{= facet.name}}">{{= facet.name}}</div>\
                                  {{/each}}\
                                </div>\
                              </div>\
                            </script>'
    return sortableFacets;
  }
  bindSortableFacetClickEvent(me: any, messageHtml: any, sortableHtml: any, facets: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(sortableHtml).off('click','.clear-sort-by').on('click','.clear-sort-by', function (event:any) {
      event.stopPropagation();
      $(sortableHtml).find('#sa-select-sort-option').html('');
      hostWindowInstance.sortableFacetClick(event,'').then((response: any) => {
        if (!response.isFilterAlignedTop) {
          let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
          if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
            let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
            if (index > -1) {
              response.result.splice(index, 1)
            }
          }
          FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
          let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: response.facets,truncateText: truncateText });
          $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
          FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, response.facets, selectedFacet);
          FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, hostWindowInstance.vars.selectedFacetsList, response.isFilterAlignedTop);
        }
      });
      $(sortableHtml).find('.sa-sortable-dropdown').hide();
    })
    $(sortableHtml).off('click','.sa-sortable-dropbtn').on('click','.sa-sortable-dropbtn', function (e:any) {
      $(sortableHtml).find('.sa-sortable-dropdown').show();

      setTimeout(() => {
        $(sortableHtml).off('click','.sa-sortable-facet-options').on('click','.sa-sortable-facet-options', function (event:any) {
          event.stopPropagation();
          $(sortableHtml).find('#sa-select-sort-option').html($(event.currentTarget).closest('.sa-sortable-facet-options').attr('name'));
          let displaySortable = JSON.parse($(event.currentTarget).closest('.sa-sortable-facet-options').attr('value'));
          hostWindowInstance.sortableFacetClick(event,displaySortable).then((response: any) => {
            if (!response.isFilterAlignedTop) {
              let selectedFacet = $(messageHtml).find(".tab-name.facet.active-tab").attr('id');
              if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
                let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
                if (index > -1) {
                  response.result.splice(index, 1)
                }
              }
              FullSearchResultTopdownTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
              let tabHtml = $(FullSearchResultTopdownTemplate.prototype.getTopDownFacetsTabs()).tmpl({ facets: response.facets,truncateText: truncateText });
              $(messageHtml).find('#top-down-tab-sec').empty().append(tabHtml);
              FullSearchResultTopdownTemplate.prototype.bindTabsClickEvent(me, messageHtml, tabHtml, response.facets, selectedFacet);
              FullSearchResultTopdownTemplate.prototype.searchFacetsList(me, messageHtml, hostWindowInstance.vars.selectedFacetsList, response.isFilterAlignedTop);
            }
          });
          $(sortableHtml).find('.sa-sortable-dropdown').hide();
        })
      }, 1000)

    });
   }
   bindBackToSearchClickEvent(me: any, messageHtml: any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).off("click", ".back-search").on("click", ".back-search", function (e: any) {
    hostWindowInstance.backToSearchClickEvent();
    $("body").removeClass('.debug');
    $(".debug-results").css("display","none");
    });
  }
  feedBackResultEvents(me: any, messageHtml: any,msgData:any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find('.feedback-top-down-full').off('click','.thumb-up-full-top').on('click','.thumb-up-full-top', function (event:any) {
    if($(event.target).hasClass('helpfull-title')){
    return;
    }
    const type = event.target.alt === 'thumb-down' ? 'thumbsDown' : 'thumb-up' ? 'thumbsUp' : 'thumbsUp';
    const text = $('.search-top-down').val();
    if (type === 'thumbsUp') {
    $('.thumbs-up-top-down-black').hide();
    if(!$('.thumbs-up-top-down-blue').is(":visible")){
      hostWindowInstance.updateFeedBackResult(type, text,'query');
      }
    $('.thumbs-up-top-down-blue').show();
    $('.thumbs-down-top-down-black').show();
    $('.thumbs-up-top-down-red').hide();
    }
    else if (type === 'thumbsDown') {
    $('.thumbs-down-top-down-black').hide();
    if(!$('.thumbs-up-top-down-red').is(":visible") ){
    let feedbackMsgData = {
      message: [{
        component: {
          type: 'template',
          payload: {
            template_type: "feedbackFormTemplate",
            query: hostWindowInstance?.vars?.searchObject.searchText || '',
            feedBackType:'query',
            langTranslator:msgData.message[0].component.payload.langTranslator
          }
        }
      }]
    };
    $(messageHtml).find('#query-feedback').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
    }
    $('.thumbs-up-top-down-red').show();
    $('.thumbs-up-top-down-black').show();
    $('.thumbs-up-top-down-blue').hide();
    }
    });
    $('.thumbs-up-top-down-blue, .thumbs-up-top-down-red').hide();
    $('.thumbs-up-top-down-black,.thumbs-down-top-down-black').show();
    }

  bindCustomizePreviewClickEvent(me: any, messageHtml: any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find(".custom-header-nav-link-item")
  .off("click").on("click", function (e:any) {
    hostWindowInstance.customizePreviewBtnClick(e,true).then((result: any) => {
      let formatedTemplatesData: any = result;
      var selectedFacet =$(messageHtml).find(".tab-name.capital.facet.active-tab").closest('.facet').attr("id");
      setTimeout(() => {
        $(messageHtml).find('.full-search-data-container').empty();
        if (formatedTemplatesData && formatedTemplatesData.length) {
          formatedTemplatesData.forEach((d: any) => {
            var showAllHTML;
            d.message[0].component.payload['selectedFacet'] = selectedFacet;
            if (d.message[0].component.payload.template_type == 'searchListTemplate') {
              showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
            } else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
              showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
            } else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
              showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
            }
            $(messageHtml).find('.full-search-data-container').append(showAllHTML);
          })
        }

        if (!$(".full-search-data-container").children().length) {
          $(".empty-full-results-container").removeClass("hide");
        } else {
          if (!$(".empty-full-results-container").hasClass("hide")) {
            $(".empty-full-results-container").addClass("hide");
          }
        }
      }, 300);
    })
  })
  }
  bindQueryAnalyticsClickEvent(me: any, messageHtml: any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find(".show_insights_top_down")
      .off("click", ".query_analytics_top_down")
      .on("click", ".query_analytics_top_down", function (event:any,messageHtml:any) {
        event.preventDefault();
        event.stopImmediatePropagation();
        hostWindowInstance.queryAnalyticsClickEvent(event);
      });
  }
 appendSnippetData(me: any, messageHtml: any, msgData:any){
  let snippetMsgData = {
    message: [{
      component: {
        type: 'template',
        payload: {
          template_type: msgData.message[0].component.payload.snippetData.template_type,
          helpers: msgData.message[0].component.payload.helpers,
          snippetData: msgData.message[0].component.payload.snippetData,
          feedbackDisplay:msgData.message[0].component.payload.displayFeedback.smartAnswer,
          langTranslator: msgData.message[0].component.payload.langTranslator
        }
      }
    }]
  };
  if(['paragraph_snippet','answer_snippet'].includes(msgData.message[0].component.payload.snippetData.template_type)){
    $(messageHtml).find('#snippet-demo-template').empty().append(me.snippetParagraphTemplateObj.renderMessage.bind(me, snippetMsgData));
  }else if(['image_snippet'].includes(msgData.message[0].component.payload.snippetData.template_type)){
    $(messageHtml).find('#snippet-demo-template').empty().append(me.snippetImageTemplateObj.renderMessage.bind(me, snippetMsgData));
  }else if(['image_answer_snippet'].includes(msgData.message[0].component.payload.snippetData.template_type)){
    $(messageHtml).find('#snippet-demo-template').empty().append(me.snippetImageAnswerTemplateObj.renderMessage.bind(me, snippetMsgData));
  }else if(['citation_snippet'].includes(msgData.message[0].component.payload.snippetData.template_type)){
    $(messageHtml).find('#snippet-demo-template').empty().append(me.snippetCitationTemplateObj.renderMessage.bind(me, snippetMsgData));
  }else if(['active_citation_snippet'].includes(msgData.message[0].component.payload.snippetData.template_type)){
    $(messageHtml).find('#snippet-demo-template').empty().append(me.snippetActiveCitationTemplateObj.renderMessage.bind(me, snippetMsgData));
  }else{
    $(messageHtml).find('#snippet-demo-template').empty().append(me.snippetListTemplateObj.renderMessage.bind(me, snippetMsgData));
  }
 }
}
var truncateText = FullSearchResultTopdownTemplate.prototype.truncateText;
export default FullSearchResultTopdownTemplate;

