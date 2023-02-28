import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMapEvents, Polyline } from 'react-leaflet'

function Home() {

  const [reCenter, setReCenter] = useState([51.505, -0.09]);
  const [map, setMap] = useState(null);

  console.log(map);
  // const position = [22.51169360, 88.22371109];
  // const position = [51.505, -0.09];

  const polyline = [               // Draw line connection the coords.
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  const fillBlueOptions = { fillColor: 'blue' };

  function LocationMarker() {                            // Auto detect own location using GPS.
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
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

  return (
    <>
      <div id='home'>        
        <MapContainer center={reCenter} zoom={13} ref={setMap}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {/* <LocationMarker /> */}
          <Polyline pathOptions={fillBlueOptions} positions={polyline} />
          <Marker position={reCenter}><Popup>You are here</Popup></Marker>
          <SetViewOnClick animateRef={animateRef} />
        </MapContainer>
      </div>
      <div className="reCenter_container" onClick={() => {setReCenter([22.51169360, 88.22371109]); map.flyTo([22.51169360, 88.22371109], 13)}}>
          <img id="reCenter_button" src="images/icon-location.svg" alt="Recenter"/>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(Home);