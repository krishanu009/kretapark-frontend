import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const UploadPage = () => {

    const [selectedVideo, setSelectedVideo] = useState(false);

    const handleVideoSelection = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedVideo(URL.createObjectURL(file));
        } else {
            setSelectedVideo(null);
        }
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3" data-bs-theme="dark">
                        <Form.Label>Upload a video</Form.Label>
                        <Form.Control type="file" accept="video/*" onChange={handleVideoSelection} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6} xs={12}>
                    {selectedVideo ? (
                        <div>
                            <h2>Video Preview:</h2>
                            <video controls src={selectedVideo} width="400" height="300"></video>
                        </div>
                    ) : (
                        <div className='noVideo'>


                        </div>
                    )}
                </Col>
                <Col lg={6} xs={12}>
                    {/* <Accordion defaultActiveKey="0" data-bs-theme="dark">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Accordion Item #3</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}

                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3" data-bs-theme="dark"
                    >
                        <Tab eventKey="home" title="YouTube" disabled={selectedVideo}>
                            <Row>
                                <Form data-bs-theme="dark">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Title" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Tags</Form.Label>
                                        <Form.Control type="text" placeholder="#tags" />
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Tab>
                        <Tab eventKey="profile" title="FaceBook" disabled={selectedVideo}>
                            Tab content for Profile
                        </Tab>
                        <Tab eventKey="contact" title="Instagram" disabled={selectedVideo}>
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </Col>

            </Row>
        </Container>
    )
}

export default UploadPage