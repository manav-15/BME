import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Header = () => {
    const [isAuth, setisAuth] = useState(false);
    const [user, setUser] = useState({});
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4040/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        setisAuth(true);
        setUser(responseJson.user);
        // this.setState({
        //   authenticated: true,
        //   user: responseJson.user
        // });
      })
      .catch(error => {
          setisAuth(false);
          setErr("Failed to authenticate user");
        // this.setState({
        //   authenticated: false,
        //   error: "Failed to authenticate user"
        // });
      });
    }, [isAuth]);
    
    const handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        // Upon successful login, a cookie session will be stored in the client
        window.open("http://localhost:4040/auth/google", "_self");
      };
    
    const handleLogoutClick = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage
        window.open("http://localhost:4040/auth/logout", "_self");
        setisAuth(false);
    };
    



    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" >BME</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/add-event">Add Event</a>
                        </li>
                        { isAuth &&
                            <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                            </li>
                        }
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> */}
                        {isAuth ? (
                            <li className="nav-item nav-link" onClick = {handleLogoutClick}> Logout</li>
                        ): (
                            <li className="nav-item nav-link" onClick = {handleSignInClick}> Sign In</li>
                        )}
                        
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
            );
};

export default Header;