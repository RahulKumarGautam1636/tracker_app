import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMapEvents, Polyline } from 'react-leaflet';
import { ModalComponent, OffcanvasComponent } from './utilities';

import L from 'leaflet';
// import icon from './pin.png'; 
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import BottomNav from './bottomNav';
import { sidePanel } from './sidePanel';


function Home() {

  const [center, setCenter] = useState([22.51169360, 88.22371109]);
  const [map, setMap] = useState(null);                                     // map has event handlers to move around the map.
  const [path, setPath] = useState([{name: 'marker 1', coords: [22.452600714735627, 88.4512710571289]}, {name: 'marker 2', coords: [22.734390263126222, 88.79150390625]}]);
  const [gpsCoords, setGpsCoords] = useState([]);
  const [nameModal, setNameModal] = useState(false);
  const [name, setName] = useState({name: '', coords: []});
  const [menuActive, setMenuActive] = useState(false);

  let points = [
    // [
    //     22.564442522733668,
    //     88.35943222045898
    // ],
    // [
    //     23.06330690906648,
    //     88.04168701171876
    // ],
    [
        21.718679805703154,
        88.79699707031251
    ]
]

  // console.log(map);
  // const position = [22.51169360, 88.22371109];
  // const position = [51.505, -0.09];

  const polyline = [               // Draw line connection the coords.
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]


  const fillBlueOptions = { fillColor: 'blue' };

  function LocationMarker() {                            // mark any location on map.

    const map = useMapEvents({
      click: (e) => {
        setName({ name: '', coords: e.latlng });
        setNameModal(true);
    }
    })
  
    return path.map((pos, index) => {
        return (
            <Marker position={pos.coords} icon={myIcon} key={index}>
                <Popup>
                  <div className='popup-icons'>
                    <i onClick={() => {flyToLocation(pos.coords)}} className='bx bx-search' style={{color: '#1fb0c3'}}></i>
                    <i onClick={() => {removeMarker(pos.coords)}} className='bx bx-trash' style={{marginLeft: '.5rem', color: 'red'}}></i>
                  </div>
                    {pos.name}
                </Popup>
            </Marker>
        )
    })
  }

  const animateRef = useRef(true);
  function SetViewOnClick({ animateRef }) {      // flyTo function. animateRef = true make flyTo work.
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      })
    })
  
    return null
  }

  const reCenterPosition = (position) => {
    let newLocation = [position.coords.latitude, position.coords.longitude];
    // let newLocation = [22.51169360, 88.22371109];
    // addMarker(newLocation);
    setGpsCoords(newLocation);
    // map.flyTo(newLocation, 18);
  }

  const catchError = () => null;

  var positionOptions = {
    timeout : Infinity,
    maximumAge : 0,
    enableHighAccuracy : true
  }

  function getLocation() {                // Get your Geolocation coordinates.
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



  return (
    <>
      <div id='home'>        
        <MapContainer center={center} zoom={13} ref={setMap} onClick={addMarker} zoomControl={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <LocationMarker />
          {/* <Polyline pathOptions={fillBlueOptions} positions={path} /> */}
          { gpsCoords.length > 0 && <Marker icon={myIcon} position={gpsCoords}><Popup>Your GPS location.</Popup></Marker>}
          {/* <SetViewOnClick animateRef={animateRef} /> */}
          {/* {path.map((item, index) => {                                                                                 // Calling this in seperate function doesn't works. may be because of no-reredering state update.
            return <Marker position={item} icon={myIcon} key={index} draggable={true}>
                        <Popup>
                            <button onClick={() => {removeMarker(item)}} type='button' className='btn btn-sm btn-primary'>Delete</button>
                        </Popup>
                   </Marker>;
          })} */}
        </MapContainer>
      </div>
      {/* <div className="reCenter_container d-none d-md-grid" onClick={getLocation}>
          <img id="reCenter_button" src="images/icon-location.svg" alt="Recenter"/>
      </div> */}
      <i className="reCenter_button d-none d-md-block bx bxs-map" onClick={getLocation}></i>
      <BottomNav handleGpsLocation={getLocation} map={map} setMenuActive={setMenuActive} menuActive={menuActive}/>
      <ModalComponent isActive={nameModal} heading="" child={chooseNameModal()} handleClose={setNameModal}/>
      <OffcanvasComponent isActive={menuActive} child={sidePanel({path: path, map: map, handleClose: setMenuActive})} handleClose={setMenuActive}/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(Home);




