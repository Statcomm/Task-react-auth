import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import authStore from "../stores/authStore";
import axios from "axios";
import api from "../stores/api";

function SignUpModal() {
 const [isOpen, setIsOpen] = useState(false);
 const [user,setUser] = useState({ 
 username:"",
 password:"",
})


const handleChange = (event) => {
  setUser({...user, [event.target.name]: event.target.value})

};
const handleSubmit = (event) => {
    event.preventDefault();
    authStore.signUpMethod(user);
    setIsOpen(false);
    // closeMOdal();
  }

  return (
    <>
      <Button className="delete" onClick={() => setIsOpen(true)}>
        Sign Up
      </Button>
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
           <input value={user.username} type="text" onChange={handleChange} name="username" placeholder="Enter your username" />
           <input value={user.password} type="password" onChange={handleChange} name="password" placeholder="Enter your password"/>
           <input type="text" onChange={handleChange} name="dummytext" placeholder="does entry here console log?"/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SignUpModal;
