// https://react-google-maps-api-docs.netlify.app/#section-getting-started


import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


function MyComponent(props) {
    const center = {
      lat: props.lat,
      lng: props.lng
    };
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <>
          <Marker position={center} icon="/images/imoveis_marcador.png"/>
        </>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)