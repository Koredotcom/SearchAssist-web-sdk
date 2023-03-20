##  FinalResults template

###### Preview


![FinalResultsTemplate](https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/sdk2.0_doc_templates/finalResultsTemplate.PNG)



###### Message Payload

```js
var message= {
                "type": "template",
                "payload": {
                    "infoText": "Sure, please find the matched results below",
                    "template_type": "finalResultsTemplate",
                    "isDev": false,
                    "devMode": false,
                    "viewType": "Preview",
                    "showAllResults": true,
                    "noResults": false,
                    "taskPrefix": "MATCHED",
                    "customSearchResult": false,
                    "totalSearchResults": 25,
                    "groupData": [
                        {
                            "message": [
                                {
                                    "component": {
                                        "type": "template",
                                        "payload": {
                                            "template_type": "searchCarouselTemplate",
                                            "isClickable": false,
                                            "structuredData": [
                                                {
                                                    "heading": "Careers in Finance and Investment Banking | Morgan Stanley",
                                                    "description": "Careers at *morgan* Stanley Grow Your Career With Us Explore Opportunities By the Numbers Explore Our Global Offices *morgan* Stanley",
                                                    "img": "https://www.morganstanley.com/people",
                                                    "url": "",
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
                                                    "heading": "Giving Back | Morgan Stanley",
                                                    "description": "*morgan* Stanley Foundation _For more than 50 years, the *morgan* Stanley Foundation has supported healthy starts and solid educations for",
                                                    "img": "https://www.morganstanley.com/about-us/giving-back",
                                                    "url": "",
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
                                                    "heading": "Technology | Morgan Stanley",
                                                    "description": "Collaborate With Us Technology Partnerships *morgan* Stanley Developer Portal *morgan* Stanley Github",
                                                    "img": "https://www.morganstanley.com/about-us/technology",
                                                    "url": "",
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
                                                    "heading": "Morgan Stanley Employee Profiles | Morgan Stanley Careers",
                                                    "description": "Meet the MindsBreaking the Mold Get Your Career Started At *morgan* Stanley Our People More Stories",
                                                    "img": "https://www.morganstanley.com/content/dam/msdotcom/articles/who-we-are-campaign/tw-rose-gaelle.jpg",
                                                    "url": "",
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
                                                    "heading": "Technology Professionals | Morgan Stanley",
                                                    "description": "Get Your Career Started at *morgan* Stanley For Students & Grads For Experienced Professionals",
                                                    "img": "https://www.morganstanley.com/content/dam/msdotcom/people/tech-careers/tw-techcareers.jpg",
                                                    "url": "",
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
                                            "isFullResults": false,
                                            "isSearch": true,
                                            "devMode": false,
                                            "isLiveSearch": false,
                                            "appearanceType": "data",
                                            "maxSearchResultsAllowed": 5,
                                            "isDropdownEnabled": true,
                                            "tour": false,
                                            "helpers": {},
                                            "renderTitle": true,
                                            "titleName": "web",
                                            "textAlignment": "left",
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
                                            "isFullResults": false,
                                            "isSearch": true,
                                            "devMode": false,
                                            "isLiveSearch": false,
                                            "appearanceType": "data",
                                            "maxSearchResultsAllowed": 2,
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
                    "searchType": "isSearch",
                    "helpers": {},
                    "snippetData": {
                        "title": "<b>Morgan Stanley Foundation</b>",
                        "answer": " <br /> <i class=\"markdownItalic\">For more than 50 years, the <b>morgan</b> <b>stanley</b> <b>foundation</b> has supported healthy starts and solid educations for the children in our communities, and has continued to expand the reach of those initiatives globally for the past 20 years through the <b>morgan</b> <b>stanley</b> International <b>foundation</b>. <b>morgan</b> <b>stanley</b> <b>foundation</b> programs focus on three core fundamentals for children’s physical and cognitive development: sustained access to healthy and nutritious food, safe places to play, and access to quality healthcare.</i>",
                        "page_url": "https://www.morganstanley.com/about-us/giving-back#:~:text=For%20more%20than,to%20quality%20healthcare."
                    }
                }
            }
print(JSON.stringify(message));
```