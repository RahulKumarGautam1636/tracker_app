import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { makeAppointment } from './utilities';

const BottomNav = ({ handleGpsLocation }) => {
  // const history = useHistory();
  
  return (
    <div className="bottomNav d-sm-none">
      <ul
        className="icons d-flex justify-content-evenly align-items-center ps-0" style={{listStyle: 'none'}}>
        <li>
          <Link to="#/"><i className='bx bx-home'></i></Link>
        </li>
        <li>
          <Link to="#/pharmacy"><i className='bx bxs-user-pin'></i></Link>
        </li>
        <li>
          <Link to="#/pharmacy"><i className='bx bx-map' onClick={handleGpsLocation}></i></Link>
        </li>
        {/* <li>
          <Link to="#/labTests"><i className='bx bx-menu-alt-left'></i></Link>
        </li> */}
        <li>
          <Link to="#/labTests"><i className='bx bx-search'></i></Link>
        </li>
        <li>
          <Link to="#/labTests"><i className='bx bx-cog'></i></Link>
        </li>
      </ul>
    </div>
  );
}

const mapStateToPropsTwo = (state) => {
  return {};
}

export default connect(mapStateToPropsTwo, {})(BottomNav);
