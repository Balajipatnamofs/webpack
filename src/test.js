let data = {
    "create_user_guid": "3bf121fa-6130-423b-ab19-79f18f5398c3",
    "data_attributes": "{\"file\": [{\"label\": \"Story\", \"file_type\": \"png\", \"data_mapping\": \"IMG_story\"}], \"plain_text\": [{\"label\": \"Desc\", \"max_size\": \"100\", \"min_size\": \"5\", \"data_mapping\": \"TX_desc\"}, {\"label\": \"Title\", \"max_size\": \"20\", \"min_size\": \"5\", \"data_mapping\": \"TX_title\"}]}",
    "template_data": "<div key={{key}} className=\"template template-3 d-md-flex no-gutters\">\n  <div className=\"template-media col-md-5\">\n    <img src={{IMG_story}} alt={{alt}} />\n  </div>\n  <div className=\"template-content col mb-4 mb-md-0\">\n    <h1 className=\"template-title h3\">{{TX_title}}</h1>\n    <p className=\"template-desc\">{{TX_desc}}</p>\n  </div>\n</div>",
    "template_desc": "Desc",
    "template_guid": "4280a59fa0866a72db54e218ea76fe9daa195a0a",
    "template_name": "New_Template",
    "template_status": "active"
};

let data_attributes = [{
        label: 'Story',
        file_type: 'png',
        data_mapping: 'IMG_story',
        type: 'img',
        value:'https://amp.businessinsider.com/images/596ce4fa552be579088b4d50-750-422.png'
    },
    {
        label: 'Desc',
        max_size: '100',
        min_size: '5',
        data_mapping: 'TX_desc',
        type: 'textarea',
        value:'There is no desc'
    },
    {
        label: 'Title',
        max_size: '20',
        min_size: '5',
        data_mapping: 'TX_title',
        type: 'text',
        value:'Cloud Platform'
    }
];
let str = data.template_data;
let data_attributes1 = data_attributes.map(val=>{
    if(str.indexOf(`{{${val.data_mapping}}}`)>-1){
        str = str.replace(`{{${val.data_mapping}}}`,val.value);
    }
    if(str.indexOf(`{{key}}`)>-1){
        str = str.replace(`{{key}}`,`"${Math.floor(Math.random() * 1000)}"`);
    }
    if(str.indexOf(`{{alt}}`)>-1){
        str = str.replace(`{{alt}}`,`"image-${Math.floor(Math.random() * 100)}"`);
    }
});
console.log(str)