import helpers from '../../../utils/helpers';
import './fullsearchResultsTemplate.scss';
import customTemplate from '../../templateManager';
import searchListViewTemplate from '../../templates/searchListViewTemplate/searchListViewTemplate';
import searchGridViewTemplate from '../../templates/searchGridViewTemplate/searchGridViewTemplate';
import searchCarouselViewTemplate from '../../templates/searchCarouselViewTemplate/searchCarouselViewTemplate';
import FeedBackFormTemplate from '../feedBackFormTemplate/feedBackFormTemplate';
import korejquery from "../../../libs/korejquery";
const $ = korejquery;
class FullSearchResultsTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers?.helpers;
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'fullSearchResultsTemplate') {
      if (!msgData.message[0].component.payload.helpers) {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      if (msgData.message[0].component.payload.langTranslator) {
         me.langTranslator = msgData.message[0].component.payload.langTranslator;
      }
      me.messageHtml = $(FullSearchResultsTemplate.prototype.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
      FullSearchResultsTemplate.prototype.bindEvents(me, me.messageHtml, msgData);
      me.customTemplateObj = new customTemplate(me);
      me.listTemplateObj = new searchListViewTemplate();
      me.gridTemplateObj = new searchGridViewTemplate();
      me.carouselTemplateObj = new searchCarouselViewTemplate();
      me.feedBackTemplateObj = new FeedBackFormTemplate();
      return me.messageHtml;
    }
  }
  bindEvents(me: any, messageHtml: any, msgData: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    me.searchConfigurationCopy = msgData.message[0].component.payload.searchConfigurationCopy;
    let formatedTemplatesData: any = msgData.message[0].component.payload.groupData;

    setTimeout(() => {
      $(messageHtml).find('.full-search-data-container').empty();
      if (formatedTemplatesData && formatedTemplatesData.length) {
        formatedTemplatesData.forEach((d: any) => {
          d.message[0].component.payload.langTranslator = msgData.message[0].component.payload.langTranslator
          let showAllHTML: any;
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
      const isSearchSDK = document.body.className.match('sdk-body');
      if (isSearchSDK === null) {
        $('.show-all-results-outer-wrap').css({ 'left': '200px', 'box-shadow': '0 10px 25px 0 rgb(0 0 0 / 20%)' });
      }
      if(msgData.message[0].component.payload.isDev && $('body').hasClass('debug')){
        $('.show-all-results-outer-wrap').css('z-index','99999')
       }
      if(msgData.message[0].component.payload.displayFeedback){
        FullSearchResultsTemplate.prototype.feedBackResultEvents(me, messageHtml,msgData.message[0].component.payload.feedbackData,msgData);
        }
        if($('.filter-sec-tab').height()>30){
          $('.scroll-top-container').css('bottom', 41);
          $('.data-body-sec').css('height','calc(100% - 166px)');
        }
        $(messageHtml).find('.scroll-top-container').css('display', 'none');
        $(messageHtml).find(".data-body-sec").off('scroll').on('scroll', function () {
              if ( $(messageHtml).find('.data-body-sec').scrollTop() > 50) {
                $(messageHtml).find('.scroll-top-container').css('left', ( $(messageHtml).find('.show-all-results-outer-wrap').width() / 2) +  $(messageHtml).find('.show-all-results-outer-wrap').position().left)
                $(messageHtml).find('.scroll-top-container').css('display', 'flex');
              } else {
                $(messageHtml).find('.scroll-top-container').css('display', 'none');
              }
            })
            $(messageHtml).find(".title-scroll-top").off('click').on('click', function () {
              $(messageHtml).find(".data-body-sec").scrollTop(0);
            });
    }, 300);
    let tabHtml = $(FullSearchResultsTemplate.prototype.getBottomupTab()).tmpl({ facets: msgData.message[0].component.payload.facets, truncateText: truncateText  });
    $(messageHtml).find('#sdk-bottomup-tab-container').empty().append(tabHtml);
    FullSearchResultsTemplate.prototype.bindTabsClickEvent(me, messageHtml, 'all results');
    FullSearchResultsTemplate.prototype.facetReset(me, messageHtml, msgData);
    setTimeout(() => {
    if((hostWindowInstance.vars.selectedFiltersArr ||[]).length){
      let filterCountHtml = $(FullSearchResultsTemplate.prototype.getFilterCountTemplate()).tmpl({ count: (hostWindowInstance.vars.selectedFiltersArr ||[]).length });
      $(messageHtml).find('#filter-count-container').empty().append(filterCountHtml);
      FullSearchResultsTemplate.prototype.filterCloseEvent(messageHtml, me);
    }
  }, 100);
    if(msgData.message[0].component.payload.sortableFacetList && msgData.message[0].component.payload.sortableFacetList.length){
      let sortableHtml = $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsTabs()).tmpl({ sortablefacets: msgData.message[0].component.payload.sortableFacetList,
        displaySortable: msgData.message[0].component.payload.displaySortable, langTranslator:me.langTranslator});
      $(messageHtml).find('#sa-sdk-sortable-dropdown-bottom-up').empty().append(sortableHtml);
      let sortableAddedListHtml =  $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsAddedlist()).tmpl({
        displaySortable: msgData.message[0].component.payload.displaySortable});
      $(messageHtml).find('#sa-sdk-sortable-facets-added-list').empty().append(sortableAddedListHtml);
      FullSearchResultsTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml, 'all results',sortableAddedListHtml);
    }
    $(messageHtml)
    .off("click", ".show-all-results-outer-wrap, .show-all-results-outer-wrap *")
    .on("click", ".show-all-results-outer-wrap, .show-all-results-outer-wrap *", function () {
       hostWindowInstance.toggleSeeAllZindex();
    });
    $(messageHtml)
      .off("click", "#btn-close-show-all")
      .on("click", "#btn-close-show-all", function () {
        $("#show-all-results-container").css("display", "none");
        $(".show-all-results-outer-wrap").css("display", "none");
        $(".search-container").removeClass("bottom-up-results-showing");
        $("#searchChatContainer").removeClass("bgfocus");
        $(".search-body").addClass("hide");
        $("#show-all-results-container").attr("isCached", "false");
      });
      FullSearchResultsTemplate.prototype.bindCustomizePreviewClickEvent(me,messageHtml);
  }
  getTemplateString(type: any) {
    var fullSearchResultsTemplate = '<script type="text/x-jqury-tmpl">\
    <div>\
      <div class="show-all-results-outer-wrap" id="">\
      {{if displayFeedback?.queryLevel == true}}\
      <div class="feedback-template-positions if-live-search-top-down bottom-up-show-all-full">\
      <span class="helpfull-title sdk-i18n-lang" sdk-i18n-key="sa_sdk_was_this_helpful">{{html langTranslator("sa_sdk_was_this_helpful")}}</span>\
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjgwNTcgNy41ODMzM0MxMy44MDU3IDcuMTMzIDEzLjYzMzQgNi43MjcgMTMuMzU3OCA2LjQxNjY3QzEzLjYzMzQgNi4xMDYzMyAxMy44MDU3IDUuNzAwMzMgMTMuODA1NyA1LjI1QzEzLjgwNTcgNC4yODUxNyAxMy4wMzI4IDMuNSAxMi4wODMxIDMuNUg3LjU0ODIxTDcuOTY5NjYgMi4yNEM4LjA5ODI4IDEuNzkwODMgOC4wNDc3NSAxLjMxODMzIDcuODI2MTEgMC45MDg4MzVDNy42MDQ0OCAwLjQ5OTMzNSA3LjIzOTMgMC4yMDA2NjggNi43OTgzMyAwLjA3MDAwMTFDNS45ODg3MyAtMC4xNjQ0OTkgNS4xNzEwOSAwLjE5MTMzNSA0LjU3ODU0IDEuMTJMMi40NTk4IDQuNjY2NjdIMFYxNEgyLjcyNzM3VjEzLjk3MDhDMi43NzMzIDEzLjk4MzcgMi44MTkyNCAxNCAyLjg3MDkxIDE0SDEwLjkzNDdDMTEuODg0NCAxNCAxMi42NTczIDEzLjIxNDggMTIuNjU3MyAxMi4yNUMxMi42NTczIDExLjk4NjMgMTIuNTk1MyAxMS43MzkgMTIuNDkxOSAxMS41MTM4QzEzLjA5NDggMTEuMjQwOCAxMy41MTg2IDEwLjYyOTUgMTMuNTE4NiA5LjkxNjY3QzEzLjUxODYgOS41Mzk4MyAxMy4zOTggOS4xOTIxNyAxMy4xOTgyIDguOTA2MzNDMTMuNTY2OCA4LjU4NTUgMTMuODA1NyA4LjExNDE3IDEzLjgwNTcgNy41ODMzM1pNMS4xNDgzNyA1LjgzMzMzSDIuMjk2NzNWMTIuODMzM0gxLjE0ODM3VjUuODMzMzNaTTEwLjkzNDcgMTIuODMzM0gzLjQ0NTFWNS4yNjc1TDUuNTUxMiAxLjc0MTgzQzUuOTE3NTMgMS4xNjY2NyA2LjIwNjkyIDEuMTY2NjcgNi4zMTYwMSAxLjE2NjY3QzYuMzY5OTkgMS4xNjY2NyA2LjQyNTExIDEuMTc0ODMgNi40Nzc5MyAxLjE5MTE3QzYuNzgxMSAxLjI3OTgzIDYuOTU2OCAxLjYwNDE3IDYuODc1MjcgMS44OUw2LjIwMzQ3IDMuODk2NjdDNi4xNDI2MSA0LjA3MjgzIDYuMTcxMzIgNC4yNyA2LjI3OTI3IDQuNDIyODNDNi4zODcyMSA0LjU3NTY3IDYuNTYwNjEgNC42NjY2NyA2Ljc0NjY1IDQuNjY2NjdIMTIuMDgzMUMxMi40MDAxIDQuNjY2NjcgMTIuNjU3MyA0LjkyOTE3IDEyLjY1NzMgNS4yNUMxMi42NTczIDUuNTcwODMgMTIuNDAwMSA1LjgzMzMzIDEyLjA4MzEgNS44MzMzM0gxMC4zNjA2VjdIMTIuMDgzMUMxMi40MDAxIDcgMTIuNjU3MyA3LjI2MjUgMTIuNjU3MyA3LjU4MzMzQzEyLjY1NzMgNy45MDQxNyAxMi40MDAxIDguMTY2NjcgMTIuMDgzMSA4LjE2NjY3SDEwLjM2MDZWOS4zMzMzM0gxMS43OTZDMTIuMTEzIDkuMzMzMzMgMTIuMzcwMiA5LjU5NTgzIDEyLjM3MDIgOS45MTY2N0MxMi4zNzAyIDEwLjIzNzUgMTIuMTEzIDEwLjUgMTEuNzk2IDEwLjVIMTAuMzYwNlYxMS42NjY3SDEwLjkzNDdDMTEuMjUxNyAxMS42NjY3IDExLjUwODkgMTEuOTI5MiAxMS41MDg5IDEyLjI1QzExLjUwODkgMTIuNTcwOCAxMS4yNTE3IDEyLjgzMzMgMTAuOTM0NyAxMi44MzMzWiIgZmlsbD0iIzlBQTBBNiIvPgo8L3N2Zz4K" class="thumb-up thumb-up-full-top thumbs-up-top-down-black" alt="thumb-up"/>\
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjgwNTcgNy41ODMzM0MxMy44MDU3IDcuMTMzIDEzLjYzMzQgNi43MjcgMTMuMzU3OCA2LjQxNjY3QzEzLjYzMzQgNi4xMDYzMyAxMy44MDU3IDUuNzAwMzMgMTMuODA1NyA1LjI1QzEzLjgwNTcgNC4yODUxNyAxMy4wMzI4IDMuNSAxMi4wODMxIDMuNUg3LjU0ODIxTDcuOTY5NjYgMi4yNEM4LjA5ODI4IDEuNzkwODMgOC4wNDc3NSAxLjMxODMzIDcuODI2MTEgMC45MDg4MzVDNy42MDQ0OCAwLjQ5OTMzNSA3LjIzOTMgMC4yMDA2NjggNi43OTgzMyAwLjA3MDAwMTFDNS45ODg3MyAtMC4xNjQ0OTkgNS4xNzEwOSAwLjE5MTMzNSA0LjU3ODU0IDEuMTJMMi40NTk4IDQuNjY2NjdIMFYxNEgyLjcyNzM3VjEzLjk3MDhDMi43NzMzIDEzLjk4MzcgMi44MTkyNCAxNCAyLjg3MDkxIDE0SDEwLjkzNDdDMTEuODg0NCAxNCAxMi42NTczIDEzLjIxNDggMTIuNjU3MyAxMi4yNUMxMi42NTczIDExLjk4NjMgMTIuNTk1MyAxMS43MzkgMTIuNDkxOSAxMS41MTM4QzEzLjA5NDggMTEuMjQwOCAxMy41MTg2IDEwLjYyOTUgMTMuNTE4NiA5LjkxNjY3QzEzLjUxODYgOS41Mzk4MyAxMy4zOTggOS4xOTIxNyAxMy4xOTgyIDguOTA2MzNDMTMuNTY2OCA4LjU4NTUgMTMuODA1NyA4LjExNDE3IDEzLjgwNTcgNy41ODMzM1pNMS4xNDgzNyA1LjgzMzMzSDIuMjk2NzNWMTIuODMzM0gxLjE0ODM3VjUuODMzMzNaTTEwLjkzNDcgMTIuODMzM0gzLjQ0NTFWNS4yNjc1TDUuNTUxMiAxLjc0MTgzQzUuOTE3NTMgMS4xNjY2NyA2LjIwNjkyIDEuMTY2NjcgNi4zMTYwMSAxLjE2NjY3QzYuMzY5OTkgMS4xNjY2NyA2LjQyNTExIDEuMTc0ODMgNi40Nzc5MyAxLjE5MTE3QzYuNzgxMSAxLjI3OTgzIDYuOTU2OCAxLjYwNDE3IDYuODc1MjcgMS44OUw2LjIwMzQ3IDMuODk2NjdDNi4xNDI2MSA0LjA3MjgzIDYuMTcxMzIgNC4yNyA2LjI3OTI2IDQuNDIyODNDNi4zODcyMSA0LjU3NTY3IDYuNTYwNjEgNC42NjY2NyA2Ljc0NjY1IDQuNjY2NjdIMTIuMDgzMUMxMi40MDAxIDQuNjY2NjcgMTIuNjU3MyA0LjkyOTE3IDEyLjY1NzMgNS4yNUMxMi42NTczIDUuNTcwODMgMTIuNDAwMSA1LjgzMzMzIDEyLjA4MzEgNS44MzMzM0gxMC4zNjA2VjdIMTIuMDgzMUMxMi40MDAxIDcgMTIuNjU3MyA3LjI2MjUgMTIuNjU3MyA3LjU4MzMzQzEyLjY1NzMgNy45MDQxNyAxMi40MDAxIDguMTY2NjcgMTIuMDgzMSA4LjE2NjY3SDEwLjM2MDZWOS4zMzMzM0gxMS43OTZDMTIuMTEzIDkuMzMzMzMgMTIuMzcwMiA5LjU5NTgzIDEyLjM3MDIgOS45MTY2N0MxMi4zNzAyIDEwLjIzNzUgMTIuMTEzIDEwLjUgMTEuNzk2IDEwLjVIMTAuMzYwNlYxMS42NjY3SDEwLjkzNDdDMTEuMjUxNyAxMS42NjY3IDExLjUwODkgMTEuOTI5MiAxMS41MDg5IDEyLjI1QzExLjUwODkgMTIuNTcwOCAxMS4yNTE3IDEyLjgzMzMgMTAuOTM0NyAxMi44MzMzWiIgZmlsbD0iIzBENkVGRCIvPgo8L3N2Zz4K" class="thumb-up thumb-up-full-top thumbs-up-top-down-blue" alt="thumb-up"/>\
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjkxNDcgMEMxMS45NjU2IDAgMTIuMDE1MSAwLjAwNjUzMzgxIDEyLjA2MjIgMC4wMTg4MDk0TDEyLjA2MDUgMEgxNC44MzEzVjkuMzMzMzNIMTIuMzMxMkwxMC4xNjk5IDEyLjg5NDJDOS43MDY2NiAxMy42MDgxIDkuMTI5NDMgMTQgOC40MTQ2NiAxNEM4LjI1MDcxIDE0IDguMDg1MiAxMy45NzY2IDcuOTI1MjMgMTMuOTMwMkM3LjA1MjE3IDEzLjY3NjUgNi41Mjg5NSAxMi44MDAzIDYuNzAxNzYgMTEuOTAzN0w2Ljc0MjQgMTEuNzM1NUw3LjE2MTY2IDEwLjVIMi41NTU2NkMxLjY0NjMzIDEwLjUgMC44OTg1MTEgOS44MDU2NyAwLjgxMzY3OCA4LjkxODQ4TDAuODA1NjY0IDguNzVDMC44MDU2NjQgOC4zMDEzNCAwLjk3NDY4NyA3Ljg5MjAxIDEuMjUyNSA3LjU4MjIyQzAuOTc0Mjc2IDcuMjczNjYgMC44MDU2NjQgNi44NjQ3OCAwLjgwNTY2NCA2LjQxNjY3QzAuODA1NjY0IDUuODg1NDkgMS4wNDI1OCA1LjQwOTQzIDEuNDE2NDYgNS4wODg0M0MxLjIxNTQxIDQuODA1ODYgMS4wOTczMyA0LjQ1ODMzIDEuMDk3MzMgNC4wODMzM0MxLjA5NzMzIDMuMzcwNjYgMS41MjM4MSAyLjc1NzIgMi4xMzUzNyAyLjQ4NDM0QzIuMDMwNCAyLjI2MjQzIDEuOTcyMzMgMi4wMTI5NyAxLjk3MjMzIDEuNzVDMS45NzIzMyAwLjg0MDY2NyAyLjY2NjY2IDAuMDkyODQ2NyAzLjU1Mzg1IDAuMDA4MDE0MjVMMy43MjIzMyAwSDExLjkxNDdaTTQuMzMxMzMgN1Y4LjE2NjY3SDIuNTU1NjZDMi4yMzM4MyA4LjE2NjY3IDEuOTcyMzMgOC40MjgxNyAxLjk3MjMzIDguNzVDMS45NzIzMyA5LjAzNjA3IDIuMTc4OTUgOS4yNzQ0OCAyLjQ1MDkgOS4zMjM5MkwyLjU1NTY2IDkuMzMzMzNINy45NzcxNkM4LjM0MzUxIDkuMzMzMzMgOC42MTA0MSA5LjY2MzM5IDguNTUzMjMgMTAuMDA5OEw4LjUyOTQzIDEwLjEwNDVMNy44NTQ4MyAxMi4wODYxQzcuNzY0ODMgMTIuMzk1OCA3Ljk0MjU4IDEyLjcyMDMgOC4yNTA2NCAxMi44MDk4QzguMzA0NDUgMTIuODI1NCA4LjM2MDQzIDEyLjgzMzMgOC40MTQ2NiAxMi44MzMzQzguNjUwMiAxMi44MzMzIDguODY0MDYgMTIuNzA4MSA5LjA4NjA5IDEyLjQxMTdMOS4xODE4MyAxMi4yNzRMMTEuMzMxMyA4LjczMTMzVjEuMTY2NjdIMy43MjIzM0MzLjQzNjI2IDEuMTY2NjcgMy4xOTc4NSAxLjM3MzI4IDMuMTQ4NDEgMS42NDUyM0wzLjEzOSAxLjc1QzMuMTM5IDIuMDM2MDcgMy4zNDU2MSAyLjI3NDQ4IDMuNjE3NTYgMi4zMjM5MkwzLjcyMjMzIDIuMzMzMzNINC4zMzEzM1YzLjVIMi44NDczM0MyLjUyNTUgMy41IDIuMjY0IDMuNzYxNSAyLjI2NCA0LjA4MzMzQzIuMjY0IDQuMzY5NDEgMi40NzA2MSA0LjYwNzgxIDIuNzQyNTYgNC42NTcyNkwyLjg0NzMzIDQuNjY2NjdINC4zMzEzM1Y1LjgzMzMzSDIuNTU1NjZDMi4yMzM4MyA1LjgzMzMzIDEuOTcyMzMgNi4wOTQ4MyAxLjk3MjMzIDYuNDE2NjdDMS45NzIzMyA2LjcwMjc0IDIuMTc4OTUgNi45NDExNCAyLjQ1MDkgNi45OTA1OUwyLjU1NTY2IDdINC4zMzEzM1pNMTIuNDk4IDguMTY2NjdIMTMuNjY0N1YxLjE2NjY3SDEyLjQ5OFY4LjE2NjY3WiIgZmlsbD0iIzlBQTBBNiIvPgo8L3N2Zz4K" class="thumb-down thumb-up-full-top thumbs-down-top-down-black" alt="thumb-down"/>\
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjkxNDcgMEMxMS45NjU2IDAgMTIuMDE1MSAwLjAwNjUzMzgxIDEyLjA2MjIgMC4wMTg4MDk0TDEyLjA2MDUgMEgxNC44MzEzVjkuMzMzMzNIMTIuMzMxMkwxMC4xNjk5IDEyLjg5NDJDOS43MDY2NiAxMy42MDgxIDkuMTI5NDMgMTQgOC40MTQ2NiAxNEM4LjI1MDcxIDE0IDguMDg1MiAxMy45NzY2IDcuOTI1MjMgMTMuOTMwMkM3LjA1MjE3IDEzLjY3NjUgNi41Mjg5NSAxMi44MDAzIDYuNzAxNzYgMTEuOTAzN0w2Ljc0MjQgMTEuNzM1NUw3LjE2MTY2IDEwLjVIMi41NTU2NkMxLjY0NjMzIDEwLjUgMC44OTg1MTEgOS44MDU2NyAwLjgxMzY3OCA4LjkxODQ4TDAuODA1NjY0IDguNzVDMC44MDU2NjQgOC4zMDEzNCAwLjk3NDY4NyA3Ljg5MjAxIDEuMjUyNSA3LjU4MjIyQzAuOTc0Mjc2IDcuMjczNjYgMC44MDU2NjQgNi44NjQ3OCAwLjgwNTY2NCA2LjQxNjY3QzAuODA1NjY0IDUuODg1NDkgMS4wNDI1OCA1LjQwOTQzIDEuNDE2NDYgNS4wODg0M0MxLjIxNTQxIDQuODA1ODYgMS4wOTczMyA0LjQ1ODMzIDEuMDk3MzMgNC4wODMzM0MxLjA5NzMzIDMuMzcwNjYgMS41MjM4MSAyLjc1NzIgMi4xMzUzNyAyLjQ4NDM0QzIuMDMwNCAyLjI2MjQzIDEuOTcyMzMgMi4wMTI5NyAxLjk3MjMzIDEuNzVDMS45NzIzMyAwLjg0MDY2NyAyLjY2NjY2IDAuMDkyODQ2NyAzLjU1Mzg1IDAuMDA4MDE0MjVMMy43MjIzMyAwSDExLjkxNDdaTTQuMzMxMzMgN1Y4LjE2NjY3SDIuNTU1NjZDMi4yMzM4MyA4LjE2NjY3IDEuOTcyMzMgOC40MjgxNyAxLjk3MjMzIDguNzVDMS45NzIzMyA5LjAzNjA3IDIuMTc4OTUgOS4yNzQ0OCAyLjQ1MDkgOS4zMjM5MkwyLjU1NTY2IDkuMzMzMzNINy45NzcxNkM4LjM0MzUxIDkuMzMzMzMgOC42MTA0MSA5LjY2MzM5IDguNTUzMjMgMTAuMDA5OEw4LjUyOTQzIDEwLjEwNDVMNy44NTQ4MyAxMi4wODYxQzcuNzY0ODMgMTIuMzk1OCA3Ljk0MjU4IDEyLjcyMDMgOC4yNTA2NCAxMi44MDk4QzguMzA0NDUgMTIuODI1NCA4LjM2MDQzIDEyLjgzMzMgOC40MTQ2NiAxMi44MzMzQzguNjUwMiAxMi44MzMzIDguODY0MDYgMTIuNzA4MSA5LjA4NjA5IDEyLjQxMTdMOS4xODE4MyAxMi4yNzRMMTEuMzMxMyA4LjczMTMzVjEuMTY2NjdIMy43MjIzM0MzLjQzNjI2IDEuMTY2NjcgMy4xOTc4NSAxLjM3MzI4IDMuMTQ4NDEgMS42NDUyM0wzLjEzOSAxLjc1QzMuMTM5IDIuMDM2MDcgMy4zNDU2MSAyLjI3NDQ4IDMuNjE3NTYgMi4zMjM5MkwzLjcyMjMzIDIuMzMzMzNINC4zMzEzM1YzLjVIMi44NDczM0MyLjUyNTUgMy41IDIuMjY0IDMuNzYxNSAyLjI2NCA0LjA4MzMzQzIuMjY0IDQuMzY5NDEgMi40NzA2MSA0LjYwNzgxIDIuNzQyNTYgNC42NTcyNkwyLjg0NzMzIDQuNjY2NjdINC4zMzEzM1Y1LjgzMzMzSDIuNTU1NjZDMi4yMzM4MyA1LjgzMzMzIDEuOTcyMzMgNi4wOTQ4MyAxLjk3MjMzIDYuNDE2NjdDMS45NzIzMyA2LjcwMjc0IDIuMTc4OTUgNi45NDExNCAyLjQ1MDkgNi45OTA1OUwyLjU1NTY2IDdINC4zMzEzM1pNMTIuNDk4IDguMTY2NjdIMTMuNjY0N1YxLjE2NjY3SDEyLjQ5OFY4LjE2NjY3WiIgZmlsbD0iI0REMzY0NiIvPgo8L3N2Zz4K" class="thumb-down thumb-up-full-top thumbs-up-top-down-red" alt="thumb-down"/>\
      </div>\
      {{/if}}\
        <div class="s-r-header">\
        <div class="title sdk-i18n-lang" sdk-i18n-key="sa_sdk_search_results">{{html langTranslator("sa_sdk_search_results")}}</div>\
        <div class="close-btn" id="btn-close-show-all"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABiSURBVHgBjZDJDYBQCESBSjDq3VYswQotRe8e/JW4QEyEvyTMiQxvIADcDRvzOEFD0hOG4MYF8FprsHpvT5k/1Z8Wzj0s0zSr8dUpHbsDHSwykIggqPDq+DF2kkvnW6IPfwCV+T2+mOJOJAAAAABJRU5ErkJggg=="></div>\
          {{if isDev == true}}\
            <div class="custom-header-container-center">\
              <ul class="custom-header-nav">\
              <li id="viewTypePreview" class="custom-header-nav-link-item sdk-customize-nav"><a class="custom-header-nav-link sdk-i18n-lang" sdk-i18n-key="sa_sdk_preview">{{html langTranslator("sa_sdk_preview")}}</a></li>\
              <li id="viewTypeCustomize" class="custom-header-nav-link-item sdk-customize-nav"><a class="custom-header-nav-link sdk-i18n-lang" sdk-i18n-key="sa_sdk_customize">{{html langTranslator("sa_sdk_customize")}}</a></li>\
            </ul>\
            </div>\
          {{/if}}\
        </div>\
           <!-- <button id="btn-close-show-all" class="btn-close-show-all">close</button> -->\
        <div class="filter-sec-tab">\
                    <!-- Facet left-->\
                    <div id="leftFacetFilterId" class="{{if isFilterEnabled == false}}display-none{{/if}}"> </div>\
                    <!-- Facet left-->\
                    <!-- Tab container-->\
                    <div id="sdk-bottomup-tab-container"></div>\
                    <!-- Tab container-->\
                    <!-- Sortable Facet start-->\
                    <div class="sortable-facets-bottom-up">\
                        <div id="sa-sdk-sortable-dropdown-bottom-up" class="">\
                        </div>\
                      </div>\
                    <!-- Sortable Facet end-->\
                    <!-- Facet right-->\
                    <div  id="rightFacetFilterId" class="{{if isFilterEnabled == false}}display-none{{/if}}"> </div>\
                    <!-- Facet right Icon -->\
                    <!-- Facet top-->\
                    <div  id="topFacetIcon" class="{{if isFilterEnabled == false}}display-none{{/if}}"> </div>\
                    <!-- Facet top Icon-->\
                    <!--Filter count-->\
                    <div id="filter-count-container"></div>\
                    <!--Filter Count-->\
                    <!--sortable facet added list-->\
                    <div id="sa-sdk-sortable-facets-added-list"></div>\
                    <!--sortable facet added list-->\
          </div>\
          <!-- Facet top-->\
          <div  id="topFacetFilterId"> </div>\
          <!-- Facet top-->\
          <div class="horizantal-filter-sec hide">\
          </div>\
          <!-- All type -->\
          {{if view == "preview"}}\
            <div id="fullResultAllTypeId" style="height:100%">\
            <div style="height:100%">\
      <!--<div id="loaderDIV" class="loader-container">Loading...</div>-->\
        <div class="data-body-sec {{if facetPosition == `top`}}iffilteristop{{/if}} {{if displayFeedback.queryLevel == true}} sa-has-feedback {{/if}}">\
        <div class="no-templates-defined-full-results-container">\
        <div class="img-block"><img class="no-data-mapped">\
          <div class="title">Result templates are not mapped with a proper field value</div>\
        </div>\
      </div>\
        <div class="scroll-top-container">\
         <div class="title-scroll-top">\
         <img><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_scroll_to_top">{{html langTranslator("sa_sdk_scroll_to_top")}}</span>\
         </div>\
        </div>\
        <div class="empty-full-results-container hide" id="top-down-all-tab-empty-state">\
        <div class="img-block">\
        <img src="data:image/png;base64,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">\
        </div>\
        <div class="title sdk-i18n-lang" sdk-i18n-key="sa_sdk_sorry_we_could_not_find_any_results">{{html langTranslator("sa_sdk_sorry_we_could_not_find_any_results")}}</div>\
        <div class="title-info sdk-i18n-lang" sdk-i18n-key="sa_sdk_please_try_searching_with_another_term">{{html langTranslator("sa_sdk_please_try_searching_with_another_term")}}</div>\
        </div>\
        <div class="full-search-data-container matched-structured-data-contaniers">\
        </div>\
        <div class="kore-sdk-pagination-div hide">\
          <div class="kore-sdk-custom-pagination">\
            <div class="kore-sdk-bottom-up-first pagination-tootlip-buttons">\
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+zn9pz9o/XPhre6B8H/gxpfhzxb+0d8Q9H1XxB4esPF8t9B8MfhH8OtBmjh8WfH74+6vpdzZXXh34V+Et722l6XFqWk+IPin4vFt4F8I3th/xUvirwe0r77fi/JeYiT9mv49eP/2j9X8SfEbRPCulaJ+y3/ZVjpXwe8b61p+taZ49+POsxXLtrnxc8OaBd33keEPgTfQKlj8NW1221DxV8RoXm8cW0ujeDG8M3PjAat69fLy9e4LX0Iv2m/2bda+JWoaD8Yvg1q2g+Ef2jvh9oupeHdAvvFYvZfhj8Xfh1rU4uPFPwB+PujafZ6nL4g+FXi9g89jqtvpOp+Jvhj4qa38beD7e7ceIfDPisT6Pb8vNef5g/wAST9mv4C/ED9nDV/Enw50XxVpWufst/wBlWOq/B7wRrWo61qfj74DazLcuuufCLw5r93YeR4v+BNjAyXvw0Gu3On+KvhzAk3ge3i1nwYnhm38IDaevXr2fn5PuMP/Z">\
              <span class="tooltip_text"> First</span>\
              </div>\
            <div class="kore-sdk-bottom-up-previous pagination-tootlip-buttons">\
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACuSURBVHgB3VKxDcIwEDwTD2AEA3xk0zMCbMAGrMAIGYWSjhFQJgipEcIlnTMAknloaPImSZecZMnS3+nuTw+MAkRk+FHbbNZBTFBZBegd+uLrnLuKyBUSR6XEUPqCGEvv7weJJ6+g9JnFdUoM2d0Vn+hduEKC1xGI3Lzr7/5Lwcjtg6zdp3iZNGgYxixL/p7MYv5sQqgxLMlqzX0EXmfTNv97SN7frohqy50Qpok3s14tS5MeJgUAAAAASUVORK5CYII=">\
              <span class="tooltip_text"> Previous</span>\
              </div>\
            <div class="input-text-data">\
              <div class="title">Page</div>\
              <div>\
                <input id="kore-current-page-number" class="kore-current-page-number" type="text" value="1">\
              </div>\
              <div class="title">of</div>\
              <div id="kore-total-page-number" class="kore-total-page-number">15</div>\
            </div>\
            <div class="kore-sdk-bottom-up-next pagination-tootlip-buttons">\
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACdSURBVHgBXY+xDQIxEAT3bAIiZEQD99gf4xKgEuiEkDY+JUJUQEoGxAjhCsAhwUvmEHqw/8LZW2lWM9femNEwyiE7BaQ5SB+Y2eSBjvFxNGYyBqmNNLdSfH0C6j6YbQOiGVK7CCFE1QUh3FZI6QIa7IrGr1m5ExL2qoBTtxYZkWibP7R2yZW9ix33oHuWUAZ+Ye17A+GRSBSv5zx4A80eMIB299aVAAAAAElFTkSuQmCC">\
              <span class="tooltip_text">Next</span>\
              </div>\
            <div class="kore-sdk-bottom-up-last pagination-tootlip-buttons">\
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC8SURBVHgB3ZKxEcIwDEUVZwAEWUCJnJ5R2AA2YAQYIRswAkdJyQRQ0kEJTewFOBBxjos5QkI68htbOn//d7YA+iWK9Z4oHb9q4owSvfjmCasF4vAKAawRo621+QVxcAQIMhxFaE2+g1YUxDMhMSRytSjmUx1J+N6w1hwciVoJweYseq4dSPSySCZCj4R5Wj2nam9QcC936PVv8kqN6Uk6L9PJSxeqZrMgdjcTT9wPuFn4yVwYPg1SW/P/6gGaqz4/5BlCXQAAAABJRU5ErkJggg==">\
              <span class="tooltip_text">Last </span>\
              </div>\
          </div>\
        </div>\
        <div class="custom-add-result-container1 display-none {{if devMode== false || viewType != "Customize"}}display-none{{/if}}">\
          <div class="custom-add-new-result-content">\
            <div class="bold-text">Not finding the result?</div>\
            <div class="link-text"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABrSURBVHgBzVHBCYAwEMuV/lRwBDdykoojuIoTiBs5Qt8KjVZfLdeHD8FAyJEQOO4ABZXbx0gts5opIi0KMHiJ7wvSuLBcmu4s7G6lbHnBgmGGZAWa/hnCmvrw0FAPxxSpZT+8kvppkr5UOAH/GRicle7qIwAAAABJRU5ErkJggg==">Add from repository</div>\
          </div>\
        </div>\
            </div>\
          {{/if}}\
          <!-- All type -->\
          <!-- Result Ranking -->\
          {{if view == "customization"}}\
            <div id="resultRankingId"></div>\
            {{/if}}\
          <!-- Result Ranking -->\
      </div>\
    </div>\
    </script>';
    if (type === 'fullSearchResultsTemplate') {
      return fullSearchResultsTemplate;
    }

  }
  getBottomupTab() {
    var tabContainer = '<script type="text/x-jqury-tmpl">\
                      {{each(key,facet) facets}}\
                      <div class="tab-name see-all-result-nav  {{= facet.className}}"  title="{{= facet.name}}" id="{{= facet.key}}" classification="{{= facet.key}}">{{html truncateText(facet.name)}} <span class="count sdk-facet-count">({{= facet.doc_count}})</span></div>\
                      {{/each}}\
                      </script>';
    return tabContainer;
  }
  bindTabsClickEvent(me: any, messageHtml: any, facetSelected: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find("[id='" + facetSelected + "']").addClass('active-tab');
    $(messageHtml).off("click", ".see-all-result-nav").on("click", ".see-all-result-nav", function (e: any) {
      var selectedFacet = $(e.target).closest(".see-all-result-nav")
        .attr("classification");
      $(messageHtml).find(".tab-name.see-all-result-nav.active-tab")
        .removeClass("active-tab")
      //           .addClass('un-selected-type');
      $(e.target).closest(".see-all-result-nav").addClass('active-tab');

      hostWindowInstance.tabFacetTrigger(e, selectedFacet).then((result: any) => {
        if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
          let index = result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
          if (index > -1) {
            result.splice(index, 1)
          }
        }
        FullSearchResultsTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, result);
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
    if (facetData.length) {
      var facetTemplate = $(FullSearchResultsTemplate.prototype.facetFilter()).tmpl({
        position: facetObj.position,
        show: facetObj.show,
        searchFacets: facetData,
        langTranslator :msgData.message[0].component.payload.langTranslator
      });
      var facetTemplateTop = $(FullSearchResultsTemplate.prototype.facetFilterTop()).tmpl({
        position: facetObj.position,
        show: facetObj.show,
        searchFacets: facetData,
        langTranslator :msgData.message[0].component.payload.langTranslator
      });
      var facetTemplateTopIcon = $(FullSearchResultsTemplate.prototype.facetTemplateTopIcon()).tmpl({
        position: facetObj.position,
        show: facetObj.show,
        searchFacets: facetData,
        langTranslator :msgData.message[0].component.payload.langTranslator
      });
      if (facetObj.position == "right") {
        $(messageHtml).find("#rightFacetFilterId").empty().append(facetTemplate);
      } else if (facetObj.position == "left") {
        $(messageHtml).find("#leftFacetFilterId").empty().append(facetTemplate);
      } else {
        $(messageHtml).find("#topFacetFilterId").empty().append(facetTemplateTop);
        $(messageHtml).find("#topFacetIcon").empty().append(facetTemplateTopIcon);
        if (facetObj.show) {
          if (!$(".iffilteristop").hasClass("isTopAlignFilterAdded")) {
            $(".iffilteristop").addClass("isTopAlignFilterAdded");
          }
        } else {
          $(".iffilteristop").removeClass("isTopAlignFilterAdded");
        }
      }
      if (!$("body").hasClass("top-down")) {
        if (facetObj.show) {
          $(".fliter-right-btn").addClass("active-open");
        } else {
          $(".fliter-right-btn").removeClass("active-open");
        }
      }
      $(messageHtml)
        .off("click", "#facetRightIconId")
        .on("click", "#facetRightIconId", function (event: any) {
          event.stopPropagation();
          event.stopImmediatePropagation();
          if ($(messageHtml).find(".filter-data").css('display') == 'none') {
            if ($(messageHtml).find('.horizantal-filter-sec.filter-data').length) {
              $(messageHtml).find(".filter-data").css('display', 'inline-block');
              $(messageHtml).find(".data-body-sec").removeClass('filter-added-hide');
            } else {
              $(messageHtml).find(".filter-data").css('display', 'block');
              $(messageHtml).find(".data-body-sec").removeClass('filter-added-hide');
            }
            $(messageHtml).find("#facetRightIconId").addClass('active-open');
          } else {
            $(messageHtml).find(".filter-data").css('display', 'none');
            $(messageHtml).find("#facetRightIconId").removeClass('active-open');
            $(messageHtml).find(".data-body-sec").addClass('filter-added-hide');
          }
          FullSearchResultsTemplate.prototype.bindFacetTriggerEvents(me, messageHtml);
        });
      FullSearchResultsTemplate.prototype.bindFacetTriggerEvents(me, messageHtml);
      if (!hostWindowInstance.vars.isFilterModified) {
        hostWindowInstance.autoSelectFacetFilter();
      }
      hostWindowInstance.markSelectedFilters();
    }

  };
  facetFilter() {
    var facet =
      '<script type="text/x-jqury-tmpl">\
        <div>\
        {{if searchFacets.length}}\
        <!--<div id="loaderDIV" class="loader-container">Loading...</div>-->\
        <div id="facetRightIconId" class="fliter-right-btn {{if position === `left`}} left-filter {{/if}}">\
          <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB1c+hEQAgDATBfyqJwVMKpaYUPCadwCAyGATgcursUiQXYFQ8RU0IE33urFSz3tZFNHpn67Z538YJjc8On2EvoL4AAAAASUVORK5CYII=">\
          <div class="filter-data sdk-facet-filter-data">\
          <div class="header-sec">\
          <div class="f-heading sdk-i18n-lang" sdk-i18n-key="sa_sdk_filters_caps">{{html langTranslator("sa_sdk_filters_caps")}}</div>\
          <div class="clear-all sdk-clear-all-facet  sdk-i18n-lang" sdk-i18n-key="sa_sdk_clear_all" id="clear-all-facet-id">{{html langTranslator("sa_sdk_clear_all")}}</div>\
          </div>\
              <div class="scroll-data">\
              {{each(i, searchFacet) searchFacets}}\
                  <div class="group-checkbox filters-content" data-facetType="${searchFacet.subtype}" data-facetName="${searchFacet.name}" data-fieldName="${searchFacet.fieldName}">\
                    <div class="heading-title">${searchFacet.name}</div>\
                    {{each(j, bucket) searchFacet.buckets}}\
                    {{if searchFacet.multiselect}}\
                      {{if searchFacet.subtype == "value"}}\
                        <div class="custom_checkbox kr-sg-checkbox d-block">\
                            <input {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="checkbox-custom sdk-filter-checkbox" type="checkbox" name="${bucket.key}" value="true" data-from="${bucket.from}" data-to="${bucket.to}">\
                            <label for="checkbox-${i}${j}" class="checkbox-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                        </div>\
                      {{/if}}\
                      {{if searchFacet.subtype == "range"}}\
                          <div class="kr-sg-checkbox d-block custom_checkbox">\
                            <input {{if bucket.auto_select}}checked{{/if}} id="checkbox-${i}${j}" class="checkbox-custom sdk-filter-checkbox" type="checkbox" name="${bucket.key}" value="true" data-from="${bucket.from}" data-to="${bucket.to}">\
                            <label for="checkbox-${i}${j}" class="checkbox-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                          </div>\
                      {{/if}}\
                    {{/if}}\
                    {{if !searchFacet.multiselect}}\
                      {{if searchFacet.subtype == "value"}}\
                      <div class="option-text">\
                        <div class="custom_checkbox kr-sg-radiobutton d-block">\
                          <input {{if bucket.auto_select}}checked{{/if}} id="radio-${i}${j}" class="radio-custom sdk-filter-radio" type="radio" name="radio-${i}" value="${bucket.key}" data-from="${bucket.from}" data-to="${bucket.to}">\
                          <label for="radio-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                        </div>\
                      </div>\
                      {{/if}}\
                      {{if searchFacet.subtype == "range"}}\
                      <div class="option-text">\
                        <div class="custom_checkbox kr-sg-radiobutton d-block">\
                          <input {{if bucket.auto_select}}checked{{/if}} id="radio-${i}${j}" class="radio-custom sdk-filter-radio" type="radio" name="radio-${i}" value="${bucket.key}" data-from="${bucket.from}" data-to="${bucket.to}">\
                          <label for="radio-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key} </label> <span class="associated-filter-count">(${bucket.doc_count})</span>\
                        </div>\
                      </div>\
                      {{/if}}\
                    {{/if}}\
                {{/each}}\
              </div> \
            {{/each}}\
            </div>\
            <div class="footer-filter">\
            <button class="apply-btn sdk-i18n-lang" sdk-i18n-key="sa_sdk_apply">{{html langTranslator("sa_sdk_apply")}}</button>\
            </div>\
        </div>\
      </div>\
      {{/if}}\
    </div>\
  </script>';
    return facet;
  };
  facetFilterTop() {
    var facet =
      '<script type="text/x-jqury-tmpl">\
          <div>\
          <!-- <div id="facetRightIconId" class="fliter-right-btn left-filter">\
          <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB1c+hEQAgDATBfyqJwVMKpaYUPCadwCAyGATgcursUiQXYFQ8RU0IE33urFSz3tZFNHpn67Z538YJjc8On2EvoL4AAAAASUVORK5CYII=">\
          </div> -->\
          {{if searchFacets.length && show}}\
          <div class="horizantal-filter-sec filter-data">\
            {{each(i, searchFacet) searchFacets}}\
                <div class="dropdown_custom_filter">\
                  <div class="dropbtn  sdk-top-facet-drop">\
                    ${searchFacet.name}{{if searchFacet.countPerGroup}}\
                    {{if searchFacet.countPerGroup.length >i && searchFacet.countPerGroup[i].length >0}}\
                    <span class="count">${searchFacet.countPerGroup[i].length}</span> {{/if}}\
                    {{/if}}\
                    <img class="down-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACHSURBVHgBbY6xDYMwEEX/yQuc5QUOmfRZIRskEyQjZJyU6VJmBGoqREcHJVT2AsiAhQRGvO7+vdM/JVleMevBe9fgBBF7Z21+itmUIPzZ6N47VyeStU+APgj0WK8uV8lsK5K/99Lc5pbdMtNWIQJSBYi+MQjhhTDeuplETOQobhLOn4/wMZ8As5kn7D+3/a0AAAAASUVORK5CYII=">\
                    <img class="up-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACQSURBVHgBhY7BDYJQDIb/ggM8wgI14llXYBJ1A48e3YAVvHpyBHUC4gCYTmDeAGrpAw48LnxJk+bv16aEEczskKRV6OXdHMazJJJocccfFIqXRd1lAxRJqi+RZt9nqwuINtBvKSKeTGKTbiY9TTrGrxRnkO6gvzJ1WV5D6WrSCRO8/zycyzO7XNnWeosZgtMCupEtrTPwmiYAAAAASUVORK5CYII=">\
                  </div>\
                    <div id="myDropdown" class="dropdown-content filters-content sdk-top-facet-option myDropdown-${i}" id="sdk-top-facet-option-${i}" data-facetType="${searchFacet.subtype}" data-facetName="${searchFacet.name}" data-fieldName="${searchFacet.fieldName}">\
                    <!--<div class="kr-sg-input-search">\
                    <input type="text" placeholder="Search" class="input-search sdk-bottomup-search-facet" id="sdk-bottomup-search-facet-${i}" data-bucket="${searchFacet[i]}" >\
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAulBMVEUAAAAAAAAAAIAAVVUrK1UkN0kiM0QgMFAtLUskMUkiM00pMUopNEsoM0olNUomNUglNEokM0koMksnNUomNEkmNEglM0skNUkmNkwnM0snNUomNEklM0onNUolNUslNEonNEkmNUomNUsmNEolM0snNUomNEomNEomNEslNUkmNUomNEomNUomNEolNEomNEsmNEomNEomNEomM0omNEomNEomNEomNEomNEomNEomNEomNEomNEr///9hPe5QAAAAPXRSTlMAAQIDBg4PEBEVHh8sLTBDRUZHSElKS01RVVZeaG90dXZ5fqGkpaittbi9xMfL09TW2d7f4uPq7e/x8vf4F8v60AAAAAFiS0dEPdBtUVkAAACASURBVBgZBcGLIoNQAADQ05WWipZ5brGH0JDXZu7w/9/lHAAAgPJ4BICk3fx8/fUVQHL3Vgf5MtaA9vUQXO5y4LMGPC5AsQ+AWQ+qLcDFM8h+M8BtB6znQPpxBZzEU0i7lwA4+76fNjfvQxwDHK2ehofrcB4bAMAkFgCA8gAAgH/ZSQkFmhv26gAAAABJRU5ErkJggg==" class="search-icon">\
                    </div>-->\
                    {{each(j, bucket) searchFacet.buckets}}\
                          {{if searchFacet.multiselect}}\
                          {{if searchFacet.subtype == "value"}}\
                            <div class="custom_checkbox kr-sg-checkbox d-block">\
                                <input id="checkbox-${i}${j}" class="checkbox-custom sdk-filter-checkbox" type="checkbox" name="${bucket.key}" value="true" data-from="${bucket.from}" data-to="${bucket.to}">\
                                <label for="checkbox-${i}${j}" class="checkbox-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                            </div>\
                          {{/if}}\
                          {{if searchFacet.subtype == "range"}}\
                              <div class="kr-sg-checkbox d-block custom_checkbox">\
                                <input id="checkbox-${i}${j}" class="checkbox-custom sdk-filter-checkbox" type="checkbox" name="${bucket.key}" value="true" data-from="${bucket.from}" data-to="${bucket.to}">\
                                <label for="checkbox-${i}${j}" class="checkbox-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                              </div>\
                          {{/if}}\
                        {{/if}}\
                        {{if !searchFacet.multiselect}}\
                          {{if searchFacet.subtype == "value"}}\
                            <div class="option-text">\
                              <div class="custom_checkbox kr-sg-radiobutton d-block">\
                                <input id="radio-${i}${j}" class="radio-custom sdk-filter-radio" type="radio" name="radio-${i}" value="${bucket.key}" data-from="${bucket.from}" data-to="${bucket.to}">\
                                <label for="radio-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                              </div>\
                            </div>\
                          {{/if}}\
                          {{if searchFacet.subtype == "range"}}\
                            <div class="option-text">\
                              <div class="custom_checkbox kr-sg-radiobutton d-block">\
                                <input id="radio-${i}${j}" class="radio-custom sdk-filter-radio" type="radio" name="radio-${i}" value="${bucket.key}" data-from="${bucket.from}" data-to="${bucket.to}">\
                                <label for="radio-${i}${j}" class="radio-custom-label" title="${bucket.key}">${bucket.key} </label><span class="associated-filter-count">(${bucket.doc_count})</span>\
                              </div>\
                            </div>\
                          {{/if}}\
                        {{/if}}\
                    {{/each}}\
                    {{if searchFacet.multiselect}}\
                    <div class="apply-btn sdk-i18n-lang" sdk-i18n-key="sa_sdk_apply">{{html langTranslator("sa_sdk_apply")}}</div>\                    {{/if}}\
                      {{if !searchFacet.multiselect}}\
                      <div class="clear-all sdk-clear-all-facet-top"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_clear">{{html langTranslator("sa_sdk_clear")}}</span>\</div>\
                      {{/if}}\
                    </div>\
                </div>\
              {{/each}}\
            </div>\
            </div>\
          {{/if}}\
          </div>\
        </script>';
    return facet;
  };
  facetTemplateTopIcon() {
    var facet =
      '<script type="text/x-jqury-tmpl">\
          <div>\
          {{if searchFacets.length}}\
          <div id="facetRightIconId" class="fliter-right-btn">\
          <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB1c+hEQAgDATBfyqJwVMKpaYUPCadwCAyGATgcursUiQXYFQ8RU0IE33urFSz3tZFNHpn67Z538YJjc8On2EvoL4AAAAASUVORK5CYII=">\
          </div>\
          {{/if}}\
          </div>\
        </script>';
    return facet;
  };
  bindFacetTriggerEvents(me: any, messageHtml: any) {
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
      .off("change", ".sdk-filter-checkbox")
      .on("change", ".sdk-filter-checkbox", function (event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        hostWindowInstance.facetCheckBoxClick(event).then((response: any) => {
          // if(response.isFilterAlignedTop){
          //   FullSearchResultsTemplate.prototype.applyFiltersFun(me, messageHtml);
          // }
        });
      });
    // SDK radio
    $(messageHtml)
      .off("change", ".sdk-filter-radio")
      .on("change", ".sdk-filter-radio", function (event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        hostWindowInstance.facetRadioClick(event).then((response: any) => {
          if (response.isFilterAlignedTop) {
            FullSearchResultsTemplate.prototype.applyFiltersFun(me, messageHtml);
          }
        });
      });
    $(messageHtml)
      .off("click", ".apply-btn")
      .on("click", ".apply-btn", function () {
        FullSearchResultsTemplate.prototype.applyFiltersFun(me, messageHtml);
      });
    $(messageHtml)
      .off("click", ".sdk-clear-all-facet-top")
      .on("click", ".sdk-clear-all-facet-top", function (event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(messageHtml).find(".filters-content").hide()
        $("#filter-count-container").empty();
        $(messageHtml).find(".sdk-filter-checkbox").prop("checked", false);
        hostWindowInstance.clearAllFilters().then((response: any) => {
          let selectedFacet = $(messageHtml).find(".tab-name.see-all-result-nav.active-tab").attr('id');
          if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
            let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
            if (index > -1) {
              response.result.splice(index, 1)
            }
          }
          FullSearchResultsTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
          let tabHtml = $(FullSearchResultsTemplate.prototype.getBottomupTab()).tmpl({ facets: response.facets, truncateText: truncateText });
          $(messageHtml).find('#sdk-bottomup-tab-container').empty().append(tabHtml);
          FullSearchResultsTemplate.prototype.bindTabsClickEvent(me, messageHtml, selectedFacet);
          if(response.sortableFacetList && response.sortableFacetList.length){
            let sortableHtml = $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
              displaySortable: response.displaySortable});
            $(messageHtml).find('#sa-sdk-sortable-dropdown-bottom-up').empty().append(sortableHtml);
            let sortableAddedListHtml =  $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsAddedlist()).tmpl({
              displaySortable: response.displaySortable});
            $(messageHtml).find('#sa-sdk-sortable-facets-added-list').empty().append(sortableHtml);
            FullSearchResultsTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml, selectedFacet,sortableAddedListHtml);
          }
        })
      });
    //SDK Top Facet
    $(messageHtml)
      .off("click", ".sdk-top-facet-drop")
      .on("click", ".sdk-top-facet-drop", function (event: any) {
        hostWindowInstance.dropdownFilterClickEvent(event);
        FullSearchResultsTemplate.prototype.bindFacetTriggerEvents(me, messageHtml)

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
        console.log($(".full-search-data-container").children().length);
        $(".empty-full-results-container").removeClass("hide");
      } else {
        if (!$(".empty-full-results-container").hasClass("hide")) {
          $(".empty-full-results-container").addClass("hide");
        }
      }
    }, 300);
  }
  getFilterCountTemplate() {
    var filterCountContainer = '<script type="text/x-jqury-tmpl">\
    {{if count > 0 }}\
    <div class="filter-updated-count">\
      <span class="length-count">${count}</span>\
      <span class="title"> {{if count && (count == 1)}}<span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_filter">{{html langTranslator("sa_sdk_filter")}}</span>{{else}}<span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_filters">{{html langTranslator("sa_sdk_filters")}}</span>{{/if}} <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_applied">{{html langTranslator("sa_sdk_applied")}}</span></span>\
      <span class="clsoe-filter"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACdSURBVHgBbZHRDcIwDERju+zTSizSCWgl8sFM+Ug26AwsUDIGO9A05AChprV/osjPd2eZLtfbg2gZg3PRKDUMts3SeAaUV5kGa1sVYpkoLaPEeX525+4OGC/+FbSmPgQX6T9dFAETp968jNlC6FNl9YNNLo0NhOIqVFEC9Bk/1Xn5ELwowX6/oGjBtQVpD2mZ4cBZ2GsQCkf4xmj8GzsLeh0gnVcbAAAAAElFTkSuQmCC"></span>\
    </div>\
    {{/if}}\
    </script>';
    return filterCountContainer;
  }
  applyFiltersFun(me: any, messageHtml: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(".filter-data").hide();
    $(messageHtml).find(".data-body-sec").addClass('filter-added-hide');
    hostWindowInstance.getSearchByFacetFilters().then((response: any) => {
      let selectedFacet = $(messageHtml).find(".tab-name.see-all-result-nav.active-tab").attr('id');
      if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
        let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
        if (index > -1) {
          response.result.splice(index, 1)
        }
      }
      FullSearchResultsTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
      let tabHtml = $(FullSearchResultsTemplate.prototype.getBottomupTab()).tmpl({ facets: response.facets, truncateText: truncateText  });
      $(messageHtml).find('#sdk-bottomup-tab-container').empty().append(tabHtml);
      FullSearchResultsTemplate.prototype.bindTabsClickEvent(me, messageHtml, selectedFacet);
      let filterCountHtml = $(FullSearchResultsTemplate.prototype.getFilterCountTemplate()).tmpl({ count: response.filterCount });
      $(messageHtml).find('#filter-count-container').empty().append(filterCountHtml);
      if(response.sortableFacetList && response.sortableFacetList.length){
        let sortableHtml = $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
          displaySortable: response.displaySortable});
        $(messageHtml).find('#sa-sdk-sortable-dropdown-bottom-up').empty().append(sortableHtml);
        let sortableAddedListHtml =  $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsAddedlist()).tmpl({
          displaySortable: response.displaySortable});
        $(messageHtml).find('#sa-sdk-sortable-facets-added-list').empty().append(sortableHtml);
        FullSearchResultsTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml, selectedFacet,sortableAddedListHtml);
      }
    });
    FullSearchResultsTemplate.prototype.filterCloseEvent(messageHtml, me);
  }
  filterCloseEvent(messageHtml:any,me:any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(messageHtml).find('#filter-count-container')
      .off("click", ".clsoe-filter")
      .on("click", ".clsoe-filter", function () {
        $("#filter-count-container").empty();
        $(messageHtml).find(".sdk-filter-checkbox").prop("checked", false);
        hostWindowInstance.clearAllFilters().then((response: any) => {
          let selectedFacet = $(messageHtml).find(".tab-name.see-all-result-nav.active-tab").attr('id');
          if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
            let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
            if (index > -1) {
              response.result.splice(index, 1)
            }
          }
          FullSearchResultsTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
          let tabHtml = $(FullSearchResultsTemplate.prototype.getBottomupTab()).tmpl({ facets: response.facets, truncateText: truncateText  });
          $(messageHtml).find('#sdk-bottomup-tab-container').empty().append(tabHtml);
          FullSearchResultsTemplate.prototype.bindTabsClickEvent(me, messageHtml, selectedFacet);
          if(response.sortableFacetList && response.sortableFacetList.length){
            let sortableHtml = $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
              displaySortable: response.displaySortable});
              $(messageHtml).find('#sa-sdk-sortable-dropdown-bottom-up').empty().append(sortableHtml);
              let sortableAddedListHtml =  $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsAddedlist()).tmpl({
                displaySortable: response.displaySortable});
              $(messageHtml).find('#sa-sdk-sortable-facets-added-list').empty().append(sortableAddedListHtml);
              FullSearchResultsTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml, selectedFacet,sortableAddedListHtml);
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
  getBottomUpSortableFacetsTabs () {
    var sortableFacets = '<script id="bottom-up-sortable-tabs-template" type="text/x-jqury-tmpl">\
                              <div class="sortable-dropdown-filter added-dropdown-filters">\
                              <div class="icon-block sa-sortable-dropbtn">\
                             <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNCAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zLjQ4ODM0IDAuODA5ODk3TDAuOTQwODE3IDMuMjI0NzNMMC45MDc3ODMgMy4yNTg5OUMwLjczMTEyMiAzLjQ1OTU0IDAuNzMzNjUgMy43NjU0IDAuOTIxMDc0IDMuOTYzMTJMMC45NTUzMjkgMy45OTYxNkMxLjE1NTg4IDQuMTcyODIgMS40NjE3NCA0LjE3MDI5IDEuNjU5NDcgMy45ODI4N0wzLjM4MTY4IDIuMzUwMDlWMTAuODYwOEwzLjM4MzgyIDEwLjkwODNDMy40MDc4NCAxMS4xNzQ1IDMuNjMxNTYgMTEuMzgzMSAzLjkwMzk5IDExLjM4MzFDNC4xOTI0NiAxMS4zODMxIDQuNDI2MyAxMS4xNDkyIDQuNDI2MyAxMC44NjA4VjIuNDU3MjNMNi4wMzU4NSAzLjk4Mjg3TDYuMDcxODMgNC4wMTQwMkM2LjI4MTUzIDQuMTc5NzIgNi41ODY4MiA0LjE2MDg1IDYuNzc0MjUgMy45NjMxMkM2Ljk3MjcgMy43NTM3NyA2Ljk2Mzg2IDMuNDIzMTggNi43NTQ1IDMuMjI0NzNMNC4yMDY5OCAwLjgwOTg5N0w0LjE3MDI5IDAuNzc4MTc2QzMuOTY4NzYgMC42MTk1NyAzLjY3Nzk3IDAuNjMwMTQ0IDMuNDg4MzQgMC44MDk4OTdaIiBmaWxsPSIjMjAyMTI0Ii8+DQo8cGF0aCBkPSJNOS42ODY0NyA5Ljk3OTlWMS40NjkyN0w5LjY4ODYxIDEuNDIxNzNDOS43MTI2MiAxLjE1NTU1IDkuOTM2MzQgMC45NDY5NjQgMTAuMjA4OCAwLjk0Njk2NEMxMC40OTcyIDAuOTQ2OTY0IDEwLjczMTEgMS4xODA4MSAxMC43MzExIDEuNDY5MjdWOS44NzI4TDEyLjM0MDYgOC4zNDczN0wxMi4zNzY2IDguMzE2MjJDMTIuNTg2MyA4LjE1MDUyIDEyLjg5MTYgOC4xNjkzOSAxMy4wNzkgOC4zNjcxMkMxMy4yNzc1IDguNTc2NDcgMTMuMjY4NiA4LjkwNzA2IDEzLjA1OTMgOS4xMDU1MUwxMC41MTE4IDExLjUyMDNMMTAuNDc1MSAxMS41NTIxQzEwLjI3MzUgMTEuNzEwNyA5Ljk4Mjc1IDExLjcwMDEgOS43OTMxMiAxMS41MjAzTDcuMjQ1NiA5LjEwNTUxTDcuMjEyNTcgOS4wNzEyNUM3LjAzNTkxIDguODcwNyA3LjAzODQ0IDguNTY0ODQgNy4yMjU4NiA4LjM2NzEyTDcuMjYwMTIgOC4zMzQwOEM3LjQ2MDY3IDguMTU3NDIgNy43NjY1MyA4LjE1OTk1IDcuOTY0MjUgOC4zNDczN0w5LjY4NjQ3IDkuOTc5OVoiIGZpbGw9IiMyMDIxMjQiLz4NCjwvc3ZnPg0K">\
                            </div>\
                            <div class="content-dropdown-sortable sa-sortable-dropdown">\
                            <div class="title-text sdk-i18n-lang" sdk-i18n-key="sa_sdk_sort_by_caps">{{html langTranslator("sa_sdk_sort_by_caps")}}</div>\
                            {{each(key, facet) sortablefacets }}\
                                                          <div class="option-text sa-sortable-facet-options text-truncate" value="{{= JSON.stringify(facet)}}" name="{{= facet.name}}">{{= facet.name}}</div>\
                                                          {{/each}}\
                            </div>\
                          </div>\
                            </script>'
    return sortableFacets;
  }
  getBottomUpSortableFacetsAddedlist() {
    var sortableFacetsAddedList = '<script id="bottom-up-sortable-tabs-template" type="text/x-jqury-tmpl">\
                          {{if displaySortable && displaySortable.name}}\
                          <div class="added-dropdown-filters">\
                               <div class="add-list">\
                               <span class="title"><span id="sa-select-sort-option"> {{= displaySortable.name}}</span></span>\
                               <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik01LjcwNzAzIDUuMDAwMDlMOS44NTM1NSAwLjg1MzU1M0MxMC4wNDg4IDAuNjU4MjkxIDEwLjA0ODggMC4zNDE3MDkgOS44NTM1NSAwLjE0NjQ0N0M5LjY1ODI5IC0wLjA0ODgxNTcgOS4zNDE3MSAtMC4wNDg4MTU0IDkuMTQ2NDUgMC4xNDY0NDdMNC45OTk5MSA0LjI5M0wwLjg1MzU1NSAwLjE0NjgxNEMwLjY1ODI4OCAtMC4wNDg0NDQ0IDAuMzQxNzA2IC0wLjA0ODQzOCAwLjE0NjQ0OCAwLjE0NjgyOEMtMC4wNDg4MTA0IDAuMzQyMDk0IC0wLjA0ODgwNCAwLjY1ODY3NyAwLjE0NjQ2MiAwLjg1MzkzNUw0LjI5MjggNS4wMDAxTDAuMTQ2NDQ3IDkuMTQ2NDZDLTAuMDQ4ODE1NyA5LjM0MTczIC0wLjA0ODgxNTUgOS42NTgzMSAwLjE0NjQ0NyA5Ljg1MzU3QzAuMzQxNzA5IDEwLjA0ODggMC42NTgyOTIgMTAuMDQ4OCAwLjg1MzU1MyA5Ljg1MzU3TDQuOTk5OTIgNS43MDcyTDkuMTQ2NDYgOS44NTM1N0M5LjM0MTczIDEwLjA0ODggOS42NTgzMSAxMC4wNDg4IDkuODUzNTcgOS44NTM1NUMxMC4wNDg4IDkuNjU4MjkgMTAuMDQ4OCA5LjM0MTcxIDkuODUzNTUgOS4xNDY0NUw1LjcwNzAzIDUuMDAwMDlaIiBmaWxsPSIjNUY2MzY4Ii8+DQo8L3N2Zz4NCg==" class="close-filter clear-sort-by">\
                             </div>\
                             </div>\
                             {{/if}}\
                            </script>'
    return sortableFacetsAddedList;
  }
  bindSortableFacetClickEvent(me: any, messageHtml: any, sortableHtml: any, facets: any,sortableFacetAddedHtml:any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    $(sortableFacetAddedHtml).off('click','.clear-sort-by').on('click','.clear-sort-by', function (event:any) {
      event.stopPropagation();
      $(".filter-data").hide();
      $(sortableHtml).find('#sa-select-sort-option').html('');
      hostWindowInstance.sortableFacetClick(event,'').then((response: any) => {
        let selectedFacet='';
        if (!response.isFilterAlignedTop) {
          selectedFacet = $(messageHtml).find(".tab-name.see-all-result-nav.active-tab").attr('id');
      if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
        let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
        if (index > -1) {
          response.result.splice(index, 1)
        }
      }
      FullSearchResultsTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
      let tabHtml = $(FullSearchResultsTemplate.prototype.getBottomupTab()).tmpl({ facets: response.facets, truncateText: truncateText  });
      $(messageHtml).find('#sdk-bottomup-tab-container').empty().append(tabHtml);
      FullSearchResultsTemplate.prototype.bindTabsClickEvent(me, messageHtml, selectedFacet);
      let filterCountHtml = $(FullSearchResultsTemplate.prototype.getFilterCountTemplate()).tmpl({ count: response.filterCount });
      $(messageHtml).find('#filter-count-container').empty().append(filterCountHtml);
        }
        if(response.sortableFacetList && response.sortableFacetList.length){
          let sortableHtml = $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
            displaySortable: response.displaySortable,langTranslator:me.langTranslator});
            $(messageHtml).find('#sa-sdk-sortable-dropdown-bottom-up').empty().append(sortableHtml);
            let sortableAddedListHtml =  $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsAddedlist()).tmpl({
              displaySortable: response.displaySortable});
            $(messageHtml).find('#sa-sdk-sortable-facets-added-list').empty().append(sortableAddedListHtml);
            FullSearchResultsTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml, selectedFacet,sortableAddedListHtml);
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
            let selectedFacet='';
            if (!response.isFilterAlignedTop) {
              selectedFacet = $(messageHtml).find(".tab-name.see-all-result-nav.active-tab").attr('id');
          if (selectedFacet !== 'task' && selectedFacet !== 'all results') {
            let index = response.result.findIndex((d: any) => d.message[0].component.payload.appearanceType == "task")
            if (index > -1) {
              response.result.splice(index, 1)
            }
          }
          FullSearchResultsTemplate.prototype.fullResultTemplateDataBind(me, messageHtml, response.result);
          let tabHtml = $(FullSearchResultsTemplate.prototype.getBottomupTab()).tmpl({ facets: response.facets, truncateText: truncateText  });
          $(messageHtml).find('#sdk-bottomup-tab-container').empty().append(tabHtml);
          FullSearchResultsTemplate.prototype.bindTabsClickEvent(me, messageHtml, selectedFacet);
          let filterCountHtml = $(FullSearchResultsTemplate.prototype.getFilterCountTemplate()).tmpl({ count: response.filterCount });
          $(messageHtml).find('#filter-count-container').empty().append(filterCountHtml);
            }
            if(response.sortableFacetList && response.sortableFacetList.length){
              let sortableHtml = $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsTabs()).tmpl({ sortablefacets: response.sortableFacetList,
                displaySortable: response.displaySortable, langTranslator:me.langTranslator});
                $(messageHtml).find('#sa-sdk-sortable-dropdown-bottom-up').empty().append(sortableHtml);
                let sortableAddedListHtml =  $(FullSearchResultsTemplate.prototype.getBottomUpSortableFacetsAddedlist()).tmpl({
                  displaySortable: response.displaySortable});
                $(messageHtml).find('#sa-sdk-sortable-facets-added-list').empty().append(sortableAddedListHtml);
                FullSearchResultsTemplate.prototype.bindSortableFacetClickEvent(me, messageHtml,sortableHtml, selectedFacet,sortableAddedListHtml);
            }
          });
          $(sortableHtml).find('.sa-sortable-dropdown').hide();
        })
      }, 1000)

    });
   }
  $ = $;
  feedBackResultEvents(me: any, messageHtml: any, feedbackData:any,msgData:any){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    
    $(messageHtml).find('.bottom-up-show-all-full').off('click','.thumb-up-full-top').on('click','.thumb-up-full-top', function (event:any) {
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
    if(!$('.thumbs-up-top-down-red').is(":visible")){
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
      $('#snippet-feedback-template').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
      }
    $('.thumbs-up-top-down-red').show();
    $('.thumbs-up-top-down-black').show();
    $('.thumbs-up-top-down-blue').hide();
    }
    });
    if (feedbackData === null) {
    $('.thumbs-up-top-down-blue, .thumbs-up-top-down-red').hide();
    $('.thumbs-up-top-down-black,.thumbs-down-top-down-black').css('display','inline');
    }
    else {
    if (feedbackData === 'thumbsUp') {
    $('.thumbs-up-top-down-black, .thumbs-up-top-down-red').hide();
    $('.thumbs-up-top-down-blue,.thumbs-down-top-down-black').css('display','inline');
    }
    else {
    $('.thumbs-down-top-down-black, .thumbs-up-top-down-blue').hide();
    $('.thumbs-up-top-down-black,.thumbs-up-top-down-red').css('display','inline');
    }
    }
    }
    bindCustomizePreviewClickEvent(me: any, messageHtml: any){
      let hostWindowInstance = me.hostInstance;
      let $ = me.hostInstance.$;
      $(messageHtml).find(".custom-header-nav-link-item")
    .off("click").on("click", function (e:any) {
      hostWindowInstance.customizePreviewBtnClick(e,false).then((result: any) => {
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
}

var truncateText = FullSearchResultsTemplate.prototype.truncateText;
FullSearchResultsTemplate.prototype.$ = $;

export default FullSearchResultsTemplate;