import React, { useState,  useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UploadPage from './UploadPage';
import SideBar from './SideBar';
import Header from './Header';
import { Provider } from 'react-redux';
import constants from "../constants.json"
import CalendarView from './calenderView';
import BardApiComp from './BardApiComp';
import ChatRoom from './ChatRoom';

import Register from './Register';
function Dashboard_() {
    const [selectedPage, setSelectedPage] = useState(constants.PAGES.UPLOAD);
  return (
    <>
    
    <Row>
        <Header></Header>
      </Row>
    
      <Row>
        <Col lg="1"><SideBar selectedPage = {selectedPage} setSelectedPage = {setSelectedPage}></SideBar></Col>
        <Col>{selectedPage === constants.PAGES.MEETING_ROOMS && <ChatRoom></ChatRoom>}{selectedPage === constants.PAGES.HOME && <BardApiComp></BardApiComp>}{selectedPage === constants.PAGES.UPLOAD && <UploadPage />}
        {selectedPage === constants.PAGES.CALENDERVIEW && <CalendarView></CalendarView>}</Col>
      </Row>
      
     
    
    {/* <Col  >
    <UploadPage></UploadPage>
    </Col> */}
    
      </>
  )
}

export default Dashboard_