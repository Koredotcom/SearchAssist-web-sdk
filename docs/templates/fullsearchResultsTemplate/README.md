##  FullSearchResults template

###### Preview


![fullSearchResultsTemplate](https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/sdk2.0_doc_templates/fullResultsTemplate.PNG)



###### Message Payload

```js
var message={
                "type": "template",
                "payload": {
                    "template_type": "fullSearchResultsTemplate",
                    "facets": [
                        {
                            "key": "all results",
                            "doc_count": 25,
                            "name": "ALL"
                        },
                        {
                            "key": "web",
                            "doc_count": 20,
                            "name": "Web Results"
                        },
                        {
                            "key": "file",
                            "doc_count": 0,
                            "name": "Files"
                        },
                        {
                            "key": "data",
                            "doc_count": 0,
                            "name": "Structured Data"
                        },
                        {
                            "key": "faq",
                            "doc_count": 0,
                            "name": "FAQs"
                        },
                        {
                            "key": "serviceNow",
                            "doc_count": 5,
                            "name": "serviceNow"
                        }
                    ],
                    "count": 0,
                    "view": "preview",
                    "isDev": false,
                    "isFilterEnabled": true,
                    "devMode": false,
                    "viewType": "Preview",
                    "facetPosition": "right",
                    "filterFacetData": [
                        {
                            "fieldName": "page_title_keywords",
                            "multiselect": false,
                            "name": "Page_keywords",
                            "subtype": "value",
                            "buckets": [
                                {
                                    "key": "morgan stanley",
                                    "doc_count": 18
                                },
                                {
                                    "key": "careers",
                                    "doc_count": 3
                                },
                                {
                                    "key": "career opportunities search",
                                    "doc_count": 2
                                },
                                {
                                    "key": "morgan stanley careers",
                                    "doc_count": 2
                                },
                                {
                                    "key": "advantages",
                                    "doc_count": 1
                                },
                                {
                                    "key": "charitable giving",
                                    "doc_count": 1
                                },
                                {
                                    "key": "culture",
                                    "doc_count": 1
                                },
                                {
                                    "key": "daniel simkowitz",
                                    "doc_count": 1
                                },
                                {
                                    "key": "deutschland",
                                    "doc_count": 1
                                },
                                {
                                    "key": "disclosures",
                                    "doc_count": 1
                                },
                                {
                                    "key": "experienced professionals",
                                    "doc_count": 1
                                },
                                {
                                    "key": "finance",
                                    "doc_count": 1
                                }
                            ]
                        }
                    ],
                    "groupData": [
                        {
                            "message": [
                                {
                                    "component": {
                                        "type": "template",
                                        "payload": {
                                            "template_type": "searchCarouselTemplate",
                                            "isClickable": true,
                                            "structuredData": [
                                                {
                                                    "description": "Careers at *morgan* Stanley Grow Your Career With Us Explore Opportunities By the Numbers Explore Our Global Offices *morgan* Stanley",
                                                    "url": "https://www.morganstanley.com/people#:~:text=Careers%20at%20Morgan,at%20Morgan%20Stanley",
                                                    "heading": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "web",
                                                    "contentId": "fc-1f044c46-06d1-4576-bd4f-a8b9edfd2fbf",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "description": "*morgan* Stanley Foundation _For more than 50 years, the *morgan* Stanley Foundation has supported healthy starts and solid educations for",
                                                    "url": "https://www.morganstanley.com/about-us/giving-back#:~:text=For%20more%20than,to%20quality%20healthcare.",
                                                    "heading": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "web",
                                                    "contentId": "fc-86607086-db17-4b88-9516-0560ec97577e",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "description": "Collaborate With Us Technology Partnerships *morgan* Stanley Developer Portal *morgan* Stanley Github",
                                                    "url": "https://www.morganstanley.com/about-us/technology#:~:text=Collaborate%20With%20Us,Collaborate%20With%20Us",
                                                    "heading": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "web",
                                                    "contentId": "fc-f0e0ac2f-4ad5-4c49-a3fd-6c074babf5c1",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "description": "Meet the MindsBreaking the Mold Get Your Career Started At *morgan* Stanley Our People More Stories",
                                                    "url": "https://www.morganstanley.com/articles/who-we-are#:~:text=Meet%20the%20MindsBreaking,MindsBreaking%20the%20Mold",
                                                    "heading": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "web",
                                                    "contentId": "fc-77641bef-b799-40b5-84d6-c92e4b3f52a5",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "description": "Get Your Career Started at *morgan* Stanley For Students & Grads For Experienced Professionals",
                                                    "url": "https://www.morganstanley.com/people/technology-professionals#:~:text=Get%20Your%20Career,at%20Morgan%20Stanley",
                                                    "heading": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "web",
                                                    "contentId": "fc-030fe767-a6d4-4c92-9989-e4a3a429fa03",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                }
                                            ],
                                            "viewType": "Preview",
                                            "isFullResults": true,
                                            "isSearch": false,
                                            "devMode": false,
                                            "isLiveSearch": false,
                                            "appearanceType": "data",
                                            "maxSearchResultsAllowed": 5,
                                            "isDropdownEnabled": true,
                                            "tour": false,
                                            "helpers": {},
                                            "renderTitle": true,
                                            "titleName": "WEB Results",
                                            "textAlignment": "left",
                                            "behaviour": "webpage",
                                            "groupResults": true,
                                            "groupName": "web",
                                            "doc_count": 20,
                                            "pageNumber": 0,
                                            "templateName": "web",
                                            "fieldName": "sys_content_type",
                                            "gridLayoutType": "img_common",
                                            "isButtonTemplate": false,
                                            "templateType": "L4"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "message": [
                                {
                                    "component": {
                                        "type": "template",
                                        "payload": {
                                            "template_type": "searchListTemplate",
                                            "isClickable": false,
                                            "structuredData": [
                                                {
                                                    "heading": "What is Morgan Stanley Access Investing?",
                                                    "url": "https://dev80567.service-now.com/kb_view.do?sysparm_article=KB0010062",
                                                    "description": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "serviceNow",
                                                    "contentId": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc_6e2983ccdbd85010b06c7b823996197e",
                                                    "chips": [
                                                        {
                                                            "background": "#e7f1ff",
                                                            "color": "#0d6efd",
                                                            "name": "General"
                                                        }
                                                    ],
                                                    "textField1": "admin",
                                                    "textField2": "2020-04-16T08:06:41.000Z",
                                                    "scm_author": "admin",
                                                    "scm_createdAt": "16th Apr 2020, Thu at 1:36 PM",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "heading": "How can I get involved in an IPO that Morgan Stanley is underwriting?",
                                                    "url": "https://dev80567.service-now.com/kb_view.do?sysparm_article=KB0010055",
                                                    "description": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "serviceNow",
                                                    "contentId": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc_3ee2781fdb441010b06c7b823996197d",
                                                    "chips": [
                                                        {
                                                            "background": "#e7f1ff",
                                                            "color": "#0d6efd",
                                                            "name": "General"
                                                        }
                                                    ],
                                                    "textField1": "admin",
                                                    "textField2": "2020-04-14T07:14:30.000Z",
                                                    "scm_author": "admin",
                                                    "scm_createdAt": "14th Apr 2020, Tue at 12:44 PM",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "heading": " Can I get IPO shares with my Morgan Stanley Online account?",
                                                    "url": "https://dev80567.service-now.com/kb_view.do?sysparm_article=KB0010060",
                                                    "description": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "serviceNow",
                                                    "contentId": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc_ffcaa0a3dbc45010b06c7b82399619c7",
                                                    "chips": [
                                                        {
                                                            "background": "#e7f1ff",
                                                            "color": "#0d6efd",
                                                            "name": "General"
                                                        }
                                                    ],
                                                    "textField1": "admin",
                                                    "textField2": "2022-05-19T10:54:31.000Z",
                                                    "scm_author": "admin",
                                                    "scm_createdAt": "19th May 2022, Thu at 4:24 PM",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "heading": "How can I get a copy of a Morgan Stanley Equity Research Report?",
                                                    "url": "https://dev80567.service-now.com/kb_view.do?sysparm_article=KB0010061",
                                                    "description": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "serviceNow",
                                                    "contentId": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc_e16be4a3dbc45010b06c7b823996197b",
                                                    "chips": [
                                                        {
                                                            "background": "#e7f1ff",
                                                            "color": "#0d6efd",
                                                            "name": "General"
                                                        }
                                                    ],
                                                    "textField1": "admin",
                                                    "textField2": "2020-04-14T07:18:52.000Z",
                                                    "scm_author": "admin",
                                                    "scm_createdAt": "14th Apr 2020, Tue at 12:48 PM",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                },
                                                {
                                                    "heading": " How do I transfer Morgan Stanley shares from one shareholder to another?",
                                                    "url": "https://dev80567.service-now.com/kb_view.do?sysparm_article=KB0010058",
                                                    "description": "",
                                                    "img": "",
                                                    "config": {
                                                        "pinIndex": -1,
                                                        "boost": 1,
                                                        "visible": true
                                                    },
                                                    "customization": null,
                                                    "sys_content_type": "serviceNow",
                                                    "contentId": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc_8d0628abdb845010b06c7b823996195b",
                                                    "chips": [
                                                        {
                                                            "background": "#e7f1ff",
                                                            "color": "#0d6efd",
                                                            "name": "General"
                                                        }
                                                    ],
                                                    "textField1": "admin",
                                                    "textField2": "2020-04-14T07:15:15.000Z",
                                                    "scm_author": "admin",
                                                    "scm_createdAt": "14th Apr 2020, Tue at 12:45 PM",
                                                    "addedResult": false,
                                                    "bestMatch": false
                                                }
                                            ],
                                            "viewType": "Preview",
                                            "isFullResults": true,
                                            "isSearch": false,
                                            "devMode": false,
                                            "isLiveSearch": false,
                                            "appearanceType": "data",
                                            "maxSearchResultsAllowed": 5,
                                            "isDropdownEnabled": true,
                                            "tour": false,
                                            "helpers": {},
                                            "renderTitle": false,
                                            "titleName": "service now",
                                            "listType": "plain",
                                            "textAlignment": "left",
                                            "behaviour": "webpage",
                                            "groupResults": true,
                                            "groupName": "serviceNow",
                                            "doc_count": 5,
                                            "pageNumber": 0,
                                            "templateName": "serviceNow",
                                            "fieldName": "sys_content_type",
                                            "gridLayoutType": "",
                                            "isButtonTemplate": false,
                                            "isDemoTemplate": "serviceNowTemplate",
                                            "isSearchSDK": true
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    "searchConfigurationCopy": {
                        "buttonBorderColor": "#EFF0F1",
                        "buttonFillColor": "#0e74daff",
                        "buttonText": "GGGG",
                        "buttonTextColor": "#f3f7fbff",
                        "searchBarBorderColor": "#E4E5E7",
                        "searchBarFillColor": "#FFFFFF",
                        "searchBarPlaceholderText": "Search",
                        "searchBarPlaceholderTextColor": "#BDC1C6",
                        "searchButtonEnabled": true,
                        "buttonPlacementPosition": "inside",
                        "searchBarIcon": "data:image/png;base64,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",
                        "welcomeMsg": "Hi, How can I help you",
                        "welcomeMsgColor": "#000080",
                        "welcomeMsgFillColor": "#EFF0F1",
                        "defaultStatus": "searchBar",
                        "showSearchesEnabled": true,
                        "showSearches": "recent",
                        "autocompleteOpt": false,
                        "querySuggestionsLimit": 3,
                        "liveSearchResultsLimit": 0,
                        "feedbackExperience": {
                            "queryLevel": true,
                            "lmod": "2022-08-11T10:11:43.406Z"
                        },
                        "welcomeMsgEmoji": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJmSURBVHgBtVJLS5RhFH7O+10cZ2jmM5sgUfg0BAkq3VqhRrhx0biQ2ql7w7atnF2rsD8Q02XZQluGhhVBdIHGS4Q7JSOi0hk/57t/7+l1umCouzqr9+Wc5znP83CA/10rKyvmzcfexcFbbttBfdr78V7adiqFs+r5DHpjCazfm88sLTx4sd2ba9TFBaTnRvLt6VrgT2uJX2wcqqyLvQSGoXWzSM/CtCYhMjbM/MyluK/QdST7+sqZ9POeEVCU0Qp6Sh9L0FDYxYi925UeizTzNoy2IvT8GkR2DfqJuzdOD02c7yKnkyjQTbqspXTWGrTuvwh2twsjVQI0C5BPYeQLysYayNwCZYu8OjhV96wJW+gCrInufRnw8qkijJYpkFGGblnQsrYiK3Pw2SYEOSTeIyTfCzIMOHCiarr/Y9MfAn57chSGfh3G0UXox0chjAq0TC5xqyRMDYh3QOyoQY9l4FNY3Wa4sr1ugZlFJJPFenAk+iCrs+DISpwNEoYaSDzI0FV61T49T2Q0MyeC/DDsEfMfuPn+E6dpYvXNF8T+ACQssCxId2NLaDFIOpDepiKpMWSkWgTJJslEpcXIiaXlDXduHeeqntn68Nj71ST8Oo54Uw37yl9NAatKlKfk7yj8jhLmIXbVW+WQEK3XM7h6p9bS20HiWn/jJyJiftc5xoJKP0/NrEvn0EfkBsqvjsjxkYR+2Rre7CEcUtGrjqIimyLzKJga1PYAcVW5dF2WsVxUEgeahiuVQwl2y11onSQ2pmHmiJXn2PmGJHLL+AXedwcH1daMZZNmlCDJrt8Ex+O/wf+kfgAhFxenJ2BlUQAAAABJRU5ErkJggg==",
                        "botConfig": {
                            "botActionTemplate": "grid",
                            "botActionResultsExperience": "top"
                        }
                    },
                    "sortableFacetList": [],
                    "displaySortable": "",
                    "displayFeedback": true,
                    "feedbackData": null,
                    "helpers": {}
                }
            }
print(JSON.stringify(message));
```