import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../App.css";

function MapResults({ rest }) {
  console.log("MapResults/rest: ", rest);

  if (Object.keys(rest).length > 0 && !Array.isArray(rest)) {
    return (
      <MapContainer
        center={[43.64437547647877, -79.38664463335483]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            rest.location.coordinates[0],
            rest.location.coordinates[1],
          ]}
        >
          <Popup>
            <h6>
              <a href={`/restaurant/${rest._id}`}>{rest.name}</a>
              <p>{rest.description}</p>
            </h6>
          </Popup>
        </Marker>
      </MapContainer>
    );
  }

  return (
    <MapContainer
      center={[43.64437547647877, -79.38664463335483]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rest &&
        rest.length &&
        rest.map((r) => (
          <Marker
            position={[r.location.coordinates[0], r.location.coordinates[1]]}
          >
            <Popup>
              <h6>
                <a href={`/restaurant/${r._id}`}>{r.name}</a>
                <p>{r.description}</p>
              </h6>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default MapResults;
