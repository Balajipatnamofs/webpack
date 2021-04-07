// import React, { Component } from "react";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import './CreateContent.css';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import 'react-dual-listbox/lib/react-dual-listbox.css';
// import DualListBox from 'react-dual-listbox';
// import 'fontawesome';
// import { uniqBy, remove } from 'lodash';
// import Select from '@material-ui/core/Select';
// import { getContentType, getTags, getContents, s3Upload, getTagsByContent, s3Get, getChildContents } from "../services/contentservice";
// import { reactLocalStorage } from "reactjs-localstorage";
// import { func } from "prop-types";



// class CreateContent extends Component {
//     constructor(props) {
//         super(props);
//         this.doGetContentType();
//         this.doGetTags();
//         this.doGetContents();
//         this.onFileValidation = this.onFileValidation.bind(this);
//         this.validateContentName = this.validateContentName.bind(this);
//         this.handleStatusChange = this.handleStatusChange.bind(this);
//         this.onLoadChildContent = this.onLoadChildContent.bind(this);
//         this.checkMandatoryFields = this.checkMandatoryFields.bind(this);
//         let user = reactLocalStorage.getObject('cognitoUser');
//         this.state = {
//             content: {
//                 'content_type': '',
//                 'content_name': '',
//                 'content_desc': '',
//                 'content_url': '',
//                 'public_content_url': '',
//                 'has_parent': "false",
//                 'parent_name': '',
//                 'parent_guid':'',
//                 'content_expiry_date':'2019-04-30 11:48:57',
//                 'tags': [],
//                 'create_user_guid': user.accessToken.payload.username,
//                 'publish_to_site':"false"
//             },
//             contents:[],
//             childContents: [],
//             parentContents:[],
//             contentType : [],
//             tags: [],
//             showS3Upload: false,
//             urlHelperText: '',
//             selectedFile: {
//                 file: {}
//             },
//             content_name_error: false,
//             content_name_helperText: '',
//             fileError: false,
//             userInfo: {}, 
//             currentTags: [],
//             parentTags: [],
//             allContents: []
//         };
        
//     }
//     componentDidMount(){
//         let user = reactLocalStorage.getObject('cognitoUser');
//         this.setState({userInfo: user});
//         /**edit Prepopulation **/
//         if (this.props && this.props.editcontent) {
//             this.state.content = this.props.editcontent;
//             this.doGetChildContents();
//             if (this.props.editcontent.parent) {
//                 const { content } = this.state;
//                 content.has_parent = "true";
//                 this.setState({content});
//             } else {
//                 const { content } = this.state;
//                 content.has_parent = "false";
//                 this.setState({content});
//             }
//         }
//         Object.assign(this.props.content, this.state.content);
//         this.state.content = this.props.content;
//     }
//     doGetChildContents(content_name) {
//         if (!content_name) {
//             content_name = this.state.content.content_name;
//         }
//         let resolve = getChildContents(content_name);
//         resolve.then(function (res){
//             if (res && res.parents && res.parents.length) {
//                 let child = res.parents[0];
//                 this.setState({childContents: res[child].child})   
//             }
//         }.bind(this))
//     }
//     doGetContents() {
//         let promise = getContents()
//         promise.then(function(resData) {
//             let response = {}; 
//             Object.assign(response, resData);
//             this.setState({'allContents': resData});
//             /**edit Prepopulation **/
//             if (this.props && this.props.editcontent) {
//                 remove(response, {'content_name': this.props.editcontent.content_name});
//                 this.setState({ contents: resData });
//                 this.handleContentTypeChange(this.props.editcontent.content_type);
//                 for (let i=0; i<resData.length; i++) {
//                     if (this.props.editcontent.has_parent && this.props.editcontent.parent) {
//                         if (resData[i].content_guid === this.props.editcontent.parent) {
//                             const { content } = this.state;
//                             content.parent_name = resData[i].content_name;
//                             this.setState({content});
//                             let promise = getTagsByContent(content.parent_name);
//                             promise.then(function(res){
//                                 const { content } = this.state;
//                                 for (let i=0; i<res.length; i++) {
//                                     if (!content.tags) { content.tags = [];}
//                                     content.tags.push(res[i]);
//                                 }
//                                 content.tags = uniqBy(content.tags);
//                                 this.setState({content, parentTags: res});
                                
//                             }.bind(this))
//                         }
//                     }
//                 }
//                 let promise = getTagsByContent(this.props.editcontent.content_name);
//                 promise.then(function(res){
//                     const { content } = this.state;
//                     //if (!content.tags) { content.tags = [];}
//                     content.tags = [];
//                     for (let i=0; i<res.length; i++) {
//                         content.tags.push(res[i]);
//                     }
//                     content.tags = uniqBy(content.tags)
//                     this.setState({content, currentTags: res})
//                 }.bind(this));
//             } else {
//                 this.setState({ contents: resData });
//             }
//         }.bind(this))
//     }

//     doGetContentType() {
//         let promise = getContentType()
//         promise.then(function(resData){
//             this.setState({ contentType: resData });
//         }.bind(this))
//     }    
//     doGetTags() {
//         let promise = getTags()
//         promise.then(function(resData){
//             for (let i=0; i<resData.length; i++) {
//                 resData[i].label = resData[i].tag_name;
//                 resData[i].value = resData[i].tag_name;
//             }
//             this.setState({ tags: resData });
//         }.bind(this))
//     }

//     checkMandatoryFields() {
//         const {content} = this.state;
//         if (content.content_name && 
//             content.content_desc && content.content_type &&
//             content.tags && content.tags.length && content.public_content_url) {
//                 if(content.has_parent === 'false'){
//                     this.props.mandatory(false);
//                 } else if(content.has_parent=== 'true' && content.parent_name){
//                     this.props.mandatory(false);
//                 }else{
//                     this.props.mandatory(true);
//                 }
//         } else {
//             this.props.mandatory(true);
//         }
//     }

//     handleContentNameChange = (event) => {
//         const { content } = this.state;
//         content.content_name = event.target.value;
//         this.setState({ content });
//         this.checkMandatoryFields()
//     };
//     handleContentTypeChange = (event) => {
//         this.setState({urlHelperText: '', fileError: false});
//         const { content } = this.state;
//         content.content_url = '';
//         if (this.props.editcontent){
//             content.content_type = this.props.editcontent.content_type;
//         } else {
//             content.content_type = event.target.value;
//         }
//         this.setState({ content });
//         let actualContent = this.state.contents;
//         let parent = [];
//         for (let i=0; i<actualContent.length; i++) {
//             if (this.state.childContents && this.state.childContents.length) {
//                 for (let j=0; j<this.state.childContents.length; j++) {
//                     if (actualContent[i].content_type === 'Story') {
//                         if (this.state.childContents[j].content_name !== actualContent[i].content_name) {
//                             parent.push(actualContent[i]);
//                         }
//                     }
//                 }
//             } else {
//                 if (actualContent[i].content_type === 'Story') {
//                     parent.push(actualContent[i]);    
//                 }
//             }
//         }
//         if (content.content_type === 'Video') {
//             this.setState({urlHelperText: 'Supports only Avi, Mp4, Mpeg'})
//         } else if (content.content_type === 'Audio') {
//             this.setState({urlHelperText: 'Supports only Mp3, Wav'})
//         } else if (content.content_type === 'Story') {
//             this.setState({urlHelperText: 'Supports only Jpeg, Jpg, Png'})
//         } else if (content.content_type === 'Presentation' || content.content_type === 'Whitepaper') {
//             this.setState({urlHelperText: 'Supports only Pdf'})
//         }
//         this.setState({parentContents: uniqBy(parent)});
//         if (content.content_type === 'Blog' || content.content_type === 'Github' ||
//             content.content_type === 'Docker image') {
//             this.setState({showS3Upload: false});
//         } else {
//             this.setState({showS3Upload : true});
//         }
//         this.checkMandatoryFields();
//     };

//     handleContentTypeDescription = (event) => {
//         const { content } = this.state;
//         content.content_desc = event.target.value;
//         this.setState({ content });
//         this.checkMandatoryFields();
//     };

//     handleContentHasParent = (event) => {
//         const { content } = this.state;
//         content.has_parent = event.target.value;
//         this.setState({ content });
//         this.checkMandatoryFields();
//     }

//     handleContentParent = (event) => {
//         const { content } = this.state;
//         content.parent_name = event.target.value;
//         this.setState({ content });
//         this.setTagsByContent(event.target.value)
//         this.checkMandatoryFields();
//     }

//     setTagsByContent(content_name) {
//         let promise = getTagsByContent(content_name);
//         promise.then(function(res){
//             const { content } = this.state;
//             content.tags = [];
//             for (let i=0; i<this.state.currentTags.length; i++) {
//                 content.tags.push(this.state.currentTags[i]);
//             }
//             for (let j=0; j<this.state.parentContents.length; j++) {
//                 content.tags.push(this.state.parentTags[j]);
//             }
//             for (let i=0; i<res.length; i++) {
//                 content.tags.push(res[i]);
//             }
//             content.tags = uniqBy(content.tags);
//             this.setState({content});
//         }.bind(this))
//     }

//     handleContentTags = (selected) => {
//         if (this.state.content.parent_name && this.state.content.has_parent === 'true') {
//             let promise = getTagsByContent(this.state.content.parent_name);
//             promise.then(function(res){
//                this.setSelectedTags(selected, res);
//             }.bind(this))
//         } else {
//             this.setSelectedTags(selected);
//         }
//         this.checkMandatoryFields();
//     }

//     setSelectedTags(selected, res) {
//         // for (let i=0; i<this.state.currentTags.length; i++) {
//         //     selected.push(this.state.currentTags[i]);
//         // }
//         if (this.state.parentTags) {
//             for (let j=0; j<this.state.parentTags.length; j++) {
//                 selected.push(this.state.parentTags[j]);
//             }
//         }
//         if (res) {
//             for (let i=0; i<res.length; i++) {
//                 selected.push(res[i]);
//             }
//         }
//         const { content } = this.state;
//         content.tags = uniqBy(selected);
//         this.setState({ content });
//         this.checkMandatoryFields();
//     }
//     handleContentUrl = (event) => {
//         const {content} = this.state;
//         content.content_url = event.target.value;
//         content.public_content_url = event.target.value;
//         this.setState({ content })
//         this.checkMandatoryFields();
//     }

//     onFileValidation = (event) => {
//         const { selectedFile, content } = this.state;
//         selectedFile.file = {} ;
//         content.content_url = '';
//         content.public_content_url = '';
//         this.setState({content, selectedFile})
//         let file = event.target.files[0];
//         let supportedAudioFiles = ['audio/mp3', 'audio/wav'];
//         let supportedVideoFiles = ['video/avi', 'video/mpeg', 'video/mp4'];
//         let supportedImageFiles = ['image/jpeg', 'image/jpg', 'image/png'];
//         let supportedPdfFiles = ['application/pdf'];
//         let showFile = true;
//         if (this.state.content.content_type === 'Audio') {
//             this.setState({urlHelperText: 'Supports only Mp3, Wav', fileError: false});
//             if (file && !supportedAudioFiles.includes(file.type)) {
//                 showFile = false;
//                 this.setState({urlHelperText: 'UnSupported File Format', fileError: true});
//             }
//         } else if (this.state.content.content_type === 'Video') {
//             this.setState({urlHelperText: 'Supports only Avi, Mp4, Mpeg', fileError: false});
//             if (file && !supportedVideoFiles.includes(file.type)) {
//                 showFile = false;
//                 this.setState({urlHelperText: 'UnSupported File Format', fileError: true});
//             }
//         } else if (file && this.state.content.content_type === 'Story') {
//             this.setState({urlHelperText: 'Supports only Jpeg, Jpg, Png', fileError: false});
//             if (file && !supportedImageFiles.includes(file.type)) {
//                 showFile = false;
//                 this.setState({urlHelperText: 'UnSupported File Format', fileError: true});
//             }
//         } else if ((file && this.state.content.content_type === 'Whitepaper') ||(file &&  
//             this.state.content.content_type === 'Presentation')) {
//             this.setState({urlHelperText: 'Supports only Pdf', fileError: false});
//             if (file && !supportedPdfFiles.includes(file.type)) {
//                 showFile = false;
//                 this.setState({urlHelperText: 'UnSupported File Format', fileError: true});
//             }
//         }
//         if (showFile) {
//             const { selectedFile, content } = this.state;
//             selectedFile.file = file;
//             content.content_url = file.name;
//             content.public_content_url = file;
//             this.setState({ selectedFile, content });
//         }
//         if(this.props.editcontent){
//             this.props.isChangedFileEvent(true);
//         }
//         console.log(this.state)
//         this.checkMandatoryFields();
//     }

//     validateContentName(event) {
//         let contentName = event.target.value;
//         this.setState({content_name_helperText: '', content_name_error: false})
//         let contents = this.state.contents;
//         for (let i=0; i< contents.length; i++) {
//             if (contentName === contents[i].content_name) {
//                 this.setState({content_name_helperText: 'Duplicate Content Name', content_name_error: true})
//             }
//         }
//     }

//     handleStatusChange(event) {
//         let status = event.target.value;
//         const {content} = this.state;
//         content.content_status = status;
//         this.setState({content});
//     }
//     handleContentPublish=(event)=>{
//        let state = {...this.state};
//        state.content.publish_to_site = event.target.value
//        this.setState({
//            ...state          
//        });
//     }
//     onLoadChildContent(event) {
//         let childContent = {};
//         for (let i=0; i < this.state.allContents.length; i++) {
//             if (event.target.textContent === this.state.allContents[i].content_name) {
//                 Object.assign(childContent, this.state.allContents[i])
//             }
//         }
//         Object.assign(this.props.content, childContent);
//         this.handleContentTypeChange();
//         this.setState({ content: childContent }, () => {
//             this.handleContentTypeChange()
//             if (this.state.content.parent) {
//                 const {content} = this.state;
                
//                 content.has_parent = "true";
//                 content.publish_to_site = "false";
//                 for (let i=0; i<this.state.parentContents.length; i++) {
//                     if (this.state.parentContents[i].content_guid === content.parent) {
//                         content.parent_name = this.state.parentContents[i].content_name;
//                     }
//                 }
//                 this.setState({content})
//             }
//         }); 
//         this.doGetChildContents(event.target.textContent);
//         this.setTagsByContent(event.target.textContent);
//         this.checkMandatoryFields();
//     }

//     render() {
//         const { contentType, tags, parentContents, childContents} = this.state;
//         const { editcontent } = this.props;
//         const statuses = ['active','draft', 'inactive'];
        
//         return (
//             <>
//             <div className="form-group">
//                 <form>
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Content Type &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                         {editcontent &&
//                             <Select
//                                 className="select"      
//                                 value={this.state.content.content_type}
//                                 disabled={true}>
//                             {contentType.map(typeOption => (
//                                 <MenuItem key={typeOption.content_type_name} value={typeOption.content_type_name}>
//                                     {typeOption.content_type_name}
//                                 </MenuItem>
//                                 ))}
//                             </Select>
//                         }
//                         {!editcontent &&
//                             <Select
//                                 className="select"
//                                 value={this.state.content.content_type}
//                                 onChange={this.handleContentTypeChange}>
//                             {contentType.map(typeOption => (
//                                 <MenuItem key={typeOption.content_type_name} value={typeOption.content_type_name}>
//                                     {typeOption.content_type_name}
//                                 </MenuItem>
//                                 ))}
//                             </Select>
//                         }
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Content Name &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                         {!editcontent &&
//                             <TextField
//                             id="ID_ContentName"
//                             className="contentname"
//                             type="text"
//                             value={this.state.content.content_name}
//                             onChange={this.handleContentNameChange}
//                             onBlur={this.validateContentName}
//                             error={this.state.content_name_error}
//                             helperText={this.state.content_name_helperText}
//                             required
//                             placeholder="Enter Content Name" />
//                         }
//                         {editcontent &&
//                             <TextField
//                             id="ID_ContentName"
//                             className="contentname"
//                             type="text"
//                             disabled={true}
//                             value={this.state.content.content_name}
//                             />
//                         }
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Description &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                             <TextField
//                                 id="standard-multiline-static"
//                                 label="Content Description"
//                                 value={this.state.content.content_desc}
//                                 onChange={this.handleContentTypeDescription}
//                                 multiline
//                                 rows="4"
//                                 column="20"
//                                 margin="normal"
//                             />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Upload Content &nbsp;</label>
//                         </div>
//                         { this.state.showS3Upload &&
//                             <div className="col-xs-7">
//                                 <TextField
//                                     id="standard-multiline-static"
//                                     margin="normal"
//                                     helperText={this.state.urlHelperText}
//                                     error={this.state.fileError}
//                                     value={this.state.content.content_url}
//                                     disabled
//                                 />
//                                 <Button variant="contained"
//                                         component="label">
//                                     <CloudUploadIcon />
//                                     Upload
//                                     <input type="file" onChange={this.onFileValidation} style={{ display: "none" }}/>
//                                 </Button>
//                             </div>
//                         }

//                         { !this.state.showS3Upload &&
//                             <div className="col-xs-7">
//                                 <TextField
//                                     id="standard-multiline-static"
//                                     label="Enter the url"
//                                     margin="normal"
//                                     helperText={this.state.urlHelperText}
//                                     onChange={this.handleContentUrl}
//                                     value={this.state.content.content_url}
//                                 />
//                             </div>
//                         }
//                     </div>


//                     <>
//                     { editcontent &&
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Status &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                             <Select
//                                 className="select"
//                                 value={this.state.content.content_status}
//                                 onChange={this.handleStatusChange}>
//                             {statuses.map(status => (
//                                 <MenuItem key={status} value={status}>
//                                     {status}
//                                 </MenuItem>
//                                 ))}
//                             </Select>
//                         </div>
//                     </div>
//                     }
//                     </>
//                     <>
//                     { editcontent &&
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Publish to site &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                         <RadioGroup
//                                 aria-label="publish"
//                                 value={this.state.content.publish_to_site}
//                                 onChange={(event)=>this.handleContentPublish(event)}
//                                 name="publish"
//                                 >
//                                 <FormControlLabel 
//                                 className="radio-btn"
//                                     value="true" 
//                                     control={<Radio />} 
//                                     label="Yes" />
//                                 <FormControlLabel 
//                                     value="false" 
//                                     control={<Radio />} 
//                                     label="No" />
//                             </RadioGroup>
//                         </div>
//                     </div>
//                     }
//                     </>


                    
//                     { this.state.content.content_type &&
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Has a Parent &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                             <RadioGroup
//                                 aria-label="Gender"
//                                 value={this.state.content.has_parent}
//                                 onChange={this.handleContentHasParent}
//                                 name="gender1"
//                                 >
//                                 <FormControlLabel 
//                                     value="true" 
//                                     control={<Radio />} 
//                                     label="Yes" />
//                                 <FormControlLabel 
//                                     value="false" 
//                                     control={<Radio />} 
//                                     label="No" />
//                             </RadioGroup>
//                         </div>
//                     </div> 
//                     }

//                     { this.state.content.has_parent === "true" &&
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Assign to Parent &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                             <Select
//                                 value={this.state.content.parent_name}
//                                 onChange={this.handleContentParent}>
//                             {parentContents.map(option => (
//                                 <MenuItem value={option.content_name}>
//                                     {option.content_name}
//                                 </MenuItem>
//                                 ))}
//                             </Select>
//                         </div>
//                     </div>
//                     }

//                     { editcontent && childContents.length != 0 &&
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Child Content &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                         {childContents.map(child => (
//                             <Button variant="outlined" value={child.content_name} onClick={this.onLoadChildContent}>
//                                 {child.content_name}
//                             </Button>        
//                         ))}
                        
//                         </div>
//                     </div>
//                     }
//                     <div className="row">
//                     <br/><br/>
//                     </div>
//                     <div className="row">
//                         <div className="col-xs-5">
//                             <label>Tag Content &nbsp;</label>
//                         </div>
//                         <div className="col-xs-7">
//                         <DualListBox
//                                 canFilter
//                                 options={tags}
//                                 selected={this.state.content.tags}
//                                 onChange={(selected) => {
//                                     this.handleContentTags(selected)
//                                 }}
//                             />
//                         </div>
//                     </div>


//             </form>
//         </div>
//         </>
//         )
//     }
// }

  
// export default CreateContent;











// import React, { Component } from "react";
// import { Tabs, Tab, Modal, Button } from 'react-bootstrap';
// import ReactTable from 'react-table';
// import CreateContent from "./CreateContent";
// import { th } from "fontawesome";
// import appconfig from "../../Appconfig";
// import {getContents, getContentsByFilter, s3Get,s3Upload, deleteContent, postContent} from '../services/contentservice';
// import { Document, Page } from 'react-pdf';
// import ReactPlayer from 'react-player';
// import {compact} from 'lodash';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import './ListContent.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { sortBy } from 'lodash';
// import moment from 'moment';
// import { pdfjs } from 'react-pdf';
// import { reactLocalStorage } from "reactjs-localstorage";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const options = {
//   cMapUrl: 'cmaps/',
//   cMapPacked: true,
// };
// class ListContent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             'selected': '',
//             'showPreview': false,
//             'showEdit': false,
//             'contentUrl': {},
//             'contentType': '',
//             'contents': {
//               'active': [],
//               'inactive': [],
//               'draft': []
//             },
//             enableSubmitBtn: false,
//             contentData:{},
//             editContentData: {},
//             parentContents: [],
//             numPages: null,
//             pageNumber: 1,
//             isChangedFile:false
//         }
//         this.fromViewProps = this.props;
//         this.doGetContents(this.props.payload);
//         this.handleClosePreview = this.handleClosePreview.bind(this);
//         this.handleCloseContent = this.handleCloseContent.bind(this);
//         this.goToNextPage = this.goToNextPage.bind(this);
//         this.goToPrevPage = this.goToPrevPage.bind(this);
//         this.handleUpdateContent = this.handleUpdateContent.bind(this);
//         this.enableSubmit = this.enableSubmit.bind(this);
//     } 

//     doGetContents(payload) {
//       let promise;
//       if (payload) {
//         promise = getContentsByFilter(payload);
//       } else {
//         promise = getContents()
//       }
//       promise.then(function(resData){
//         this.setState({parentContents: resData})
//         const {contents} = this.state;
//         contents.active = [];
//         contents.draft = [];
//         contents.inactive = [];
//         this.setState({contents})
//         if (resData && resData.length) {
//           for (let i=0; i<resData.length; i++) {
//             resData[i].create_ts = moment(resData[i].create_ts).format("MM-DD-YYYY");
//             if (resData[i].content_status === 'active') {
//               contents.active.push(resData[i]);     
//             } else if (resData[i].content_status === 'draft') {
//               contents.draft.push(resData[i]);
//             } else if (resData[i].content_status === 'inactive') {
//               contents.inactive.push(resData[i]);
//             }
//           }
//         }
//         this.setState({ contents });
//       }.bind(this))
//     }

//     handleClosePreview() {
//       this.setState({ showPreview: false });
//     }

//     handleCloseContent() {
//       this.setState({showEdit : false});
//     }

//     onPreviewContent(row) {
//       this.state.showPreview = true;
//       const {contentUrl} = this.state;
//       this.setState({contentUrl : row.original});
//     }

//     onEditContent(row) {
//       this.state.editContentData = row.original;
//       this.state.showEdit = true; 
//     }

//     onDocumentLoadSuccess = ({ numPages }) => {
//       this.setState({ numPages });
//     }

//     goToPrevPage() {
//       if (this.state.numPages >= this.state.pageNumber-1) {
//         this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
//       }
//     }
    
//     goToNextPage() {
//       if (this.state.numPages >= this.state.pageNumber+1) {
//         this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
//       }
//     }

//     handleUpdateContent() {
//       console.log(this.state)
//       // let promise = deleteContent(this.state.contentData.content_guid);
//       // promise.then(function(res){
//       //   let user = reactLocalStorage.getObject('cognitoUser');
//       //   delete this.state.contentData.content_guid;
//       //   delete this.state.contentData.parent;
//       //   this.state.contentData.content_expiry_date = '2019-04-30 11:48:57';
//       //   this.state.contentData.tags = compact(this.state.contentData.tags);
//       //   this.state.contentData.create_user_guid = user.accessToken.payload.username;
//       //   for (let i=0; i<this.state.parentContents.length; i++) {
//       //     if (this.state.contentData.parent_name === this.state.parentContents[i].content_name) {
//       //       this.state.contentData.parent_guid = this.state.parentContents[i].content_guid;
//       //     }
//       //   }
//       //   if(this.state.isChangedFile){
//       //     let filename = this.state.contentData.content_name+this.state.contentData.public_content_url;
//       //           let promise = s3Upload(filename, this.state.contentData.public_content_url);
//       //           let self = this;
//       //           promise.then(function(s3result){
//       //               let prom = s3Get(s3result.key);
//       //               prom.then(function(resp){
//       //                   self.state.contentData.public_content_url = s3result.key;
//       //                   self.state.contentData.content_url = resp.split('?')[0];
//       //                   self.updateContent(self.state.contentData);
//       //               });
//       //           });
//       //   }else{
//       //     this.updateContent(this.state.contentData)
//       //   }
//       // }.bind(this), function(err){});
//     }
//     updateContent(request){
//       let resolve = postContent(request);
//         resolve.then(function(res){
//           this.doGetContents();
//           this.successfulContentUpdation('Content Updated Successfully !');
//           this.setState({ showEdit: false });
//         }.bind(this))
//     }
//     successfulContentUpdation(message) {
//       toast.success(message, {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     }

//     enableSubmit(isValid){        
//       this.setState({enableSubmitBtn: isValid})
//     }   
//     handleChangedFile(event){
//       this.setState({
//         ...this.state,
//         isChangedFile:event
//       });
//     }   
//     render() {
//         const {contents, contentUrl, pageNumber, numPages} = this.state;       
//         const activeData = contents.active;
//         const draftData = contents.draft;
//         const inactiveData = contents.inactive;
          
//           const columns = [{
//             Header: 'Content Name',
//             id: "name",
//             accessor: 'content_name' // String-based value accessors!
//           }, {
//             Header: 'Content Type',
//             id: "type",
//             accessor: 'content_type',
//             // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
//           }, {
//             Header: 'Content Description',
//             id: "description",
//             accessor: 'content_desc' // String-based value accessors!
//           }, {
//             Header: 'Created Date',
//             id: "createdDate",
//             accessor: 'create_ts' // String-based value accessors!
//           }, {
//             Header: 'Access Content',
//             id: "preview",
//             accessor: 'content_name', // String-based value accessors!
//             Cell: props => <a href="#" className='table-link'>preview</a>,
//           }, {
//             Header: 'Action',
//             id: "action",
//             accessor: 'content_name', // String-based value accessors!
//             Cell: props => <a href="#" className='table-link'>Edit</a>
//           }]

//         const onCellClick = (state, rowInfo, column) => {
//           return {
//               onClick: e => {
//                   if (column.id === 'preview') {
//                     if (rowInfo.original.content_type == 'Story' ||
//                       rowInfo.original.content_type == 'Whitepaper' ||
//                       rowInfo.original.content_type == 'Audio' ||
//                       rowInfo.original.content_type == 'Video' ||
//                       rowInfo.original.content_type == 'Presentation') {
//                         // let prom = s3Get(rowInfo.original.public_content_url);
//                         // prom.then(function(resp){
//                             rowInfo.original.public_content_url = rowInfo.original.content_url;
//                              rowInfo.original.content_url = rowInfo.original.content_url;
//                             this.onPreviewContent(rowInfo);
//                         // }.bind(this));
//                     } else {
//                       console.log(rowInfo.original.content_url)
//                       window.open(rowInfo.original.content_url);
//                     }
//                   } else if (column.id === 'action') {
//                     this.onEditContent(rowInfo);
//                   }
//               }
//           }
//       }
//         return (
//           <>
//             { this.fromViewProps.active &&
//               <ReactTable
//                   data={activeData}
//                   columns={columns}
//                   getTdProps={onCellClick}
//                   defaultSorted={[
//                     {
//                       id: "createdDate",
//                       desc: true
//                     }
//                   ]}
//                   defaultPageSize={5}
//               />
//             }
//             { this.fromViewProps.draft && 
//               <ReactTable
//                   data={draftData}
//                   columns={columns}
//                   getTdProps={onCellClick}
//                   defaultSorted={[
//                     {
//                       id: "createdDate",
//                       desc: true
//                     }
//                   ]}
//                   defaultPageSize={5}
//               />
//             }
//             { this.fromViewProps.inactive &&
//               <ReactTable
//                   data={inactiveData}
//                   columns={columns}
//                   getTdProps={onCellClick}
//                   defaultSorted={[
//                     {
//                       id: "createdDate",
//                       desc: true
//                     }
//                   ]}
//                   defaultPageSize={5}
//               />
//             }
//             <div className="col-xs-12">
//                 <Modal show={this.state.showPreview} onHide={this.handleClosePreview}>
//                 <Modal.Header closeButton>
//                       <Modal.Title>Preview</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   <>
//                   <div className="col-xs-12">
//                     <div className="col-xs-3">
//                       Content Name
//                     </div>
//                     <div className="col-xs-3">
//                       {contentUrl.content_name}
//                     </div>
//                     <div className="col-xs-3">
//                       Content Type
//                     </div>
//                     <div className="col-xs-3">
//                       {contentUrl.content_type}
//                     </div>
//                   </div>
//                   <div className="col-xs-12"><br/></div>
//                   {contentUrl.content_type === 'Whitepaper' &&
//                   <embed src={contentUrl.public_content_url+'#toolbar=0'} width="535" height="400"/>}


//                   { contentUrl.content_type === 'Presentation' && <embed src={contentUrl.public_content_url+'#toolbar=0'} width="535" height="400"/>}
//                   {contentUrl.content_type === 'Video' &&
//                     <div className="videoplayer">
//                       <ReactPlayer
//                                 className='react-player'
//                                 url={contentUrl.public_content_url}
//                                 width='550px'
//                                 height='360px'
//                                 controls='true'
//                                 playing
//                               />
//                     </div>
//                   }
//                   { contentUrl.content_type === 'Audio' &&
//                     <div className="musicplayer">
//                       <ReactPlayer
//                                 className='react-player'
//                                 url={contentUrl.public_content_url}
//                                 width='400px'
//                                 height='160px'
//                                 controls='true'
//                                 playing
//                               />
//                     </div>
//                   }
//                   { contentUrl.content_type === 'Story' &&
//                     <div>
//                       <img src={contentUrl.public_content_url} 
//                         width="500px" 
//                         height="360px"/>
//                     </div>
//                   }
//                   {/* { contentUrl.content_type === 'Presentation' &&
//                     <div>
//                       <a href={contentUrl.public_content_url} target="_blank">
//                       Click Here to Download the Presentation
//                       </a>
//                       <br/>
//                       <iframe src={"https://docs.google.com/gview?url="+contentUrl.public_content_url+"&embedded=true"}
//                            width='550px' 
//                            height='400'>
//                       </iframe>
//                     </div>
//                   } */}
//                   </>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={this.handleClosePreview}>
//                     Close
//                     </Button>
                    
//                 </Modal.Footer>
//                 </Modal>
//               </div>
//               <div className="col-xs-12">
//                 <Modal show={this.state.showEdit} onHide={this.handleCloseContent}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Content</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <CreateContent content={this.state.contentData} 
//                                     mandatory={this.enableSubmit}
//                                     editcontent={this.state.editContentData}
//                                     isChangedFileEvent={(event)=>this.handleChangedFile(event)}/>   
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={this.handleCloseContent}>
//                     Close
//                     </Button>
//                     <Button variant="primary"
//                         disabled={this.state.enableSubmitBtn}
//                         onClick={this.handleUpdateContent}>
//                     Submit
//                     </Button>
//                 </Modal.Footer>
//                 </Modal>
//             </div>
//           </>
//         )
//     }
// }

// export default ListContent;