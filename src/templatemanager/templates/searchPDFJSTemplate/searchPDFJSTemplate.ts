import * as pdfjsLib from 'pdfjs-dist';
import './SearchPDFJSTemplate.scss';

let pageNumber=1,page_url='',gloabl$:any=null,canvasHeight:number=300;
class SearchPDFJSTemplate {
  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.$;
    gloabl$ = $;
    if(msgData?.message.length && msgData?.message[0].component?.payload?.template_type == 'pdfJSTemplate'){
      page_url=msgData?.message[0]?.component?.payload?.url;
      const page_split = page_url.split('page=');
      if(page_split.length>1){
        pageNumber = Number(page_split[1]);
      }
      SearchPDFJSTemplate.prototype.showPdfFile();//msgData?.message[0]?.component?.payload?.url
      me.messageListHtml = $(SearchPDFJSTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
      SearchPDFJSTemplate.prototype.bindEvents(me, me.messageListHtml);
      return me.messageListHtml;
    }
    
  }
  getTemplateString() {
    const searchListTemplates = '<script type="text/x-jqury-tmpl">\
    <div class="search-pdfjs-container">\
      <div class="search-pdfjs-sub-container">\
      <div class="search-pdfjs-header">\
      <div class="search-pdfjs-btn">\
       <div id="prev-btn">Previous</div>\
       <div class="input-number"><input type="number" id="numberTextId" value="1" /></div>\
       <div id="next-btn">Next</div>\
       </div>\
       <div class="search-pdfjs-zoom-btn">\
       <span id="zoomOutId">Zoom Out</span>\
        <span id="zoomInId">Zoom In</span>\
       </div>\
      <div class="search-pdf-close-btn">\
       close\
      </div>\
    </div>\
    <div class="search-pdfjs-template">\
     <div class="please-wait">Page Loading. Please wait...</div>\
      <canvas id="the-canvas" class="search-pdfjs-canvas"></canvas>\
    </div>\
      </div>\
    </div>\
  </script>';
  return searchListTemplates;
  }

 showPdfFile(){
    pdfjsLib.GlobalWorkerOptions.workerSrc = '../../../../node_modules/pdfjs-dist/build/pdf.worker.js'; //'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    // Asynchronous download of PDF
    let loadingTask = pdfjsLib.getDocument(page_url);
    loadingTask.promise.then((pdf)=> {
      pdf.getPage(pageNumber).then((page)=> {
        const viewport = page.getViewport({scale: 5});
        let canvas:any = document.getElementById('the-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(()=> {
           SearchPDFJSTemplate.prototype.scrollToTopEvent();    
           gloabl$('#numberTextId')[0].value=pageNumber;    
           gloabl$('.please-wait').hide();
        });
      }).catch(error=>{
        console.log("error",error);
        alert(error?.message);
        gloabl$('.please-wait').hide();
      })
    },  (reason)=>   {
      // PDF loading error
      console.error(reason);
    });
  }

  scrollToTopEvent(){
    gloabl$('.search-pdfjs-template').scrollTop(0);
  }

  // appendValueNumber(){
  //   gloabl$('#numberTextId').value=pageNumber;
  // }

  bindEvents(me:any,messageHtml:any){
   let $ = me.$;
   $(messageHtml).off('click','.search-pdf-close-btn').on('click','.search-pdf-close-btn',(event:any)=>{
      $('.search-pdfjs-container').remove();
      pageNumber=1;
      gloabl$=null;
   })

   $(messageHtml).off('click','#prev-btn').on('click','#prev-btn',(event:any)=>{
     if(pageNumber>1) {
      $('.please-wait').show();
       pageNumber--;   
       SearchPDFJSTemplate.prototype.showPdfFile();           
     }
   })
    $(messageHtml).off('click','#next-btn').on('click','#next-btn',(event:any)=>{
      $('.please-wait').show();
      pageNumber++;
      SearchPDFJSTemplate.prototype.showPdfFile();
    })
    $(messageHtml).off('keyup','#numberTextId').on('keyup','#numberTextId',(event:any)=>{
      if (event?.keyCode === 13) {
        $('.please-wait').show();
          pageNumber = Number(event?.currentTarget?.value);
          SearchPDFJSTemplate.prototype.showPdfFile();
          canvasHeight=300;
    }
    })
    $(messageHtml).off('click','#zoomInId').on('click','#zoomInId',(event:any)=>{
      canvasHeight = canvasHeight+40;
      $('.search-pdfjs-canvas')[0].style.height=canvasHeight+'%';

    })
    $(messageHtml).off('click','#zoomOutId').on('click','#zoomOutId',(event:any)=>{
      canvasHeight = canvasHeight-40;
       if(canvasHeight>300) $('.search-pdfjs-canvas')[0].style.height=canvasHeight+'%';
    })
  }

}

export default SearchPDFJSTemplate;

