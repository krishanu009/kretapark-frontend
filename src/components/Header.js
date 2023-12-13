import React from 'react'
import { Button } from 'react-bootstrap';
import {  Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const logoutAction = () => {
    // axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
    // .then((r) => {
    //     localStorage.setItem('token', "")
    //    navigate("/");
    // })
    // .catch((e) => {
    //     console.log(e)
    // });
    localStorage.setItem('token', '');
    navigate("/");
}
  return (
    <div className='header-body'><Button variant="dark" style={{float:"right", marginTop:"10px"}} onClick={logoutAction}>Log Out</Button></div>
  )
}
