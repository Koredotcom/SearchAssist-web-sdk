##  SearchCarouselview template

###### Preview


![searchCarouselViewTemplate](https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/sdk2.0_doc_templates/SearchCarouselTemplate.png)



###### Message Payload

```js
var message={
                "type": "template",
                "payload": {
                    "template_type": "searchCarouselTemplate",
                    "isClickable": false,
                    "structuredData": [
                        {
                            "heading": "Careers in Finance and Investment Banking | Morgan Stanley",
                            "description": "Careers at *morgan* Stanley Grow Your Career With Us Explore Opportunities By the Numbers Explore Our Global Offices *morgan* Stanley",
                            "img": "",
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
                            "img": "",
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
                            "img": "",
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
                            "img": "",
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
                            "img": "",
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
                    "titleName": "",
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
print(JSON.stringify(message));
```