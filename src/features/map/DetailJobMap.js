import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import mapStyles from "./mapStyles";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const libraries = ["places"];

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

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const mapContainerStyle = {
    width: matchesMd ? "24vw" : matchesSm ? "30vw" : "85vw",
    height: "30vh",
  };

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
