import React from 'react'
import {Navbar} from "react-bootstrap" 

import 'bootstrap/dist/css/bootstrap.min.css';
export default function Header() {
    return (
        <div>
        <Navbar className="justify-content-center" bg="dark" variant="dark">
        <Navbar.Brand href="#home" style={{textAlign:'center'}}>

         <h1>Covid Tracker</h1> 
        </Navbar.Brand>
      </Navbar>
        </div>
    )
}
