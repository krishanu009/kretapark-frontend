import React, { useState,  useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UploadPage from './UploadPage';
import SideBar from './SideBar';
import Header from './Header';
function App() {

  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(54, 54, 54)';
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
    <Row>
        <Header></Header>
      </Row>
    
      <Row>
        <Col lg="1"><SideBar></SideBar></Col>
        <Col><UploadPage></UploadPage></Col>
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