// // import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
export const sidePanel = ({ path, map, handleClose }) => {
    console.log(path);                                                                                                                                      
    return (                                                                            
        <div className='sidePanel'>
            <div className='top-section'>
                <img style={{maxHeight: '9rem'}} src="images/appLogo.png" alt="toggle_mode"/>
            </div>

            <div className='bottom-section'>
                <ul>
                    {path.map((item, index) => {
                        return <li key={index} onClick={() => {map.flyTo(item.coords, 14); handleClose(false);}}><i className="bullet-point bx bxs-map"></i> {item.name}<i className='chevron bx bx-chevron-right'></i></li>;
                    })}
                    {/* <li><i className="bullet-point bx bxs-map"></i> Marker Description.<i class='chevron bx bx-chevron-right'></i></li>
                    <li><i className="bullet-point bx bxs-map"></i> Marker Description.<i class='chevron bx bx-chevron-right'></i></li>
                    <li><i className="bullet-point bx bxs-map"></i> Marker Description.<i class='chevron bx bx-chevron-right'></i></li> */}
                </ul>
            </div>
        </div>
    )
}

// const mapStateToPropsTwo = (state) => {
//   return {};
// }

// export default connect(mapStateToPropsTwo, {})(SidePanel);
