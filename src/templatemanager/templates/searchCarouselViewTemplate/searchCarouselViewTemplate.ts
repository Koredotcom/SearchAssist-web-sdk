
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './searchCarouselViewTemplate.scss';
class SearchCarouselViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData?.message[0] && msgData?.message[0].component && msgData?.message[0].component?.payload && msgData?.message[0].component?.payload?.template_type == 'searchCarouselTemplate') {
      if (!msgData?.message[0].component?.payload?.helpers) {
                msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
            }
            msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
            if (msgData?.message[0].component?.payload && msgData?.message[0].component?.payload?.gridLayoutType === 'img_common') {
                const payload = msgData?.message[0].component?.payload?.structuredData;
                const checkImg = payload.some((res: any) => res !== '');
                msgData.message[0].component.payload.templateType = checkImg ? 'L4' : '';
            }
            me.messageCarouselHtml = $(SearchCarouselViewTemplate.prototype.getTemplateString(msgData?.message[0].component?.payload?.template_type)).tmpl(msgData?.message[0].component?.payload);

            SearchCarouselViewTemplate.prototype.bindEvents(me, me.messageCarouselHtml);
            return me.messageCarouselHtml;
        }
    }
    bindEvents(me: any, messageHtml: any) {
        let hostWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        setTimeout(() => {
            const me: any = this;
            let newCarouselTemplateCount = $('.carousel').length;
            let newCarouselEles = [];
            newCarouselTemplateCount += 1;
            messageHtml
                .find(".carousel:last")
                .addClass("carouselTemplate" + newCarouselTemplateCount);
            var count = messageHtml
                .find(".carouselTemplate" + newCarouselTemplateCount)
                .children().length;
            if (count > 1) {
                var carouselOneByOne = new PureJSCarousel({
                    carousel: ".carouselTemplate" + newCarouselTemplateCount,
                    slide: ".slide",
                    oneByOne: true,
                    jq: $,
                });
                $(".carousel" + newCarouselTemplateCount)
                    .parent()
                    .show();
                newCarouselEles.push(carouselOneByOne);
                if (
                    $(".carouselTemplate" + newCarouselTemplateCount).width() >=
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-slides-container"
                    ).children().length *
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-slides-container .slide:first"
                    ).width()
                ) {
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-btn-prev"
                    ).hide();
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-btn-next"
                    ).hide();
                }
                $(
                    ".carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-prev::after"
                ).css(
                    "height",
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        ".purejscarousel-slides-container"
                    ).height() + "px"
                );
                $(
                    ".carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-next::after"
                ).css(
                    "height",
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        ".purejscarousel-slides-container"
                    ).height() + "px"
                );
                $("body").append(
                    "<style>.carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-next::after,.carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-prev::after {height:" +
                    ($(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-slides-container"
                    ).height() -
                        8) +
                    "px !important; top:-" +
                    ($(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-btn-next"
                    ).position().top -
                        27.5) +
                    "px !important;}</style>"
                );
                window.dispatchEvent(new Event('resize'));
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("resize", true, false);
                window.dispatchEvent(evt);
            }
        });
        $(messageHtml)
            .off("click", ".search-task")
            .on("click", ".search-task", function (event: any) {
                event.stopPropagation();
                var ele = $(event.target).closest(".search-task");
                hostWindowInstance.botActionTrigger(event);
            });
        $('.parent-carousel-template').off("click", ".click-to-navigate-url").on("click", ".click-to-navigate-url", function (e: any) {
            hostWindowInstance?.clickNavigateToUrl(e);
        });
        $('.parent-carousel-template').off("click", ".click-log-metrics").on("click", ".click-log-metrics", function (e: any) {
            hostWindowInstance?.captureClickAnalytics(e,
                $(e.currentTarget).closest(".click-log-metrics").attr("contentType"),
                "click",
                $(e.currentTarget).closest(".click-log-metrics").attr("contentId"),
                $(e.currentTarget).closest(".click-log-metrics").attr("id"),
                $(e.currentTarget).closest(".click-log-metrics").attr("data-title") || $(e.currentTarget).attr("title"));
        });
        SearchCarouselViewTemplate.prototype.tooltipBindEvent(me);
    }

    getTemplateString(type: any) {
        const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
        {{if isButtonTemplate == false}}\
            {{if structuredData.length}}\
            {{if renderTitle}}\
            <div class="title-list-heading">${titleName}</div>\
            {{/if}}\
            {{if gridLayoutType==="img_common"}}\
            <div class="search-list-template-carousel{{if templateType==="L4"}}-img-title{{/if}} parent-carousel-template">\
            <div class="carousel">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="heading-title {{if data.heading.length && data.description.length}} m-b-8 {{/if}}">\
                        {{if data.img.length}}\
                        <div class="img_block">\
                        <img src="${data.img}"/>\
                        </div>\
                        {{/if}}\
                        <span class="sa-sdk-title {{if data.img.length}}two-line-title{{else}}title-heading {{/if}}" data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                        </div>\
                        <div class="sa-sdk-title desc_text_info clamp-text" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                    </div>\
                </div>\
            {{/each}}\
            </div>\
        </div>\
            {{/if}}\
            {{if gridLayoutType==="img_large"}}\
            <div class="search-list-template-carousel-grid-img parent-carousel-template">\
            <div class="carousel">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="img-block-data">\
                            <img src="${data.img}">\
                        </div>\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
            </div>\
            {{/if}}\
            {{if gridLayoutType==="img_left"}}\
            <div class="search-list-template-carousel-title-img-desc parent-carousel-template">\
            <div class="carousel">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="heading-title text_overflow sa-sdk-title" data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        <div class="img-with-desc">\
                            <div class="img_info">\
                                <img src="${data.img}">\
                            </div>\
                            <div class="desc-text clamp-text sa-sdk-title" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
            </div>\
            {{/if}}\
            {{if gridLayoutType==="img_top"}}\
            <div class="search-list-template-carousel-title-img-card parent-carousel-template">\
            <div class="carousel">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="main-img-block">\
                            <img src="${data.img}" height="10">\
                        </div>\
                        {{if data.heading.length}}\
                        <div class="heading-title text_overflow sa-sdk-title" data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if data.description.length}}\
                        <div class="desc-text clamp-text sa-sdk-title" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        {{/if}}\
                        <div class="price-tag display-none">$156</div>\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
        </div>\
            {{/if}}\
            {{/if}}\
        {{/if}}\
        {{if isButtonTemplate}}\
        {{if structuredData && structuredData.length > 0 }}\
        <div class="action-carousel-parent-container">\
        {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
          <div class="bot-actions-customize-info ">\
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
            <span class="info-text">Bot Actions cannot be customized</span>\
          </div>\
        {{/if}}\
        {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
            <div class="heading-and-show-all" appearanceType="task">\
                <div class="text-heading-main">ACTIONS</div>\
                <div class="show-all-text display-none">Show all Actions</div>\
            </div>\
        {{/if}}\
        {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
          <div class="carousel action-results-container carousel-search-data-items">\
            {{each(key, task) structuredData}}\
              <div class="slide">\
                <div class="title-box-data text-truncate">\
                    <div id="${key}" class="search-task search-grid-item text-truncate one-line-height" title="${task.name}" contentId="${task.taskId}" contentType="${task.contentType}" childBotId="${task.childBotId}" childBotName="${task.childBotName}" payload="${task.payload}" seqLogId="${task.seqLogId}">${task.titleText}</div>\
                    {{if task.childBotName !=="" && task.childBotName !== undefined}}\
                      <div class="child-bot">${task.childBotName}</div>\
                    {{/if}}\
                </div>\
              </div>\
            {{/each}}\
          </div>\
        {{/if}}\
        </div>\
      {{/if}}\
        {{/if}}\
        </script>'
        if (type === 'searchCarouselTemplate') {
            return searchCarouselTemplate;
        }
    }

    tooltipBindEvent(me:any){
        let $ = me.hostInstance.$;
        let hostInstance = me.hostInstance
      $('.sa-sdk-title').off('mouseover').on('mouseover',function(e:any){
        e.stopPropagation();
        e.stopImmediatePropagation();
        const sanitizedTitle = hostInstance?.crossScriptRemover($(e.currentTarget).attr('data-title'));
        $(e.currentTarget).before('<div class="sdk-tooltip-container">' + sanitizedTitle + '<span class="sa-tooltip-arrow"></span></div>');
        $(e.currentTarget).parent().find('.sdk-tooltip-container').css('top',($(e.currentTarget).position().top-($(e.currentTarget).parent().find('.sdk-tooltip-container').height()+25))+'px');
      })
      $('.sa-sdk-title').off('mouseout').on('mouseout',function(e:any){
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.currentTarget).parent().find('.sdk-tooltip-container').remove();
        })
      }

}

export default SearchCarouselViewTemplate;
