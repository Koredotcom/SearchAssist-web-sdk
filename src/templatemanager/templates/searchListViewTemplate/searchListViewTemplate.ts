import helpers from '../../../utils/helpers';
import './searchListViewTemplate.scss';
class SearchListViewTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers?.helpers;
    if (msgData?.message[0] && msgData?.message[0].component && msgData?.message[0].component?.payload && msgData?.message[0].component?.payload?.template_type == 'searchListTemplate') {
      if(msgData?.message[0].component?.payload?.viewType == 'Customize'){
        msgData.message[0].component.payload.template_type = 'searchCustomizeListTemplate';
      }
      if (!msgData?.message[0].component?.payload?.helpers) {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      if (!msgData?.message[0].component?.payload?.langTranslator) {
        msgData.message[0].component.payload['langTranslator'] =msgData?.message[0].component?.payload?.langTranslator;
      }
      const isSearchSDK = document.body.className.match('sdk-body');
      if(isSearchSDK!==null){
        msgData.message[0].component.payload.isSearchSDK = true;
      }
      else{
        msgData.message[0].component.payload.isSearchSDK = false;
      }
      me.messageListHtml = $(SearchListViewTemplate.prototype.getTemplateString(msgData?.message[0].component?.payload?.template_type)).tmpl(msgData?.message[0].component?.payload);
      setTimeout(()=>{
        SearchListViewTemplate.prototype.bindEvents(me, me.messageListHtml);
    },500)
      return me.messageListHtml;
    }
  }
  bindEvents(me:any, messageHtml: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    var _innerText;
    // Boost / Pin
    $(".template-3-classic-list-collapse")
      .off("click", ".click-here")
      .on("click", ".click-here", function (event: any) {
      });
    $(".customization")
      .off("click", ".visibility")
      .on("click", ".visibility", function (event: any) {
        // if (parseInt($(event.target).closest('.data-wrap').attr('pinindex')) == -1) {
        if ($(event.target).closest(".data-wrap").attr("visible") == "true") {
          SearchListViewTemplate.prototype.postPerformRankingActions(me,
            event,
            { visible: false },
            hostWindowInstance.vars.searchObject.searchText,
            "visibility"
          );
        } else {
          SearchListViewTemplate.prototype.postPerformRankingActions(me,
            event,
            { visible: true },
            hostWindowInstance.vars.searchObject.searchText,
            "visibility"
          );
        }
        // }
      });

      $(".customization")
      .off("click", ".unpin_added_result")
      .on("click", ".unpin_added_result", function (event: any) {
        SearchListViewTemplate.prototype.postPerformRankingActions(me,
          event,
          { pinIndex: -1 },
          hostWindowInstance.vars.searchObject.searchText,
          "unpin_added_result"
        );
      });

      $(".customization")
      .off("click", ".pinning")
      .on("click", ".pinning", function (event: any) {
        if ($(event.target).closest(".data-wrap").attr("visible") == "true") {
          var _selectedElement = $(event.target).closest(".structure-data-wrp");
          var _parentElement = $(event.target).closest(".results-wrap");
          var childNodes = Array.prototype.slice.call(_parentElement[0].children);
          var pinIndex = 0;
          if ($(event.target).closest(".pinning").attr("type") == "UnPin") {
            pinIndex = -1;
          } else {
            pinIndex = childNodes.indexOf(_selectedElement[0]);
          }
          SearchListViewTemplate.prototype.postPerformRankingActions(me,event,{ pinIndex: pinIndex },
            hostWindowInstance.vars.searchObject.searchText,
            "pinning");
        }
      });
      $(".customization")
      .off("click", ".boosting")
      .on("click", ".boosting", function (event: any) {
        if (
          $(event.target).closest(".data-wrap").attr("visible") == "true" &&
          parseInt($(event.target).closest(".data-wrap").attr("pinindex")) == -1
        ) {
          var boostByValue = parseFloat(
            $(event.target).closest(".data-wrap").attr("boost")
          );
          boostByValue = boostByValue + 0.25;
          let messageText = "customizationOnResults";
          let option = null;
          let serverMessageObject = null;
          let clientMessageObject = {
            event: event,
            boost: boostByValue,
            searchText: hostWindowInstance.vars.searchObject.searchText,
            action: "boosting"
          }
          /**  Emitting the Data to Host Instance */
          // hostWindowInstance.sendMessage(messageText, option, serverMessageObject, clientMessageObject)
          SearchListViewTemplate.prototype.postPerformRankingActions(me,
            event,
            { boost: boostByValue },
            hostWindowInstance.vars.searchObject.searchText,
            "boosting"
          );
        }
      });
      $(".customization")
      .off("click", ".burying")
      .on("click", ".burying", function (event: any) {
        if (
          $(event.target).closest(".data-wrap").attr("visible") == "true" &&
          parseInt($(event.target).closest(".data-wrap").attr("pinindex")) == -1
        ) {
          var buryByValue = parseFloat(
            $(event.target).closest(".data-wrap").attr("boost")
          );
          if (buryByValue > 0.25) {
            buryByValue = buryByValue - 0.25;
            SearchListViewTemplate.prototype.postPerformRankingActions(me,
              event,
              { boost: buryByValue },
              hostWindowInstance.vars.searchObject.searchText,
              "burying"
            );
          } else if (buryByValue != 0) {
            buryByValue = 0.25 - buryByValue;
            SearchListViewTemplate.prototype.postPerformRankingActions(me,
              event,
              { boost: buryByValue },
              hostWindowInstance.vars.searchObject.searchText,
              "burying"
            );
          } else {
            buryByValue = 0;
            SearchListViewTemplate.prototype.postPerformRankingActions(me,
              event,
              { boost: buryByValue },
              hostWindowInstance.vars.searchObject.searchText,
              "burying"
            );
          }
        }
      });

      $(".custom-add-result-container")
      .off("click", ".link-text")
      .on("click", ".link-text", function (event: any) {
        var structure = "bottom";
        if ($("body").hasClass("top-down")) {
          structure = "top";
          if (
            $("body").hasClass("top-down")
              ? $(".search-top-down").val()
              : $(".bottom-up-search").val()
          ) {
            hostWindowInstance.vars.searchObject.searchText = $("body").hasClass("top-down")
              ? $(".search-top-down").val()
              : $(".bottom-up-search").val();
          }
        } else {
          structure = "bottom";
        }
        if (hostWindowInstance.vars.searchObject && hostWindowInstance.vars.searchObject.searchText) {
          var responseObject = {
            type: "addNew",
            data: true,
            query: hostWindowInstance.vars.searchObject.searchText,
            structure: structure,
          };
          hostWindowInstance.parentEvent(responseObject);
        }
      });
    //Tour RR
    $(messageHtml).find(".sdk-tours-info-nxt")
      .off("click")
      .on("click", function (e: any) {
        $(".sdk-tours-info-start").hide();
        $(".sdk-tours-info-end").removeClass("hide");
        $(".sdk-tours-info-end").show();
      });
      $(messageHtml).find(".sdk-tours-info-pre")
      .off("click")
      .on("click", function (e: any) {
        $(".sdk-tours-info-start").show();
        //$("sdk-tours-info-end").removeClass("hide");
        $(".sdk-tours-info-end").hide();
      });

      $(messageHtml).find(".sdk-tours-info-close")
      .off("click")
      .on("click", function (e: any) {
        $(".tours-information").hide();
        hostWindowInstance.vars.customTourResultRank = false;
      });
    //Tour RR 

    //me.hostWindowInstance.sendMessage() //bindAllResultRankingOperations
    $('.parent-list-template')
    .off("click", ".show-more-list")
    .on("click", ".show-more-list", function (e: any) {
    const showMoreData = {
      groupName: $(e.currentTarget).attr("groupName"),
      templateName: $(e.currentTarget).attr("templateName"),
      pageNumber: Number($(e.currentTarget).attr("pageNumber")) + 1,
      fieldName: $(e.currentTarget).attr("fieldName"),
    };
    hostWindowInstance.showMoreClick(showMoreData).then((result: any) => {
      const isSearchSDK = document.body.className.match('sdk-body');
      if(result?.message[0].component.payload){
        if(isSearchSDK!==null){
          result.message[0].component.payload.isSearchSDK = true;
        }
        else{
          result.message[0].component.payload.isSearchSDK = false;
        }
      }
      if(result?.message[0].component?.payload?.viewType == 'Customize'){
        result.message[0].component.payload.template_type = 'searchCustomizeListTemplate';
      }
      const listHTML = $(SearchListViewTemplate.prototype.getTemplateString(result?.message[0].component.payload.template_type)).tmpl(result?.message[0].component.payload);
      $(listHTML).find(".show-more-list").remove();
        if(result.message[0].component.payload.isDemoTemplate !== "cosmeticsTemplate"){
          $(".full-search-data-container [templateName=" + showMoreData.templateName + "]").before($(listHTML).find(".parent-list-template").children());
        }
        else{
          $(".full-search-data-container [templateName=" + showMoreData.templateName + "]").before($(listHTML).find(".arrivals-grids-template").parent());
        }  
      if ((Number($(".full-search-data-container [templateName=" + showMoreData.templateName + "]").attr('pageNumber')) + 1) * 5 >= result?.message[0].component.payload.doc_count) {
        $(".full-search-data-container [templateName=" + showMoreData.templateName + "]").hide();
      }
    })
    $(e.currentTarget).attr("pageNumber", Number($(e.currentTarget).attr("pageNumber")) + 1);
    });

    //tasks click events//
    $(messageHtml)
    .off("click",".search-task")
    .on("click",".search-task", function (event:any) {
      event.stopPropagation();
      var ele = $(event.target).closest(".search-task");
      hostWindowInstance.botActionTrigger(event);
    });
    $('.parent-list-template').off("click",".click-to-navigate-url").on("click",".click-to-navigate-url", function (e: any) {
      hostWindowInstance?.clickNavigateToUrl(e);
    });
    $('.parent-list-template').off("click",".click-log-metrics").on("click",".click-log-metrics", function (e: any) {
      hostWindowInstance?.captureClickAnalytics(e,
        $(e.currentTarget).closest(".click-log-metrics").attr("contentType"),
        "click",
        $(e.currentTarget).closest(".click-log-metrics").attr("contentId"),
        $(e.currentTarget).closest(".click-log-metrics").attr("id"),
        $(e.currentTarget).closest(".click-log-metrics").attr("data-title") || $(e.currentTarget).attr("title"));
    });
    $('.parent-list-template')
    .off("click", ".accordion")
    .on("click", ".accordion", function (evet:any) {
      $(evet.target).closest(".accordion").toggleClass("acc-active");
      var panel = $(evet.target).closest(".accordion").next();
        if ($(evet.target)
      .closest(".accordion")
      .children(".desc_text_info").length &&
      $(evet.target)
      .closest(".accordion")
      .children(".desc_text_info")[0].scrollHeight == "18" &&
        $(evet.target).closest(".accordion").hasClass("best-match") && !panel.find('.img_content').length
      ) {
        if($(evet.target)
        .closest(".accordion").height() !== $(evet.target)
        .closest(".accordion").next().children('.inner-content-panel-data').height()){
        $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .hide();
        panel[0].style.dispaly = "block";
        if (!panel[0].classList.contains("carousel")) {
          panel[0].style.overflow = "initial";
        }
        }
        
        hostWindowInstance.captureClickAnalytics(
          evet,
          $(evet.currentTarget).closest(".accordion").attr("contenttype"),
          "click",
          $(evet.currentTarget).closest(".accordion").attr("contentId"),
          $(evet.currentTarget).closest(".accordion").attr("id"),
          $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
        );
        return;
      }
      if ($(evet.target)
      .closest(".accordion")
      .children(".desc_text_info").length &&
      $(evet.target)
      .closest(".accordion")
      .children(".desc_text_info")[0].scrollHeight == "18" &&
        !$(evet.target).closest(".accordion").hasClass("best-match")  && !panel.find('.img_content').length
      ) {
        if($(evet.target)
        .closest(".accordion").height() !== $(evet.target)
        .closest(".accordion").next().children('.inner-content-panel-data').height()){
          $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .show();
        $(evet.target)
          .closest(".accordion").next()
          .hide();
        }
          hostWindowInstance.captureClickAnalytics(
            evet,
            $(evet.currentTarget).closest(".accordion").attr("contenttype"),
            "click",
            $(evet.currentTarget).closest(".accordion").attr("contentId"),
            $(evet.currentTarget).closest(".accordion").attr("id"),
            $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
          );
        return;
      }

      //if($(evet.target).next().length){
      if (panel.length && panel[0].style.maxHeight || $(evet.target).hasClass("best-match")) {
        if (
          panel[0].style.maxHeight &&
          panel[0].style.maxHeight.toString().split("px")[0] == "18"
        ) {
          hostWindowInstance.captureClickAnalytics(
            evet,
            $(evet.currentTarget).closest(".accordion").attr("contenttype"),
            "click",
            $(evet.currentTarget).closest(".accordion").attr("contentId"),
            $(evet.currentTarget).closest(".accordion").attr("id"),
            $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
          );
          return;
        }
        if ($(evet.target).hasClass("best-match")) {
          $(evet.target).removeClass("best-match");
        }
        panel[0].style.dispaly = "none";

        panel[0].style.overflow = "hidden";
        setTimeout(() => {
          $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .show();
          panel[0].style.maxHeight = null;
        }, 150);
      } else if (panel.length) {
        if($(evet.target)
        .closest(".accordion").height() !== $(evet.target)
        .closest(".accordion").next().children('.inner-content-panel-data').height()){
        $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .hide();
        panel[0].style.dispaly = "block";
        panel[0].style.maxHeight = panel[0].scrollHeight + "px";
        if (!panel[0].classList.contains("carousel")) {
          panel[0].style.overflow = "initial";
        }
        }
       
        hostWindowInstance.captureClickAnalytics(
          evet,
          $(evet.currentTarget).closest(".accordion").attr("contenttype"),
          "click",
          $(evet.currentTarget).closest(".accordion").attr("contentId"),
          $(evet.currentTarget).closest(".accordion").attr("id"),
          $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
        );
      }
      setTimeout(() => {
        if (
          $(evet.target).closest("#searchChatContainer") &&
          $(
            ".finalResults .resultsOfSearch .bottom-search-show-all-results"
          ).last().length
        ) {
          if (
            $("#searchChatContainer").prop("offsetHeight") >=
            $(".finalResults .resultsOfSearch .bottom-search-show-all-results")
              .last()
              .position().top
          ) {
            $(".more-results").css("display", "none");
            $('.feedback-template-positions.if-live-search-top-down.bottom-up-show-all').css('display', 'flex');
          }
        }
      }, 500);
    });
    SearchListViewTemplate.prototype.tooltipBindEvent(me);
  }
  getTemplateString(type: any) {
  
    var searchListTemplates = '<script type="text/x-jqury-tmpl">\
    {{if isButtonTemplate == false}}\
    <div>\
    {{if structuredData?.length }}\
    {{if !isDemoTemplate}}\
    {{if renderTitle}}\
    <div class="title-list-heading">${titleName}</div>\
    {{/if}}\
    <div class="parent-list-template search-list-template{{if isClickable == true}}-no{{/if}}-clickble-{{if listType=="classic"}}classic{{else}}plain{{/if}}-group{{if gridLayoutType=="img_left"}}-if-img{{/if}}">\
        {{if isClickable == true}}\
        {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
        <div class="content-info {{if isSearchSDK&&textAlignment==" center"}}text-center{{/if}} click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{if data.img.length}}\
            <div class="img_block">\
                <img src="${data.img}">\
            </div>\
            {{/if}}\
            {{if data.heading.length}}\
            <div class="heading-title sa-sdk-title" data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
            {{/if}}\
            {{if data.description.length}}\
            <div class="desc_text_info  sa-sdk-title {{if listType==" classic"}}clamp-text{{else}}text_overflow{{/if}}" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
            {{/if}}\
        </div>\
        {{/each}}\
        {{/if}}\
        {{if isClickable == false}}\
        {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
        <div class="accordion-content-info">\
            <div class="content-info accordion" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                {{if data.heading.length}}\
                <div class="heading-title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{/if}}\
                {{if data.description.length}}\
                <div class="desc_text_info {{if !data.heading || !data.heading.length}}two-line-desc{{else}}text-truncate{{/if}}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                {{/if}}\
            </div>\
            <div class="panel">\
                <div class="inner-content-panel-data">\
                {{if data.img.length}}\
                    <div class="img_content">\
                        <img src="${data.img}">\
                    </div>\
                    {{/if}}\
                    <div class="desc-text-info-img">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                </div>\
            </div>\
        </div>\
        {{/each}}\
        {{/if}}\
        {{if isSearchSDK}}\
        <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
        <div class="searchassist-show-more-button"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_show_more">{{html langTranslator("sa_sdk_show_more")}}</span> <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
        </div>\
        {{/if}}\
    </div>\
    {{/if}}\
    </div>\
    {{/if}}\
    {{if isDemoTemplate == "serviceNowTemplate"}}\
<div class="siemens-template">\
<div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
<div class="parent-list-template">\
{{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
  <div class="siemens-list-template">\
    <div class="icon-with-title">\
    {{if data.icon}}\
      <img src="${data.icon}" class="siemens-icon-blue">\
    {{/if}}\
      <span class="name-title">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
      <span class="redirecting-link click-to-navigate-url click-log-metrics isClickable" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        <img class="siemens-link-icon" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik01LjYzNTAyIDEyQzUuMzQ0ODcgMTIgNS4xMDk2NiAxMS43NjQ4IDUuMTA5NjYgMTEuNDc0NkM1LjEwOTY2IDExLjIwMDYgNS4zMTk0NyAxMC45NzU2IDUuNTg3MjEgMTAuOTUxNEw1LjYzNTAyIDEwLjk0OTNIMTAuMDE0N0MxMC41MTI0IDEwLjk0OTMgMTAuOTE5MyAxMC41NjAyIDEwLjk0NzcgMTAuMDY5NkwxMC45NDkzIDEwLjAxNDdWMS45ODUyN0MxMC45NDkzIDEuNDg3NTcgMTAuNTYwMiAxLjA4MDc0IDEwLjA2OTYgMS4wNTIzMUwxMC4wMTQ3IDEuMDUwNzNIMS45ODUyN0MxLjQ4NzU3IDEuMDUwNzMgMS4wODA3NCAxLjQzOTc4IDEuMDUyMzEgMS45MzAzNkwxLjA1MDczIDEuOTg1MjdWNi4zNjQ5OEMxLjA1MDczIDYuNjU1MTMgMC44MTU1MTMgNi44OTAzNCAwLjUyNTM2MyA2Ljg5MDM0QzAuMjUxMzMyIDYuODkwMzQgMC4wMjYzMDQxIDYuNjgwNTMgMC4wMDIxNDY3MiA2LjQxMjc5TDAgNi4zNjQ5OFYxLjk4NTI3QzAgMC45MTM3NTMgMC44NDg4OTEgMC4wNDA1MDg5IDEuOTEwODQgMC4wMDEzNjk0OEwxLjk4NTI3IDBIMTAuMDE0N0MxMS4wODYyIDAgMTEuOTU5NSAwLjg0ODg5MSAxMS45OTg2IDEuOTEwODRMMTIgMS45ODUyN1YxMC4wMTQ3QzEyIDExLjA4NjIgMTEuMTUxMSAxMS45NTk1IDEwLjA4OTIgMTEuOTk4NkwxMC4wMTQ3IDEySDUuNjM1MDJaIiBmaWxsPSIjQkRDMUM2Ii8+DQo8cGF0aCBkPSJNOC4wMDI5IDMuNjAzOThDOC4yNzY5MyAzLjYwMzk4IDguNTAxOTYgMy44MTM3OSA4LjUyNjEyIDQuMDgxNTNMOC41MjgyNiA0LjEyOTM0TDguNTI4MjYgNy4wNDkxNUM4LjUyODI2IDcuMzM5MyA4LjI5MzA1IDcuNTc0NTEgOC4wMDI5IDcuNTc0NTFDNy43Mjg4NyA3LjU3NDUxIDcuNTAzODQgNy4zNjQ3MSA3LjQ3OTY4IDcuMDk2OTdMNy40Nzc1NCA3LjA0OTE1TDcuNDc3MzMgNS40MDM5TDIuMzgwMzggMTAuNTAwOEMyLjE3NTIxIDEwLjcwNiAxLjg0MjU3IDEwLjcwNiAxLjYzNzQgMTAuNTAwOEMxLjQ0NDMgMTAuMzA3NyAxLjQzMjk0IDEwLjAwMTcgMS42MDMzMyA5Ljc5NTM1TDEuNjM3NCA5Ljc1Nzg3TDYuNzQwNzkgNC42NTQ0OUw1LjA4MzA5IDQuNjU0NzFDNC44MDkwNiA0LjY1NDcxIDQuNTg0MDMgNC40NDQ5IDQuNTU5ODggNC4xNzcxNkw0LjU1NzczIDQuMTI5MzRDNC41NTc3MyAzLjg1NTMxIDQuNzY3NTMgMy42MzAyOSA1LjAzNTI3IDMuNjA2MTNMNS4wODMwOSAzLjYwMzk4SDguMDAyOVoiIGZpbGw9IiNCREMxQzYiLz4NCjwvc3ZnPg0K">\
      </span>\
    </div>\
    <div class="info-test-content four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
    <div class="author-updates-sec">\
      <div class="author-names">\
        <span class="author-title">Author:</span>\
        <span class="author_name">{{html helpers.convertMDtoHTML(data.scm_author)}}</span>\
      </div>\
      <div class="updates-on">\
        <span class="title">Updated on:</span>\
        <span class="time-updates">{{html helpers.convertMDtoHTML(data.scm_createdAt)}}</span>\
      </div>\
    </div>\
    <div class="button-chips">\
    {{each(key, chip) data.chips}}\
    <button class="btn-chip" style="color:${chip.color};background:${chip.background};border:1px solid ${chip.color}">{{html helpers.convertMDtoHTML(chip.name)}}</button>\
    {{/each}}\
    </div>\
    </div>\
    {{/each}}\
    {{if isSearchSDK}}\
    <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
    <div class="searchassist-show-more-button"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_show_more">{{html langTranslator("sa_sdk_show_more")}}</span>\
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==" height="6" width="10" />\
    </div>\
    </div>\
        {{/if}}\
     </div>\
    </div>\
    {{/if}}\
    {{if isDemoTemplate == "cosmeticsTemplate"}}\
    <div class="cosmetics-grid-template2 parent-list-template">\
                <div class="arrivals-grids-template">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                  <div class="slide-gride cosmetics-product-view" style="width:100%">\
                    <div class="inner-content-data">\
                      <div class="img-block">\
                        <img class="banner-img" src="${data.ecommerce_image}">\
                      </div>\
                      <div class="content-block">\
                        <div class="type-tag {{if data.ecommerce_bestseller == true}} display-inline-block{{else}}display-none{{/if}}">Best Seller</div>\
                        <div class="type-tag offer">${data.ecommerce_percentage_offer}</div>\
                        <div class="title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        <div class="text-desc">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        <div class="price-and-rating">\
                        <div>\
                        <div class="amount-info">${data.ecommerce_price}</div>\
                        <div class="amount-info strike-text">${data.ecommerce_original_price}</div>\
                        </div>\
                        <div class="rating-flex">{{each(key, review) data.ecommerce_ratingArr}}\{{if review == "fill"}}\
                        <div class="rating-star-pd"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxMCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMzUwMjc4IDMuNTI0TDMuMzk1ODkgMy4xOTMwNkw0LjYzOTgyIDAuMjM5OTE0QzQuNzc0NTYgLTAuMDc5OTcxNCA1LjIyNzg1IC0wLjA3OTk3MTQgNS4zNjI1OSAwLjIzOTkxNEw2LjYwNjUyIDMuMTkzMDZMOS42NDk3NiAzLjUyNEM5Ljk4MjMgMy41NjAxNiAxMC4xMTk4IDMuOTY5MzMgOS44NzY1NyA0LjE5ODk3TDcuNTg2ODcgNi4zNjA4TDguMjMxNzkgOS41MzAyNkM4LjMwMDA0IDkuODY1NjkgNy45MzU4NSAxMC4xMjE0IDcuNjQzNTIgOS45NDMzNUw1LjAwMTIxIDguMzMzNzRMMi4zNTYzNiA5Ljk0MzQ0QzIuMDYzOSAxMC4xMjE0IDEuNjk5NzcgOS44NjU0NCAxLjc2ODI4IDkuNTNMMi40MTU1NSA2LjM2MDhMMC4xMjM1ODIgNC4xOTkxMUMtMC4xMTk4NDQgMy45Njk1MyAwLjAxNzYyMDkgMy41NjAxNCAwLjM1MDI3OCAzLjUyNFoiIGZpbGw9IiNGNUIyNEQiLz4KPC9zdmc+Cg==" /></div>\
                        {{else}}\
                        <div class="rating-star-pd"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuMzYyNTkgMC4yMzk5MjNDNS4yMjc4MiAtMC4wNzk5NDAzIDQuNzc0NDggLTAuMDc5OTg3MiA0LjYzOTY3IDAuMjM5ODU5QzQuMTUzNjkgMS4zOTI5MyAzLjM5NTc2IDMuMTkyNzEgMy4zOTU3NiAzLjE5MjcxTDAuMzUwNjAxIDMuNTIzNTJDMC4wMTc2Mzc5IDMuNTU5NjkgLTAuMTE5OTU0IDMuOTY5MzUgMC4xMjM2OTYgNC4xOTkxTDIuNDE1MzMgNi4zNTk5N0wxLjc2ODE2IDkuNTI3OTZDMS42OTk1OSA5Ljg2MzYzIDIuMDY0MDUgMTAuMTE5OCAyLjM1Njc4IDkuOTQxNjhMNS4wMDEyIDguMzMyNjJMNy42NDMwOSA5Ljk0MTU5QzcuOTM1NyAxMC4xMTk4IDguMzAwMjIgOS44NjM4OCA4LjIzMTkgOS41MjgyMkw3LjU4NzA4IDYuMzU5OTdMOS44NzY0NSA0LjE5ODk2QzEwLjExOTkgMy45NjkxNiA5Ljk4MjI4IDMuNTU5NzEgOS42NDk0MyAzLjUyMzUyTDYuNjA2NjUgMy4xOTI3MUw1LjM2MjU5IDAuMjM5OTIzWk01LjAwMTIgMS40MDA3OEw2LjA2NDM1IDMuOTIxNzNMOC43MjM3NiA0LjIwOTY2TDYuNzMyMjcgNi4wOTA0Mkw3LjI4Mzc2IDguODA0MzRMNS4wMDEyIDcuNDEzNjhMMi43MTU1OSA4LjgwNDM0TDMuMjcwMTQgNi4wOTA0MkwxLjI4MTcxIDQuMjA5NjZMMy45MzgwNiAzLjkyMTczTDUuMDAxMiAxLjQwMDc4WiIgZmlsbD0iI0Y1QjI0RCIvPgo8L3N2Zz4K" /></div>\
                        {{/if}}\
                        {{/each}}\</div>\
                        </div>\
                      </div>\
                    </div>\
                  </div>\
                {{/each}}\
                </div>\
                {{if isSearchSDK}}\
                <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_show_more">{{html langTranslator("sa_sdk_show_more")}}</span>\
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
                </div>\
                 </div>\
                    {{/if}}\
                </div>\
    {{/if}}\
    {{if isDemoTemplate == "bankingTemplate"}}\
    <div class="banking-demo-list">\
              <div class="banking-list-template">\
                <div class="title-heading-banking {{if data.subtitle}}display-block{{else}}display-none{{/if}}">${data.subtitle}</div>\
                <div class="banking-carousel-template-data">\
                  <div class="carousel bankCarouselId${key+1}">\
                      <div class="slide">\
                        <div class="inner-content-list">\
                          <div class="img-block-with-text">\
                              <div class="img-block">\
                                  <img src="">\
                              </div>\
                              <div class="text-content">\
                                  <div class="main-heading text-truncate">Luxor Hotel & Casino</div>\
                                  <div class="stars">\
                                    <span>4.5</span>\
                                    <img src="images/banking/star-fill.svg">\
                                    <img src="images/banking/star-fill.svg">\
                                    <img src="images/banking/star-fill.svg">\
                                    <img src="images/banking/star-fill.svg">\
                                    <img src="images/banking/star-unfil.svg">\
                                  </div>\
                                  <div class="info-content two-line-description">Significant reduce time and costs with the U.S Bank purchasing card, a fast, flexible purchasing tool, which offers you an.</div>\
                              </div>\
                          </div>\
                          <div class="chips-data">\
                            <div class="chip-name">25% off</div>\
                            <div class="chip-name">Complimentary meals</div>\
                            <div class="chip-name">No chargeable Reschedule</div>\
                            <div class="chip-name">3x Reward points</div>\
                          </div>\
                        </div>\
                    </div>\
                </div>\
              </div>\
              </div>\
            </div>\
    {{/if}}\
    {{/if}}\
    {{if isButtonTemplate}}\
    {{if structuredData?.length}}\
        {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
          <div class="bot-actions-customize-info ">\
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
            <span class="info-text">Bot Actions cannot be customized</span>\
          </div>\
        {{/if}}\
        {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
          <div class="heading-and-show-all" appearanceType="task">\
            <div class="text-heading-main">ACTIONS</div>\
            <div class="show-al-text show-all-blue display-none">Show all Actions</div>\
          </div>\
        {{/if}}\
        {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
          <div class="new-grid-search-data list-view-data-search">\
            {{each(key, task) structuredData}}\
              <div class="title-box-data">\
                  <div id="${key}" class="sa-sdk-title search-task search-grid-item text-truncate one-line-height" title="${task.name}" contentId="${task.taskId}" contentType="${task.contentType}" childBotId="${task.childBotId}" childBotName="${task.childBotName}" payload="${task.payload}" seqLogId="${task.seqLogId}">\
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAVaoEbq4DbK8GbK4Gbq8Gba0Fba8Fba4Fbq4Eba4Fba7////SVqJwAAAAC3RSTlMAA0hJVYKDqKmq4875bAAAAAABYktHRAyBs1FjAAAAP0lEQVQI12NgwACMJi5A4CzAwLobDBIYOCaAxDknMLCvnAkEsyYwcECkkBicMDV4GGwQxQEMjCogK5wEMC0HALyTIMofpWLWAAAAAElFTkSuQmCC" class="credit-card display-none">\
                  <div class="name-title">${task.titleText}</div>\
                  {{if task.childBotName !=="" && task.childBotName !== undefined}}\
                      <span class="child-bot">${task.childBotName}</span>\
                  {{/if}}\
                  </div>\
              </div>\
            {{/each}}\
          </div>\
        {{/if}}\
        {{/if}}\
        {{/if}}\
    </script>';
  
    var customizeList = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
    <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
    <div class="tpt-1-tle-wt-txt {{if devMode== false || viewType != "Customize"}}display-none{{/if}}">\
      <div class="total-structured-data-wrap {{if viewType=="Customize"&&devMode==true}}{{if isFullResults == true}}customization{{/if}}{{/if}} {{if maxSearchResultsAllowed ==0}}display-none{{/if}}">\
        {{if tour && isFullResults == true && viewType=="Customize" && devMode==true}}\
          <div class="tours-information sdk-tours-info-start">\
          <div class="tourtitle sdk-i18n-lang" sdk-i18n-key="sa_sdk_customize">{{html langTranslator("sa_sdk_customize")}}</div>\
          <div class="tour-info sdk-i18n-lang" sdk-i18n-key="sa_sdk_start_customixing_your_search_results_by_hovering">{{html langTranslator("sa_sdk_start_customixing_your_search_results_by_hovering")}}</div>\
          <div class="tour-action-info"><b class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_hide_caps">{{html langTranslator("sa_sdk_hide_caps")}}</b> - <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_hide_the_search_result">{{html langTranslator("sa_sdk_hide_the_search_result")}}</span></div>\
          <div class="tour-action-info"><b class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_pin_caps">{{html langTranslator("sa_sdk_pin_caps")}}</b> - <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_pin_results_in_a_specific_position">{{html langTranslator("sa_sdk_pin_results_in_a_specific_position")}}</span></div>\
          <div class="tour-action-info"><b class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_boost_caps">{{html langTranslator("sa_sdk_boost_caps")}}</b> - <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_boost_the_relevance_score">{{html langTranslator("sa_sdk_boost_the_relevance_score")}}</span></div>\
          <div class="tour-action-info"><b class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_lower_caps">{{html langTranslator("sa_sdk_lower_caps")}}</b> - <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_lower_the_relelavance_score">{{html langTranslator("sa_sdk_lower_the_relelavance_score")}}</span></div>\
          <div class="footer-tour">\
              <div class="tour-length">1 of 2</div>\
              <div class="tour-btns">\
              <button class="next-btn sdk-tours-info-nxt sdk-i18n-lang" sdk-i18n-key="sa_sdk_next">{{html langTranslator("sa_sdk_next")}}</button>\
              <button class="close-btn sdk-tours-info-close sdk-i18n-lang" sdk-i18n-key="sa_sdk_close">{{html langTranslator("sa_sdk_close")}}</button>\
             </div>\
            </div>\
          </div>\
          <div class="tours-information tour-customization-info sdk-tours-info-end hide">\
            <div class="tourtitle"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_customize">{{html langTranslator("sa_sdk_customize")}}</span>\</div>\
            <div class="tour-info mb-2 pb-1 sdk-i18n-lang" sdk-i18n-key="sa_sdk_you_can_order_the_results_by_clicking">{{html langTranslator("sa_sdk_you_can_order_the_results_by_clicking")}}</div>\
            <div class="footer-tour">\
              <div class="tour-length">2 of 2</div>\
              <div class="tour-btns">\
                  <button class="next-btn sdk-tours-info-close">Got it</button>\
                  <button class="close-btn sdk-tours-info-pre">Previous</button>\
              </div>\
            </div>\
          </div>\
          {{/if}}\
          {{if isFullResults == true || isSearch == true || isLiveSearch == true}}\
            <ul class="tile-with-text-parent tasks-wrp  parent-list-template structured-data-outer-wrap {{if isDropdownEnabled == true && isFullResults == false}}panel p-0{{/if}} {{if isClickable == false}}with-accordion{{/if}} {{if isFullResults == true}}results-wrap{{/if}}" style="{{if isDropdownEnabled == true && isFullResults == false}}max-height: 100% !important; overflow : initial !important;{{/if}}">\
              {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                <li class="task-wrp faqs-shadow structure-data-wrp {{if viewType=="Customize" && isFullResults == true}}{{if data.config.visible == false || (data.config.visible == true && !data.addedResult && (data.config.pinIndex < 0))}}ui-state-disabled{{/if}}{{/if}} {{if viewType != "Customize" && config.visible == false}}display-none{{/if}}" boost="${data.config.boost}" pinIndex="${data.config.pinIndex}" visible="${data.config.visible}" contentId="${data.contentId}" contentType="${data.sys_content_type}" manuallyAdded="${data.addedResult}" id="${key}">\
                    {{if isClickable == true}}\
                      {{if viewType!="Customize" && (isFullResults == true ||  isSearch == true || isLiveSearch == true)}}\
                        <div class="click-to-navigate-url tile-with-text structured-data-wrp-content" href="${data.url}" target="_blank">\
                          <div class="tile-heading text-truncate one-line-height sa-sdk-title"  data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                          <div class="tile-description text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                      {{/if}}\
                      {{if viewType=="Customize" && (isFullResults != true &&  (isSearch == true || isLiveSearch == true))}}\
                        <div class="click-to-navigate-url tile-with-text structured-data-wrp-content"  href="${data.url}" target="_blank">\
                          <div class="tile-heading text-truncate one-line-height sa-sdk-title"  data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                          <div class="tile-description text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                      {{/if}}\
                      {{if viewType=="Customize" && isFullResults == true}}\
                        <div class="data-wrap" index="${i}" contentType="${data.sys_content_type}" contentId="${data.contentId}" score="${data.score}" boost="${data.config.boost}" pinIndex="${data.config.pinIndex}" visible="${data.config.visible}">\
                          <div class="customization-tile{{if data.config.visible == false}} disable_hidden{{/if}}{{if data.config.pinIndex >= 0}} disable_pinned{{/if}}">\
                              <div class="drag-content {{if data.config.visible == false || (data.config.visible == true && !data.addedResult && (data.config.pinIndex < 0))}}display-none{{/if}}"></div>\
                              {{if !data.addedResult || data.addedResult == false}}\
                                <div class="actions-content">\
                                  <span class="action-item visibility" type="{{if data.config.visible == true}}Hide{{/if}}{{if data.config.visible == false}}UnHide{{/if}}">\
                                    <span class="tooltiptext">\
                                      <span class="_hide sdk-i18n-lang {{if data.config.visible == true}}display-block{{else}}display-none{{/if}}" sdk-i18n-key="sa_sdk_hide">\
                                      {{html langTranslator("sa_sdk_hide")}}\
                                      </span>\
                                      <span class="unhide sdk-i18n-lang {{if data.config.visible == false}}display-block{{else}}display-none{{/if}}" sdk-i18n-key="sa_sdk_unhide">\
                                      {{html langTranslator("sa_sdk_unhide")}}\
                                      </span>\
                                    </span>\
                                    <span class="img_hide {{if data.config.visible == true}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEgSURBVHgB3VLRTcNADLUv4VREI90IYQPYACagnaDwh1ALHaGZAFQkxF9H6AjABGSEbEBQQaDcnc25JSgqCPWvVS1Z8vme37MtA6zbcDnR7tsjiNQJMnTCM12AMGfm3Noq+7zfLZp49YtSqWtgerVVdTwbRyjunTsD4KdY66kZsoHNM5l776I6WBUfxkiTvpMdLXYQlmSiOJ6sSuCZHkKR+SEgooIhsA7o3yXJX3LlJ8BgyFM+F5ekJ3om57sYYwdB9YA5E8D7nZ6DWucfqdatHgMNiX0GHh5VHE0jpQ6xZi5vsJRYFJg4BUSD33fAAEUgLQN5ObtV3WYNLrcYunkJN7AvB9O+tCPJv413RnWnolqL/WnSbh0nA3cq3hSA7bMvciOL7FwWG34AAAAASUVORK5CYII=">\
                                    </span>\
                                    <span class="img_unhide {{if data.config.visible == false}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGDSURBVHgB1VLLUQJBEO2e2bW0SixDWCNQM8AIwAjg6EH5RCBEwM+DNzUDiECMAMxgQ6AUS4WZeXavLoUl5Vmnqg/T816/191D9O8Pb0ruN7DvnS8GDkkGAk+jKJrOujz7tYASQ6A6KDRAlDJoqnkQEmYuMpmWMdRbL2TWyIlHmAT44nKxOJ737bG1pqkxH0Qn1pgDkD/wIUy2z16Tbw4yy0IGwt28H7c0t1dHR+5VfWY23aceNzW/W1u2DNmSMXyiTjIHAXRJgac5uXDhqkIuq6oGAcXCuSvrm2IAmmUcbUHVBdwAfC+3BUYicxipgkQayD/A4Ch/D941laNcoyABt42xHU18ImgsA6uoqoa0UILDMG/XxtGNcpS72kKh5m6FdLhYvJ++Xe+kWRvMdbGvAqOXwVY32xJwL+qPz/2o+mONMqCuFCkJqW2tHebrUuLSL6visi7kkcyhsfEfrAZIVNG9yzX9SicAxlp4fhWP1/Ebf2Ku6pw7QsAs3orTTb/wb5wP48rkd2sW1IgAAAAASUVORK5CYII=">\
                                    </span>\
                                  </span>\
                                  <span class="action-item pinning" type="{{if data.config.pinIndex >= 0}}UnPin{{/if}}{{if data.config.pinIndex < 0}}Pin{{/if}}">\
                                    <span class="tooltiptext">\
                                      <span class="unpin sdk-i18n-lang {{if data.config.pinIndex >= 0}}display-block{{else}}display-none{{/if}}" sdk-i18n-key="sa_sdk_unpin_caps">\
                                      {{html langTranslator("sa_sdk_unpin_caps")}}\
                                      </span>\
                                      <span class="pin sdk-i18n-lang {{if data.config.pinIndex < 0}}display-block{{else}}display-none{{/if}}" sdk-i18n-key="sa_sdk_pin">\
                                      {{html langTranslator("sa_sdk_pin")}}\
                                      </span>\
                                    </span>\
                                    <span class="img_unpin {{if data.config.pinIndex >= 0}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGFSURBVHgBxVK/S8NAFH53SaugKQHpntp/oBlcBAdxcmsXKS5aJxX7Y3Jw0U6OFaluIl1EBUk3x4KTuLTgKNouQrGINyjV9HJnHxiN/YW6+EFI7uW9777vuwP4gJZ2DoeXmwb8EtT9UAjN+nxDfyL5hJ6RhpYUJS9Ju6ZrKafaj5h6F2yH1BSFJFDJ9b20pJQ4pLcfw+f3l3qR0M4CklxtEFg/E9G7BpQmw7BACKmAlNl+JF3AnW8fZHV215EXN0JmTmQU61qSL3baUeF7BrojRDmQFmCMgb43T2D7XEI+TnL8iEPhkmxiGyp5BQj1yoBJEAVsqjZErP7MzXyc1taOhTE3Qa2pMBRatm0qlJoDLYymWluu1NOyHUEbaAdtte3p3l61ZwZcFokKaZS6dCASoaBkxRXKZnKS1Z/ekIC5vV2nMLJqR6iqWII702iHUGrVHoGNB8FkTRIbeNlwGKXju9MOfAXdddn6Dnv/eddeEuIWAylRdjhPvOz7K/ADIAl4svg/vANVesefO32vSgAAAABJRU5ErkJggg==">\
                                    </span>\
                                    <span class="img_pin {{if data.config.pinIndex < 0}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgBhZB/asJQDMeTZy0dW0eP0N1Aj9ATjJ1A9p8MVnYEvcFgMPxTT6A38Aj2BnqEgojSviYm/oAnvmLg8SD5fpNPgtASyQ8nDdGqrqrsMHnaXPMG2iORl3bDcBkN9+lDAxG8I2IBzGPXFPjEcc4DBhpR3WS7/7CIvy2oCYb7DF1eF4fsWfz8VfVM0JlfEMsTUvmLpXScaZKJPjvGvKlYGqWmK2LBkuX7ku+ji/KS1yMEM9DLRFFUNixTicfbv2DqXZotL3SK8lpre8AArvjGcGVVdsVDY+aee5yv5Ig/lF1SheCB4t05VBznzVp/X+3O8JrTyltoiSM5w31qLIEkiwAAAABJRU5ErkJggg==">\
                                    </span>\
                                  </span>\
                                  <span class="action-item boosting">\
                                  <span class="tooltiptext">{{html langTranslator("sa_sdk_boost")}}</span>\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADCSURBVHgBfY/BCcJAEEVnNiKKrGgHKSElmA7swBxFJEkHYgfRg3jTTtKCHSQdKIIoMTtjNhgI65o5fh5//gMwbhxyJNfl3MyFAW0YKAaBJxnywgp+oeBdFD6VygegxIRrSIYqGyyfbpONVoVXZdcGxnbT6zjM2wUaFj0nrR7Hglh5Nkjf49C/1DOYZmCz1l/MHC3WgU6Rxfm+x22ntYPCZ6Tgp9lmPYnZlZHKGrjTWsOKKUWCnSAop/+sbwnmeoYCBR8N24MPhSbzYAAAAABJRU5ErkJggg==">\
                                  </span>\
                                  <span class="action-item burying {{if data.config.boost == 0}}disabled{{/if}} {{if data.score <= 0}}disabled{{/if}}">\
                                  <span class="tooltiptext">{{html langTranslator("sa_sdk_lower")}}</span>\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADJSURBVHgBdZDRDYIwEIZbEFKDTRiBEVzBSfDRmBRxA11BX3xTJ3AE4ghOgE7ggyaalvbskZCUWP633n253neUC31USm6/h/GdeJKWkDXG5AFQ84jiuGKLT+aDNJiKEEPbwqRQG17o2oUR4itdYw/ftGtggZIgV1LOGGMEJwGY83sX9UEXxqoLeYNwImT51+DCXHwiXZKlnOJlrLW+DVkjFIxCaw3XQet2UqGfXDTzQeswCNN2EsD6tR+demDP2p7RhfzLW+PuOzc/5PRxOXt0QzUAAAAASUVORK5CYII=">\
                                  </span>\
                                </div>\
                              {{/if}}\
                              {{if data.addedResult && data.addedResult == true}}\
                                <div class="actions-content manually_added_pin">\
                                  <span class="action-item unpin_added_result">\
                                    <span class="tooltiptext">Unpinning will remove the result</span>\
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGFSURBVHgBxVK/S8NAFH53SaugKQHpntp/oBlcBAdxcmsXKS5aJxX7Y3Jw0U6OFaluIl1EBUk3x4KTuLTgKNouQrGINyjV9HJnHxiN/YW6+EFI7uW9777vuwP4gJZ2DoeXmwb8EtT9UAjN+nxDfyL5hJ6RhpYUJS9Ju6ZrKafaj5h6F2yH1BSFJFDJ9b20pJQ4pLcfw+f3l3qR0M4CklxtEFg/E9G7BpQmw7BACKmAlNl+JF3AnW8fZHV215EXN0JmTmQU61qSL3baUeF7BrojRDmQFmCMgb43T2D7XEI+TnL8iEPhkmxiGyp5BQj1yoBJEAVsqjZErP7MzXyc1taOhTE3Qa2pMBRatm0qlJoDLYymWluu1NOyHUEbaAdtte3p3l61ZwZcFokKaZS6dCASoaBkxRXKZnKS1Z/ekIC5vV2nMLJqR6iqWII702iHUGrVHoGNB8FkTRIbeNlwGKXju9MOfAXdddn6Dnv/eddeEuIWAylRdjhPvOz7K/ADIAl4svg/vANVesefO32vSgAAAABJRU5ErkJggg==">\
                                  </span>\
                                </div>\
                              {{/if}}\
                              <div class="title text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                              <div class="desc_text text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                              <div class="appearences-count count">\
                                <span class="tooltip-appearnces">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADqSURBVHgBTU/BTcNAEJzxnRDiAyVQAukASuALj+APPG0qcFIB+BVFPI4IIp4pAVMBLbgE54eSnIc9FKPs47Q7M7czS+xrFt4uPV0l6ALgGYFG0uI+v31NfJael8VH5ZiteukrajPaSqOdiUBWiUsazsLyzhkQxStgd24fxmljVKwB3zr231H9debJMaTpXrSCuJawdnSfCbO+tr7yKdMWeDyiezLr+iG/mSSreVi2hC97oHRQYRnZnGDTCujsgBb/pc5Rp8f46WxoOMDz8F6SWWHZ8jSbXUiRhquJgzK7CYnib584tRjPA/cLSnRp8KbGJuoAAAAASUVORK5CYII=">\
                                  <span class="tooltip_text sdk-i18n-lang"  sdk-i18n-key="sa_sdk_appearances">{{html langTranslator("sa_sdk_appearances")}}</span>\
                                  </span>\
                                <span class="count">${data.feedback?.appearances}</span>\
                              </div>\
                              <div class="appearences-count count">\
                              <span class="tooltip-appearnces-clicks">\
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEMSURBVHgBnZK/bcJQEMbvniFJmRGSDZINnA2SEijgioConA1iNkgqlKS4IASUwAaMABPgEWgBoeMOyQiZh0F8hU86v9/9+d5DyOivM/gUkRgR4/dqqQUeuWzCgI3go0U4IedLNqmUQI4cXKFC3s/f/74gwEQAwsMdcyHbLUCZ7yLIXIvsDHLmllW0mIXS3dKYGoQGrEWei4isVUaWrNfKmDeyU4+/DdAqbwq8wgVydap8iMBMZx8aqLnpWcg+DSrXtMv4APSPxvykIdnfU4MqcQoy872XwrtIz3SOFv7hntla1V1bG1hNmkRJm/mhgLeR3VdRli9el9rcDQMMIn2JoZa3rol1uIHVFxEttjVMjEnBcNKUAAAAAElFTkSuQmCC">\
                                <span class="tooltip_text sdk-i18n-lang" sdk-i18n-key="sa_sdk_clicks">{{html langTranslator("sa_sdk_clicks")}}</span>\
                                </span>\
                              <span class="count">${data.feedback?.clicks}</span>\
                              </div>\
                              {{if !data.addedResult || data.addedResult == false}}\
                              <div class="appearences-count customize-chips bg-data record-status-pinned" style="display : {{if data.config.pinIndex >= 0}}block{{else}}none{{/if}}">\
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgBhZB/asJQDMeTZy0dW0eP0N1Aj9ATjJ1A9p8MVnYEvcFgMPxTT6A38Aj2BnqEgojSviYm/oAnvmLg8SD5fpNPgtASyQ8nDdGqrqrsMHnaXPMG2iORl3bDcBkN9+lDAxG8I2IBzGPXFPjEcc4DBhpR3WS7/7CIvy2oCYb7DF1eF4fsWfz8VfVM0JlfEMsTUvmLpXScaZKJPjvGvKlYGqWmK2LBkuX7ku+ji/KS1yMEM9DLRFFUNixTicfbv2DqXZotL3SK8lpre8AArvjGcGVVdsVDY+aee5yv5Ig/lF1SheCB4t05VBznzVp/X+3O8JrTyltoiSM5w31qLIEkiwAAAABJRU5ErkJggg==">\
                              <span class="count sdk-i18n-lang" sdk-i18n-key="sa_sdk_pinned_caps">{{html langTranslator("sa_sdk_pinned_caps")}}</span>\
                            </div>\
                            <div class="appearences-count customize-chips bg-data record-status-hidden" style="display : {{if data.config.visible == false}}block{{else}}none{{/if}}">\
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEgSURBVHgB3VLRTcNADLUv4VREI90IYQPYACagnaDwh1ALHaGZAFQkxF9H6AjABGSEbEBQQaDcnc25JSgqCPWvVS1Z8vme37MtA6zbcDnR7tsjiNQJMnTCM12AMGfm3Noq+7zfLZp49YtSqWtgerVVdTwbRyjunTsD4KdY66kZsoHNM5l776I6WBUfxkiTvpMdLXYQlmSiOJ6sSuCZHkKR+SEgooIhsA7o3yXJX3LlJ8BgyFM+F5ekJ3om57sYYwdB9YA5E8D7nZ6DWucfqdatHgMNiX0GHh5VHE0jpQ6xZi5vsJRYFJg4BUSD33fAAEUgLQN5ObtV3WYNLrcYunkJN7AvB9O+tCPJv413RnWnolqL/WnSbh0nA3cq3hSA7bMvciOL7FwWG34AAAAASUVORK5CYII=">\
                              <span class=" count sdk-i18n-lang"  sdk-i18n-key="sa_sdk_hidden_caps" >{{html langTranslator("sa_sdk_hidden_caps")}}</span>\
                            </div>\
                            <div class="appearences-count customize-chips bg-data record-status-boosted {{if data.config.boost > 1}}display-block{{/if}}">\
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADCSURBVHgBfY/BCcJAEEVnNiKKrGgHKSElmA7swBxFJEkHYgfRg3jTTtKCHSQdKIIoMTtjNhgI65o5fh5//gMwbhxyJNfl3MyFAW0YKAaBJxnywgp+oeBdFD6VygegxIRrSIYqGyyfbpONVoVXZdcGxnbT6zjM2wUaFj0nrR7Hglh5Nkjf49C/1DOYZmCz1l/MHC3WgU6Rxfm+x22ntYPCZ6Tgp9lmPYnZlZHKGrjTWsOKKUWCnSAop/+sbwnmeoYCBR8N24MPhSbzYAAAAABJRU5ErkJggg==">\
                              <span class="count boosted">${data.config.boost}X <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_boosted_caps">{{html langTranslator("sa_sdk_boosted_caps")}}</span></span>\
                            </div>\
                            <div class="appearences-count customize-chips bg-data record-status-lowered {{if data.config.boost < 1}}display-block{{/if}}">\
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADJSURBVHgBdZDRDYIwEIZbEFKDTRiBEVzBSfDRmBRxA11BX3xTJ3AE4ghOgE7ggyaalvbskZCUWP633n253neUC31USm6/h/GdeJKWkDXG5AFQ84jiuGKLT+aDNJiKEEPbwqRQG17o2oUR4itdYw/ftGtggZIgV1LOGGMEJwGY83sX9UEXxqoLeYNwImT51+DCXHwiXZKlnOJlrLW+DVkjFIxCaw3XQet2UqGfXDTzQeswCNN2EsD6tR+demDP2p7RhfzLW+PuOzc/5PRxOXt0QzUAAAAASUVORK5CYII=">\
                              <span class="count lowered">${data.config.boost}X <span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_lowered_caps">{{html langTranslator("sa_sdk_lowered_caps")}}</span></span>\
                            </div>\
                             {{/if}}\
                              {{if data.addedResult && data.addedResult == true}}\
                                <div class="appearences-count bg-data">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD5SURBVHgBhZAxTgMxEEX/rBeJcnuE2NwgdAhSTBR6lBOsuAl03AI4QaCjIlOt6JIbkCMkXaSs15mJtJKjeBVL1kie9+3nIfQsZi52cAsPP/4TWXXnWV9gCxQElA5ufsdcng3kcE9algHhNQ65FPzAk4oQ3lq001rmP9flYJMhe78qb74p9u0CChcKj2uR5T3zkOBmChYBWB+URGRNoE86ePvnHO3AYNMw2LQa+NsL3RSrjPjxRZuVTeZSb7NXDa7l9yP56RbNl+nYJxvkQ2vG8FGgczV30wPCDMnpRXCAn5q7jVP1tITqJGGwjvHfaqp3EhjxZJFs9Kw9ezRmCkd+ZkUAAAAASUVORK5CYII=">\
                                  <span class="count">PINNED</span>\
                                </div>\
                                <div class="appearences-count bg-data">\
                                  <span class="count">MANUALLY ADDED</span>\
                                </div>\
                              {{/if}}\
                              {{if data.sys_content_type === "faq"}}\
                              <div class="tag-ref sdk-i18n-lang" sdk-i18n-key="sa_sdk_faq_response">{{html langTranslator("sa_sdk_faq_response")}}</div>\
                              {{/if}}\
                              {{if data.sys_content_type === "web"}}\
                              <div class="tag-ref sdk-i18n-lang" sdk-i18n-key="sa_sdk_web_response">{{html langTranslator("sa_sdk_web_response")}}</div>\
                              {{/if}}\
                              {{if data.sys_content_type === "file"}}\
                              <div class="tag-ref sdk-i18n-lang" sdk-i18n-key="sa_sdk_file_response">{{html langTranslator("sa_sdk_file_response")}}</div>\
                              {{/if}}\
                              {{if data.sys_content_type === "data"}}\
                              <div class="tag-ref sdk-i18n-lang" sdk-i18n-key="sa_sdk_data_response">{{html langTranslator("sa_sdk_data_response")}}</div>\
                              {{/if}}\
                          </div>\
                        </div>\
                      {{/if}}\
                    {{/if}}\
                    {{if isClickable == false}}\
                      <div class="tile-with-text faqs-wrp-content structured-data-wrp-content">\
                      <div class="tile-heading accordion p-0  {{if data.bestMatch && data.bestMatch == true}} acc-active best-match{{/if}}\" id="1">\
                         <div data-title="${data.heading}" class="text-truncate one-line-height sa-sdk-title" >{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="tile-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description, null,null,true)}}</div>\
                        </div>\
                        <div class="panel">\
                            <div class="tile-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            <div class="divfeedback d-none">\
                              <span class="yesLike"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT50aHVtYnMtdXAtZ3JheTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJ0aHVtYnMtdXAtZ3JheSIgZmlsbD0iIzRENTc1QyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTEuMTY0LDEzLjMzMyBDMC44ODksMTMuMzMzIDAuNjY3LDEzLjExNSAwLjY2NywxMi44NDYgTDAuNjY3LDcgQzAuNjY3LDYuNzMgMC44ODksNi41MTMgMS4xNjQsNi41MTMgTDMuNDk4LDYuNTEzIEw1LjAyNiwxLjAyNiBDNS4wODYsMC44MTQgNS4yODIsMC42NjYgNS41MDYsMC42NjYgQzYuNjgsMC42NjYgNy42MzIsMS41OTkgNy42MzIsMi43NDggTDcuNjMyLDUuNDUgTDExLjIwNyw1LjQ1IEMxMi41MSw1LjQ1IDEzLjUwNyw2LjU4NyAxMy4zMDgsNy44NDggTDEyLjcyNCwxMS41NjggQzEyLjU2NCwxMi41ODQgMTEuNjcyLDEzLjMzMyAxMC42MjMsMTMuMzMzIEwxLjE2NCwxMy4zMzMgWiBNMy4zOCwxMi4zNTkgTDMuMzgsNy40ODcgTDEuNjYyLDcuNDg3IEwxLjY2MiwxMi4zNTkgTDMuMzgsMTIuMzU5IEwzLjM4LDEyLjM1OSBaIE01Ljg3LDEuNjk5IEw0LjM3Niw3LjA2NiBMNC4zNzYsMTIuMzYgTDEwLjYyMywxMi4zNiBDMTEuMTgxLDEyLjM2IDExLjY1NSwxMS45NjEgMTEuNzQsMTEuNDIxIEwxMi4zMjUsNy43MDEgQzEyLjQzLDcuMDMgMTEuOSw2LjQyNSAxMS4yMDcsNi40MjUgTDcuMTM1LDYuNDI1IEM2Ljg2LDYuNDI1IDYuNjM3LDYuMjA3IDYuNjM3LDUuOTM4IEw2LjYzNywyLjc0OCBDNi42MzcsMi4yNjEgNi4zMTcsMS44NDggNS44NywxLjcgTDUuODcsMS42OTkgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" class="thumbs-up"></span>\
                              <span class="noDislike"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT50aHVtYnMtZG93bi1ncmF5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9InRodW1icy1kb3duLWdyYXkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcuMDAwMDAwLCA3LjAwMDAwMCkgc2NhbGUoLTEsIC0xKSB0cmFuc2xhdGUoLTcuMDAwMDAwLCAtNy4wMDAwMDApICIgZmlsbD0iIzRENTc1QyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTEuMTY0LDEzLjMzMyBDMC44ODksMTMuMzMzIDAuNjY3LDEzLjExNSAwLjY2NywxMi44NDYgTDAuNjY3LDcgQzAuNjY3LDYuNzMgMC44ODksNi41MTMgMS4xNjQsNi41MTMgTDMuNDk4LDYuNTEzIEw1LjAyNiwxLjAyNiBDNS4wODYsMC44MTQgNS4yODIsMC42NjYgNS41MDYsMC42NjYgQzYuNjgsMC42NjYgNy42MzIsMS41OTkgNy42MzIsMi43NDggTDcuNjMyLDUuNDUgTDExLjIwNyw1LjQ1IEMxMi41MSw1LjQ1IDEzLjUwNyw2LjU4NyAxMy4zMDgsNy44NDggTDEyLjcyNCwxMS41NjggQzEyLjU2NCwxMi41ODQgMTEuNjcyLDEzLjMzMyAxMC42MjMsMTMuMzMzIEwxLjE2NCwxMy4zMzMgWiBNMy4zOCwxMi4zNTkgTDMuMzgsNy40ODcgTDEuNjYyLDcuNDg3IEwxLjY2MiwxMi4zNTkgTDMuMzgsMTIuMzU5IEwzLjM4LDEyLjM1OSBaIE01Ljg3LDEuNjk5IEw0LjM3Niw3LjA2NiBMNC4zNzYsMTIuMzYgTDEwLjYyMywxMi4zNiBDMTEuMTgxLDEyLjM2IDExLjY1NSwxMS45NjEgMTEuNzQsMTEuNDIxIEwxMi4zMjUsNy43MDEgQzEyLjQzLDcuMDMgMTEuOSw2LjQyNSAxMS4yMDcsNi40MjUgTDcuMTM1LDYuNDI1IEM2Ljg2LDYuNDI1IDYuNjM3LDYuMjA3IDYuNjM3LDUuOTM4IEw2LjYzNywyLjc0OCBDNi42MzcsMi4yNjEgNi4zMTcsMS44NDggNS44NywxLjcgTDUuODcsMS42OTkgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" class="thumbs-down"></span>\
                            </div>\
                        </div>\
                      </div>\
                    {{/if}}\
                </li>\
              {{/each}}\
              <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
              <div class="searchassist-show-more-button"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_show_more">{{html langTranslator("sa_sdk_show_more")}}</span> <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
              </div>\
            </ul>\
          {{/if}}\
      </div>\
    </div>\
    {{/if}}\
  </script>';

    if (type === 'searchListTemplate') {
      return searchListTemplates;
    }
    if(type === 'searchCustomizeListTemplate'){
      return  customizeList;
    }

  }

  postPerformRankingActions(me:any,event:any,pinObj:object,searchText:string,actionType:string){
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    hostWindowInstance.performRankActionsOnFullPage(event,pinObj,searchText,actionType).then((result: any) => {
      $(".custom-header-nav-link-item")[1].click();
    })
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

export default SearchListViewTemplate;

