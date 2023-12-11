import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styling/meeting.css";
function ChatRoom() {
  return (
    <Row>
     <Col lg="3" className='chat-sideBar'>
     
     </Col>
     <Col lg="9" className='chat-area'>
     <div className='otherMessage'>
      <span className='senderName'>Rachel</span>
      Hi! Are You Available?
      <span className='receivedTime'>12:00 AM</span>
     </div>
     
     <div className='yourMessage'>
     
      Yes I am available..
      <span className='receivedTime'>12:00 AM</span>
     </div>
     </Col>
    </Row>
  )
}

export default ChatRoom