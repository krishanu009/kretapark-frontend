import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styling/calender.css";
import constants from '../constants.json'
const CalendarView = () => {
  let emptyDispObj = {
    id:"",
    date: "",
    title: "",
    Link: "",
    img: "../assets/download (1).jpg",
  };
  const [date, setDate] = useState(new Date());
  const [displayedInfo, setDisplayedInfo] = useState(emptyDispObj);
  const [scheduledContent, setScheduledContent] = useState([
    {
      id:"1",
      date: "2023-11-02T18:30:00.000Z",
      title: "El dorado Mystery!",
      Link: "url//.com",
      img: "../assets/download (1).jpg",
    },
    {
      id:"2",
      date: "2023-11-04T18:30:00.000Z",
      title: "Atlentis Mytery!",
      Link: "url//.com",
      img: "../assets/HD-wallpaper-movie-atlantis-the-lost-empire-thumbnail.jpg",
    },
    {
      id:"3",
      date: "2023-11-06T18:30:00.000Z",
      title: "Kerla Mystery!",
      Link: "url//.com",
    },
  ]);
  const [notScheduledContent, setNotScheduledContent] = useState([
    {
      id:"4",
      date: "2023-11-01T18:30:00.000Z",
      title: "Diwali History!",
      Link: "url//.com",
      img: "../assets/download (1).jpg",
    },
    {
      id:"5",
      date: "2023-11-08T18:30:00.000Z",
      title: "Black Hawak Down!",
      Link: "url//.com",
      img: "../assets/HD-wallpaper-movie-atlantis-the-lost-empire-thumbnail.jpg",
    },
    {
      id:"6",
      date: "2023-11-09T18:30:00.000Z",
      title: "Mosad Operation!",
      Link: "url//.com",
    },
  ]);
  useEffect(() => {
    fetchInfoOnDate(date.toISOString());
  }, [date]);
  // let scheduledContent = [
  //   {
  //     date: "2023-11-02T18:30:00.000Z",
  //     title: "El dorado Mystery!",
  //     Link: "url//.com",
  //     img: "../assets/download (1).jpg"
  //   },
  //   {
  //     date: "2023-11-04T18:30:00.000Z",
  //     title: "Atlentis Mytery!",
  //     Link: "url//.com",
  //     img: "../assets/HD-wallpaper-movie-atlantis-the-lost-empire-thumbnail.jpg"
  //   },
  //   {
  //     date: "2023-11-06T18:30:00.000Z",
  //     title: "Kerla Mystery!",
  //     Link: "url//.com",
  //   },
  // ];

  function fetchInfoOnDate(date) {
    console.log(date);
    let foundObj = scheduledContent.find((item) => {
      return item.date === date;
    });

    if (foundObj) {
      setDisplayedInfo(foundObj);
    } else {
      emptyDispObj.date = date;
      setDisplayedInfo(emptyDispObj);
    }
    console.log(foundObj);
  }
  function deleteObjectById(array, id) {
    
    let newArray = array.filter(item => item.id !== id);
    return newArray;
  }
  const handleDelete = (param,data) => (event) => {
 if(param === constants.CONTENT.SCHEDULED)
 {
    let content = displayedInfo;
    let newScheduledContent = [...scheduledContent];
    let newNotScheduledContent = [...notScheduledContent];
    newScheduledContent = deleteObjectById(newScheduledContent,content.id);
    newNotScheduledContent.push(content);
    setDisplayedInfo(emptyDispObj);
    setScheduledContent(newScheduledContent);
    setNotScheduledContent(newNotScheduledContent);

 }
 else
 {

 }
  };
  return (
    <>
      <Row>
        <Col lg="6">
       
          <div className="dateInfo">
          {displayedInfo.id !==""? <div className="delete-icon-scheduled" id="scheduled" onClick={handleDelete(constants.CONTENT.SCHEDULED,{})}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="grey"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
                id="scheduled"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </div>:null}
            
            <div className="dateInfo-inner">
              <Row>
                {displayedInfo.id !==""?<><Col lg="6">
                  <h1 className="title-text">Title: {displayedInfo.title}</h1>
                  <h1 className="title-text">
                    Scheduled: {displayedInfo.date}
                  </h1>
                </Col><Col lg="6">
                    <img
                      class="cover-image"
                      src={require("../assets/download (1).jpg")}
                      alt="Your Image Description"
                    ></img>
                  </Col></>:
                  null
                 }
                
              </Row>
            </div>
          </div>
        </Col>
        <Col>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} />
          </div>
          <p className="text-center">
            <span className="bold">Selected Date:</span> {date.toDateString()}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="notScheduled">
            {notScheduledContent.map((item, index) => (
              
              <div className="notScheduled-items">
                <div className="delete-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="grey"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </div>
                <h1 className="notScheduled-items-title">{item.title}</h1>
                <h1 className="notScheduled-items-title">{item.date}</h1>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CalendarView;
