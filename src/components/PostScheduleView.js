import "../styling/postScheduleView.css";
import React, { useRef, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Badge from "react-bootstrap/Badge";

function PostScheduleView() {
  const [allContent, setAllContent] = useState([]);
  const [scheduledContent, setScheduledContent] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([
    { id: "1324", name: "test" },
    { id: "994", name: "test - 2" },
  ]);
  const [notScheduledContent, setNotScheduledContent] = useState([]);
  const [newTask, setNewTask] = useState();
  const [taskTitle, setTaskTitle] = useState();
  const [currAssigned, setCurrAssigned] = useState();
  const [allAssigned, setAllAssigned] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [status, setStatus] = useState("todo");
  const roles = ["editor", "lead", "member", "writer"];
  useEffect(() => {
    getAllPost();
  }, []);
  useEffect(() => {
    filterScheduledAndNotScheduled();
    // fetchInfoOnDate(date.toDateString());
  }, [allContent]);

  const getAllPost = async () => {
    await axios
      .get(process.env.REACT_APP_GET_ALL_POST, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setAllContent(res.data);
        console.log("get all post api", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  };

  const filterScheduledAndNotScheduled = () => {
    let newScheduledContent = allContent.filter(
      (obj) => obj["scheduled"] === true
    );
    let newNotScheduledContent = allContent.filter(
      (obj) => obj["scheduled"] === false
    );
    console.log("scheduledContent", newScheduledContent);
    console.log("not scheduledContent", newNotScheduledContent);
    setScheduledContent(newScheduledContent);
    setNotScheduledContent(newNotScheduledContent);
  };

  const updatePost = async (post) => {
    await axios
      .put(process.env.REACT_APP_UPDATE_POST + "/" + post._id, post, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("update put api", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setAllAssigned([]);
    setCurrAssigned();
    setShow(false);
    setErrorMessage("");
  };

  const handleShow = () => setShow(true);
  const handleUserChange = (event) => {
    let user = availableUsers.find((item) => {
      return item.id === event.target.value;
    });
    console.log(user);
    setCurrAssigned({ id: user.id, name: user.name, role: "" });
    setSelectedUserId(user.id);
  };
  const addAssigned = () => {
    if (!currAssigned) {
      setErrorMessage("Please select a user");
      return;
    }

    if (!selectedRoleId) {
      setErrorMessage("Please select a role");
      return;
    }
    console.log(currAssigned);
    let assigned = allAssigned;
    assigned.push(currAssigned);
    console.log(assigned);
    setAllAssigned(assigned);
    setCurrAssigned();
    setErrorMessage("");
    setSelectedRoleId("");
    setSelectedUserId("");
  };
  const handleRoleChange = (event) => {
    if (!currAssigned) {
      setErrorMessage("Please select a user");
      return;
    }
    let user = currAssigned;
    user.role = event.target.value;
    setCurrAssigned(user);
    setSelectedRoleId(user.role);
    setErrorMessage("");
  };

  const handleCreate = () => {
    if (!taskTitle) {
      setErrorMessage("Please add a title");
      return;
    }

    setCurrAssigned();
    setSelectedRoleId("");
    setSelectedUserId("");
    setStatus("todo");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="sm"
            type="text"
            value={taskTitle}
            placeholder="Title/summery"
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          <br></br>
          <Row>
          <Col lg="2">
            Status
            </Col>
            <Col lg="3">
              <Form.Select
                size="sm"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="todo">To Do</option>
                <option value="done">Done</option>
              </Form.Select>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col lg="12">
            {allAssigned.map((item) => (
             
             <><Badge bg="secondary">
                {item.name}({item.role})
              </Badge><br></br></>
           ))}
            </Col>
            
          </Row>
          <br></br>
          <Row>
            <Col lg="7">
              <Form.Select
                size="sm"
                value={selectedUserId}
                onChange={handleUserChange}
              >
                <option value="">select user</option>
                {availableUsers.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg="3">
              <Form.Select
                size="sm"
                value={selectedRoleId}
                onChange={handleRoleChange}
              >
                <option value="">select role</option>
                {roles.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg="2">
              <Button variant="secondary" onClick={addAssigned}>
                ADD
              </Button>
            </Col>
          </Row>
          <Row>{errorMessage}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={handleCreate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mainView">
        <Row>
          <Col lg="2">
            {" "}
            <span
              style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
            >
              Content Board
            </span>
          </Col>
          <Col lg="2">
            {" "}
            <Button variant="primary" onClick={handleShow}>
              Create
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg="3">
            <div className="toDoList">
              {notScheduledContent.map((item, index) => (
                <div className="task">
                  <div className="taskTitle">{item.title}</div>

                  <div className="taskDate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                    &nbsp;
                  </div>
                  <div className="taskScript">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
                    </svg>
                    &nbsp;Test script
                  </div>

                  <div className="assigned">
                    {item.assigned &&
                      item.assigned.map((a, i) => (
                        <Badge bg="secondary">
                          {a.name}({a.role})
                        </Badge>
                      ))}

                    {/* <Badge bg="secondary">Secondary</Badge>
            <Badge bg="success">Success</Badge>
            <Badge bg="danger">Danger</Badge>
            <Badge bg="warning" text="dark">
              Warning
            </Badge>
            <Badge bg="info">Info</Badge>
            <Badge bg="light" text="dark">
              Light
            </Badge>
            <Badge bg="dark">Dark</Badge> */}
                  </div>
                </div>
              ))}
              ;
            </div>
          </Col>
          <Col lg="3">
            <div className="inProgress">
              {scheduledContent.map((item, index) => (
                <div className="task">
                  <div className="taskTitle">{item.title}</div>

                  <div className="taskDate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                    &nbsp;{item.date}
                  </div>
                  <div className="taskScript">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
                    </svg>
                    &nbsp;Test script
                  </div>
                  <div className="assigned">
                    {item.assigned &&
                      item.assigned.map((a, i) => (
                        <span key={i} className="badge bg-primary">
                          {a.name}
                        </span>
                      ))}

                    {/* <Badge bg="secondary">Secondary</Badge>
            <Badge bg="success">Success</Badge>
            <Badge bg="danger">Danger</Badge>
            <Badge bg="warning" text="dark">
              Warning
            </Badge>
            <Badge bg="info">Info</Badge>
            <Badge bg="light" text="dark">
              Light
            </Badge>
            <Badge bg="dark">Dark</Badge> */}
                  </div>
                </div>
              ))}
              ;
            </div>
          </Col>
          <Col lg="3">
            <div className="done"></div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PostScheduleView;
