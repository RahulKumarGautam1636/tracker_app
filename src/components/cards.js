import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addLabTestCartAction, addPharmacyCartAction, toastAction, userInfoAction, bookingModalAction, quickViewModalAction } from './../actions';
import { connect } from 'react-redux';
// import { Tooltip } from 'react-tooltip'

function ProfileCard({ data }) {

  return (
    <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"boxShadow": "0 2px 4px 0 rgb(0 0 0 / 20%)", "borderRadius": "0.85em", "maxWidth": "14rem", "width": "14rem", "fontSize": "15px", "minHeight": "19rem"}}>
        <div className="tag"><p>59% off</p></div>
        <div className="rounded-circle p-1 overflow-hidden" style={{"maxWidth": "5.5em", "border": "2px solid #fd5abd"}}>
          <img src="/img/user_unknown.png" className="img-fluid" alt="Speciality"/>
        </div>
        <ul className="d-flex justify-content-between px-0 mt-2 mb-2 text-warning" style={{"listStyle": "none", "minWidth": "7em", "fontSize": "0.8em"}}>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star-half-alt"></i></li>
        </ul>
        <h4 style={{"fontSize": "1.1em"}}><Link to={`/doctorProfile/${data.PartyCode}`}>{data.Name}</Link></h4>
        <h6 style={{"fontSize": "0.85em"}}>{data.Qualification}</h6>
        <p style={{"fontSize": "0.75em"}} className="mb-2">{data.SpecialistDesc}</p>
        <button className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>VIEW PROFILE</button>
        <button className="btn btn-sm btn-secondary w-100" type="button" name="button" style={{"backgroundColor": "#157eab", "fontSize": "0.8em", "border": "2px solid #157eab"}}>BOOK APPOINTMENT</button>
    </div>
  );
}

export default ProfileCard;


function PackgeCard({ data }) {
  return (
    <div className="profile-card bg-white d-flex flex-column justify-content-around p-3 m-1 position-relative overflow-hidden" style={{boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)", borderRadius: "0.85em", maxWidth: "19rem", width: "18rem", fontSize: "15px"}}>
        <h4 style={{fontSize: "1.3em"}}>{data.pakageName}</h4>
        <p style={{fontSize: "0.75em", fontWeight: "500"}} className="mb-2">TOTAL TESTS: {data.totalTests}</p>
        <p style={{fontSize: "0.75em", color: "#227066fa"}} className="mb-2">{data.testType}</p>
        <p style={{fontSize: "0.7em"}} className="mb-2"> {data.testName}<span style={{fontWeight: "500", color: "orange"}}> +{data.more} More</span>
        </p>
        <hr className="mb-3 mt-1" style={{background: "#157eab", height: "0px", width: "100%"}} />
        <div className="d-flex w-75 mb-1">
            <h6 style={{fontSize: "0.85em"}}>MRP</h6>
            <h6 className="text-danger position-relative pricing-red" style={{fontSize: "0.85em", margin: "0 2em 0 1em"}}>₹{data.priceRed}</h6>
            <h6 className="text-white position-relative pricing-green" style={{fontSize: "0.85em", zIndex: "1"}}>{data.off}% off</h6>
            <h6 className="position-relative" style={{color: "black", fontSize: "0.85em", zIndex: "1", marginLeft: "2em", transform: "scale(1.2)"}}>₹{data.off}</h6>
        </div>
        <button className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{borderWidth: "2px", borderColor: "#157eab", fontSize: "0.8em"}}>ADD TO CART</button>
    </div>
  );
}


function LabTestCard({ data, labTestCart, addLabTestCartAction, toastAction }) {
  const isAddedToCart = Object.keys(labTestCart).filter(i => parseInt(i) === data.ItemId );          // Filter cart items to know if item is already added to cart or not.

  return (
    <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"boxShadow": "0 2px 4px 0 rgb(0 0 0 / 20%)", "borderRadius": "0.85em", "maxWidth": "14rem", "width": "14rem", "fontSize": "15px", "minHeight": "16rem"}}>
        <div className="tag"><p>{data.Discount}% off</p></div>
        <img src={data.img} alt="Speciality" style={{"maxWidth": "5.5em", "marginBottom": "1em"}}/>
        <h4 style={{"fontSize": "1.1em"}}>{data.ItemDesc}</h4>
        <hr className="mb-3 mt-1" style={{"background": "#157eab","height": "1px", "width": "100%"}} />
        <div className="d-flex justify-content-around w-75 mb-1">
            <h6 style={{"fontSize": "0.85em"}}>MRP</h6>
            <h6 className="text-danger position-relative pricing-red" style={{"fontSize": "0.85em"}}>₹{data.MRPrate}</h6>
            <h6 className="text-white position-relative pricing-green" style={{"fontSize": "0.85em", "zIndex": "1"}}>₹{data.Rate}</h6>
        </div>
        <button onClick={() => {addLabTestCartAction(data); toastAction(true, data)}} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>{isAddedToCart.length > 0 ? 'TEST BOOKED' : 'BOOK TEST'}</button>
    </div>
  );
}


function PharmcyCard({ data, pharmacyCart, addPharmacyCartAction, toastAction }) {
  const isAddedToCart = Object.keys(pharmacyCart).filter(i => parseInt(i) === data.ItemId );          // Filter cart items to know if item is already added to cart or not.

  return (
    <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"boxShadow": "0 2px 4px 0 rgb(0 0 0 / 20%)", "borderRadius": "0.85em", "maxWidth": "14rem", "width": "14rem", "fontSize": "15px", "height": "17rem"}}>
        <div className="tag"><p>{data.Discount}% off</p></div>
        <div className='img-box'>
          <img src={data.img} alt="Speciality"/>
        </div>
        <h4 style={{"fontSize": "1.1em"}}>{data.ItemDesc}</h4>
        <hr className="mb-3 mt-1" style={{"background": "#157eab","height": "1px", "width": "100%"}} />
        <div className="d-flex justify-content-around w-75 mb-1">
            <h6 style={{"fontSize": "0.85em"}}>MRP</h6>
            <h6 className="text-danger position-relative pricing-red" style={{"fontSize": "0.85em"}}>₹{data.MRPrate}</h6>
            <h6 className="text-white position-relative pricing-green" style={{"fontSize": "0.85em", "zIndex": "1"}}>₹{data.Rate}</h6>
        </div>
        <button onClick={() => {addPharmacyCartAction(data); toastAction(true, data)}} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>{isAddedToCart.length > 0 ? 'ADDED TO CART' : 'ADD TO CART'}</button>
    </div>
  );
}


function HorizontalProfileCard({ data, userInfo, userInfoAction, bookingModalAction, companyList, compInfo}) {

  const [activeCompany, setActiveCompany] = useState('');

  useEffect(() => {
    setActiveCompany(userInfo.selectedCompany.COMPNAME);
  },[userInfo.selectedCompany.COMPNAME])

  const selectCompany = (item) => {
    setActiveCompany(item.COMPNAME);
    userInfoAction({selectedCompany: item});
  }

  return (
    <div className="card w-100 mb-0">
        <div className="card-body">
            <div className="doctor-widget">
                <div className="doc-info-left">
                    <div className="doctor-img">
                        <Link to={`/doctorProfile/${data.PartyCode}`}>
                            <img src="/img/DOC.png" className="img-fluid" alt="User"/>
                        </Link>
                    </div>
                    <div className="doc-info-cont">
                        <h4 className="doc-name"><Link to={`/doctorProfile/${data.PartyCode}`}>{data.Name}</Link></h4>
                        <p className="doc-speciality">{data.Qualification}&nbsp;</p>
                        <h5 className="doc-department">
                          {/* <img src="/img/specialities/specialities-05.png" className="img-fluid" alt="Speciality"/> */}
                          {data.SpecialistDesc}&nbsp;
                        </h5>
                        <div className="rating">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">(17)</span>
                        </div>
                        <div className="clinic-details">
                          <ul className="clinic-gallery" >
                                {
                                  companyList.map((item, index) => {
                                    return (
                                      <li key={index} onClick={() => selectCompany(item)}>
                                        <div className={`d-flex pillButton align-items-center my-1 my-lg-0 ${item.COMPNAME === activeCompany ? 'active' : ''}`}>
                                          <img src='img/logo/opd2.png' alt='clinicImage'/>
                                          <h6 className='mb-0 ms-1'>{item.COMPNAME}</h6>
                                        </div>
                                      </li>
                                    )
                                  })
                                }

                                {/* <li>
                                    <Link to="/img/features/feature-01.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-01.jpg" alt="Feature"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/img/features/feature-02.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-02.jpg" alt="Feature"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/img/features/feature-03.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-03.jpg" alt="Feature"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/img/features/feature-04.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-04.jpg" alt="Feature"/>
                                    </Link>
                                </li> */}
                          </ul>
                        </div>
                    </div>
                </div>
                <div className="doc-info-right">
                    <div className="clinic-booking">
                        <Link className="view-pro-btn" to="/#">View Profile</Link>
                        <Link className="apt-btn" to="#" onClick={() => {userInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: null}); bookingModalAction(true)}}>Book Appointment</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { labTestCart: state.labTestCart, pharmacyCart: state.pharmacyCart, isToastActive: state.isToastActive, compInfo: state.compInfo, userInfo: state.userInfo };
}

export const ConnectedPackageCard = connect(mapStateToProps, {addLabTestCartAction, toastAction})(PackgeCard);
export const ConnectedLabTestCard = connect(mapStateToProps, {addLabTestCartAction, toastAction})(LabTestCard);
export const ConnectedPharmacyCard = connect(mapStateToProps, {addPharmacyCartAction, toastAction})(PharmcyCard);
export const ConnectedHorizontalProfileCard = connect(mapStateToProps, {addLabTestCartAction, toastAction, userInfoAction, bookingModalAction})(HorizontalProfileCard);



const ProductCard = ({ data, quickViewModalAction }) => {

  const history = useHistory()

  return (
      <div className="single-product-wrap" style={{borderRadius: '10px 10px 10px 10px', padding: '5px 5px 0px'}}>
          <div className="product-image">
              <Link to={`/productPage/${data.id}`}>
                  <img id="imgSmallPWD" src={data.ItemImageURL} height="120" width="120" alt={data.Description}/>
              </Link>
          </div>
          <span className="sticker"> {data.Discount} %<br />Off </span>
          <div className="product_desc">
              <div className="product_desc_info">
                  <div className="product-review">
                      <h4 style={{marginBottom: '5px'}}>
                          <Link to={`/productPage/${data.id}`} className="product_name">
                               {data.Description}
                               <span className="nameTooltip">{data.Description}</span>
                           </Link>
                      </h4>
                  </div>
                  <div className="price-box">
                      <span className="old-price">₹ {data.ItemMRP}</span>
                      <span className="new-price">&nbsp; ₹ {data.SRate}</span>
                      <div className="rating-box">
                          <ul className="rating">
                              <li><i className="fa fa-star-o"></i></li>
                              <li><i className="fa fa-star-o"></i></li>
                              <li><i className="fa fa-star-o"></i></li>
                              <li><i className="fa fa-star-o"></i></li>
                              <li className="no-star"><i className="fa fa-star-o"></i></li>
                          </ul>
                      </div>
                  </div>
                  <div className="countersection" style={{visibility: 'hidden', opacity: '0'}}>
                      <div className="li-countdown"></div>
                  </div>
              </div>
              <div className="add-actions">
                  <ul className="add-actions-link">
                      <li className="add-cart active">
                          <button onClick={() => history.push('/cartPage')}>Add to cart</button>
                      </li>
                      <li className="float-end" onClick={() => history.push('/wishlist')}>
                          <button className="links-details" to="#"><i className="fa fa-heart-o"></i></button>
                      </li>
                      <li className="float-end">
                          <button to="#" onClick={() => quickViewModalAction(true)} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye"></i></button>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  )
}


const mapStateToProductsCard = (state) => {
  return {};
}

export const ConnectedProductCard = connect(mapStateToProductsCard, {quickViewModalAction})(ProductCard);


const HorizontalProductCard = ({ data }) => {
    return (
        <div className="row product-layout-list">
            <div className="col-lg-3 col-md-5 position-relative">
                <div className="product-image">
                    <Link to="/LogIn/GetProduct?ItemId=255068">
                        <img src={data.img} alt="Li's Product" style={{maxHeight: '175px'}}/>
                    </Link>
                </div>
                <span className="sticker grid-view-sticker">{data.off}%<br/>Off</span>
            </div>
            <div className="col-lg-5 col-md-7">
                <div className="product_desc pt-3">
                    <div className="product_desc_info">
                        <div className="product-review">
                            <h4><Link className="product_name" to="/LogIn/GetProduct?ItemId=255068">{data.name}</Link></h4>
                            <div className="rating-box">
                                <ul className="rating">
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="price-box">
                                <span className="old-price">₹ {data.oldPrice}</span>
                                <span className="new-price">&nbsp; ₹ {data.newPrice}</span>
                        </div>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="shop-add-action mb-xs-30">
                    <ul className="add-actions-link">
                        <li className="add-cart"><button>Add to cart</button></li>
                        <li className="wishlist"><button><i className="fa fa-heart-o"></i>Add to wishlist</button></li>
                        <li><button className="quick-view" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye"></i>Quick view</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToHorizontalProductCard = (state) => {
  return {};
}

export const ConnectedHorizontalProductCard = connect(mapStateToHorizontalProductCard, {quickViewModalAction})(HorizontalProductCard);