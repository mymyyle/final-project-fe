import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { getGeocode, getLatLng } from "use-places-autocomplete";
import mapStyles from "./mapStyles";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const libraries = ["places"]; //tranh rerender nhieu lan

const center = {
  lat: 10.784154,
  lng: 106.70104,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const PostJobMap = ({ address, setMap, map }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const mapContainerStyle = {
    width: matchesMd ? "30vw" : matchesSm ? "50vw" : "85vw",
    height: "50vh",
  };
  const [marker, setMarker] = useState();
  const covertAddressToSearch = async () => {
    try {
      const results = await getGeocode({ address });
      console.log(`results`, results);
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      panTo({ lat, lng });
    } catch (error) {
      console.log("map error!");
    }
  };
  useEffect(() => {
    covertAddressToSearch();
  }, [address]);

  const onMapClick = useCallback((e) => {
    setMarker((current) => {
      return {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      };
    });
    setMap({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        // cover style of gg map
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
          key={marker?.time.toISOString()}
          position={{ lat: marker?.lat, lng: marker?.lng }}
        />
        {map && <Marker key={map.lng} position={map} />}
      </GoogleMap>
    </div>
  );
};

export default PostJobMap;
