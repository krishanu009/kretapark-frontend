import React, { useState,  useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styling/calender.css'

const CalendarView = () =>  {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        fetchInfoOnDate(date);
      }, [date]);

      function fetchInfoOnDate(date)
      {
         console.log(date);
      }
  return (
    <>
    
   
      <Row>
        <Col lg="6">
            <div className='dateInfo'>
                
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
     
      </>
  )
}


export default CalendarView