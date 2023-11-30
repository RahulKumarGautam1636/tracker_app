import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { makeAppointment } from './utilities';

const BottomNav = ({ handleGpsLocation, map, setMenuActive, menuActive, loginModalActive, setLoginModalActive }) => {
  // const history = useHistory();
  
  return (
    <div className="bottomNav d-md-none">
      <ul
        className="icons d-flex justify-content-evenly align-items-center ps-0" style={{listStyle: 'none'}}>
        <li>
          <Link to="#/"><i className='bx bx-home'  onClick={() => setMenuActive(!menuActive)}></i></Link>
        </li>
        <li>
          <Link to="#"><i className='bx bxs-user-pin' onClick={() => setLoginModalActive(true)}></i></Link>
        </li>
        <li>
          <Link to="#"><i className='bx bx-map' onClick={handleGpsLocation}></i></Link>
        </li>
        {/* <li>
          <Link to="#"><i className='bx bx-menu-alt-left'></i></Link>
        </li> */}
        <li>
          <Link to="#"><i className='bx bx-zoom-out' onClick={() => map.flyTo(map.getCenter(), 9)}></i></Link>
        </li>
        <li>
          <Link to="#"><i className='bx bx-zoom-in' onClick={() => map.flyTo(map.getCenter(), 17)}></i></Link>
        </li>
      </ul>
    </div>
  );
}

const mapStateToPropsTwo = (state) => {
  return {};
}

export default connect(mapStateToPropsTwo, {})(BottomNav);
