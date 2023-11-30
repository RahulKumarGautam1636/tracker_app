import { combineReducers  } from 'redux';
import _ from 'lodash';


const compCodeReducer = (compCode=process.env.REACT_APP_E_PHARMA_COMPCODE, action) => {              // Holds Company code of current company.
  if (action.type === 'COMP_CODE') {
    return action.value;
  }
  return compCode;
}

const loginModalReducer = (isQuickViewModalOpen=false, action) => {             // Holds Status (open/close) of Login modal.
  if (action.type === 'LOGIN_MODAL') {
    return action.value;
  }
  return isQuickViewModalOpen;
}

const loginStatusReducer = (isLoggedIn=false, action) => {                  // Holds Status (open/close) of Login modal.
  if (action.type === 'LOGIN') {
    return action.value;
  }
  return isLoggedIn;
}

const loaderReducer = (isLoading=false, action) => {                        // Holds Status (open/close) of Global Loader on app.js page.
  if (action.type === 'LOADING') {
    return action.value;
  }
  return isLoading;
}

const bookingModalReducer = (bookingModalOpen=false, action) => {           // Controls Booking modal on footer.js page.
  if (action.type === 'BOOKING_MODAL') {
    return action.value;
  }
  return bookingModalOpen;
}

let currentUser = {
      Salutation: '',
      Name: '',
      EncCompanyId: '',
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
      MPartyCode: '',
      selectedCompany: {},
      Doctor: {}
      
      
      // Salutation: 'Dr',
      // Name: 'Dr. Rohan',
      // EncCompanyId: '',
      // PartyCode: '',
      // RegMob1: '7003290983',
      // Email: 'mail@gmail.com',
      // Gender: 'male',
      // Address: 'address',
      // Age: '25',
      // AgeMonth: '11',
      // AgeDay: '19',
      // UserPassword: '123456',
      // UnderDoctId: null,
      // Department: {dName: 'All', SubCode: 0},
      // TimeSlotId: null,
      // selectedCompany: ''
}
const userInfoReducer = (state=currentUser, action) => {                // Holds all the Informations of User.
  if (action.type === 'USER_INFO') {                                    // *** OldState === newState turns out to be true which causes components to not rerender on change of deep nested properties 
    let newState = Object.assign(state, action.payload);                // or on change of properties that are without any key on them (eg. list of objects without keys).
    return {...newState};                                               // {...newState} or _.deepClone(newState) will clone the given object/state and reproduce a new object/state where           
  }                                                                     // oldState !== {...newState} or _.deepClone(newState) which forces every connected component to re-render with new state.          
  return state;                                                                                                                                                                  
}

const companyInfoReducer = (state={COMPNAME: 'Gbooks', LogoUrl: '612.jpeg'}, action) => {              // Holds the Information of current Company.
  if (action.type === 'COMPANY_INFO') {
    return action.payload;
  }
  return state;
}

const breadCrumbReducer = (state={links: [{name: 'Home', link: '/'}], activeLink: '/'}, action) => {
  if (action.type === 'BREADCRUMB_DATA') {
    return action.payload;
  }
  return state;
}

const labTestCartReducer = (state={}, action) => {                            // Holds the Labtest Cart data.
  if (action.type==='ADD_LAB_TEST') {
    return {...state, [action.payload.item.ItemId]: action.payload };
  } else if (action.type==='REMOVE_LAB_TEST') {
    return _.omit(state, action.payload);                             // Pass list and id of target item to remove it from list.
  } else if (action.type==='DUMP_ALL_LAB_TEST_CART_ITEMS') {
    return {};
  }
  return state;
}

const pharmacyCartReducer = (state={}, action) => {                        // Holds the Labtest Cart data.  
  if (action.type==='ADD_PHARMACY_CART_ITEM') {
    return {...state, [action.payload.item.ItemId]: action.payload };
  } else if (action.type==='REMOVE_PHARMACY_CART_ITEM') {
    return _.omit(state, action.payload);                             
  } else if (action.type==='DUMP_ALL_PHARMACY_CART_ITEMS') {
    return {};
  }
  return state;
}

const toastReducer = (state={status: false, item: {}}, action) => {       // Controls the Toast state and data.
  if (action.type === 'SHOW_TOAST') {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  compCode: compCodeReducer,
  loginModalOpen: loginModalReducer,
  bookingModalOpen: bookingModalReducer,
  isLoggedIn: loginStatusReducer,
  userInfo: userInfoReducer,
  compInfo: companyInfoReducer,
  labTestCart: labTestCartReducer,
  pharmacyCart: pharmacyCartReducer,
  isToastActive: toastReducer,
  isLoading: loaderReducer,
  breadCrumbData: breadCrumbReducer
})
