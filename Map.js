import React, { useRef, useState, useEffect } from "react";
import { Map, TileLayer, CircleMarker, Popup } from "react-leaflet";

function PointsList(props) {
  const { data, onItemClick } = props;
  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            onClick={e => {
              onItemClick(index);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PointsLayer(props) {
  const { data,selectedIndex } = props;
  return data.map((item, index) => (
    <PointMarker
      key={index}
      content={item.name}
      center={{ lat: item.lat, lng: item.lng }}
      openPopup={selectedIndex === index}
    />
  ));
}

function PointMarker(props) {
  const markerRef = useRef(null);
  const { center, content, openPopup } = props;

  useEffect(() => {
    if (openPopup) markerRef.current.leafletElement.openPopup();
  }, [openPopup]);

  return (
    <CircleMarker ref={markerRef} center={center}>
      <Popup>{content}</Popup>
    </CircleMarker>
  );
}

function MapExample(props) {
  const [selected, setSelected] = useState();
  const { zoom, center, locations } = props;

  function handleItemClick(index) {
    setSelected(index);
  }

  return (
    <div>
      <PointsList data={locations} onItemClick={handleItemClick} />
      <Map center={center} zoom={zoom}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <PointsLayer selectedIndex={selected} data={locations}  />
      </Map>
    </div>
  );
}

export default MapExample;