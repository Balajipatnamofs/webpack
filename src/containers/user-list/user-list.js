import React, { Component } from "react";
// import Button from '@material-ui/core/Button';
// import NavBarComponent from '../../../components/shared/navbar';
// import SideMenu from '../../../components/shared/side-menu/side-menu';
// import PaperInput from '../../../components/shared/paper-input';
class UserList extends Component {
  constructor() {
    super();
    this.state = {
      pdfFile:
        "https://webfacedev-assets.s3.amazonaws.com/public/Whitepaper/801000000_Whitepaper_R3%20Corda%20Case%20Study.pdf"
    };
  }
  render() {
    return <div className="container">User list Works</div>;
  }
}
export default UserList;
