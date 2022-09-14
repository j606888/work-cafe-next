import { Wrapper } from "@googlemaps/react-wrapper"
import GoogleMap from "./GoogleMap"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const GoogleMapWrapper = ({
  children,
  map,
  setMap,
  onIdle,
  onClick,
  marginTop="0px",
  mapSettings,
}) => {
  return (
    <Wrapper apiKey={API_KEY}>
      <GoogleMap
        map={map}
        setMap={setMap}
        onIdle={onIdle}
        onClick={onClick}
        marginTop={marginTop}
        mapSettings={mapSettings}
      >
        {children}
      </GoogleMap>
    </Wrapper>
  )
}

export default GoogleMapWrapper
