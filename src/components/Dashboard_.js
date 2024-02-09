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
import { useNavigate } from "react-router-dom"
import Register from './Register';
import axios from 'axios';
import Scripts from './Scripts';
import TextEditor from './TextEditor';
import { Form } from 'react-bootstrap';
import PostScheduleView from './PostScheduleView';


function Dashboard_() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [title,setTitle] = useState();
  useEffect(()=>{
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
        navigate("/");
    }else {
        getUser()
    }
},[]);

const getUser = () => {
  axios.get('/user/current', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  .then((r) => {
     setUser(r.data)
  })
  .catch((e) => {
      console.log(e)
      navigate("/");
  });
};

    const [selectedPage, setSelectedPage] = useState(constants.PAGES.CALENDERVIEW);
    const [scripId,setScriptId] = useState();
    const backClick = () =>{
      setSelectedPage(constants.PAGES.SCRIPTS);
      console.log("here");
    }
  return (
    <>
    
    <Row>
        <Header></Header>
      </Row>
    
      <Row>

        <Col lg="1"><SideBar selectedPage = {selectedPage} setSelectedPage = {setSelectedPage}></SideBar></Col>
        <Col>
        {
          selectedPage === constants.PAGES.TEXT_EDITOR?
          <><div className="backButton" onClick={backClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  class="bi bi-arrow-left-circle backButton"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
              </div><div className='docTitle'> 
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => {
          setTitle(e.target.value);
        }}/>
      </Form.Group>
                </div></> : null
        }
        
        
        {selectedPage === constants.PAGES.MEETING_ROOMS && <ChatRoom user={user}></ChatRoom>}{selectedPage === constants.PAGES.HOME && <BardApiComp></BardApiComp>}{selectedPage === constants.PAGES.UPLOAD && <UploadPage />}
        {selectedPage === constants.PAGES.CALENDERVIEW && <CalendarView></CalendarView>}
        {selectedPage === constants.PAGES.SCRIPTS && <Scripts selectedPage = {selectedPage} setSelectedPage = {setSelectedPage} setScriptId={setScriptId}></Scripts>}
        {selectedPage === constants.PAGES.TEXT_EDITOR && <TextEditor scripId={scripId} title={title} setTitle={setTitle} ></TextEditor>}
        {selectedPage === constants.PAGES.POST_VIEW && <PostScheduleView></PostScheduleView>}
        
        </Col>
      </Row>
      
     
    
    {/* <Col  >
    <UploadPage></UploadPage>
    </Col> */}
    
      </>
  )
}

export default Dashboard_