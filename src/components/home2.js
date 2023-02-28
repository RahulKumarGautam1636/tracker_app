import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMapEvents, Polyline } from 'react-leaflet'

import L from 'leaflet';
// import icon from './pin.png'; 
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


function Home() {

  const [center, setCenter] = useState([22.51169360, 88.22371109]);
  const [map, setMap] = useState(null);                                     // map has event handlers to move around the map.
  const [path, setPath] = useState([[22.452600714735627, 88.4512710571289], [22.734390263126222, 88.79150390625]]);

  let points = [
    [
        22.564442522733668,
        88.35943222045898
    ],
    [
        23.06330690906648,
        88.04168701171876
    ],
    [
        21.718679805703154,
        88.79699707031251
    ]
]

  console.log(map);
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
        addMarker(e.latlng);
    }
    })

    const removeMarker = (coords) => {
        let filteredPath = path.filter(i => i !== coords);
        setPath(filteredPath);
    }
  
    return path.map((pos, index) => {
        return (
            <Marker position={pos} icon={myIcon} key={index}>
                <Popup>
                    <button onClick={() => {removeMarker(pos)}}className='btn btn-sm btn-primary'>Delete</button>
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
    addMarker(newLocation);
    map.flyTo(newLocation, 13);
  }

  function getLocation() {                // Get your Geolocation coordinates.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(reCenterPosition);
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

  const addMarker = (coords) => {
    setPath([...path, coords ]);
  }



  return (
    <>
      <div id='home'>        
        <MapContainer center={center} zoom={13} ref={setMap} onClick={addMarker}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <LocationMarker />
          <Polyline pathOptions={fillBlueOptions} positions={path} />
          {/* <Marker icon={myIcon} position={reCenter}><Popup>Your GPS location.</Popup></Marker> */}
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
      <div className="reCenter_container" onClick={getLocation}>
          <img id="reCenter_button" src="images/icon-location.svg" alt="Recenter"/>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(Home);




