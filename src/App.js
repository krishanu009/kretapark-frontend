import React, { useState,  useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UploadPage from './components/UploadPage';
import SideBar from './components/SideBar';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from "./store"
import constants from "./constants.json"
import CalendarView from './components/calenderView';
import BardApiComp from './components/BardApiComp';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';
import Dashboard_ from './components/Dashboard_';
import Login from './components/Login';
function App() {
 
  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(34,39,46)';

  }, []);
   

  return (

    <>
    
    {/* <Row>
        <Header></Header>
      </Row>
    
      <Row>
        <Col lg="1"><SideBar selectedPage = {selectedPage} setSelectedPage = {setSelectedPage}></SideBar></Col>
        <Col>{selectedPage === constants.PAGES.MEETING_ROOMS && <ChatRoom></ChatRoom>}{selectedPage === constants.PAGES.HOME && <BardApiComp></BardApiComp>}{selectedPage === constants.PAGES.UPLOAD && <UploadPage />}
        {selectedPage === constants.PAGES.CALENDERVIEW && <CalendarView></CalendarView>}</Col>
      </Row> */}
      {/* <Row>
       <Dashboard_></Dashboard_>
      </Row> */}
     <Router>
      <Routes>
      <Route exact path="/"  element={<Login/>} />
      <Route path="/register"  element={<Register/>} />
          <Route path="/dashboard"  element={<Dashboard_/>} />
      </Routes>
     </Router>
    
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