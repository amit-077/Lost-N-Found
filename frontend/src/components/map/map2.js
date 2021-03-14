import React, { useState } from 'react';
import { Icon } from "leaflet";
import { Map, TileLayer, Marker, CircleMarker, ZoomControl } from 'react-leaflet';
import { geolocated } from 'react-geolocated';
import ReactLeafletSearch from "react-leaflet-search";
import Routing from './RoutingMachine';
import '../../index.css';
import 'leaflet/dist/leaflet.css';

const DEFAULT_LATITUDE = 19.0760;
const DEFUALT_LONGITUDE = 72.8777;

function MyMap(props) {
  const pickUp = props.pU;

  const [map,setMap] = useState();

  const saveMap = (map) => {
    setMap(map);
  };

  const longitude = pickUp? pickUp.lng:DEFUALT_LONGITUDE;
  const latitude = pickUp? pickUp.lat:DEFAULT_LATITUDE;

  return (
    <React.Fragment>
      <Map center={[latitude, longitude]} zoom={12} ref={saveMap} zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
      <ZoomControl position="bottomright" />

      {/* {isDriver &&  */}
      <React.Fragment>
        <CircleMarker center={[latitude, longitude]} radius={70} />
        {/* <Marker position={[pickUp.lat, pickUp.lng]}/> */}
        {/* <Marker position={[drop.lat, drop.lng]} /> */}
      </React.Fragment>
      {/* } */}

    </Map>
    </React.Fragment>
  )
};

export default MyMap;