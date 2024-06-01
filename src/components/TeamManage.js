import React, { useRef, useEffect, useState, useContext } from "react";
import { Row, Col, Button, ListGroup, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import "../styling/team.css";
function TeamManage({ user, userInfo, changeLastLogin, setLoading }) {
  console.log("user", user);
  console.log("userInfo", userInfo);
  const { theme, setTheme } = useContext(ThemeContext);
  const [myTeams, setMyTeams] = useState([]);
  const [currTeam, setCurrTeam] = useState([]);
  const [currTeamMembers, setCurrTeamMembers] = useState([]);
  const [displayTeams, setDisplayTeams] = useState([]);
  const [displayedLogin, setDisplayedLogin] = useState("");
  const [show, setShow] = useState(false);
  const [currModal, setCurrentModal] = useState();
  const [newTeamName, setNewTeamName] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [menuType, setMenueType] = useState();
  const [newMemberEmail, setNewMemberEmail] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMyTeams();
      setLoading(false);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (userInfo) {
      setCurrentLogin();
    }
  }, [myTeams, userInfo]);

  useEffect(() => {
    prepareDisplayTeams();
    console.log("currTeam", currTeam);
  }, [myTeams, currTeam]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      fetchTeamMembers();
      setLoading(false);
    };
    fetchData();
  }, [userInfo]);
  const fetchMyTeams = async () => {
    if (isEmptyOrNotPresent(user)) return;
    console.log("here");
    await axios
      .get(process.env.REACT_APP_GET_MY_TEAMS + "/" + user.id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("get my teams result", res.data);
        setMyTeams(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchTeamMembers = async () => {
    if (isEmptyOrNotPresent(userInfo)) return;

    await axios
      .get(process.env.REACT_APP_GET_MEMBERS + "/" + userInfo.user.lastLogin, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("get team members result", res.data);
        setCurrTeamMembers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setCurrentLogin = () => {
    if (isEmptyOrNotPresent(userInfo)) return;
    console.log("set last login", userInfo.user.lastLogin);
    if (userInfo.user.lastLogin) {
      setCurrTeam(userInfo.user.lastLogin);
      let findObj = myTeams.find(
        (item) => item._id === userInfo.user.lastLogin
      );
      if (findObj) {
        setCurrTeam(findObj._id);
        setDisplayedLogin(findObj.title);
      } else if (myTeams.length) {
        setCurrTeam(myTeams[0]._id);
        setDisplayedLogin(myTeams[0].title);
      }
    } else {
      console.log("kk0");
      if (myTeams.length) {
        setCurrTeam(myTeams[0]._id);
        setDisplayedLogin(myTeams[0].title);
      }
    }
  };

  const prepareDisplayTeams = () => {
    let tempDisplayItems = myTeams.filter((item) => item._id != currTeam);
    setDisplayTeams(tempDisplayItems);
  };
  function isEmptyOrNotPresent(obj) {
    if (obj == null) {
      return true;
    }

    if (typeof obj === "object" && Object.keys(obj).length === 0) {
      return true;
    }

    return false;
  }
  const handleClose = () => {
    // setAllAssigned([]);
    // setTaskTitle("");
    // setCurrAssigned();
    setShow(false);
    setErrorMessage("");
    setNewTeamName("");
    setNewMemberEmail("");
    setMenueType("");
    // setSelectedScriptId({ id: "", name: "" });
  };
  const handleShow = (type) => {
    setMenueType(type);
    setShow(true);
  };
  const handleCreate = async (type) => {
    console.log("type", type);
    if (type === "team") {
      if (!newTeamName) {
        setErrorMessage("Please enter a team name..");
        return;
      }
      let payload = {
        title: newTeamName,
        members: [{ id: user.id, name: user.userName }],
      };
      await axios
        .post(process.env.REACT_APP_CREATE_A_TEAM, payload, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          fetchMyTeams();
          handleClose();
          setShow(false);
          setNewTeamName("");
          setNewMemberEmail("");
          setMenueType("");
          setErrorMessage("");
        })
        .catch((e) => {
          console.log(e);
          setErrorMessage("Error in creating new team, try again!");
          return Promise.reject(e);
        });
    } else if (type === "member") {
      if (!newMemberEmail) {
        setErrorMessage("Please enter an email..");
        return;
      }

      let payload = { email: newMemberEmail, teamId: currTeam };
      // REACT_APP_ADD_MEMBERR_TO_TEAM
      await axios
        .post(process.env.REACT_APP_ADD_MEMBERR_TO_TEAM, payload, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log("add member result", res.data);
          fetchTeamMembers();
        })
        .catch((e) => {
          // console.log(e);
          // console.log("add member error",e.response.data.error);
          setErrorMessage(e.response.data.error);
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title>
            New {menuType === "team" ? "Team" : "Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {menuType === "team" && (
            <Form.Control
              size="sm"
              type="text"
              value={newTeamName}
              placeholder="New team name..."
              onChange={(e) => {
                setNewTeamName(e.target.value);
              }}
            />
          )}

          {menuType === "member" && (
            <Form.Control
              size="sm"
              type="email"
              value={newMemberEmail}
              placeholder="New member email..."
              onChange={(e) => {
                setNewMemberEmail(e.target.value);
              }}
            />
          )}

          <Row style={{ marginTop: "10px" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;{errorMessage}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={() => handleCreate(menuType)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div class="mainBody">
        <Row>
          <Col lg="2">
            <h1 className="title">TEAMS</h1>
          </Col>
          <Col lg="2">
            <Button variant="primary" onClick={() => handleShow("team")}>
              New Team
            </Button>
          </Col>
          {/* <Col lg="2" >
      <Button variant="primary" >
        New Member
      </Button>
    </Col> */}
        </Row>

        <Row>
          {/* <div class="card">
        <div class="container">
          <h4>
            <b>John Doe</b>
          </h4>
          
        </div>
      </div> */}

          <Col lg="3" className="borderRight fullHeight borderTop pT-30">
            <Row>
              <h2 className="currentLogin">Logged in {displayedLogin}</h2>
            </Row>
            <div className="teamListMain">
              <ListGroup className="listView" data-bs-theme={theme}>
                {/* <ListGroup.Item>Cras justo odio</ListGroup.Item>
<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
<ListGroup.Item>Morbi leo risus</ListGroup.Item>
<ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
<ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
                {displayTeams.map((item, index) => (
                  <ListGroup.Item
                    id={item._id}
                    onClick={(event) => {
                      changeLastLogin(event.target.id);
                      console.log(event.target.id);
                    }}
                  >
                    {item.title}{" "}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col lg="9" className="borderTop pT-30">
            <Row>
              <Col lg="1">
                <h2 className="currentLogin">Members </h2>
              </Col>
              <Col lg="2" className="addMemberIcon">
                <div onClick={() => handleShow("member")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentcolor"
                    class="bi bi-person-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    <path
                      fill-rule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                    />
                  </svg>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                {currTeamMembers.map((item) => (
                  <div class="teamCard">
                    <p>{item.name}</p>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TeamManage;
