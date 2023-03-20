import SearchListViewTemplate from '../components/custom/templates/searchListViewTemplate/searchListViewTemplate';
import SearchGridViewTemplate from '../components/custom/templates/searchGridViewTemplate/searchGridViewTemplate';
import SearchCarouselViewTemplate from '../components/custom/templates/searchCarouselViewTemplate/searchCarouselViewTemplate';
import FinalResultsTemplate from '../components/custom/templates/finalResultsTemplate/finalResultsTemplate';
import FullSearchResultTopdownTemplate from '../components/custom/templates/fullsearchResultsTemplate/fullsearchResultsTemplate';
import FullSearchResultsTemplate from '../components/custom/templates/fullsearchResultTopdownTemplate/fullsearchResultTopdownTemplate';

class SearchAssistTemplatesPlugin {
    name = 'SearchAssistTemplatesPlugin';
    config = {
    };
    constructor(config) {
        config=config ||{};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance=me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle) => {
            me.onInit();
        });
       
    }
    onInit() {
        let me = this;
        me.installPickerTemplates();
    }
    installPickerTemplates(){
        let me=this;
        let templateManager = me.hostInstance.customTemplateObj;
        templateManager.installTemplate(new SearchListViewTemplate());
        templateManager.installTemplate(new SearchGridViewTemplate());
        templateManager.installTemplate(new SearchCarouselViewTemplate());
        templateManager.installTemplate(new FinalResultsTemplate());
		templateManager.installTemplate(new FullSearchResultTopdownTemplate());
		templateManager.installTemplate(new FullSearchResultsTemplate());
    }
    
}
export default SearchAssistTemplatesPlugin;
