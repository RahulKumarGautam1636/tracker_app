import { useState } from 'react';
import { connect } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { ModalComponent, OffcanvasComponent } from './utilities';

// @ts-ignore
// import { MeasureControl } from 'react-leaflet-measure';

import L from 'leaflet';
// import icon from './pin.png'; 
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import BottomNav from './bottomNav';
import { sidePanel } from './sidePanel';
import Header from './header';


function Home() {

  // const [center, setCenter] = useState([22.51169360, 88.22371109]);
  const [map, setMap] = useState(null);                                     // map has event handlers to move around the map.
  const [path, setPath] = useState([{name: 'marker 1', coords: [22.452600714735627, 88.4512710571289]}, {name: 'marker 2', coords: [22.734390263126222, 88.79150390625]}, {name: 'Office', coords: [22.52406420, 88.34563880]}]);
  const [gpsCoords, setGpsCoords] = useState([]);
  const [nameModal, setNameModal] = useState(false);
  const [name, setName] = useState({name: '', coords: []});
  const [menuActive, setMenuActive] = useState(false);
  const [popActive, setPopupActive] = useState(false);
  const [popContent, setPopupContent] = useState({name: '', coords: []});
  const [loginModalActive, setLoginModalActive] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [polylineActive, setPolylineActive] = useState(false);

  // const position = [22.51169360, 88.22371109];

  const polyline = path.map(item => item.coords);


  const fillBlueOptions = { fillColor: 'blue' };

  function LocationMarker() {                            // mark any location on map.

    const map = useMapEvents({
      click: (e) => {
        setName({ name: '', coords: e.latlng });
        setNameModal(true);
    }
    })

    console.log(gpsCoords);          // Just to remove warning saying map defined but not used.

    const handlePopup = (pos) => {
      setPopupContent({name: pos.name, coords: pos.coords});
      if (JSON.stringify(pos.coords) === JSON.stringify(popContent.coords)) {
        setPopupActive(!popActive);
      } else {
        setPopupActive(true);
      }
    }
  
    return path.map((pos, index) => {
        return (
            <Marker position={pos.coords} icon={myIcon} key={index} eventHandlers={{click: () => handlePopup(pos)}}>
                {/* <Popup>
                  <div className='popup-icons'>
                    <i onClick={() => {flyToLocation(pos.coords)}} className='bx bx-search' style={{color: '#1fb0c3'}}></i>
                    <i onClick={() => {removeMarker(pos.coords)}} className='bx bx-trash' style={{marginLeft: '.5rem', color: 'red'}}></i>
                  </div>
                    {pos.name}
                </Popup> */}
            </Marker>
        )
    })
  }
  
  var gpsInitialised = false;
  const reCenterPosition = (position) => {
    let newLocation = [position.coords.latitude, position.coords.longitude];

    if (gpsInitialised === false) {       // reCenter is somehow cannot realtime value of state hence.
      map.flyTo(newLocation, 18);         // using gpsInitialisez to keep track of gps initialization to handle map.flyto.
      gpsInitialised = true;
    }
    console.log(gpsCoords);
    setGpsCoords(newLocation);
  }
  
  const catchError = () => null;

  var positionOptions = {
    timeout : Infinity,
    maximumAge : 0,
    enableHighAccuracy : true
  }

  function getLocation() {                // Get your Geolocation coordinates.
    console.log('from getLocation');
    if (gpsCoords.length > 1) {
      map.flyTo(gpsCoords, map.getZoom());           // only recenter to gps location if gps is already initiazed and working.
      setPopupContent({name: '', coords: []});
      setPopupActive(false);
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(reCenterPosition, catchError, positionOptions);
    } else {
      console.log("Your browser doesn't supports GeoLocation.");
    }
  }

  const myIcon = new L.Icon({
    // iconUrl: marker,
    iconRetinaUrl: icon,
    popupAnchor:  [-1, -3],                     // offset for popup
    iconAnchor: [14, 19],                         // offset for pin marker.
    // iconSize: [36,45],   
    iconUrl: icon,
    shadowUrl: iconShadow  
  });

  const addMarker = (name) => {
    setPath([...path, {name: name.name, coords: name.coords}]);
  }

  const removeMarker = (coords) => {
      let filteredPath = path.filter(i => i.coords !== coords);
      setPath(filteredPath);
      setPopupActive(false);
      setPopupContent({name: '', coords: []});
  }

  const flyToLocation = (coord) => {
    map.flyTo(coord, 17);
  }

  const handleNameChange = (e) => {
    setName(preValue => {
      return { ...preValue, name: e.target.value };
    })
  }

  const chooseNameModal = () => {

    return (
      <div className="outer-box">
        <form id="loginForm" onSubmit={(e) => {e.preventDefault(); addMarker(name); setNameModal(false)}}>
            <h1 style={{fontSize: '25px', marginBottom: '50px', color: '#45f3ff'}}>Enter name</h1>
            <div style={{marginBottom: '45px'}}>
            <div className="inputBox position-relative">
                <input type="text" value={name.name} onChange={handleNameChange} className="form-control" id="choosename" required={true}/>
                <span>Name</span>
                <i></i>
            </div>
            </div>
            <button type="submit" className="btn d-block ms-auto submitBtn">Submit</button>
        </form>
    </div>
    )
  }

  const measureOptions = {
    position: 'topright',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'acres',
    activeColor: '#db4a29',
    completedColor: '#9b2d14'
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} menuActive={menuActive} setMenuActive={setMenuActive} loginModalActive={loginModalActive} setLoginModalActive={setLoginModalActive} polylineActive={polylineActive} setPolylineActive={setPolylineActive}/>
      <div id='home' className='position-relative overflow-hidden'>

         <div className='custom-popup'  style={{right: popActive ? '3%' : '-70%'}}>
           <div className='popup-icons text-end'>
             <i className='bx bx-search' onClick={() => {flyToLocation(popContent.coords)}} style={{color: '#1fb0c3'}}></i>
             <i  className='bx bx-trash' onClick={() => removeMarker(popContent.coords)} style={{marginLeft: '0.5rem', color: 'red'}}></i>
           </div>
           <p className='fw-bold mb-0' style={{fontSize: '16px'}}>{popContent.name}</p>
           {/* <div>lat: {popContent.coords.lat}</div>
           <div>lng: {popContent.coords.lng}</div> */}
         </div>
        <MapContainer center={[22.546265435670254, 88.38622316387924]} zoom={13} ref={setMap} onClick={addMarker} zoomControl={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <LocationMarker />
          {polylineActive && <Polyline pathOptions={fillBlueOptions} positions={polyline} />}
          { gpsCoords.length > 0 && <Marker icon={myIcon} position={gpsCoords}><Popup>Your GPS location.</Popup></Marker>}
          {/* <MeasureControl {...measureOptions} /> */}
        </MapContainer>
      </div>
      {/* <div className="reCenter_container d-none d-md-grid" onClick={getLocation}>
          <img id="reCenter_button" src="images/icon-location.svg" alt="Recenter"/>
      </div> */}
      <i className="reCenter_button d-none d-md-block bx bxs-map" onClick={getLocation}></i>
      <BottomNav handleGpsLocation={getLocation} map={map} setMenuActive={setMenuActive} menuActive={menuActive} loginModalActive={loginModalActive} setLoginModalActive={setLoginModalActive}/>
      <ModalComponent isActive={nameModal} heading="" child={chooseNameModal()} handleClose={setNameModal}/>
      <OffcanvasComponent isActive={menuActive} child={sidePanel({path: path, map: map, handleClose: setMenuActive, isLoggedIn: isLoggedIn, setLoggedIn: setLoggedIn})} handleClose={setMenuActive}/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(Home);




