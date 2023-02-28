import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { makeAppointment } from './utilities';

const BottomNav = () => {
  // const history = useHistory();
  
  return (
    <div className='bottomNav d-sm-none'>
      <ul className='icons'>
        <li>
          <Link to="">CONSULT DOCTOR</Link>
        </li>
        <li>
          <Link to="/pharmacy">PHARMACY</Link>
        </li>
        <li>
          <Link to="/labTests">LAB TESTS</Link>
        </li>
      </ul>
    </div>
  )
}

const mapStateToPropsTwo = (state) => {
  return {};
}

export default connect(mapStateToPropsTwo, {})(BottomNav);
