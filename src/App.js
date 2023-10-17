import React, { useState,  useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UploadPage from './UploadPage';
function App() {

  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(54, 54, 54)';
  }, []);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelection = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    } else {
      setSelectedVideo(null);
    }
  };

  return (
    <UploadPage></UploadPage>
    
  );
}

export default App;