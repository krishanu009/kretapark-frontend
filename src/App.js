import React, { useState,  useEffect } from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UploadPage from './components/UploadPage';
import SideBar from './components/SideBar';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from "./store"
import constants from "./constants.json"
import calenderView from './components/calenderView';


function App() {
  const [selectedPage, setSelectedPage] = useState(constants.PAGES.UPLOAD);
  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(54, 54, 54)';
  }, []);
   

  return (

    <>
    
    <Row>
        <Header></Header>
      </Row>
    
      <Row>
        <Col lg="1"><SideBar selectedPage = {selectedPage} setSelectedPage = {setSelectedPage}></SideBar></Col>
        <Col>{selectedPage === constants.PAGES.UPLOAD && <UploadPage />}
        {selectedPage === constants.PAGES.CALENDERVIEW && <calenderView  />}</Col>
      </Row>
     
    
    {/* <Col  >
    <UploadPage></UploadPage>
    </Col>
    <Col  >
    <UploadPage></UploadPage>
    </Col> */}
      </>
    
  );
}

export default App;