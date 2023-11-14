import React, { useState,  useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styling/calender.css'

const CalendarView = () =>  {
  let emptyDispObj = {date:"", title:"", Link:""};
    const [date, setDate] = useState(new Date());
    const [displayedInfo,setDisplayedInfo] = useState(emptyDispObj );
    
    useEffect(() => {
        fetchInfoOnDate(date.toISOString());
      }, [date]);
    const  scheduledContent = [{date:"2023-11-02T18:30:00.000Z", title:"El dorado Mystery!", Link:"url//.com"},
    {date:"2023-11-04T18:30:00.000Z", title:"Atlentis Mytery!", Link:"url//.com"},
    {date:"2023-11-06T18:30:00.000Z", title:"Kerla Mystery!", Link:"url//.com"}];

      function fetchInfoOnDate(date)
      {
        console.log(date);
        let foundObj = scheduledContent.find((item) => {
          return item.date === date;
        });

        if(foundObj)
        {
           setDisplayedInfo(foundObj);
        }
        else
        {
          emptyDispObj.date = date;
          setDisplayedInfo(emptyDispObj )
        }
        console.log(foundObj);
      }
  return (
    <>
    
   
      <Row>
        <Col lg="6">
            <div className='dateInfo'>
                <h1>Title: {displayedInfo.title}</h1>
            </div>
        </Col>
        <Col>
        
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p></Col>
      </Row>
      <Row>
        <Col >
        <div className='notScheduled'>
                
                </div>
        </Col>
      </Row>
     
      </>
  )
}


export default CalendarView