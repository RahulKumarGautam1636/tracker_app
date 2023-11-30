// import { useState, useEffect, useCallback, useMemo } from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Alert from 'react-bootstrap/Alert';
// import { ModalComponent, getFrom, Spinner } from './utilities';
import { connect } from 'react-redux';
// import { bookingModalAction, loaderAction, loginModalAction, loginStatusAction, userInfoAction } from './../actions';
// import axios from 'axios';
// import RenderCarousel from "./carousel";
// import { Link } from 'react-router-dom';


function Footer() {
  return (
    <h1 className='d-none'>Footer</h1>
  )
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(Footer);