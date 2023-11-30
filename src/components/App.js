import { HashRouter, Route } from 'react-router-dom';
import './css/style.css';
import './css/loginModalStyle.css';
import './css/icofont/icofont.css';

// import Header from './header';
import Home from './home2';
import Footer from './footer';
// import BottomNav from './bottomNav';
import ScrollToTop from '../ScrollToTop.js';
import { connect } from 'react-redux';

import { ConnectedToast } from './utilities';


function App({ isLoading }) {

// useScript('js/bootstrap.min.js');
// useScript('js/main.js');                         // Header has some eventlisteners and initialization code for elements like mobile menu present in header/footer. 
// useScript('js/custom.js');                    // importing main.js here to make sure DOM is correctly loaded before it's execution.

  return (
    <div>
      <HashRouter>
        {isLoading && <div className='spinner-container'><GlobalLoader/></div>}
        {/* <Header/> */}
        {/* <BottomNav/> */}
        <ScrollToTop/>
        <div>
          <Route path='/' exact component={Home}/>
          {/* <Route path='/productPage/:id' component={ProductPage}/>
          <Route path='/franchisee' component={Franchisee}/>
          <Route path='/aboutUs' component={AboutUs}/>
          <Route path='/contactUs' component={ContactUs}/>
          <Route path='/filterPage/:filterTerm' component={FilterPage}/>
          <Route path='/cartPage' component={CartPage}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/wishlist' component={Wishlist}/>
          <Route path='/patientProfile' component={PatientProfile}/> */}
        </div>
        <Footer/>
        <ConnectedToast/>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isLoading: state.isLoading };
}

export default connect(mapStateToProps, {})(App);





const GlobalLoader = () => {
  return (
    <div className='spinner-box' style={{minHeight: '100vh'}}>
      <div className="wrapper">
        <div className="circle"></div>     
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div> 
  )
}