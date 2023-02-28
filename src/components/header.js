import { Link } from 'react-router-dom';
import React from 'react';
// import { quickViewModalAction, breadCrumbAction } from './../actions';
import { connect } from 'react-redux';
// import { ModalComponent, Spinner, ConnectedBreadCrumb } from './utilities';
// import axios from 'axios';
// import qs from 'query-string';


const Header = () => {

    return (
        <>
            <header>
                <nav>
                    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center position-relative">
                    <h3 className="navbar-brand me-auto">
                        <img id="logoImg" src="images/appLogo.png" alt="toggle_mode"/>
                        {/* Personal */}
                    </h3>
                    <ul id="topNav" className="navbar-nav ms-md-auto mt-4 mt-md-0 flex-md-row align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link link-1 active" to="#">Home</Link>
                        </li>
                        <li className="nav-item mt-2 mt-md-0">
                            <Link className="nav-link link-1" to="#">About</Link>
                        </li>
                        <li className="nav-item mt-2 mt-md-0">
                            <Link className="nav-link link-1" to="#">Services</Link>
                        </li>
                        <li className="nav-item mt-2 mt-md-0">
                            <Link className="nav-link link-1" to="#">More</Link>
                        </li>
                        <li className="nav-item mt-2 mt-md-0">
                            <button className="slideBtn btn-1" type="button" name="button">Contact</button>
                        </li>
                    </ul>
                        <div className="d-block d-md-none" id="menu-icon"></div>
                    </div>
                </nav>
            </header>
            {/* <div className="reCenter_container">
                <img id="reCenter_button" src="images/icon-location.svg" alt="Recenter"/>
            </div> */}
        </>
    )
}

const mapStateToPropsTwo = (state) => {
  return {};
}

export default connect(mapStateToPropsTwo, {})(Header);

