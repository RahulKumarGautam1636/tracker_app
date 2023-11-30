import React, { useState, useEffect, useCallback, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { connect } from 'react-redux';
import { toastAction, breadCrumbAction } from './../actions';
import Carousel from 'react-bootstrap/Carousel';
// import history from '../history';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
                
import Offcanvas from 'react-bootstrap/Offcanvas';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;

export const NologinWarning = () => {
  return (
    <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{background: '#bdbdbd'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger fw-bold" id="exampleModalLabel">Warning !</h5>
            <Link className="btn-close" to='/' aria-label="Close" ></Link>
          </div>
          <div className="modal-body">
            You are not Logged in Please log in to view this page.
          </div>
          <div className="modal-footer">
            <Link to='/' className="btn btn-primary" data-dismiss="modal">GO TO HOMEPAGE</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const handleNumberInputs = (e, setStateName) => {
  const {name, value} = e.target;
  const re = /^[0-9\b]+$/;
  if (value === '' || re.test(value)) {
   setStateName(preValue => {
       return {...preValue, [name]: value};
     });
  }
}

export const useFetch = (url, compCode) => {

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    if (compCode) {
      try {
        const res = await fetch(url);
        if (res.status === 500) {            // Status 500 called internal server error is not an error it's a responce.
          setError(true);                    // hence it can't be catched by try catch statement hence handling it mannually.
          return;
        }
        const json = await res.json();
        setData(json);          
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }

  }, [url, compCode]);

  useEffect(() => {
    setLoading(true);
    // setTimeout(() => {                        // turn on Timeout to test Skeleton loading.
      fetchData();
    // }, 5000);
  }, [fetchData]);

  return [data, isLoading, error]
}



export const getCurrentDate = () => {
  const d = new Date();
  const currentDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
  return currentDate;
}

const ShowToast = ({ isToastActive, toastAction }) => {

    return (
      <div aria-live="polite" aria-atomic="true" className="toastBackground" style={{position: 'fixed', top: '0', left: '0', height: '100vh', width: '100vw', pointerEvents: 'none'}}>
        <ToastContainer className="p-3" position={'bottom-end'}>
          <Toast onClose={() => toastAction(false, {})} show={isToastActive.status} delay={3000} autohide>
            <Toast.Header>
              <img src="favicon.ico" className="rounded me-2" alt="asdf" style={{height: '20px'}}/>
              <strong className="me-auto">Successfully added to cart</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>
              <div className="w-100 d-flex justify-content-between">
                <p className="mb-0 fw-bold">{isToastActive.item.ItemDesc}</p>
                <p className="mb-0 fw-bold mark bg-success rounded-pill px-2">₹ {isToastActive.item.Rate}</p>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
}

export const ControlledCarousel = ({ data, interval, controls }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={interval} controls={controls}>
        {
            data.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                    <img className="h-100 w-100" src={item} alt={`${index + 1}_slide`}/>
                    {/* <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
              )
            })
        }
    </Carousel>
  );
}


export const ControlledTabs = ({ children, data, activetab }) => {
  const [key, setKey] = useState(activetab);

  return (
    <Tabs
      id="date-slot-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {
        data.map((item, index) => {
          return (
            <Tab eventKey={item.name.sName} key={index} title={item.name.sName}>
              {React.cloneElement(children, { data: item.name, key: index })}
            </Tab>
          );
        })
      }
    </Tabs>
  );
}

const mapStateToProps2 = (state) => {
  return { isToastActive: state.isToastActive };
}

export const ConnectedToast = connect(mapStateToProps2, {toastAction})(ShowToast);


export const makeAppointment = (isLoggedIn, action, status, mode, history) => {
  if (isLoggedIn) {
    history.push('/specialists');
  } else {
    action(status, mode);
  }
}

export const useDocumentTitle = (title, prevailOnUnmount = false) => {      // To Dynamicall set the website Title.
  const defaultTitle = useRef(document.title);                              // Used in header page.

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [prevailOnUnmount])
}


export const ModalComponent = ({ isActive, child, handleClose }) => {

  return (
    <Modal show={isActive} centered onHide={() => handleClose(false)} backdrop="static" keyboard={false}>
      {/* <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <i className="icofont-close-circled close-btn" onClick={() => handleClose(false)}></i>
        {child}
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  )
}

// Remove empty, nil, undefined values from objects.
// _.omitBy({ a: null, b: 1, c: undefined, d: false }, _.isNil)
// let o = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== '' || v !== null));

export const DropdownElement = ({ title, variant, data }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant={variant} id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {data.map((item, index) => {
          return (
            <Dropdown.Item as="button">{item.text}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export const customTabsButtons = (data, activeItem, onClickHandler) => {
  return data.map((item, index) => {
    return (
      <label className={`custom_check ${activeItem === item ? 'active' : ''}`} key={index}>
        <input type="button" name="tab-input" onClick={() => onClickHandler(item)}/>
        As {item}
      </label>
    )
  })
}


export const logOut = (loginAction, userAction) => {
    localStorage.removeItem('userLoginData');
    loginAction(false);
    userAction({
      Salutation: '',
      Name: '',
      // EncCompanyId: '',
      PartyCode: '',
      RegMob1: '',
      Email: '',
      Gender: '',
      Address: '',
      Age: '',
      AgeMonth: '',
      AgeDay: '',
      UserPassword: '',
      UnderDoctId: null,
      Department: {dName: 'All', SubCode: 0},
      TimeSlotId: null,
      UserType: 'Patient',
      Qualification: '',
      RegNo: '',
      SpecialistId: 0,
      UserId: '',
      MPartyCode: '',
      SpecialistDesc: '',
      selectedCompany: {},
      Doctor: {}
    });
    // history.push('/');
}

// export const Spinner = ({ min_height='10rem', fSize='16px', visible='visible' }) => {     
//   let sOpacity = visible === 'visible' ? '1' : '0';
//   let pEvents = visible === 'visible' ? 'auto' : 'none';
//   let zIndex = visible === 'visible' ? '100000' : '-1';          
//   return (
//     <>
//       <div className='spinner-box test' style={{minHeight: min_height, fontSize: fSize, visibility: visible, opacity: sOpacity, pointerEvents: pEvents, zIndex: zIndex}}>
//         <div className="loader"></div>       {/* stripe square and running square */}
//       </div>
//     </>
//   )
// }

export const Spinner = ({ min_height='10rem', fSize='16px' }) => {                
  return (
    <>
      <div className='spinner-box test' style={{minHeight: min_height, fontSize: fSize}}>
        <div className="loader"></div>       {/* stripe square and running square */}
      </div>
    </>
  )
}

export const getFrom = async (queryUrl, params={}, setStateName) => {
  setStateName(preValue => {
    return {...preValue, loading: true};
  })
  try {
    const res = await axios.get(queryUrl, {});
    if (res.status === 200) {
      return {loading: false, data: res.data, err: {status: false, msg: ''}};
    } else if (res.status === 500) {
      setStateName(preValue => {
        return {...preValue, loading: false, err: {status: true, msg: res.status}};
      })
      return false;
    }
  } catch (error) {
    console.log(error);
    setStateName(preValue => {
      return {...preValue, loading: false, err: {status: true, msg: error.message}};
    })
    return false;
  }
}

// const useWindowSize = () => {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
//   // const [width, height] = useWindowSize();     // use it like this in components. Resizing will update the component as it is connected with useState.
// }


export const BreadCrumb = ({ breadCrumbAction, breadCrumbData }) => {
  if (window.location.hash === '#/') return;
  return (
    <div className="breadcrumb-area">
      <div className="container">
        <div className="breadcrumb-content">
          <ul>
            {/* {data.links.map((item, index) => <li key={index} className={`${data.activeLink === item.link ? 'active' : ''}`}>{data.activeLink === item.link ? `${item.name}` : <Link to={item.link}>{item.name}</Link>}</li>)} */}

            {breadCrumbData.links.map((item, index) => breadCrumbData.activeLink === item.link ? <li key={index} className="active">{item.name}</li> : <li key={index}><Link to={item.link}>{item.name}</Link></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToBreadCrumb = (state) => {
  return { breadCrumbData: state.breadCrumbData };
}

export const ConnectedBreadCrumb = connect(mapStateToBreadCrumb, {breadCrumbAction})(BreadCrumb);


export const OffcanvasComponent = ({ isActive, child, handleClose }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas show={isActive} onHide={() => handleClose(false)}>
        {/* <Offcanvas.Header closeButton><Offcanvas.Title>Offcanvas</Offcanvas.Title></Offcanvas.Header> */}
        <Offcanvas.Body>
          {child}
          <i className="icofont-close-circled close-btn text-dark" onClick={() => handleClose(false)}></i>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}