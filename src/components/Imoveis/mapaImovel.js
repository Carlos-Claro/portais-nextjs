// https://www.npmjs.com/package/@react-google-maps/api
// https://www.creative-tim.com/learning-lab/nextjs/react-google-maps/material-dashboard
// https://tomchentw.github.io/react-google-maps/#introduction

// icon http://www.icuritiba.com/imagens/imoveis_marcador.png
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '400px'
};


export default function Mapas(props) {
    console.log(props)
    const center = {
      lat: props.lat,
      lng: props.lng
    }; 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
   
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [props.lat])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        <Marker position={center} icon="/images/imoveis_marcador.png"/>
        </>
      </GoogleMap>
  ) : <></>
}


