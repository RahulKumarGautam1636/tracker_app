import { Link } from 'react-router-dom';
import React from 'react';
import { loginModalAction } from './../actions';
import { connect } from 'react-redux';
import { ModalComponent } from './utilities';
import ConnectedSidePanel from './sidePanel';
// import qs from 'query-string';


const Header = ({ loginModalAction, loginModalOpen }) => {

    return (
        <>
            <header>
                <nav>
                    <div className="d-flex justify-content-between align-items-center position-relative">
                    <h3 className="navbar-brand mb-0">
                        <img id="logoImg" src="images/appLogo.png" alt="toggle_mode"/>
                        {/* Personal */}
                    </h3>
                    <ul id="topNav" className="navbar-nav flex-row align-items-center">
                        {/* <li className="nav-item">
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
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link link-1" to="#"><i className="icofont-map-pins"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-1" to="#"><i onClick={() => loginModalAction(true)} className="icofont-settings"></i></Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>
            {/* <div className="reCenter_container">
                <img id="reCenter_button" src="images/icon-location.svg" alt="Recenter"/>
            </div> */}
            {/* <ConnectedSidePanel/> */}
            <ModalComponent isActive={loginModalOpen} heading="" child={<ConnectedLoginModal/>} handleClose={loginModalAction}/>
        </>
    )
}

const mapStateToPropsTwo = (state) => {
  return { loginModalOpen: state.loginModalOpen };
}

export default connect(mapStateToPropsTwo, {loginModalAction})(Header);


const loginModal = () => {

    return (
        <div className="outer-box">
            <form id="loginForm">
                <h1 style={{fontSize: '25px', marginBottom: '50px', color: '#45f3ff'}}>Sign in</h1>
                <div style={{marginBottom: '45px'}}>
                <div className="inputBox position-relative">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required=""/>
                    <span>E-mail</span>
                    <i></i>
                </div>
                </div>
                <div style={{marginBottom: '20px'}}>
                <div className="inputBox position-relative">
                    <input type="password" className="form-control" id="exampleInputPassword1" required=""/>
                    <span>Password</span>
                    <i></i>
                </div>
                </div>
                <a className="text-white text-decoration-none mb-3" style={{fontSize: '14px'}}>Forgot Password !</a>
                <button type="submit" className="btn d-block ms-auto submitBtn">Submit</button>
            </form>
        </div>
    )
}

const mapStateToLoginModal = (state) => {
  return {};
}

export const ConnectedLoginModal = connect(mapStateToLoginModal, {})(loginModal);
