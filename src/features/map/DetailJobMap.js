import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import mapStyles from "./mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  width: "22vw",
  height: "30vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const DetailJobMap = () => {
  const { lat, lng } = useSelector((state) => state.job.currentJob);
  const center = {
    lat,
    lng,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [renderMarker, setRenderMarker] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => (!renderMarker ? setRenderMarker(true) : null),
      0
    );
    return () => clearTimeout(timer);
  }, [renderMarker]);

  if (loadError) return "error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
        {renderMarker && <Marker position={center} />}
      </GoogleMap>
    </div>
  );
};

export default DetailJobMap;
