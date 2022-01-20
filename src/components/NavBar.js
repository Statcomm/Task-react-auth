import React from "react";
import { Nav } from "react-bootstrap";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import authStore from "../stores/authStore";
import { observer } from "mobx-react-lite";
import { Button } from "bootstrap";

function Navbar() {
  return (
    <Nav className="justify-content-end" bg="light" expand="lg">
       {
       authStore.user ? 
       <> 
       {authStore.user.username} is logged in!
      
       <button className="delete" onClick={()=>authStore.logout()}>Logout</button>   
       </>
      : 
    
      <>
      Hello, please sign in! 
      
  <SignUpModal />
      <SignInModal />
     </>
     
}

   
      
    </Nav>
  );
}

export default observer(Navbar);
